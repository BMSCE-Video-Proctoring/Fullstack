from django.shortcuts import render,redirect
from django.contrib.auth.models import User
#from django.contrib import auth
#from login.models import auth
# Create your views here.
from .models import authent
def signup(request):
    if request.method=='POST':
        name1=request.POST['name']
        passw=request.POST['password']
        email=request.POST['email']
        print(email)
        #x=auth.authenticate(username=name1)
        # if x is None:
        #     return redirect('/')
        # else:
        #     return redirect('signup')
        db=User.objects.create_user(username=name1,password=passw,email=email)
        db.save()
        return redirect('/')


    else:

        return render(request,'index(signup).html')