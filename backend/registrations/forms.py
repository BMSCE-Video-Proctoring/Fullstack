from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import RegisteredUsers

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, required=True, help_text='Required. Enter a valid email address.')

    class Meta:
        model = RegisteredUsers
        fields = ('username', 'name', 'email', 'password1', 'password2')
