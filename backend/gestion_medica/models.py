from django.db import models
from django.contrib.auth.models import AbstractUser

# Modelo de Usuario (Médicos, Asistentes, Administradores)
class Usuario(AbstractUser):
    ROLES = (
        ('admin', 'Administrador'),
        ('medico', 'Médico'),
        ('asistente', 'Asistente'),
    )
    rol = models.CharField(max_length=50, choices=ROLES, default='medico')

# Modelo de Paciente
class Paciente(models.Model):
    nombre = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

# Modelo de Expediente Médico
class Expediente(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    sintomas = models.TextField()
    diagnostico = models.TextField()
    tratamiento = models.TextField()
    fecha_consulta = models.DateTimeField(auto_now_add=True)

# Modelo de Historial Clínico
class HistorialClinico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    presion_arterial = models.CharField(max_length=20, blank=True, null=True)
    notas = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

# Modelo de Citas Médicas
class Cita(models.Model):
    ESTADOS = (
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
    )
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fecha = models.DateTimeField()
    estado = models.CharField(max_length=50, choices=ESTADOS, default='pendiente')

# Modelo de Recetas Médicas
class Receta(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    medicamentos = models.TextField()
    indicaciones = models.TextField()
    fecha_emision = models.DateTimeField(auto_now_add=True)

# Modelo de Pagos y Suscripciones
class Pago(models.Model):
    METODOS_PAGO = (
        ('tarjeta', 'Tarjeta de Crédito/Débito'),
        ('paypal', 'PayPal'),
        ('transferencia', 'Transferencia Bancaria'),
    )
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago = models.CharField(max_length=50, choices=METODOS_PAGO)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    licencia_expira = models.DateTimeField()

# Modelo de Logs de Seguridad
class LogSeguridad(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    accion = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField()
