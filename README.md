# Acebook - Team Fire

A social media site based on Facebook, built during our second engineering project at the [Makers Academy](https://github.com/makersacademy) coding bootcamp. A significant part of the challenge was to familiarise ourselves with a pre-existing codebase (being introduced to React and MongoDB for the first time) and to improve and extend it.

## Pre-existing features

It was already possible for a user to:

- Sign up
- Sign in and out
- View a list of posts

## Features added

Team Fire built the following capabilities:

- (put features added here)

## Code design diagrams

The team used Excalidraw to map out the pre-existing code base as a learning and development tool.
[Diagram of the backend api](./images/backend-diagram.png)
[Diagram of the frontend ](./images/frontend-diagram.png)

## Technologies used

- [MongoDB](https://www.mongodb.com/) _NoSQL_ database to store user and posts data
- [Express](https://expressjs.com/) to manage the HTTP requests to the backend
- [React](https://reactjs.org/) used to build a dynamic front end
- [Node](https://nodejs.org/en/) allows Javascript to run outside the browser
- [Jest](https://jestjs.io/) for unit testing on the back end
- [Cypress](https://www.cypress.io/) for end-to-end testing and component testing, on the front end
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB
- [Handlebars](https://handlebarsjs.com/) for the `home` template
- [ESLint](https://eslint.org) for linting
- [Nodemon](https://nodemon.io/) to reload the server automatically

### How to run the project

Start the server

```
; cd api
; npm install
; JWT_SECRET=SUPER_SECRET npm run start
```

    Then start the front end in a new terminal session

```
; cd frontend
; npm install
; JWT_SECRET=SUPER_SECRET npm start
```

### How to run the tests

#### The Backend (API)

Start the server in test mode (so that it connects to the test DB)

```
; cd api
; npm install
; JWT_SECRET=SUPER_SECRET npm run start:test
```

Then run the tests in a new terminal session and also download npm library

```
; cd api
; JWT_SECRET=SUPER_SECRET npm run test
```

#### The frontend (React)

Start the server in test mode (so that it connects to the test DB)

```
; cd api
; JWT_SECRET=SUPER_SECRET npm run start:test
```

Then start the front end in a new terminal session

```
; cd frontend
; npm install
; JWT_SECRET=SUPER_SECRET npm start
```

Then run the tests in a new terminal session

```
; cd frontend
; JWT_SECRET=SUPER_SECRET npm run test
```

### Useful links

#### Trello board

https://trello.com/b/TSRa0ShI/ep2

#### Cypress

https://docs.cypress.io/api/cypress-api/custom-commands

#### Mongodb

https://www.w3schools.com/mongodb/index.php

Useful information on Mongodb such as find(), update() etc.

#### Expressjs

https://expressjs.com

#### MERN

https://www.youtube.com/watch?v=I7EDAR2GRVo

Good tutorial link

#### Mongoose

https://mongoosejs.com/docs/index.html
