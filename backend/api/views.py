from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Apartment
from .serializers import ApartmentSerializer

@api_view(['GET', 'POST'])
def apartment_list_create(request):
    if request.method == 'GET':
        apartments = Apartment.objects.all()
        
        city = request.query_params.get('city', '')
        min_rent = request.query_params.get('min_rent')
        max_rent = request.query_params.get('max_rent')
        bedrooms = request.query_params.get('bedrooms')
        sort_by = request.query_params.get('sort', '-posted_date')
        
        if city:
            apartments = apartments.filter(city__icontains=city)
        
        if min_rent:
            try:
                min_rent = float(min_rent)
                apartments = apartments.filter(rent__gte=min_rent)
            except (ValueError, TypeError):
                pass
            
        if max_rent:
            try:
                max_rent = float(max_rent)
                apartments = apartments.filter(rent__lte=max_rent)
            except (ValueError, TypeError):
                pass
        
        if bedrooms:
            try:
                bedrooms = int(bedrooms)
                apartments = apartments.filter(bedrooms=bedrooms)
            except (ValueError, TypeError):
                pass
        
        if sort_by in ['-posted_date', 'rent', '-rent', 'bedrooms', '-bedrooms']:
            apartments = apartments.order_by(sort_by)
        else:
            apartments = apartments.order_by('-posted_date')
            
        serializer = ApartmentSerializer(apartments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = ApartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def apartment_detail(request, pk):
    try:
        apartment = Apartment.objects.get(pk=pk)
    except Apartment.DoesNotExist:
        return Response({'error': 'Apartment not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ApartmentSerializer(apartment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = ApartmentSerializer(apartment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        apartment.delete()
        return Response({'message': 'Apartment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
