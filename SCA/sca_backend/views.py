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

        # Verify the token with Google's OAuth2 API and ensure it was issued for our client IDs
        # Expect CLIENT_IDS in environment (comma-separated) or fallback to single known ID
        client_ids_env = os.environ.get('GOOGLE_OAUTH_CLIENT_IDS')
        if client_ids_env:
            valid_audiences = [c.strip() for c in client_ids_env.split(',') if c.strip()]
        else:
            # fallback to a default (the one you provided)
            valid_audiences = ['685262148501-h55a5e9duhcik89glf3hch1ijkkgg052.apps.googleusercontent.com']

        idinfo = id_token.verify_oauth2_token(idtoken, google_requests.Request())
        aud = idinfo.get('aud') or idinfo.get('azp')
        if aud not in valid_audiences:
            return JsonResponse({'detail': 'Invalid token audience'}, status=400)

        # idinfo contains fields like 'sub', 'email', 'email_verified', 'name'
        email = idinfo.get('email')
        name = idinfo.get('name') or email.split('@')[0]

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
