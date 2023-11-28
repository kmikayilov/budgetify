from django.urls import path
from .views.list import CategoryListAPIView, AccountingListAPIView, PaymentMethodListAPIView
from .views.transaction import TransactionListAPIView, TransactionCreateAPiView, TransactionDetailAPIview

app_name = "budgetify-api"

urlpatterns = [
    path('list/category', CategoryListAPIView.as_view(), name="list-category"),
    path('list/accounting', AccountingListAPIView.as_view(), name="list-accounting"),
    path('list/payment-method', PaymentMethodListAPIView.as_view(), name="list-payment-method"),
    
    path('transactions/filter', TransactionListAPIView.as_view(), name="transactions-filter"),
    path('transactions/create', TransactionCreateAPiView.as_view(), name="transactions-create"),
    path('transactions/detail/<id>', TransactionDetailAPIview.as_view(), name="transactions-detail"),
]