from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Apartment
from bson.decimal128 import Decimal128


class ApartmentSerializer(serializers.ModelSerializer):
    rent = serializers.SerializerMethodField()

    class Meta:
        model = Apartment
        fields = ['id', 'city', 'rent', 'bedrooms', 'description', 'posted_date']
        read_only_fields = ['id', 'posted_date']

    def get_rent(self, obj):
        if isinstance(obj.rent, Decimal128):
            return float(str(obj.rent))
        return float(obj.rent) if obj.rent is not None else None

    def to_internal_value(self, data):
        if 'rent' in data:
            try:
                data = data.copy()
                data['rent'] = float(data['rent'])
            except (TypeError, ValueError):
                raise serializers.ValidationError({'rent': 'Must be a valid number'})
        return super().to_internal_value(data)