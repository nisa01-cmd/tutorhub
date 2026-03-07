from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Class
from .serializers import ClassSerializer

@api_view(["GET"])
def search_classes(request):
    subject = request.GET.get("subject")
    location = request.GET.get("location")

    classes = Class.objects.all()

    if subject:
        classes = classes.filter(subject__icontains=subject)

    if location:
        classes = classes.filter(location__icontains=location)

    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_class(request):

    if request.user.role != "tutor":
        return Response({"error": "Only tutors can create classes"},
                        status=status.HTTP_403_FORBIDDEN)

    serializer = ClassSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(tutor=request.user)
        return Response(serializer.data)

    return Response(serializer.errors, status=400)