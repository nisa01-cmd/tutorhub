from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import CommerceClass, Course, Enrollment
from .serializers import CommerceClassSerializer, CourseSerializer, EnrollmentSerializer


# ================================
# STUDENT FEATURES
# ================================

# 🔹 List Approved Classes
@api_view(["GET"])
def list_classes(request):

    city = request.GET.get("city")
    area = request.GET.get("area")

    classes = CommerceClass.objects.filter(is_approved=True)

    if city:
        classes = classes.filter(city__icontains=city)

    if area:
        classes = classes.filter(area__icontains=area)

    serializer = CommerceClassSerializer(classes, many=True)

    return Response(serializer.data)


# 🔹 Search Classes (Course-based search)
@api_view(["GET"])
def search_classes(request):

    subject = request.GET.get("subject", "")
    city = request.GET.get("city", "")
    area = request.GET.get("area", "")

    courses = Course.objects.filter(
        commerce_class__is_approved=True
    )

    if subject:
        courses = courses.filter(title__icontains=subject)

    if city:
        courses = courses.filter(commerce_class__city__icontains=city)

    if area:
        courses = courses.filter(commerce_class__area__icontains=area)

    serializer = CourseSerializer(courses, many=True)

    return Response(serializer.data)


# 🔹 List Courses for a Specific Class
@api_view(["GET"])
def list_courses(request, class_id):

    courses = Course.objects.filter(
        commerce_class_id=class_id,
        commerce_class__is_approved=True
    )

    serializer = CourseSerializer(courses, many=True)

    return Response(serializer.data)


# 🔹 Student Enroll in Course
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def enroll_course(request):

    if request.user.role != "student":
        return Response({"error": "Only students can enroll"}, status=403)

    course_id = request.data.get("course_id")

    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

    enrollment, created = Enrollment.objects.get_or_create(
        student=request.user,
        course=course
    )

    if not created:
        return Response({"message": "Already enrolled"}, status=200)

    return Response({"message": "Enrollment successful"}, status=201)


# 🔹 Student My Enrollments
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def myenrollments(request):

    if request.user.role != "student":
        return Response(
            {"error": "Only students can view enrollments"},
            status=403
        )

    enrollments = Enrollment.objects.filter(student=request.user)

    serializer = EnrollmentSerializer(enrollments, many=True)

    return Response(serializer.data)


# ================================
# CLASS OWNER FEATURES
# ================================

# 🔹 Create Class
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_class(request):

    if request.user.role != "class_owner":
        return Response(
            {"error": "Only class owners can create classes"},
            status=status.HTTP_403_FORBIDDEN
        )

    commerce_class = CommerceClass.objects.create(
        owner=request.user,
        name=request.data.get("name"),
        description=request.data.get("description"),
        address=request.data.get("address"),
        city=request.data.get("city"),
        area=request.data.get("area"),
        contact_number=request.data.get("contact_number"),
    )

    return Response(
        {"message": "Class created successfully. Waiting for admin approval."},
        status=status.HTTP_201_CREATED
    )


# 🔹 Class Owner Dashboard → My Classes
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_classes(request):

    if request.user.role != "class_owner":
        return Response(
            {"error": "Only class owners can view their classes"},
            status=403
        )

    classes = CommerceClass.objects.filter(owner=request.user)

    serializer = CommerceClassSerializer(classes, many=True)

    return Response(serializer.data)


# 🔹 Create Course
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_course(request):

    if request.user.role != "class_owner":
        return Response(
            {"error": "Only class owners can create courses"},
            status=403
        )

    class_id = request.data.get("class_id")

    try:
        commerce_class = CommerceClass.objects.get(
            id=class_id,
            owner=request.user
        )
    except CommerceClass.DoesNotExist:
        return Response({"error": "Class not found"}, status=404)

    course = Course.objects.create(
        commerce_class=commerce_class,
        title=request.data.get("title"),
        price=request.data.get("price"),
        duration_months=request.data.get("duration_months"),
    )

    serializer = CourseSerializer(course)

    return Response(serializer.data, status=201)


# 🔹 Class Owner → My Courses
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_courses(request):

    if request.user.role != "class_owner":
        return Response({"error": "Not allowed"}, status=403)

    courses = Course.objects.filter(commerce_class__owner=request.user)

    serializer = CourseSerializer(courses, many=True)

    return Response(serializer.data)


# 🔹 Delete Class
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_class(request, class_id):

    if request.user.role != "class_owner":
        return Response({"error": "Only class owners can delete classes"}, status=403)

    try:
        commerce_class = CommerceClass.objects.get(id=class_id, owner=request.user)
    except CommerceClass.DoesNotExist:
        return Response({"error": "Class not found"}, status=404)

    commerce_class.delete()

    return Response({"message": "Class deleted successfully"})


# 🔹 Delete Course
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_course(request, course_id):

    if request.user.role != "class_owner":
        return Response({"error": "Only class owners can delete courses"}, status=403)

    try:
        course = Course.objects.get(id=course_id)

        if course.commerce_class.owner != request.user:
            return Response({"error": "Not allowed"}, status=403)

    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

    course.delete()

    return Response({"message": "Course deleted successfully"})


# 🔹 View Student Enrollments for Owner
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def class_enrollments(request):

    if request.user.role != "class_owner":
        return Response({"error": "Not allowed"}, status=403)

    enrollments = Enrollment.objects.filter(
        course__commerce_class__owner=request.user
    )

    data = []

    for e in enrollments:
        data.append({
            "id": e.id,
            "student_name": e.student.username,
            "class_name": e.course.commerce_class.name,
            "course_title": e.course.title,
            "enrolled_at": e.enrolled_at
        })

    return Response(data)