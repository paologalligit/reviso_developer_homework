// test duplicate insertions
const axios = require('axios');

const server = 'http://localhost:8080/graphql';

describe('collaboration resolvers', () => {
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

    const { ok, collaboration, errors } = response.data.data.registerCollaboration;

    expect(ok).toBeTruthy();
    expect(errors).toBeNull();
    expect(collaboration).toEqual({
      name: 'Clean pc',
      budget: 100,
      vat: 22,
      user_id: 1,
      customer_id: 1,
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
        path: 'name',
        message: 'something wrong in format error',
      },
    ]);
  });

  test("send the collaboration's invoice", async () => {
    const response = await axios.post(server, {
      query: `mutation {
        sentInvoice(id: 1, sent: true, user_id: 1, customer_id: 1) {
          ok
          collaboration {
            id
            sent
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

    const { ok, collaboration, errors } = response.data.data.sentInvoice;

    expect(ok).toBeTruthy();
    expect(errors).toBeNull();
    expect(collaboration).toEqual({
      id: 1,
      sent: true,
      user_id: 1,
      customer_id: 1,
    });
  });

  test('create a collaboration with negative fields', async () => {
    const response = await axios.post(server, {
      query: `
        mutation {
          registerCollaboration(
            name: "Clean pc"
            budget: -100
            vat: -22
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

    const { ok, collaboration, errors } = response.data.data.registerCollaboration;

    expect(ok).toBeFalsy();
    expect(collaboration).toBeNull();
    expect(errors).toEqual([
      { message: 'Budget required', path: 'budget' },
      { message: 'Vat required', path: 'vat' },
    ]);
  });

  test('create a collaboration with illegal fields', async () => {
    let response;
    let responseErrors;
    try {
      response = await axios.post(server, {
        query: `
          mutation {
            registerCollaboration(
              name: "Clean pc"
              budget: -100
              vat: "4f2"
              penalty: "1f23"
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

      const { ok, collaboration, errors } = response.data.data.registerCollaboration;

      expect(ok).toBeFalsy();
      expect(collaboration).toBeNull();
      expect(errors).toEqual([
        { message: 'Budget required', path: 'budget' },
        { message: 'Vat required', path: 'vat' },
      ]);
    } catch (err) {
      responseErrors = err;
    }

    const { status, statusText } = responseErrors.response;
    const errList = responseErrors.response.data.errors;
    const vatError = errList[0].message;
    const penaltyError = errList[1].message;

    expect(status).toEqual(400);
    expect(statusText).toEqual('Bad Request');
    expect(vatError).toEqual('Expected type Float!, found "4f2".');
    expect(penaltyError).toEqual('Expected type Float!, found "1f23".');
    expect(response).toBeUndefined();
  });
});
