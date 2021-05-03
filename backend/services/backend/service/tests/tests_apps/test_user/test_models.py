import pytest
from django.db.models.deletion import IntegrityError


@pytest.mark.django_db
class TestUserModel:
    def test_unique_email(self, user_factory):
        with pytest.raises(IntegrityError):
            assert user_factory.create_batch(2, email='duplicate@email.com')
