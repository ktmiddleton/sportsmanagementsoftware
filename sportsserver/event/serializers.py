from rest_framework import serializers
from event.models import Event
from user.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer):
    
    title = serializers.CharField(required=True, max_length=200)
    description = serializers.TextField()
    start_time = serializers.DateTimeField(required=True)
    end_time = serializers.DateTimeField(required=True)
    creator = UserSerializer(required=True)
    
    class Meta:
        model = Event
        fields = "__all__"