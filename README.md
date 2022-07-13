# rasporedar - pomoćnik gospodara vremena

School schedule generator app

## Run project

```
$ docker-compose up --build
```

## Run project in development mode

```
$ (cd frontend && pnpm install)
$ (cd backend && pnpm install)
$ docker compose up --build
```

### Add a model

```
cd backend
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```

migrate model to TS ([primjer](./backend/src/models/user.ts))

remove line `'use strict';`

### Run migrations

make sure local server is running

```
cd backend
npx sequelize-cli db:migrate
```
