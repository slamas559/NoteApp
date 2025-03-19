from django.urls import path, include
from . import views
from django.contrib import admin
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'tasks', views.TodoView, basename='todo')


urlpatterns = [
    path("", include(router.urls))
]


