## Install dependencies

```bash
$ npm install
```

## Run Postgres in Docker

```bash
$ cd ./docker
$ docker-compose up -d
```

## Local development

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Production build

```bash
# build sources
$ npm run build

# run production mode
$ npm run start:prod
```