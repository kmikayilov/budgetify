from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q, Sum
from rest_framework import status
import datetime

from budgetify import models

# monthly analysis of expense and income (Victory chart)
class IncomeExpenseBarChart(APIView):
    
    def get(self, request):
        data = []

        year = datetime.datetime.today().year

        for i in range(1, 13):
            date = "{}-{}-".format(year, i) if i > 9 else "{}-0{}-".format(year, i)
            sumIncome = models.Transaction.objects.filter(Q(date__icontains=date) & Q(category__accounting=1)).aggregate(Sum('amount')).get('amount__sum') or 0
            sumExpense = models.Transaction.objects.filter(Q(date__icontains=date) & Q(category__accounting=2)).aggregate(Sum('amount')).get('amount__sum') or 0

            data.append({
                    "name": datetime.datetime.strptime(str(i), "%m").strftime("%b"),
                    "income": sumIncome,
                    "expense": sumExpense
                }
            )

        return Response(data, status=status.HTTP_200_OK)

# monthly analysis of total net (Victory chart)
class TotalNetBarChart(APIView):
    def get(self, request):
        data = []

        year = datetime.datetime.today().year

        for i in range(1, 13):
            date = "{}-{}-".format(year, i) if i > 9 else "{}-0{}-".format(year, i)
            sumIncome = models.Transaction.objects.filter(Q(date__icontains=date) & Q(category__accounting=1)).aggregate(Sum('amount')).get('amount__sum') or 0
            sumExpense = models.Transaction.objects.filter(Q(date__icontains=date) & Q(category__accounting=2)).aggregate(Sum('amount')).get('amount__sum') or 0

            data.append({
                    "name": datetime.datetime.strptime(str(i), "%m").strftime("%b"),
                    "net": sumIncome - sumExpense,
                }
            )

        return Response(data, status=status.HTTP_200_OK)

# all categories share in custom tooltip labels (pie chart, better animated)
# { labels: [], series: [] }

class CategoriesDonutChart(APIView):
    def get(self, request):
        queryset = models.Category.objects.all()
        data = []

        for category in queryset:
            sumAmount = models.Transaction.objects.filter(category=category.id).aggregate(Sum("amount")).get("amount__sum") or 0

            if sumAmount  != 0:
                data.append({
                    "name": category.name,
                    "value": sumAmount,
                })
        return Response(data, status=status.HTTP_200_OK)

# voronoi tooltip competing income and expense through time ( x = time, y = cost)