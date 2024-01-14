from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from budgetify.models import Accounting, Category, PaymentMethod, User, Transaction
from budgetify.utils import check_chars

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

    def to_representation(self, instance):
        repr_ = super().to_representation(instance)
        
        repr_['accounting'] = AccountingSerializer(instance.accounting).data

        for field, value in repr_.items():
            if not value:
                repr_[field] = '-'

        return repr_

class AccountingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accounting
        fields = "__all__"

    def to_representation(self, instance):
        repr_ = super().to_representation(instance)

        for field, value in repr_.items():
            if not value:
                repr_[field] = '-'

        return repr_

class PaymentMethodSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentMethod
        fields = "__all__"

    def to_representation(self, instance):
        repr_ = super().to_representation(instance)

        for field, value in repr_.items():
            if not value:
                repr_[field] = '-'

        return repr_

class UserRegisterSerialzier(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True, min_length=6)
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ["email", "password"]

    def validate(self, attrs):

        email = attrs.get("email")
        user = User.objects.filter(email=email)
        
        if user:
            if user.first().is_active:
                raise ValidationError({"email": "Account with this email already exists"}, 400)
            else:
                user.first().delete()

        self.validate_password_(attrs['password'])

        return attrs

    def validate_password_(self, password):

        error_message = None

        if len(password) < 6:
            error_message = "The password must contain at least 6 characters"

        elif not check_chars(password):
            error_message = "The password must contain at least one letter and digit"

        if error_message:
            raise ValidationError({"password": error_message}, 400)

        return None

    def create(self, validated_data):

        user = User.objects.create(
            email=validated_data["email"],
            is_active=True,
        )

        user.set_password(validated_data["password"])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        # fields = [ 'id', 'email' ]
        fields = '__all__'
    
    def to_representation(self, instance):
        repr_ = super().to_representation(instance)
        
        repr_['username'] = instance.username

        
        for field, value in repr_.items():
            if not value:
                repr_[field] = '-'
        
        return repr_


    def validate(self, attrs): 

        email = attrs.get("email")
        user = User.objects.filter(email=email)
        
        if user:
            if user.first().is_active:
                raise ValidationError({"email": "An account with this email already exists"}, 400)

            else:
                user.first().delete()
        
        return attrs

    def create(self, validated_data):
        
        user = User.objects.create(
            email=validated_data["email"],
            is_active=False
        )

        return user
    
class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = "__all__"

    def to_representation(self, instance):
        repr_ = super().to_representation(instance)
        
        repr_['category'] = CategorySerializer(instance.category).data
        repr_['payment_method'] = PaymentMethodSerializer(instance.payment_method).data

        for field, value in repr_.items():
            if not value:
                repr_[field] = '-'

        return repr_