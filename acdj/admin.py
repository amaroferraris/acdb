from django.contrib import admin

from .models import Sucursal, CarBrand, CarModel, CarAccessory

admin.site.register(Sucursal)
admin.site.register(CarBrand)
admin.site.register(CarModel)
admin.site.register(CarAccessory)