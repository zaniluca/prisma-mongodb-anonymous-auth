# prisma-mongodb-anonymous-auth

> Anonymous authentication with Prisma, MongoDB, JWT and typescript

Anonymous login its an amazing way to identify your users even without the need to ask them to signup for an account. This is a pain for the user so by not forcing him to create an account your also helping to increase the userbase.

## How to run

Create a .env file in the root of the project and add the following lines:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.abksm.mongodb.net/yourDbName
JWT_ACCESS_SECRET=<your-secret-here>
JWT_REFRESH_SECRET=<your-secret-here>
```

We're using [mongodb atlas](https://cloud.mongodb.com) as our database provider because `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set`; which is duable in a local dev environment but its quite a pain so this is the easiest way to get started

Now simply run `yarn install` and `yarn start` to start the server

## Libraries:

The entire codebase is written in typescript and uses these libraries:

- [prisma](https://www.prisma.io/)
- [jsonwebtoken](https://jwt.io/)
- express
- [express-jwt](https://www.npmjs.com/package/express-jwt) (ready to use jwt middleware)

## Project Structure

```
├── prisma
│   ├── client.ts
│   └── schema.prisma
├── src
│   ├── constants.ts
│   ├── index.ts
│   ├── middlewares.ts
│   ├── routes
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── types.ts
│   └── utils.ts
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
└── yarn.lock
```
