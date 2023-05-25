# swppfall2022-team15

## NotiManager

---

[![Backend test](https://github.com/swsnu/swppfall2022-team15/actions/workflows/backend.yml/badge.svg)](https://github.com/swsnu/swppfall2022-team15/actions/workflows/backend.yml)
[![Frontend test](https://github.com/swsnu/swppfall2022-team15/actions/workflows/frontend.yml/badge.svg)](https://github.com/swsnu/swppfall2022-team15/actions/workflows/frontend.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swppfall2022-team15&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swppfall2022-team15)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swppfall2022-team15/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/swsnu/swppfall2022-team15?branch=main)

### How to run backend

```shell
cd backend
pip install pipenv

pipenv install
pipenv shell

(python manage.py migrate)
python manage.py runserver 127.0.0.1:8000
```

### How to run frontend

```shell
cd frontend
yarn install
yarn start
```
