from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from budgetify.models import User

User = get_user_model()

class UserAdmin(BaseUserAdmin):
    list_display = [
        'email',
        'is_active', 'is_superuser',
    ]
    list_filter = ('is_active', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'logo')}),
        # ('Full name', {'fields': ()}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )
    readonly_fields = ('timestamp',)
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

# Register your models here.
admin.site.register(User, UserAdmin)