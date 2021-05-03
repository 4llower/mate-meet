from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def _create_user(self, login, password, **kwargs):
        user = self.model(login=login, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, login, password, **kwargs):
        kwargs['is_superuser'] = False
        return self._create_user(login, password, **kwargs)

    def create_superuser(self, login, password, **kwargs):
        kwargs['is_superuser'] = True
        kwargs['is_staff'] = True
        kwargs['is_active'] = True
        return self._create_user(login, password, **kwargs)
