from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import generics

from budgetify.api import serializers, filters
from budgetify import models

class CategoryListAPIView(generics.ListAPIView):
    queryset = models.Category.objects.all().order_by('name')
    serializer_class = serializers.CategorySerializer    
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.CategoryFilter
    pagination_class = None

class AccountingListAPIView(generics.ListAPIView):
    queryset = models.Accounting.objects.all().order_by('id')
    serializer_class = serializers.AccountingSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.AccountingFilter
    pagination_class = None
    
class PaymentMethodListAPIView(generics.ListAPIView):
    queryset = models.PaymentMethod.objects.all().order_by('id')
    serializer_class = serializers.PaymentMethodSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.PaymentMethodFilter
    pagination_class = None