from rest_framework import serializers
from .models import Usuario, Paciente, Expediente, HistorialClinico, Cita, Receta, Pago, LogSeguridad

# Serializer para Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'rol']

# Serializer para Paciente
class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

# Serializer para Expediente Médico
class ExpedienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expediente
        fields = '__all__'

# Serializer para Historial Clínico
class HistorialClinicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialClinico
        fields = '__all__'

# Serializer para Citas
class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'

# Serializer para Recetas
class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = '__all__'

# Serializer para Pagos
class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

# Serializer para Logs de Seguridad
class LogSeguridadSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogSeguridad
        fields = '__all__'
