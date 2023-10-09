from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.http import JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(json.loads(request.body))
        print(form)
        if form.is_valid():
            user = form.save()
            print('a')
            # login(request, user)
            # return redirect('signin')
            return JsonResponse({'message': 'Registration successful'}, status=200)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        return JsonResponse({'error': 'Only POST request accepted for signup'}, status=400)
    # else:
    #     form = SignUpForm()
    # return render(request, 'registration/signup.html', {'form': form})

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=json.loads(request.body))
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # return redirect('signup')
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        return JsonResponse({'error': 'Only POST request accepted for signin'}, status=400)
    # else:
    #     form = AuthenticationForm()
    # return render(request, 'registration/signin.html', {'form': form})
