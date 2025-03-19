from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'body', 'category', 'time',]

    # def create(self, validate_data):
    #     user = self.context['request'].user
    #     return Todo.objects.create(user=user, **validate_data)
    
