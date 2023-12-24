from rest_framework import serializers
from . models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['email', 'org_name', 'test_name', 'link', 'candidates', 'start_time', 'duration']