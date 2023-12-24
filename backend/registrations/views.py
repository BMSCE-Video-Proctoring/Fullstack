from django.contrib.auth import login, authenticate
from datetime import datetime, timedelta
from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.http import JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import jwt

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
            return JsonResponse({'message': 'Signup successful'}, status=201)
            # return JsonResponse({'message': 'Registration successful'}, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=400)
            # return JsonResponse({'errors': form.errors}, status=400)
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
                token = jwt.encode({'user': username, 'exp': datetime.utcnow() + timedelta(days=30)}, settings.SECRET_KEY, algorithm="HS256")
                return JsonResponse({'user': username, 'token': token}, status=200)
                # login(request, user)
                # # return redirect('signup')
                # return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        return JsonResponse({'error': 'Only POST request accepted for signin'}, status=400)
    # else:
    #     form = AuthenticationForm()
    # return render(request, 'registration/signin.html', {'form': form})

@csrf_exempt
def isloggedin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')

        try:
            valid = jwt.decode(token, settings.SECRET_KEY, algorithms="HS256")
            if valid:
                return JsonResponse({'success': True, 'data': 'admin'}, status=200)
        except jwt.ExpiredSignatureError:
            pass  # Token has expired
        except jwt.InvalidTokenError:
            pass  # Token is invalid

    return JsonResponse({'success': False}, status=403)

def hello(request):
    return JsonResponse({'message': 'Hello World'}, status=200)
