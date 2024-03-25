from django.contrib import admin
from user.models import User

# Register your models here.

admin.site.register(User)

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username')  # whatever
    search_fields = ('username',)