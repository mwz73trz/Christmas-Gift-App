from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('gifts_app.urls')),
    path('login/', include('gifts_auth.urls')),
]
