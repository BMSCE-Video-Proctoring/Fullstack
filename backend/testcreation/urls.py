from django.urls import path

from . import views

urlpatterns = [
    path('createTest/<str:test_name>/',views.ReactView.as_view(), name='getTest'),
    path('createTest/', views.ReactView.as_view(), name='postTest'),
]