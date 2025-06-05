from django.contrib.auth.models import User
from rest_framework import serializers
from .models import  Apartment


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['id', 'city', 'rent', 'bedrooms', 'description', 'posted_date']
        read_only_fields = ['id', 'posted_date']