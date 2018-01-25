## Web Messenger

MERN (MongoDB, Express, React, Node.js) + react-redux, react-router


###To run the app

**1. Up and run mongodb:**
```
mongod --dbpath F:/STUFF/CRAP/mongodb/db
```
**2. Start app:**
```
yarn install
```
to install project dependencies


```
yarn build
```
(optional) in one terminal to watch your code changes


```
yarn start-all`
```
in separate terminal to up and run service and UI

**3. browser opens with App tab**


#### Create or use database in console
```
mongo
use gorodovoydb
```

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

#### To kill listening port (Windiows)
```
netstat -a -o -n
taskkill /F /PID {task_id}
```


#### Some notes
Remove user
```
db.users.remove({"_id": ObjectId("5a328992942d94221c3e7694")})
```
Remove all users
```
db.users.remove({})
```
