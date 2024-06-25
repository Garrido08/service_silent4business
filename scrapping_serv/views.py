from django.shortcuts import render
from django.http import HttpResponse
from scrapping_serv.models import noticias
import requests 
from bs4 import BeautifulSoup
from rest_framework.response import Response
from .serializers import NoticiaSerializer
from rest_framework.views import APIView
from django.db.models import Q

class Noticias_APIView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        news = noticias.objects.filter(activo=True).order_by('fecha_publicacion')
        serializer = NoticiaSerializer(news, many=True)
        
        return Response(serializer.data)

class NoticiasSearch_APIView(APIView):
    def get(self, request, format=None, *args, **kwargs):

        search = request.query_params.get('search')
    
        news = noticias.objects.filter(activo=True).filter(Q(titulo__icontains=search) | Q(fecha_publicacion__icontains=search)).order_by('fecha_publicacion')
        serializer = NoticiaSerializer(news, many=True)
        
        return Response(serializer.data)


class Noticias_WebView():
    def home(request):
        expensive_products = noticias.objects.filter(activo=True)
        return render(request, 'home.html')
    # Create your views here.
    def index(request):
        url = 'https://elpais.com/noticias/pirata-informatico/'
        #url = 'https://news.ycombinator.com/'
        response = requests.get(url, timeout=5)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
        
        
        list = soup.find('div', class_='b-b b-au_b')
        
        for article in list:

            this_title = article.find('header').find('h2').find('a')
            this_desc = article.find('p', class_='c_d')
            this_author = article.find('div', class_='c_a').find('a')
            this_date = article.find('div', class_='c_a').find('span', class_='c_a_t').find('time').find('a')
            print(f'Título: {this_title.text}')
            print(f'Desc: {this_desc.text}')
            print(f'Autor: {this_author.text}')
            print(f'Fecha: {this_date.text}')
            print('--------------------------')

            noticia_nueva = noticias(titulo=this_title.text,descripcion=this_desc.text,autor=this_author.text,fecha_publicacion=this_date.text,activo=True )
            #noticia_nueva.titulo=this_title
            #noticia_nueva.descripcion=this_desc
            #noticia_nueva.autor=this_author
            #noticia_nueva.fecha_publicacion=this_date
            #noticia_nueva.activo=True

            try:
                noticia_nueva.full_clean()  # Validate the model
                noticia_nueva.save()        # Save the model instance
            except ValueError as e:
                print(e)
        return HttpResponse(list)
