from classes.models import Class
from rest_framework import serializers

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'