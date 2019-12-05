## Web Messenger

MERN (MongoDB, Express, React, Node.js)

##TODO:
* PWA
* GitHub Pages

Install dependencies:
```
yarn install
```
Run (dev mode):
```
yarn dev
```
<sup>Then go to http://localhost:8082/</sup>

Run (prod mode):
```
yarn start
```
#### Tests
```
yarn test
```

Redux unit test example:
*src\redux\reducers\__tests__\authentication.test.js*

Component unit test example:
*src\components\People\__tests__\People.test.js*

App integration test example:
*src\__tests__\App.spec.js*

#### Notes
To upgrade all project dependencies:
```
npm i -g npm-check-updates
npm-check-updates -u
yarn install
```

To update flow types for project dependencies:
```
yarn global add flow-typed
yarn install
flow-typed install
```