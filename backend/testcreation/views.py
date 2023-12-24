from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response

from django.http import HttpResponse

# def home(request):
#     return HttpResponse("Hello World")


class ReactView(APIView):

    serializer_class = ReactSerializer

    # def get(self, request):
    #     output = [{"email": output.email,
    #                "org_name": output.org_name,
    #                "test_name": output.test_name,
    #                "link": output.link,
    #                "candidates": output.candidates,
    #                "start_time": output.start_time,
    #                "duration": output.duration,}
    #                for output in React.objects.all()]
    #     return Response(output)

    def get(self, request, test_name=None):
        # Query the database for the corresponding testCode
        if test_name:
            # Handle GET request with parameter
            print('testing')
            react_instance = get_object_or_404(React, test_name=test_name)
            output = {
                'email': react_instance.email,
                'org_name': react_instance.org_name,
                'test_name': react_instance.test_name,
                'link': react_instance.link,
                'candidates': react_instance.candidates,
                'start_time': react_instance.start_time,
                'duration': int(react_instance.duration.total_seconds()),      # Convert seconds duration to integer before sending
            }
        else:
            # Handle GET request without parameter
            react_instances = React.objects.all()
            output = [
                {
                    'email': instance.email,
                    'org_name': instance.org_name,
                    'test_name': instance.test_name,
                    'link': instance.link,
                    'candidates': instance.candidates,
                    'start_time': instance.start_time,
                    'duration': instance.duration,
                }
                for instance in react_instances
            ]
        return Response(output)
    
    def post(self, request):
        
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
