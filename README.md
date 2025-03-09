<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
This project is called "Social Network YAM". I am building this project to make it open source. So that everyone can learn anything from this project. Including the little things.
For this project, I always follow the best practices that I have learned and have clean code.
I am building my base pattern for many projects. And I think it can help you guys to be able to apply this in the future.
In this project, we are using building micro service applications.
Techstack:
- Database
  PostgresQL
  MoongoDB
- Caching
  Redis
- Mail Services
  Nodemailer
- Docker
  Dockerfile
  Dockercompose
- Realtime
  Socket
- Microservices Messaging System
# Actually for this, i will using TCP first. After that, i will custom this for my base to use another message system
  - TCP
  - RabbitMQ
  - Kalfka
- Web3
  EVM Chain
  Indexing
- AWS
- CI/CD
- K8S


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# start services
$ yarn start:dev name_of_services

# example
# It just run this services auths
# Todo this you need to change env to local instead of current env
# Need to open another database before run this
$ yarn start:dev auths 
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

```bash
# Docker run
docker compose up

# Docker down
docker compose down -v #-v to remove all the volumn

```