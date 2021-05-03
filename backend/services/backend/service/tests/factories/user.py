import factory

from apps.user import models as user_models


class UserFactory(factory.django.DjangoModelFactory):
    uuid = factory.Faker('uuid4')
    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall(
        'set_password', 'defaultpassword'
    )
    is_active = True
    is_superuser = False

    class Meta:
        model = user_models.User

    @factory.post_generation
    def groups(self, create, extracted):
        if not create:
            return

        if extracted:
            for role in extracted:
                self.groups.add(role)
