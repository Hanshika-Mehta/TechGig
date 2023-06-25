from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import MinValueValidator

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	budget = models.IntegerField(verbose_name='budget',validators=[MinValueValidator(0)],null=True,blank=True)
	spent = models.IntegerField(verbose_name='spent',validators=[MinValueValidator(0)],null=True,blank=True)
	remaining = models.IntegerField(verbose_name='remaining',validators=[MinValueValidator(0)],null=True,blank=True)
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username


class expenseItems(models.Model):
	user_id = models.ForeignKey(AppUser,on_delete=models.CASCADE)
	# id = models.IntegerField(primary_key=True,auto_created=True)
	name = models.CharField(blank=False,null=False,max_length=200)
	cost = models.IntegerField(validators=[MinValueValidator(0)],null=False,blank=False)

	def __str__(self):
		return self.name