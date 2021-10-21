from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonViewSet, GiftViewSet

router = DefaultRouter()
router.register("persons", PersonViewSet, basename="person")
router.register("gifts", GiftViewSet, basename="gift")

urlpatterns = [
    path('', include(router.urls)),
]