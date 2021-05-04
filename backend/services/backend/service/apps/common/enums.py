import enum
from dataclasses import dataclass


class BaseConsts:
    @classmethod
    def _class_variables(cls):
        return list(
            var for var in vars(cls).keys() if not var.startswith('__')
        )

    @classmethod
    def all(cls):
        return [getattr(cls, var) for var in cls._class_variables()]

    @classmethod
    def consts(cls):
        return cls._class_variables()

    @classmethod
    def choices(cls):
        return [
            (getattr(cls, var), getattr(cls, var))
            for var in cls._class_variables()
        ]


@dataclass
class SystemMessage:
    title: str
    detail: str

@dataclass
class SystemMessageError:
    code: str
    message: str


class SystemMessageEnum(BaseConsts):
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
