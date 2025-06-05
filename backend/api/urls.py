from django.urls import path
from . import views 

urlpatterns = [
    path('items/', views.item_list_create, name='item-list-create'),
    path('items/<str:pk>/', views.item_detail_update_delete, name='item-detail'),
]