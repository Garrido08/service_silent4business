from rest_framework import serializers
from .models import noticias

class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = noticias
        fields = '__all__'