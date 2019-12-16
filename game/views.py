from django.shortcuts import render
from django.http import JsonResponse
import random
from django.views.decorators.csrf import csrf_exempt
from . import owarePlayer
import json

# Create your views here.
def homepage(request):
    return render(request, 'game/homepage.html')

@csrf_exempt
def computerMove(request):
    if request.method == 'POST':
        gameState = [[],[]]
        for i in range(7):
            gameState[1] += [int(request.POST.get("0" + str(i)))]
        for i in range(7):
            gameState[0] += [int(request.POST.get("1" + str(i)))]
        compMove = owarePlayer.generateComputerMove(0, gameState, float('-inf'), float('inf'))
        return JsonResponse({"moveIndex":compMove})
    return render(request, 'game/homepage.html')


def submitHumanMove(request):
    return JsonResponse({"TODO":"Constuct human move"})
