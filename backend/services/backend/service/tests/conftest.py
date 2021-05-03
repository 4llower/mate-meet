from pytest_factoryboy import register

from tests.factories.user import UserFactory


# User app
register(UserFactory)
