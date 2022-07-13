# rasporedar - pomoćnik gospodara vremena

School schedule generator app

## Run project

```sh
$ docker-compose up
```

## Run project in development mode

```sh
$ yarn && (cd backend && yarn) && (cd frontend && yarn) # install node packages on host machine for eslint, husky...
$ docker-compose up
```

### Add a model

```sh
cd backend
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```

migrate model to TS ([primjer](./backend/src/models/user.ts))

remove line `'use strict';`

### Run migrations

make sure local server is running

```sh
cd backend
npx sequelize-cli db:migrate
```
