from django.urls import path

from . import views

urlpatterns = [
    path('createTest/',views.ReactView.as_view(), name='createTest'),
]