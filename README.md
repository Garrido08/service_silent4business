# Título del Proyecto

Scrapping/REST Service para mostrar noticias **Django** (Prueba tecnica)

## Comenzando 🚀

_Estas instrucciones te permitirán realizar la instalación de librerias y el proceso de isntalacion del proyecto para correrlo en tu respectiva maquina ._


### Pre-requisitos 📋

## Versión python
_3.12_

## Librerias de python
* psycopg2
* requests
* Django
* djangorestframework
* beautifulsoup4
* uvircorn


### Instalación 🔧

## Paso 1. Descargar repositorio

```
git clone … (Ya sea por https o ssh)
```

## Paso 2. Configurar Variables de entorno (settings.py)
_Viene integrado un archivo settings.py.example con la estructura necesaria para configurar credenciales, para posteriormente, crear un archivo principal, esto se hace para no enviar las credenciales de cada usuario (Base de datos, servers, etc)_
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'silent4business',
        'USER':,
        'PASSWORD':,
        'HOST':,  # Si PostgreSQL está en el mismo servidor
        'PORT': '5432',       # Puerto por defecto de PostgreSQL
    }
}
```

## Paso 3. Crear base de datos en postgreSQL
_Dar de alta el proyecto en tu gestor de postgres bajo el nombre de ‘silent4business’_

## Paso 4. Crear las migraciones del modelo noticias en la app
```
python manage.py makemigrations
```

## Paso 5. Ejecutar tablas en la base de datos
```
python manage.py migrate
```

## Paso 6. Levantar proyecto django
```
python manage.py runserver
```
## Paso 6. Ejecutar el scrapping para obtener la información de la página
_Para ejecutar el proceso, a través del navegador se accederá a través de la liga **http://127.0.0.1:8000/scrapping** para ejecutar el proceso y guardar la información en la BD_

## Paso 7. Visualizar información a nivel front-end
_Para visualizar la información que se cargo, se accede a través de la liga **http://127.0.0.1:8000**, la cual mostrara las noticias en formato tabla, ordenadas de manera ascendente por fecha, la cual tiene un input de búsqueda que realizara las coincidencias de registros por el título o la fecha de creación, estos se consumen a través de una arquitectura REST con los siguientes 2 elementos:
**http://127.0.0.1:8000/api/get-news** obtiene todos las noticias
**http://127.0.0.1:8000/api/search-news/?search=Algo** obtiene las coincidencias por titulo y fecha de creación_