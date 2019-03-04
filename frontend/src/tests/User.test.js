import axios from 'axios';

describe('user resolvers', () => {
  test('allUsers', async () => {
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
            id: 0,
            name: 'Paolo',
            surname: 'Galli',
            username: 'paologio',
            email: 'paolo@email.com',
            country: 'Italy',
          },
          {
            id: 3,
            name: 'Claudio',
            surname: 'Lippi',
            username: 'Claudione',
            email: 'ci3@email.com',
            country: 'Italy',
          },
          {
            id: 4,
            name: 'Gio',
            surname: 'Bello',
            username: 'GioBello',
            email: 'bello@email.com',
            country: 'Italy',
          },
          {
            id: 6,
            name: 'Gio',
            surname: 'Bello',
            username: 'GioBeo',
            email: 'be@email.com',
            country: 'Italy',
          },
          {
            id: 10,
            name: 'Gio',
            surname: 'Bello',
            username: 'GioBeoBeo',
            email: 'beobeo@email.com',
            country: 'Italy',
          },
          {
            id: 11,
            name: 'Gio',
            surname: 'Bello',
            username: 'GioBeoDeBeo',
            email: 'bebo@email.com',
            country: 'Italy',
          },
          {
            id: 12,
            name: 'Gio',
            surname: 'Bello',
            username: 'GioBeoBeo2',
            email: 'beobeo2@email.com',
            country: 'Italy',
          },
          {
            id: 13,
            name: 'Johnny',
            surname: 'Bravo',
            username: 'tooCool',
            email: 'cool@email.com',
            country: 'Italy',
          },
        ],
      },
    });
  });
});
