# from datetime import datetime
# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.views import APIView

from django.utils import timezone
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework.backends import DjangoFilterBackend

from budgetify.models import Transaction, Category, PaymentMethod
from budgetify.api.serializers import TransactionSerializer
from budgetify.api.filters import TransactionFilter
# from django.db.models import Q

# from .api import serializers
# from . import models

# Create your views here.

class TransactionListAPIView(generics.ListAPIView):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TransactionFilter
    
    def get_queryset(self):
        queryset = Transaction.objects.all()
        sort_field = self.request.query_params.get('field')
        sort_direction = self.request.query_params.get('direction', 'asc')

        if sort_field:
            order_by_field = sort_field if sort_direction.lower() == 'asc' else f"-{sort_field}"
            queryset = queryset.order_by(order_by_field)

        return queryset

class TransactionCreateAPiView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print('ser data: ', serializer.data)

        return Response(serializer.data, status=201)


class TransactionDetailAPIview(generics.RetrieveUpdateDestroyAPIView):

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = "id"

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        transaction = self.get_object()
        transaction.amount = request.data.get("amount", "")
        transaction.date = request.data.get("date", "")
        transaction.category = Category.objects.get(pk=int(request.data.get("category", 0)))
        transaction.payment_method = PaymentMethod.objects.get(pk=int(request.data.get("payment_method", 0)))
        transaction.save()

        return Response({}, status=200)


# class createTransactionView(generics.CreateAPIView):
#     queryset = models.Transaction.objects.all()
#     serializer_class = serializers.MakeTransactionSerializer

#     def post(self, request, format=None):
#         data = {}
#         new_transaction = request.data.get('transaction', {})

#         categoryQuerySet = models.Category.objects.filter(
#             id=new_transaction.get('categoryId', 0))
#         if categoryQuerySet.exists():
#             data['category'] = categoryQuerySet.first()
#         else:
#             Response({"Category not found": "Invalid category id"},
#                      status=status.HTTP_404_NOT_FOUND)
        

#         paymentQuerySet = models.PaymentMethod.objects.filter(
#             id=new_transaction.get('paymentId', 0))
#         if paymentQuerySet.exists():
#             data['payment'] = paymentQuerySet.first()
#         else:
#             Response({"Payment method not found": "Invalid payment method id"},
#                     status=status.HTTP_404_NOT_FOUND)
        

#         data["transactionAmount"] = new_transaction.get('transactionAmount', 0)
#         data["transactionDate"] =  new_transaction.get('transactionDate', datetime.today())
    
#         transaction = models.Transaction(**data)
#         transaction.save()

#         return Response(serializers.TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)


# class TransactionView(APIView):
#     def get_transaction(self, transaction_id):
#         try:
#             transaction = models.Transaction.objects.filter(id=transaction_id).first()
#             return transaction
#         except models.Transaction.DoesNotExist:
#             return Response({"Transaction not found": "Invalid transaction id"}, status=status.HTTP_404_NOT_FOUND)

#     def get(self, request, transaction_id):
#         if transaction_id == None:
#             return Response({"Bad request": "Id param not found in request"}, status=status.HTTP_400_BAD_REQUEST)

#         serializer = serializers.TransactionSerializer(
#             self.get_transaction(transaction_id))
#         return Response(serializer.data, status.HTTP_200_OK)

#     def put(self, request, transaction_id):
#         if transaction_id == None:
#             return Response({"Bad request": "Id param not found in request"}, status=status.HTTP_400_BAD_REQUEST)

#         transaction = self.get_transaction(transaction_id)
        
#         new_transaction = request.data.get('transaction', {})

#         if transaction.category.id != new_transaction.get('categoryId', 0):
#             categoryQuerySet = models.Category.objects.filter(
#                 id=new_transaction.get('categoryId', 0))
#             if categoryQuerySet.exists():
#                 category = categoryQuerySet.first()
#             else:
#                 Response({"Category not found": "Invalid category id"},
#                          status=status.HTTP_404_NOT_FOUND)

#             transaction.category = category
    

#         if transaction.payment.id != new_transaction.get('paymentId', 0):
#             paymentQuerySet = models.PaymentMethod.objects.filter(
#                 id=new_transaction.get('paymentId', 0))
#             if paymentQuerySet.exists():
#                 payment = paymentQuerySet.first()
#             else:
#                 Response({"Payment method not found": "Invalid payment method id"},
#                         status=status.HTTP_404_NOT_FOUND)

#             transaction.payment = payment

#         if transaction.transactionAmount != new_transaction.get('transactionAmount', 0):
#             transaction.transactionAmount = new_transaction.get('transactionAmount', 0)

#         if transaction.transactionDate != new_transaction.get('transactionDate', 0):
#             transaction.transactionDate = new_transaction.get('transactionDate', 0)

#         transaction.save()

#         return Response(serializers.TransactionSerializer(transaction).data, status=status.HTTP_200_OK)

#     def delete(self, request, transaction_id):
#         if transaction_id == None:
#             return Response({"Bad request": "Id param not found in request"}, status=status.HTTP_400_BAD_REQUEST)

#         transaction = self.get_transaction(transaction_id)
#         transaction.delete()
#         return Response({"Success": "Transaction successfully deleted!"}, status=status.HTTP_200_OK)


# class FilterTransactions(generics.CreateAPIView):
#     queryset = models.Transaction.objects.all()
#     serializer_class = serializers.TransactionSerializer

#     def order_by(self, order, field):
#         sign = '-' if order == 'desc' else '' 
#         if field == 'id' or field == 'transactionAmount' or field == 'transactionDate' or field == 'payment_id' or field == 'category_id':
#             val = sign + field
#         else:
#             val = sign + 'category__accounting'
        
#         return val

#     def post(self, request, format=None):
#         data = {}

#         query = self.get_queryset()
#         data['transactionCount'] = self.get_queryset().count()
        
#         req = request.data
#         filterObject = req['filters']
      
#         and_condition = Q()
#         for filter in filterObject:
#             if filter == 'id' or filter == 'transactionAmount' or filter == 'transactionDate':
#                 and_condition.add(Q(**{"{}__icontains".format(filter):filterObject[filter]}), Q.AND)

#             if filter == 'category_id' or filter == 'payment_id':
#                 and_condition.add(Q(**{filter: filterObject[filter]}), Q.AND)
            
#             if filter == "accounting_id":
#                 and_condition.add(Q(**{"category__accounting": filterObject[filter]}), Q.AND)

#         query = self.get_queryset().filter(and_condition)
        
#         if 'sortField' in req:
#             order = self.order_by(req['sortOrder'], req['sortField'])
#             query = query.order_by(order)
        
        
#         objectsList = serializers.TransactionSerializer(query, many=True).data
#         data["transactions"] = objectsList[req['offset']:req['offset']+req['limit']]

#         return Response(data, status=status.HTTP_200_OK)