# Instructions for the backend

## :computer: Importing the database
- `createdb freelancerdb`
- `psql -U user_name freelancerdb < freelancerdb.sql`
- if a user other than postgres is used, go to **backend/models/index.js** and change the third row with the correct user and password

## :muscle: Starting the server
- `cd backend/`
- `yarn install` or `npm install`
- `yarn start` or `npm start` (*the server starts at port 8080*)

## :zap: Testing
1. `cd backend/`
2. `createdb testfreelancerdb`
3. Run the test db with `yarn test-server`
4. Run the tests `yarn test-in-order`
5. **Whenever running new tests always close and re-run the test-server**
