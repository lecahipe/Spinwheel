from django.db import models
from django.conf import settings


# Create your models here.
class UserSpin(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    color = models.CharField(max_length=20)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.color}"

