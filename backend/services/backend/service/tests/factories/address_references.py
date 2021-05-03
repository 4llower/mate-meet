import factory

from apps.address_references.models import AddressReference
from tests.factories.base import BaseModelFactory


class AddressReferenceFactory(BaseModelFactory):
    city = factory.Faker('city')
    address = factory.Faker('address')

    class Meta:
        model = AddressReference
