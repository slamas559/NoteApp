from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .serializers import ProfileSerializer, RegisterSerializer, UserSerializer
from django.middleware.csrf import get_token
# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # username = request.data.get('username')
    # password = request.data.get('password')

    # if User.objects.filter(username=username).exists():
    #     return Response({"error": "Username already taken"}, status=400)

    # user = User.objects.create_user(username=username, password=password)
    # return Response({"message": "User registered successfully"})
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'User registered successfully'}, status=201)
    return Response(serializer.errors, status=400)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        tokens = get_tokens_for_user(user)
        return Response(tokens)
    return Response({"error": "Invalid credentials"}, status=400)

@api_view(['POST'])
def logout_user(request):
    return Response({"message": "Logout successfully"})


@api_view(['POST'])
@permission_classes([AllowAny])
def profile(request):
    user = request.data.get('user')
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("where is the profile")
