from rest_framework.serializers import ModelSerializer, StringRelatedField
from gifts_app.models import Person, Gift

class PersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'user', 'gifts']
        depth = 1

    user = StringRelatedField()

class GiftSerializer(ModelSerializer):
    class Meta:
        model = Gift
        fields = '__all__'