# Mate-Meet

The project follows the style described in [pep8](https://www.python.org/dev/peps/pep-0008/)

### [Backend] Build (folder ./backend)

```bash
$ docker-compose up --build
```

After build service is available on [http://0.0.0.0:8000](http://0.0.0.0:8000)

Documentations available on [http://0.0.0.0:8000/api/docs/](http://0.0.0.0:8000/api/docs/)


### [Backend] Migrations

```bash
$ docker-compose run backend python3 manage.py makemigrations
$ docker-compose run backend python3 manage.py migrate
```

### [Backend] Linters

```bash
$ docker-compose run backend vulture apps
```

### [Frontend] Install dependencies
```
yarn
```

### [Frontend] Build
```
yarn start
```
*Need installing Expo GO to run application in device, or using emulator with Expo API*
