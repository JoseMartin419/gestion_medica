from rest_framework import viewsets
from .models import Usuario, Paciente, Expediente, HistorialClinico, Cita, Receta, Pago, LogSeguridad
from .serializers import UsuarioSerializer, PacienteSerializer, ExpedienteSerializer, HistorialClinicoSerializer, CitaSerializer, RecetaSerializer, PagoSerializer, LogSeguridadSerializer

# ViewSet para Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

# ViewSet para Paciente
class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

# ViewSet para Expediente Médico
class ExpedienteViewSet(viewsets.ModelViewSet):
    queryset = Expediente.objects.all()
    serializer_class = ExpedienteSerializer

# ViewSet para Historial Clínico
class HistorialClinicoViewSet(viewsets.ModelViewSet):
    queryset = HistorialClinico.objects.all()
    serializer_class = HistorialClinicoSerializer

# ViewSet para Citas
class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer

# ViewSet para Recetas
class RecetaViewSet(viewsets.ModelViewSet):
    queryset = Receta.objects.all()
    serializer_class = RecetaSerializer

# ViewSet para Pagos
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

# ViewSet para Logs de Seguridad
class LogSeguridadViewSet(viewsets.ModelViewSet):
    queryset = LogSeguridad.objects.all()
    serializer_class = LogSeguridadSerializer
