from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import  Apartment
from .serializers import  ApartmentSerializer

@api_view(['GET', 'POST'])
def apartment_list_create(request):
    if request.method == 'GET':
        city = request.GET.get('city', '')
        min_rent = request.GET.get('min_rent')
        max_rent = request.GET.get('max_rent')
        bedrooms = request.GET.get('bedrooms')
        sort = request.GET.get('sort', '-posted_date')

        apartments = Apartment.objects.all()

        if city:
            apartments = apartments.filter(city__icontains=city)
        if min_rent:
            apartments = apartments.filter(rent__gte=min_rent)
        if max_rent:
            apartments = apartments.filter(rent__lte=max_rent)
        if bedrooms:
            apartments = apartments.filter(bedrooms=bedrooms)

        if sort:
            apartments = apartments.order_by(sort)

        serializer = ApartmentSerializer(apartments, many=True)
        return Response(serializer.data)

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
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ApartmentSerializer(apartment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        apartment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def apartment_list_create(request):
    if request.method == 'GET':
        apartments = Apartment.objects.all()
        
        city = request.query_params.get('city', None)
        if city:
            apartments = apartments.filter(city__icontains=city)
            
        min_rent = request.query_params.get('min_rent', None)
        max_rent = request.query_params.get('max_rent', None)
        if min_rent:
            apartments = apartments.filter(rent__gte=min_rent)
        if max_rent:
            apartments = apartments.filter(rent__lte=max_rent)
            
        bedrooms = request.query_params.get('bedrooms', None)
        if bedrooms:
            apartments = apartments.filter(bedrooms=bedrooms)
            
        sort_by = request.query_params.get('sort', '-posted_date')
        if sort_by not in ['-posted_date', 'rent', '-rent', 'bedrooms', '-bedrooms']:
            sort_by = '-posted_date'
        apartments = apartments.order_by(sort_by)

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
