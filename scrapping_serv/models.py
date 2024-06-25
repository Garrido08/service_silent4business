from django.db import models

# Create your models here.
class noticias(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=500)
    descripcion = models.TextField()
    autor = models.CharField(max_length=500)
    fecha_publicacion = models.CharField(max_length=500)
    activo = models.BooleanField()

    def __str__(self):
	    return self.titulo