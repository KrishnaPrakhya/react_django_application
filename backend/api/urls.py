from django.urls import path
from . import views 

urlpatterns = [
    path('apartments/', views.apartment_list_create, name='apartment-list-create'),
    path('apartments/<str:pk>/', views.apartment_detail, name='apartment-detail'),
]