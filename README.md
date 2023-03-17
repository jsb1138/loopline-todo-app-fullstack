## To Do App - Fullstack Version

This version makes use of a Rest API built on a Go backend which employs an AWS Aurora PostgreSQL instance.

To run the app, clone the repo, install dependencies and then run the development server:

```bash
git clone https://github.com/jsb1138/loopline-todo-app.git
npm i
npm run dev
```

To run the tests, make sure the dev server is running and in a separate terminal enter:

```bash
npx cypress open
```

Choose "E2E Testing", choose Chrome as the test browser and select "Start E2E Testing in Chrome".

Finally, select "all-tests.cy.ts" from the E2E specs.
