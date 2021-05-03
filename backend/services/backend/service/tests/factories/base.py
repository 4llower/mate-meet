import factory


class BaseModelFactory(factory.django.DjangoModelFactory):
    uuid = factory.Faker('uuid4')
    created_at = factory.Faker('past_date', start_date='-2d')
    updated_at = factory.Faker('past_date', start_date='-1d')
