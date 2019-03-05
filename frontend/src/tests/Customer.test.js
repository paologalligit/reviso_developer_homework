import axios from 'axios';

describe('customer resolvers', () => {
  test('allCustomers on empty db', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        query {
          allCustomers {
            id,
            name,
            surname,
            email,
            country,
            specialization
          }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allCustomers: [],
      },
    });
  });

  test('register a new customer', async () => {
    // register the new user to be associated with customer
    await axios.post('http://localhost:8080/graphql', {
      query: `
        mutation {
          registerUser(name: "Claudio", surname: "Lippi", username: "BigC",
            email: "cibig@email.com", birthdate: "2000-12-31", country: "Italy", 
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

    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        mutation {
          registerCustomer(name: "Giorgio", surname: "Armani",
            email: "gio@email.com", country: "Italy", city: "Milan", 
              address: "Via Dei Rognosi", postal: 20100, user_id: 1, specialization: "Plumber") {
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
        registerCustomer: {
          ok: true,
          errors: null,
        },
      },
    });
  });
/*
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
/*
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
/*
  test('register a new user without not null fields', async () => {
    try {
      await axios.post('http://localhost:8080/graphql', {
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
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
/*
  test('register a new user without nullable fields', async () => {
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
  */
});
