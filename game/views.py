from django.shortcuts import render
from django.http import JsonResponse
import random
from . import owarePlayer

# Create your views here.
def homepage(request):
    return render(request, 'game/homepage.html')

def computerMove(request):
    randomNum = random.random()
    return JsonResponse({"randomNum":randomNum})

def submitHumanMove(request):
    return JsonResponse({"TODO":"Constuct human move"})
