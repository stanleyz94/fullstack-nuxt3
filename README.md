### Setup

In your terminal

    - yarn install                  (install project dependencies locally.)
    - cp .env-test .env             (copies .env-test file to a new local .env file.)
    - docker compose up             (set up database)
    - yarn prisma migrate dev       (updates prisma db and syncs data.)
    - yarn dev                      (starts the project development server.)


### Populate database (optional)
You can optionally populate database with some data (fake users, questions, answers), just type in your terminal

    - yarn prisma db seed




# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
