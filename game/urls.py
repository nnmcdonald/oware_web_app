from django.conf.urls import include, url
from . import views

app_name = 'game'
urlpatterns = [
    url(r"^computerMove/", views.computerMove, name="computerMove"),
    #url(r"^humanMove/", views.humanMove, name="humanMove"),
    url(r"^$", views.homepage, name="homepage"),
]
