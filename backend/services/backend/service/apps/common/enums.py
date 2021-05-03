import enum
from dataclasses import dataclass


class BaseEnum(enum.Enum):
    """
    Base enum class.

    Sample of usage:
        class Enum(BaseEnum):
            NEW = 0
            APPROVED = 1
            DECLINED = 2
    """

    @classmethod
    def get_values(cls):
        return [var.value for var in cls]

    @classmethod
    def get_choices(cls):
        return [(var.value, var.name) for var in cls]


@dataclass
class SystemMessage:
    title: str
    detail: str

@dataclass
class SystemMessageError:
    code: str
    message: str


class SystemMessageEnum(BaseEnum):
    M0001 = SystemMessage(
        title='New password should be different',
        detail='New password should be different from the old password',
    )
    M0003 = SystemMessage(
        title='Your login info is incorrect.',
        detail='Your login info is incorrect. Please check and try again.',
    )
    M0005 = SystemMessageError(
        code='auth_failed',
        message='The Login or Password is incorrect'
    )
    M0007 = SystemMessageError(
        code='inactive',
        message='Account is not active'
    )
