from rest_framework.serializers import ModelSerializer
from gifts_app.models import Person, Gift

class PersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'gifts']
        depth = 1

class GiftSerializer(ModelSerializer):
    class Meta:
        model = Gift
        fields = '__all__'