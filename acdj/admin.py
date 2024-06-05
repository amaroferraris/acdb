from django.contrib import admin

from .models import Sucursal, CarBrand, CarModel, CarAccessory, Payment

admin.site.register(Sucursal)
admin.site.register(CarBrand)
admin.site.register(CarModel)
admin.site.register(Payment)
admin.site.register(CarAccessory)