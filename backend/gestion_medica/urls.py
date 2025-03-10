from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.http import HttpResponseRedirect

from .views import UsuarioViewSet, PacienteViewSet, ExpedienteViewSet, HistorialClinicoViewSet, CitaViewSet, RecetaViewSet, PagoViewSet, LogSeguridadViewSet

# Crear un router para la API
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'pacientes', PacienteViewSet)
router.register(r'expedientes', ExpedienteViewSet)
router.register(r'historial-clinico', HistorialClinicoViewSet)
router.register(r'citas', CitaViewSet)
router.register(r'recetas', RecetaViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'logs-seguridad', LogSeguridadViewSet)

urlpatterns = [
    path('', lambda request: HttpResponseRedirect('/admin/')),  # 🔹 Redirigir la URL raíz al admin
    path('admin/', admin.site.urls),  # Panel de administración de Django
    path('api/', include(router.urls)),  # Endpoints de la API REST
]
