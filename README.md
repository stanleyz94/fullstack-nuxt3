# Simple CRUD Fullstack application with Nuxt3


## About


The idea of this project was to build simple CRUD Fullstack application with Nuxt3 which shows shows a list of questions with answers.

The application includes basic CRUD operations which creates, reads, updates and also deletes questions/answers.
Registered users can only have access to perform the above operations, so the application also includes basic authorization and authentication.

To implement page of questions, application use cursor pagination which returns a pointer to a specific item in the dataset. Cursor is encrypted to indicate that pointer supposed to be opaque and details of their implementation unavailable to a user.

Application also includes some Stripe subscriptions to charge a registered user for access to some special resources (which are not available but the basic subscription system itself exists).


### Project stack

- Nuxt 3.0.0-rc.10
- Typescript ^4.8.4
- Tailwind
- PostgreSQL
- Prisma
- Zod


## Project Setup

In your terminal

    - yarn install                  (install project dependencies locally.)
    - cp .env-test .env             (copies .env-test file to a new local .env file.)
    - docker compose up             (set up database)
    - yarn prisma migrate dev       (updates prisma db and syncs data.)
    - yarn dev                      (starts the project development server.)


### Populate database (optional)
You can optionally populate database with some data (fake users, questions, answers), just type in your terminal

    - yarn prisma db seed




