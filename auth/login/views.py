from django.shortcuts import render,redirect
from django.contrib.auth.models import User
#from django.contrib.signup.models import authent
#from login.models import auth
#from .models import authent
#from signup.models import authent
from django.contrib import auth
def signup(request):
    if request.method=='POST':
        name1=request.POST['name']
        passw=request.POST['password']
        
        # db=User.objects.create(username=name1)
        # db.save()
        x=auth.authenticate(username=name1,password=passw)
        
        if x is None:
            return redirect('login/')
        else:
            return redirect('/')
        #return redirect('/')
        
    else:    
      return render(request,'index(login).html')
# Create your views here.
