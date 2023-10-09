from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response

from django.http import HttpResponse

# def home(request):
#     return HttpResponse("Hello World")


class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        output = [{"email": output.email,
                   "org_name": output.org_name,
                   "test_name": output.test_name,
                   "link": output.link,
                   "candidates": output.candidates,
                   "start_time": output.start_time,
                   "duration": output.duration,}
                   for output in React.objects.all()]
        return Response(output)
    
    def post(self, request):
        
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
