# Generated by Django 4.2.7 on 2024-01-13 15:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('budgetify', '0002_alter_transaction_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
