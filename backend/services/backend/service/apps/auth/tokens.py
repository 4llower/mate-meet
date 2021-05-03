from rest_framework_simplejwt import tokens


class AccessToken(tokens.BlacklistMixin, tokens.AccessToken):
    """
    Package 'rest_framework_simplejwt' does not contain
    blacklist functionality for the access token by default
    """
    pass
