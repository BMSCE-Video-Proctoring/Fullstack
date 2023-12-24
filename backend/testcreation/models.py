from django.db import models

# Create your models here.
class React(models.Model):
    email = models.EmailField(max_length=250)
    org_name = models.CharField(max_length=200)
    test_name = models.CharField(max_length=200)
    link = models.URLField()
    candidates = models.IntegerField()
    start_time = models.DateTimeField()
    duration = models.DurationField()