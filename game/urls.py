from django.conf.urls import include, url
from . import views

app_name = 'game'
urlpatterns = [
    url(r"^getComputerMove/", views.getComputerMove, name="getComputerMove"),
    url(r"^$", views.homepage, name="homepage"),
]
