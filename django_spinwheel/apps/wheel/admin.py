from django.contrib import admin
from apps.wheel.models import UserSpin

class UserSpinAdmin(admin.ModelAdmin):
    list_display = ["user", "color", "date_creation"]
    search_fields = ["user", "color", "date_creation"]
    ordering = ["date_creation"]
    autocomplete_fields = ["user"]
    readonly_fields = ["date_creation"]

admin.site.register(UserSpin, UserSpinAdmin)