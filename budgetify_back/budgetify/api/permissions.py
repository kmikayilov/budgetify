from rest_framework import status, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
import jwt


User = get_user_model()

class UserAuthPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        token = request.headers.get('Authorization', None)[7:]
        
        print('UserAuthPermission')
        print(token)
        
        if not token:
            return False

        try:
            payload = jwt.decode(token, "secret", algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False

        user = User.objects.filter(id=payload.get('id', 0)).first()
        
        return user