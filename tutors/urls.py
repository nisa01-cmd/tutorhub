from django.urls import path
from .views import (
    class_enrollments,
    create_course,
    delete_class,
    delete_course,
    enroll_course,
    list_classes,
    create_class,
    list_courses,
    my_classes,
    search_classes,
    myenrollments,
    my_courses
)

urlpatterns = [

    # CLASSES
    path("classes/", list_classes),
    path("classes/create/", create_class),
    path("classes/my/", my_classes),
    path("classes/<int:class_id>/delete/", delete_class),

    # COURSES
    path("courses/create/", create_course),
    path("courses/my/", my_courses),
    path("courses/<int:class_id>/", list_courses),
    path("courses/<int:course_id>/delete/", delete_course),

    # SEARCH
    path("search/", search_classes),

    # ENROLLMENTS
    path("enroll/", enroll_course),
    path("my-enrollments/", myenrollments),
    path("class-enrollments/", class_enrollments),
]