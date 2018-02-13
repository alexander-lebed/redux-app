## Web Messenger

MERN (MongoDB, Express, React, Node.js) + react-redux, react-router



### To run the app:

Install project dependencies:
```
yarn install
```

Build and watch code changes:
```
yarn build
```

Up and run backend and frontend:
```
yarn start
```

Go to http://localhost:8082/




#### Create or use database in console:
```
mongo
use gorodovoydb
```

#### Up and run local mongodb
```
mongod --dbpath F:/STUFF/CRAP/mongodb/db
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
mongo
db.users.remove({"_id": ObjectId("5a328992942d94221c3e7694")})
```
remove all users:
```
mongo
db.users.remove({})
```
