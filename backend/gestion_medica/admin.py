from django.contrib import admin
from .models import Usuario, Paciente, Expediente, HistorialClinico, Cita, Receta, Pago, LogSeguridad

admin.site.register(Usuario)
admin.site.register(Paciente)
admin.site.register(Expediente)
admin.site.register(HistorialClinico)
admin.site.register(Cita)
admin.site.register(Receta)
admin.site.register(Pago)
admin.site.register(LogSeguridad)
