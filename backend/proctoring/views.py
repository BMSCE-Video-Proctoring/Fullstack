from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes, api_view
from .serializers import FrameAnalysisSerializer

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

            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)

