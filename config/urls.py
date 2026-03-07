from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.serializers import MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "username": request.user.username,
        "message": "You are authenticated 🎉"
    })


class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


urlpatterns = [
    path("admin/", admin.site.urls),

    # AUTH
    path("api/login/", MyTokenView.as_view()),
    path("api/profile/", profile),
    path("api/", include("accounts.urls")),   # ✅ ADD THIS LINE

    # CLASSES APP
    path("api/", include("tutors.urls")), 
    path("api/classes/", include("classes.urls")),
]