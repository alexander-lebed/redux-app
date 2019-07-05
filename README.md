## Web Messenger

MERN (MongoDB, Express, React, Node.js)



### To run the app:

Install project dependencies:
```
yarn install
```

Build and run app in development mode + watch code changes:
```
yarn dev
```
<sup>Go to http://localhost:8082/</sup>

Run app in production mode:
```
yarn start
```

### Unit tests
Run:
```
yarn test
```
#### Redux test example:
```
src\redux\reducers\__tests__\authentication.test.js
```
#### Component test example:
```
src\components\People\__tests__\People.test.js
```

<br />

#### To upgrade all project dependencies:
```
npm i -g npm-check-updates
npm-check-updates -u
yarn install
```

#### To update flow types for project dependencies:
```
yarn global add flow-typed
yarn install
flow-typed install
```