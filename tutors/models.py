from django.db import models
from django.conf import settings

from accounts.views import User


class CommerceClass(models.Model):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="owned_classes"
    )

    name = models.CharField(max_length=200)
    description = models.TextField()

    address = models.TextField()
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100)

    contact_number = models.CharField(max_length=15)

    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Course(models.Model):

    commerce_class = models.ForeignKey(
        CommerceClass,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    title = models.CharField(max_length=200)
    price = models.IntegerField()
    duration_months = models.IntegerField()

    def __str__(self):
        return self.title

class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} -> {self.course.title}"