from django.shortcuts import render
from rest_framework.views import APIView
from event.serializers import EventSerializer

# Create your views here.

class CreateEvent(APIView):
    
    """
    data format:
        {
            "title": "",
            "description": "",
            "start_time": "",
            "end_time": "",
            "creator": "token?"
        }
    """
    def post(self, request, format='json'):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():