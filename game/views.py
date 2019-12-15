from django.shortcuts import render
from django.http import JsonResponse
import random
from . import owarePlayer

# Create your views here.
def homepage(request):
    return render(request, 'game/homepage.html')

def computerMove(request):
    gameboard = [[3 for i in range(6)],[3 for i in range(6)]]
    randomNum = random.random()
    return JsonResponse({"randomNum":randomNum})

def submitHumanMove(request):
    return JsonResponse({"TODO":"Constuct human move"})
