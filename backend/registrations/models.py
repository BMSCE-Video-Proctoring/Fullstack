from django.contrib.auth.models import AbstractUser
from django.db import models

class RegisteredUsers(AbstractUser):
    name = models.CharField(max_length=255)