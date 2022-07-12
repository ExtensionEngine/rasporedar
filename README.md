# rasporedar - pomoćnik gospodara vremena

School timetable generator web application. It can create the best timetables based on user's preferences (inputs and constraints).

## Run project

```sh
$ docker compose up
```

## Run project in development mode

```sh
$ yarn && (cd backend && yarn) && (cd frontend && yarn) # install node packages on host machine for eslint, husky...
$ docker compose up
```

## Migrations

For more information see the [Sequelize migrations](https://sequelize.org/docs/v6/other-topics/migrations/) docs.
### Add a model (and migration)

```sh
cd backend
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```

This will:

  - Create a model file user in models folder
  - Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder.

Migrate model to TS ([example](./backend/src/models/user.ts)) and remove line `'use strict';`

### Run migrations
First of all, make sure your local server is up and running.
Now to create the table in the database run:

```
$ cd backend
$ npx sequelize-cli db:migrate
```

### Run schedule generator from cli

```
$ ./backend/src/algo/cli.ts
```

### Undoing migrations

If you want to revert to old state by just running a command use:
```sh
cd backend
npx sequelize-cli db:migrate:undo
```

If you want to revert back to initial state by undoing all migrations use:
```sh
cd backend
npx sequelize-cli db:migrate:undo:all
```

If you want to revert back to specific migration you can pass migration name with the `--to` option:
```sh
cd backend
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-user.js
```

## Seed

To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.

### Creating seed

To create a seed file run:
```sh
cd backend
npx sequelize-cli seed:generate --name demo-user
```

This will:

  - Create a seed file in seeders folder. File name will look something like XXXXXXXXXXXXXX-demo-user.js

Now you can edit that seed file to insert some data into prefered table, in this example it would be `User` table.

### Run seeds

To commit a seed file or files to the database run:
```sh
cd backend
npx sequelize-cli db:seed:all
```

### Undoing seeds

Seeders can be undone if they are using any storage. There are three possible commands for that:
  1. If you want to undo the most recent seed use:
  
      `npx sequelize-cli db:seed:undo`

  2. If you want to undo a specific seed:
    
      `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`

  3. If you want to undo all seeds use coomand:
  
      `npx sequelize-cli db:seed:undo:all`
