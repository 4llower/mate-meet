import logging
import os
from datetime import timedelta
from django.core.exceptions import ImproperlyConfigured
from django.utils.translation import gettext_lazy as _


def get_env_variable(var_name, default=None):
    try:
        return os.environ[var_name] if default is None else os.environ.get(var_name, default)
    except KeyError:
        error_msg = 'Set the {} environment variable'.format(var_name)
        raise ImproperlyConfigured(error_msg)


def str_to_bool(value):
    return value.lower() in ("yes", "true", "t", "1")


HOST = os.environ['HOST']

DEBUG = bool(os.environ.get('DEBUG_DJANGO'))

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

ROOT_URLCONF = 'api.urls'

AUTH_USER_MODEL = 'apps.User'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ENABLE_PASSWORD_AUTH = bool(os.environ.get('ENABLE_PASSWORD_AUTH'))

ALLOWED_HOSTS = os.environ['DJANGO_ALLOWED_HOST']

# static
STATIC_DIR = 'static'
STATIC_URL = os.environ.get('STATIC_URL', f'/{STATIC_DIR}/')
STATIC_ROOT = os.path.join(BASE_DIR, STATIC_DIR)

# media
MEDIA_DIR = 'media'
MEDIA_URL = f'/{MEDIA_DIR}/'
MEDIA_ROOT = os.path.join(BASE_DIR, MEDIA_DIR)

DEFAULT_FILE_STORAGE = 'apps.files.storages.LocalMediaStorage'

TIME_ZONE = 'Europe/Minsk'
USE_TZ = True

LANGUAGE_CODE = 'ru'
USE_I18N = True
USE_L10N = True
LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locales'),
)
LANGUAGES = [
    ('ru', _('Russian')),
    ('en', _('English'))
]

CORS_ORIGIN_ALLOW_ALL = True

USE_SWAGGER = get_env_variable('USE_SWAGGER')

ORDER_MINIMUM_PRICE = 100


INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Project apps
    'apps',

    # Required apps
    'drf_yasg',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_extensions',
]

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': os.environ.get('POSTGRES_HOST'),
        'PORT': os.environ.get('POSTGRES_PORT')
    }
}
CONN_MAX_AGE = 60

TEMPLATES = (
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
)

REST_FRAMEWORK = {
    'DATE_FORMAT': '%Y-%m-%d',
    'TIME_FORMAT': '%H:%M:%S',
    'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%SZ',
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'apps.auth.authentication.JWTAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter'
    ],
    'PAGE_SIZE': 150
}

SHELL_PLUS_IMPORTS = [
    'from datetime import timedelta, datetime, date',
]

SIMPLE_JWT = {
    'USER_ID_FIELD': 'uuid',
    'ROTATE_REFRESH_TOKENS': True,
    'ACCESS_TOKEN_LIFETIME': timedelta(
        seconds=int(os.environ['ACCESS_TOKEN_LIFETIME'])
    ),
    'REFRESH_TOKEN_LIFETIME': timedelta(
        seconds=int(os.environ['REFRESH_TOKEN_LIFETIME'])
    )
}

SWAGGER_SETTINGS = {
    'USE_SWAGGER': str_to_bool(get_env_variable('USE_SWAGGER')),
    'USE_SESSION_AUTH': False,
    'SECURITY_DEFINITIONS': {
        'JWT': {
            'type': 'apiKey',
            'description': 'Paste "JWT token" to value input',
            'name': 'Authorization',
            'in': 'header'
        }
    },
}

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'}
]

if str_to_bool(os.environ.get('DEBUG_SQL')):
    LOGGING = {
        'version': 1,
        'filters': {
            'require_debug_true': {
                '()': 'django.utils.log.RequireDebugTrue',
            }
        },
        'handlers': {
            'console': {
                'level': 'DEBUG',
                'filters': (
                    'require_debug_true',
                ),
                'class': 'logging.StreamHandler',
            }
        },
        'loggers': {
            'django.db.backends': {
                'level': 'DEBUG',
                'handlers': (
                    'console',
                )
            }
        }
    }
