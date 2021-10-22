from django.db import models
from django.contrib.auth.models import User

class Person(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="persons")

    def __str__(self):
        return f"{self.name}"

class Gift(models.Model):
    item = models.CharField(max_length=254)
    location = models.CharField(max_length=254)
    price = models.DecimalField(decimal_places=2, max_digits=6)
    purchased = models.BooleanField(default=False)
    name = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="gifts")

    def __str__(self):
        return f"{self.item}"
