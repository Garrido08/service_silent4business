from django.urls import path
from .views import Noticias_APIView, NoticiasSearch_APIView

urlpatterns = [
    path('get-news/', Noticias_APIView.as_view()),
    path('search-news/', NoticiasSearch_APIView.as_view())
]