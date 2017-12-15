**React Redux ImmutableJS**

redux example from https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/


**To run the app**
1. Up and run mongodb
`
mongod --dbpath F:/STUFF/CRAP/mongodb/db
`
2. Start app:
`yarn install`      to install project dependencies
`yarn build`        in one terminal to watch your code changes (optional)
`yarn start-all`    in separate terminal to up and run service and UI

3. browser opens with App tab


**create or use database in console**
`
mongo
use gorodovoydb
`

**To upgrade all dependencies with flow types**
`
npm i -g npm-check-updates
npm-check-updates -u
yarn install
`

**To kill listening port (Windiows)**
`
netstat -a -o -n
taskkill /F /PID {task_id}
`


**Some notes**
remove user
`
db.users.remove({"_id": ObjectId("5a328992942d94221c3e7694")})
`
remove all users
`
db.users.remove({})
`
