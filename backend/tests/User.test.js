const axios = require('axios');

const server = 'http://localhost:8080/graphql';

describe('user resolvers', () => {
  test('allUsers on empty db', async () => {
    const response = await axios.post(server, {
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
    const response = await axios.post(server, {
      query: `
        mutation {
          registerUser(name: "Claudio", surname: "Test", username: "Claudione",
            email: "ci@email.com", birthdate: "2000-12-31", country: "Italy", 
              password: "pwdtest123", city: "Milan", address: "Via Test, 20", postal: 20100) {
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
    const response = await axios.post(server, {
      query: `
        mutation {
          registerUser(name: "Claudio", surname: "Test", username: "Claudione",
            email: "ci@email.com", birthdate: "2000-12-31", country: "Italy", 
              password: "pwdtest123", city: "Milan", address: "Via Test, 20", postal: 20100) {
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
    const response = await axios.post(server, {
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
            country: 'Italy',
            email: 'ci@email.com',
            id: 1,
            name: 'Claudio',
            surname: 'Test',
            username: 'Claudione',
          },
        ],
      },
    });
  });

  test('register a new user without not null fields', async () => {
    let response;
    try {
      response = await axios.post(server, {
        query: `
        mutation {
          registerUser(name: "Claudio", surname: "Lippi",
            email: "ci4@email.com", birthdate: "2000-12-31", country: "Italy", 
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
    } catch (err) {}
    expect(response).toBeUndefined();
  });
});
