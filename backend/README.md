# Instructions for the backend

## Importing the database
- `createdb freelancerdb`
- `psql -U user_name freelancerdb < freelancerdb.sql`
- if a user other than postgres is used, go to *backend/models/index.js* and change the third row with the correct user and password

## Starting the server
- `cd backend/`
- `yarn start` or `npm start` (*the server starts at port 8080*)

## Testing
1. `cd backend/`
2. Run the test db with `yarn test-server`
3. Run the tests `yarn test-in-order`
4. **Whenever running new tests always close and re-run the test-server**