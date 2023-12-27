from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes, api_view
from .serializers import FrameAnalysisSerializer
import cv2
from . import detect

@api_view(['POST'])
@parser_classes([MultiPartParser])
def analyze(request):
    if request.method == 'POST':
        serializer = FrameAnalysisSerializer(data=request.data)
        if serializer.is_valid():
            # Process the frame (serializer.validated_data['frame'])
            # Perform analysis or save it to the database

            # save the frame to a file img.png
            with open('./img.png', 'wb+') as destination:
                for chunk in serializer.validated_data['frame'].chunks():
                    destination.write(chunk)

            frame = cv2.imread('./img.png')
            res1 = detect.detectGestures(frame)
            res2 = detect.detectPhone(frame)

            if res1 or res2:
                return JsonResponse({'status': 'suspicious'}, status=200)
            else:
                return JsonResponse({'status': 'not suspicious'}, status=200)
            
        else:
            return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)

