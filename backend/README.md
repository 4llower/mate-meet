# Mate-Meet

The project follows the style described in [pep8](https://www.python.org/dev/peps/pep-0008/)

### Build

```bash
$ docker-compose up --build
```

After build service is available on [http://0.0.0.0:8000](http://0.0.0.0:8000)

Documentations available on [http://0.0.0.0:8000/api/docs/](http://0.0.0.0:8000/api/docs/)


### Authentication flow

Create base user:

```bash
$ docker-compose run backend python3 manage.py createsuperuser --email <EMAIL>
```

After you need to get `access` token for your base user:

```bash
$ curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "<EMAIL>", "password": "<PASSWORD>"}' \
  http://0.0.0.0:8922/api/auth/password/authentication/
```

You can use the returned `access` token to prove authentication 
for a protected view:

```bash
$ curl \
  -X POST \
  -H "Authorization: Bearer <ACCESS>" \
  -H "Content-Type: application/json" \
  -d '{"email": "...", "first_name": "...", "last_name": "...", "password": "..."}' \
  http://0.0.0.0:8922/api/users/
```

When this `access` token expires, you can use the `refresh` token 
to obtain another access token:

```bash
$ curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"refresh": "<REFRESH>"}' \
  http://0.0.0.0:8922/api/auth/token/refresh/
```

You can revoke tokens and `logout`:

```bash
$ curl --request POST \
  --url http://0.0.0.0:8922/api/auth/logout/ \
  --header 'authorization: Bearer <ACCESS>' \
  --header 'content-type: application/json' \
  --data '{
	"refresh": "<REFRESH>"
}'
```


### Translations

```bash
$ docker-compose run backend python3 manage.py makemessages -l ru
```


### Migrations

```bash
$ docker-compose run backend python3 manage.py makemigrations <APP_NAME>
```


### Tests

```bash
$ docker-compose run backend pytest tests --cov=apps --cov-report term-missing
```


### Linters

```bash
$ docker-compose run backend vulture apps
```


### Run wsgi-server

You can start the server with the following command:

```bash
$ gunicorn --workers <workers_count> --threads <threads_count> --worker-class gevent settings.wsgi
```

 - workers_count - A positive integer generally in the `$(COUNT_CPU_CORES) * 2-4` range
 - threads_count - A positive integer generally in the `$(COUNT_CPU_CORES) * 2-4` range

For additional settings you can see - [official documentation](https://docs.gunicorn.org/en/stable/settings.html)
