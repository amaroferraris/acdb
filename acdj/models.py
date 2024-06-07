from django.db import models

# Create your models here.
class Sucursal(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class CarBrand(models.Model):
    name = models.CharField(max_length=100)
    paymentData = models.TextField(max_length=250, null=True)

    def __str__(self):
        return self.name

class CarModel(models.Model):
    brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.brand.name} {self.model_name}"

class CarAccessory(models.Model):
    model = models.ForeignKey(CarModel, on_delete=models.CASCADE)
    code = models.CharField(max_length=100, null=True)
    name = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return f"{self.code} - {self.name} - {self.model}"

class Payment(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name}"
    