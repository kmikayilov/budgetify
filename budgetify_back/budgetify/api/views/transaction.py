from rest_framework import generics
from rest_framework.response import Response
from django_filters.rest_framework.backends import DjangoFilterBackend

from budgetify.models import Transaction, Category, PaymentMethod
from budgetify.api.serializers import TransactionSerializer
from budgetify.api.filters import TransactionFilter

from budgetify.api.permissions import UserAuthPermission


class TransactionListAPIView(generics.ListAPIView):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TransactionFilter
    permission_classes = [ UserAuthPermission ]
    
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
    permission_classes = [ UserAuthPermission ]

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
    permission_classes = [ UserAuthPermission ]

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