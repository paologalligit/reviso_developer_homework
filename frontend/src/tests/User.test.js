import axios from 'axios';

describe('user resolvers', () => {
  test('allUsers on empty db', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        query {
          allUsers {
            id,
            name,
            surname,
            username,
            email,
            country
          }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allUsers: [],
      },
    });
  });

  test('register a new user', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        mutation {
          registerUser(name: "Claudio", surname: "Lippi", username: "Claudione",
            email: "ci@email.com", birthdate: "2000-12-31", country: "Italy", 
              password: "bobobo", city: "Milan", address: "Via Dei Rognosi", postal: 20100) {
              ok
              errors {
                path
                message
              }
            }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        registerUser: {
          ok: true,
          errors: null,
        },
      },
    });
  });

  test('error on create already existing user', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        mutation {
          registerUser(name: "Claudio", surname: "Lippi", username: "Claudione",
            email: "ci@email.com", birthdate: "2000-12-31", country: "Italy", 
              password: "bobobo", city: "Milan", address: "Via Dei Rognosi", postal: 20100) {
              ok
              errors {
                path
                message
              }
            }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        registerUser: {
          ok: false,
          errors: [
            {
              path: 'username',
              message: 'username must be unique',
            },
          ],
        },
      },
    });
  });

  test('allUsers with not empty db', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        query {
          allUsers {
            id,
            name,
            surname,
            username,
            email,
            country
          }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allUsers: [
          {
            id: 1,
            name: 'Claudio',
            surname: 'Lippi',
            username: 'Claudione',
            email: 'ci@email.com',
            country: 'Italy',
          },
        ],
      },
    });
  });
});
