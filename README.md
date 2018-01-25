## Web Messenger

MERN (MongoDB, Express, React, Node.js) + react-redux, react-router



### To run the app:

**1. Up and run mongodb**
```
mongod --dbpath F:/STUFF/CRAP/mongodb/db
```
**2. Start app**

install project dependencies:
```
yarn install
```

(optional, in separate terminal)  watch your code changes"
```
yarn build
```

(in separate terminal) up and run server and UI:
```
yarn start-all`
```

**3. browser opens new tab with the App**




#### Create or use database in console:
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

#### To kill listening port (Windiows):
```
netstat -a -o -n
taskkill /F /PID {task_id}
```


#### Some notes
remove user:
```
db.users.remove({"_id": ObjectId("5a328992942d94221c3e7694")})
```
remove all users:
```
db.users.remove({})
```
