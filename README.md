# redux-app
React Redux ImmutableJS

redux example from https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/

# To run the app:
1. 'yarn build' in one terminal
2. 'start-all' in separate terminal
3. http://localhost:9999/

# Up and run mongodb
mongod --dbpath F:/STUFF/CRAP/mongodb/db

# create database (if there is no any)
mongo
use gorodovoydb

# To upgrade all dependencies
npm i -g npm-check-updates
npm-check-updates -u
yarn install


# To kill listening port (Windiows)
netstat -a -o -n
taskkill /F /PID {task_id}
