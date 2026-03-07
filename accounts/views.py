from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(["POST"])
def register(request):
    try:
        user = User.objects.create_user(
            username=request.data["username"],
            email=request.data["email"],
            password=request.data["password"],
            role=request.data["role"],
        )
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=400)