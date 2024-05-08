from rest_framework import routers, serializers, viewsets
from apps.wheel.models import UserSpin
 
class UserSpinSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSpin
        fields = ['user', 'color']