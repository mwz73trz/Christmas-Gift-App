from django.db.models import query
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from gifts_app.serializers import PersonSerializer, GiftSerializer
from gifts_app.models import Person, Gift

class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class GiftViewSet(ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
