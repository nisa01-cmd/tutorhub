from rest_framework import serializers
from .models import CommerceClass, Course, Enrollment


class CommerceClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommerceClass
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):

    class_name = serializers.CharField(
        source="commerce_class.name",
        read_only=True
    )

    class Meta:
        model = Course
        fields = "__all__"

class EnrollmentSerializer(serializers.ModelSerializer):

    course_title = serializers.CharField(source="course.title", read_only=True)
    class_name = serializers.CharField(source="course.commerce_class.name", read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "course",
            "course_title",
            "class_name",
            "enrolled_at"
        ]