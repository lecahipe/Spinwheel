from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.wheel.serializers import UserSpinSerializer


from django.http import Http404
from django.shortcuts import render


def spin(request):

    return render(request, "wheel/spin.html", {"poll": "p"})

@csrf_exempt
@api_view(['POST'])
def spinuser_create(request):
    """
    Create a new Spin from User.
    """
    if request.method == 'POST':
        serializer = UserSpinSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print({"message": "Got some data!", "data": request.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Hello, world!"})
