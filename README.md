# Strapi, Next.js & GraphQL food ordering app

This project is referred to [this article](https://strapi.io/blog/nextjs-react-hooks-strapi-food-app-1), with modification.

It is aimed to try Strapi, a headless JS CMS, and to learn this limitation.

## Frontend

1. `yarn`
2. `yarn dev`

Modification:

- used TypeScript instead of JavaScript
- used Bootstrap 5 (reactstrap v9) instead of Bootstrap 4
- used `@apollo/client` instead of `next-apollo`, `@apollo/react-hooks` & `@apollo/react-ssr` (`next-apollo` doesn't support Next.js 13 at this moment)
- used `@graphql-codegen` to generate type-safe graphql schema
- search function achieve by using `filters` provided by API, instead of fetching all results and filter in client
- authentication with GraphQL, instead of REST API

## Backend

1. `yarn`
2. `yarn develop`
3. Open `http://localhost:1337/admin`

Note:

- When developing with free cloud database, error "too many connections for role username" may be prompt when starting the server. Config `config/database.ts` pool setting to set max number of connection. e.g. ElephantSQL support 5 concurrent connections for free plan, and you may have to reserve 1 connection for developer tool. [Strapi Documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/databases.html#configuration-structure)
