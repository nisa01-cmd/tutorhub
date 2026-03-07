from django.urls import path
from .views import create_class, search_classes

urlpatterns = [
    path("search/", search_classes),
    path("create/", create_class),
]
