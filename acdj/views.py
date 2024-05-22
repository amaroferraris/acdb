from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from django.template import loader

from .models import Sucursal, CarBrand, CarModel, CarAccessory
# Create your views here.

def index(request):
    context = {
        'sucursales':list(Sucursal.objects.values()),
        'carbrands':list(CarBrand.objects.values()),
        'carmodels':list(CarModel.objects.values()),
        'caraccessories':list(CarAccessory.objects.values()),
    }
    
    return render(request, "acdj/index.html", context)

