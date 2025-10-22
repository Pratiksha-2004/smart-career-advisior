from django.http import HttpResponse

def home(request):
    return HttpResponse("<h2>Welcome to SCA Backend!</h2><p>The API is running.</p>")


# --- Google auth endpoints (mirrors the other backend implementation) ---
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.authtoken.models import Token

import json

# google auth libs
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

User = get_user_model()


@csrf_exempt
def google_auth(request):
    if request.method != 'POST':
        return JsonResponse({'detail': 'Method not allowed'}, status=405)

    try:
        body = json.loads(request.body.decode('utf-8'))
        idtoken = body.get('id_token')
        if not idtoken:
            return JsonResponse({'detail': 'Missing id_token'}, status=400)

        client_ids_env = os.environ.get('GOOGLE_OAUTH_CLIENT_IDS')
        if client_ids_env:
            valid_audiences = [c.strip() for c in client_ids_env.split(',') if c.strip()]
        else:
            valid_audiences = ['685262148501-h55a5e9duhcik89glf3hch1ijkkgg052.apps.googleusercontent.com']

        idinfo = id_token.verify_oauth2_token(idtoken, google_requests.Request())
        aud = idinfo.get('aud') or idinfo.get('azp')
        if aud not in valid_audiences:
            return JsonResponse({'detail': 'Invalid token audience'}, status=400)

        email = idinfo.get('email')
        name = idinfo.get('name') or (email.split('@')[0] if email else '')

        if not email:
            return JsonResponse({'detail': 'Unable to retrieve email from token'}, status=400)

        user, _ = User.objects.get_or_create(username=email, defaults={'email': email, 'first_name': name})

        token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({'auth_token': token.key, 'email': email, 'name': name})

    except ValueError:
        return JsonResponse({'detail': 'Invalid token'}, status=400)
    except Exception as e:
        return JsonResponse({'detail': str(e)}, status=500)


# Provide a simple profile endpoint for the currently authenticated user
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Resume

import json


@api_view(['GET', 'POST', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_resume(request):
    """Retrieve or update the current user's resume."""
    user = request.user
    try:
        resume = Resume.objects.get(user=user)
    except Resume.DoesNotExist:
        resume = None

    if request.method == 'GET':
        if resume:
            return Response({'data': resume.data, 'updated_at': resume.updated_at})
        else:
            return Response({'data': {}, 'updated_at': None})

    # POST or PUT -> create/update
    try:
        payload = request.data if isinstance(request.data, dict) else json.loads(request.body.decode('utf-8'))
    except Exception:
        return Response({'detail': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)

    data_field = payload.get('data') if isinstance(payload, dict) else None
    if data_field is None:
        return Response({'detail': 'Missing data field'}, status=status.HTTP_400_BAD_REQUEST)

    if resume:
        resume.data = data_field
        resume.save()
    else:
        resume = Resume.objects.create(user=user, data=data_field)

    return Response({'data': resume.data, 'updated_at': resume.updated_at})


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    })
