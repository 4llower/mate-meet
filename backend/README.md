# Mate-Meet

The project follows the style described in [pep8](https://www.python.org/dev/peps/pep-0008/)

### Build

```bash
$ docker-compose up --build
```

After build service is available on [http://0.0.0.0:8000](http://0.0.0.0:8000)

Documentations available on [http://0.0.0.0:8000/api/docs/](http://0.0.0.0:8000/api/docs/)


### Migrations

```bash
$ docker-compose run backend python3 manage.py makemigrations
$ docker-compose run backend python3 manage.py migrate
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
