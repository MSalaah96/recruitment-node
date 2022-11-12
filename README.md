# Agreena Task

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository implementing a Carbon Certifcate Application.

## How to use

1. git clone the repo
2. Install mkcert, docker and docker-compose in your machine
3. `cd` into the root directory and run the installer script `./install.sh` (Support Unix based OS only)
4. Now you can reach the api by access nginx gateway through `https://carbon.local.com/` (PORT 80)
5. Configurations can be found in `.env.local` (root directory)

## How to seed the data

1. After `./install.sh` and the containers are up
2. npm install && npm run seed

## Features

1. Full development environment out of the box using `docker` and `docker-compose`
2. Full code coverage unit testing for the main parts
3. Rate limiter using `@nestjs/throttler`
4. Local git hooks for `linting` and `testing` using `yorkie` and `lint-staged`
5. Git actions workflow for PR reviews (`linting` and `testing`)
6. Some `SOLID` principles
7. Logging all requests and responses

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
