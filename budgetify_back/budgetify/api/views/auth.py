from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

import jwt
import datetime

from budgetify.api import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    
    def post(self, request):
        serializer = serializers.UserRegisterSerialzier(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    
    def post(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({"message": "Password is incorrect!"}, status=status.HTTP_404_NOT_FOUND)

        payload = {
            "token_type": "access",
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, "secret", algorithm='HS256')
        
        return Response({ 'user': serializers.UserSerializer(user).data, 'token': token }, status=status.HTTP_200_OK)

class AuthAPIView(APIView):
    
    def get(self, request):
        token = request.headers.get('Authorization', None)[7:]
        
        if not token:
            return Response({"message": "Unauthorized!"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(token, "secret", algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response({"message": "Unauthorized!"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"message": "Invalid token!"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(id=payload.get('id', 0)).first()
        
        return Response({ "user": serializers.UserSerializer(user).data, "token": token }, status=status.HTTP_200_OK)