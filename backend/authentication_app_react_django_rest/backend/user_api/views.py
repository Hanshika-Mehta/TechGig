from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from .models import expenseItems , AppUser
import json
from django.forms.models import model_to_dict
USerModel = get_user_model()


class UserRegister(APIView):
    authentication_classes = (SessionAuthentication,)
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        user_obj = AppUser.objects.create_user(email=request.data['email'],password=request.data['password'])
        user_obj.username = request.data['username']
        user_obj.save()
        print(user_obj)
        data = model_to_dict(user_obj)
        if user_obj:
            return Response(data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
		


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			print(user.id)
			login(request, user)
			# print(type(serializer.data))
			data_dict={"data":serializer.data,"user_id":user.id,"username":user.username}
			return Response(data_dict, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
     
		serializer = UserSerializer(request.user)
		print(request.user)
		print(serializer.data)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
	


class UserItems(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	##
	def get(self, request,pk):
		user = USerModel.objects.get(id=pk)
		
		# print(user.budget)
		try:
			user_items = expenseItems.objects.get(id=pk)
		except:
			user_items = expenseItems.objects.all()
		data = model_to_dict(user)
		# print(data)
		return Response(data, status=status.HTTP_200_OK)


