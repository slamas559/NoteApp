from django.db import models
from django.contrib.auth.models import User


# Create your models here.

category = (("Personal","Personal"),
            ("Important", "Important"),
            ("Casual", "Casual"),
            ("Regular", "Regular"),)

class Todo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField()
    category = models.CharField(max_length=20, choices=category, default="Personal")
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} wrote: {self.title}"