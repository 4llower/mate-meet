import pytest

from rest_framework import test
from rest_framework import status

from apps.address_references.views import AddressReferencesDestroyAPIView
from tests.factories.address_references import AddressReferenceFactory


@pytest.mark.django_db
class TestAddressReferences:
    @pytest.mark.parametrize('address', [AddressReferenceFactory.build(), ])
    def test__destroy_address_references_view_permission(self, address):
        view = AddressReferencesDestroyAPIView.as_view()
        request = test.APIRequestFactory().delete(
            path=f'users/current/address-destroy/{address.pk}/'
        )
        response = view(request)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
