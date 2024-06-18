# Unit, Integration and Mutation Testing Project


## Steps for this exercice

### 1. Execute and test the app

- a. Run the App:

First install runtime dependencies and development too:

npm install

npm run start

- b. See the results with Postman, access localhost:3000/courses with GET, and create a Course with POST, with something as:

{
    "title": "Workshop de Kubernetes",
    "description": "Cursos con practicas",
    "duration": "18"
}


### 2. Run the Unit Tests with coverage

- a. Run the tests:

npm run test

-b. See the Coverage:

npm run test:cov

See here:

courses-nest/coverage/lcov-report/src/index.hmtl

### 3. Execute Integration Tests

npm run test:e2e

### 4. Execute Mutation Tests

- a. Execute mutation tests:

npx stryker run

- b. Result of the Mutation:

courses-nest/reports/mutation/mutation.html

