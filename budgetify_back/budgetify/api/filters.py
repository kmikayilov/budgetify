import django_filters

from budgetify.models import Category, Accounting, PaymentMethod, Transaction

class CategoryFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Category
        fields = ['name']
        
class AccountingFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Accounting
        fields = ['name']
            
class PaymentMethodFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = PaymentMethod
        fields = ['name']

class TransactionFilter(django_filters.FilterSet):
    amount = django_filters.CharFilter(lookup_expr='icontains')
    date = django_filters.CharFilter(lookup_expr='icontains')
    
    category = django_filters.NumberFilter(field_name='category__id')
    payment_method = django_filters.NumberFilter(field_name='payment_method__id')
    category__accounting = django_filters.NumberFilter(field_name='category__accounting__id')

    class Meta:
        model = Transaction
        fields = ['amount', 'date', 'category', 'payment_method', 'category__accounting' ]