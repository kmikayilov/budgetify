# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, UserManager

from django.db import models
    
class MyUserManager(UserManager):
    
    def create_user(self, email, password=None, is_active=True, is_staff=False, is_superuser=False):
        
        if not email:
            raise ValueError("Users must have an email adress")
        
        user = self.model(
            email=self.normalize_email(email)
        )
        
        user.set_password(password)
        user.is_active = is_active
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=120, verbose_name='E-mail')

    timestamp = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Accounting(models.Model):
    name = models.CharField(max_length=50, null=True)
    coefficient = models.IntegerField(null=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, null=True)
    accounting = models.ForeignKey(Accounting, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.id} {self.category} ({self.accounting.id})"


class PaymentMethod(models.Model):
    name = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    amount = models.FloatField(null=True)
    date = models.DateField(null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name="transactions")
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE, null=True, related_name="transactions")

    def __str__(self):
        return f"{self.amount} ({self.date}, {self.category.name}, {self.payment_method.name})"
