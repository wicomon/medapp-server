<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

```bash
$ npm install
```

## SetUp DB

```bash
# run container
$ docker compose -f docker-compose.yml up

# push schemas (first time)
$ npx prisma db push
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start
```





<!-- ## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
