from django.shortcuts import render
from rest_framework import viewsets, serializers, permissions, generics
from rest_framework.views import APIView
from .serializers import TodoSerializer
from .models import Todo
from rest_framework.decorators import api_view, permission_classes


# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

#generics.ListCreateAPIView