from django.urls import path
from apps.wheel import views

urlpatterns = [
    path('spin/', views.spin),
    path('spin/create/', views.spinuser_create), # API
]