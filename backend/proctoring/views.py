from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes, api_view
from .serializers import FrameAnalysisSerializer
import cv2
import numpy as np
from . import detect

count = 0

@api_view(['POST'])
@parser_classes([MultiPartParser])
def analyze(request):
    if request.method == 'POST':
        global count
        serializer = FrameAnalysisSerializer(data=request.data)
        if serializer.is_valid():
            # Process the frame (serializer.validated_data['frame'])
            # Perform analysis or save it to the database

            # Save the frame to frame variable so that it can be used by cv2:
            frame_file = serializer.validated_data['frame']
            image_data = frame_file.read()
            image_np = np.frombuffer(image_data, dtype=np.uint8)
            frame = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
            # frame = cv2.imdecode(serializer.validated_data['frame'], cv2.IMREAD_COLOR)


            # # save the frame to a file img.png
            # with open('./img.png', 'wb+') as destination:
            #     for chunk in serializer.validated_data['frame'].chunks():
            #         destination.write(chunk)

            # frame = cv2.imread('./img.png')

            if count == 0:
                res, message = detect.detectGestures(frame)
                # res2 = detect.detectHeadPose(frame)
            elif count == 1:
                res, message = detect.detectHeadPose(frame)
            elif count == 2:
                res, message = detect.detectGazeDirection(frame)
                # res2 = detect.detectPhone(frame)
            elif count == 3:
                res, message = detect.detectPhone(frame)
            

            # res = detect.detectGazeDirection(frame)

            # res1 = detect.detectGestures(frame)
            # res2 = detect.detectPhone(frame)
            # res3 = detect.detectHeadPose(frame)
            # res4 = detect.detectGazeDirection(frame)
            
            count = (count + 1) % 4

            if res:
                return JsonResponse({'status': 'suspicious', 'message': message}, status=200)
            else:
                return JsonResponse({'status': 'not suspicious'}, status=200)
            
        else:
            return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)

