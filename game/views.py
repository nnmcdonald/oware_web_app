from django.shortcuts import render
from django.http import JsonResponse
import random

# Create your views here.
def homepage(request):
    return render(request, 'game/homepage.html')

def getComputerMove(request):
    randomNum = random.random()
    return JsonResponse({"randomNum":randomNum})
