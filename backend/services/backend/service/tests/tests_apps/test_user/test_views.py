import pytest

from rest_framework import test
from rest_framework import status

from apps.user.views import UserRegisterAPIView
from tests.factories.user import UserFactory


@pytest.mark.django_db
class TestUserRegister:
    def test__make_not_auth_request(self):
        view = UserRegisterAPIView.as_view()
        request = test.APIRequestFactory().post('users')
        response = view(request)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    @pytest.mark.parametrize('user', [UserFactory.build(),])
    def test__register_view(self, user):
        view = UserRegisterAPIView.as_view()
        request = test.APIRequestFactory().post(
            path='users',
            format='json',
            data={
                'email': user.email
            }
        )
        test.force_authenticate(request, user=user)
        response = view(request)
        assert response.status_code == status.HTTP_201_CREATED
