import requests
from django.shortcuts import render

API_URL = "http://10.0.0.5:8000/api/data/"

def home(request):

    data = None
    error = None

    try:
        response = requests.get(API_URL, timeout=5)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        error = str(e)

    return render(request, "home.html", {
        "data": data,
        "error": error
    })