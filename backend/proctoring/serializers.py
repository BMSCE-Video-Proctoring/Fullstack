from rest_framework import serializers

class FrameAnalysisSerializer(serializers.Serializer):
    frame = serializers.ImageField()