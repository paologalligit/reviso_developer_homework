// test also the sent check
const axios = require('axios');
const server = 'http://localhost:8080/graphql';

describe('collaboration resolver', () => {

  // populate db with some entries
  beforeAll(async () => {
    // register the new user to be associated with customer
    await axios.post(server, {
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

    await axios.post(server, {
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
  });

  test('create a collaboration', async () => {
    const response = await axios.post(server, {
      query: `
        mutation {
          registerCollaboration(
            name: "Clean pc"
            budget: 100
            vat: 22
            penalty: 123
            date: "2019-01-01"
            start_hour: "15:00:00"
            end_hour: "16:30:00"
            user_id: 1
            customer_id: 1
          ) {
            ok
            collaboration {
              name
              budget
              vat
              user_id
              customer_id
            }
            errors {
              path
              message
            }
          }
        }`,
    });

    const { data } = response;

    expect(data).toEqual({
      data: {
        registerCollaboration: {
          ok: true,
          collaboration: {
            name: 'Clean pc',
            budget: 100,
            vat: 22,
            user_id: 1,
            customer_id: 1
          },
          errors: null
        }
      }
    });
  });

  test('create a collaboration with wrong user id', async () => {
    const response = await axios.post(server, {
      query: `
        mutation {
          registerCollaboration(
            name: "Clean pc"
            budget: 100
            vat: 22
            penalty: 123
            date: "2019-01-01"
            start_hour: "15:00:00"
            end_hour: "16:30:00"
            user_id: 12
            customer_id: 1
          ) {
            ok
            collaboration {
              name
              budget
              vat
              user_id
              customer_id
            }
            errors {
              path
              message
            }
          }
        }`,
    });

    const { ok, collaboration, errors } = response.data.data.registerCollaboration;

    expect(ok).toBeFalsy();
    expect(collaboration).toBeNull();
    expect(errors).toEqual([
      {
        "path": "name",
        "message": "something wrong in format error"
      }
    ]);
  })
});