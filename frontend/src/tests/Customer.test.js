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

  test('error on create already existing customer', async () => {
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
          ok: false,
          errors: [
            {
              path: 'email',
              message: 'email must be unique',
            },
          ],
        },
      },
    });
  });

  test('allCustomers with not empty db', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        query {
          allCustomers {
            id,
            name,
            surname,
            email,
            country,
            city,
            user_id
          }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allCustomers: [
          {
            id: 1,
            name: 'Giorgio',
            surname: 'Armani',
            email: 'gio@email.com',
            country: 'Italy',
            city: 'Milan',
            user_id: 1,
          },
        ],
      },
    });
  });

  test('register a new user without not null fields', async () => {
    let response;
    try {
      response = await axios.post('http://localhost:8080/graphql', {
        query: `
        mutation {
          registerCustomer(name: "Giorgio", surname: "Armani",
            email: "gio77@email.com", country: "Italy", city: "Milan", 
              address: "Via Dei Rognosi", postal: 20100, specialization: "Plumber") {
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

  test('register a new user without nullable fields', async () => {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: `
        mutation {
          registerCustomer(name: "Giorgio", surname: "Armani",
            email: "gio22@email.com", country: "Italy", city: "Milan", 
              address: "Via Dei Rognosi", postal: 20100, user_id: 1) {
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
});
