## To Do App - Fullstack Version

This is a To Do App that was assigned to me as a take-home coding challenge for a company called Loopline Systems. It passed, but I ended up choosing to work with another commpany. There is another version of this app in my repos that is not full stack and uses Redux with local storage (as per the specs of the challenge).

This version makes use of a Rest API built on a Go backend which employs an AWS Aurora PostgreSQL instance and is hosted on EC2. The Go backend is in my repos.

To run the app, clone the repo, install dependencies and then run the development server:

```bash
git clone https://github.com/jsb1138/loopline-todo-app-fullstack.git
npm i
npm run dev
```

<!--
To run the tests, make sure the dev server is running and in a separate terminal enter:

```bash
npx cypress open
```

Choose "E2E Testing", choose Chrome as the test browser and select "Start E2E Testing in Chrome".

Finally, select "all-tests.cy.ts" from the E2E specs. -->
