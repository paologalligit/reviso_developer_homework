import 'jsdom-global/register';

import normalizeErrors from '../normalizeErrors';

describe('normalize errors suite', () => {
  it('checks correct format', () => {
    const errors = [
      {
        path: 'name',
        message: 'Invalid name',
        __typename: 'Error',
      },
      {
        path: 'surname',
        message: 'Invalid surname',
        __typename: 'Error',
      },
      {
        path: 'country',
        message: 'Invalid country',
        __typename: 'Error',
      },
      {
        path: 'email',
        message: 'Invalid email',
        __typename: 'Error',
      },
      {
        path: 'city',
        message: 'Invalid city name',
        __typename: 'Error',
      },
    ];

    const result = normalizeErrors(errors);
    expect(result).toEqual({
      name: ['Invalid name'],
      surname: ['Invalid surname'],
      country: ['Invalid country'],
      email: ['Invalid email'],
      city: ['Invalid city name'],
    });
  });

  it('inserts multiple messages for the same error', () => {
    const errors = [
      {
        path: 'name',
        message: 'Invalid name',
        __typename: 'Error',
      },
      {
        path: 'surname',
        message: 'Invalid surname',
        __typename: 'Error',
      },
      {
        path: 'country',
        message: 'Invalid country',
        __typename: 'Error',
      },
      {
        path: 'email',
        message: 'Invalid email',
        __typename: 'Error',
      },
      {
        path: 'email',
        message: 'Email already in use',
        __typename: 'Error',
      },
    ];

    const result = normalizeErrors(errors);
    expect(result).toEqual({
      name: ['Invalid name'],
      surname: ['Invalid surname'],
      country: ['Invalid country'],
      email: ['Invalid email', 'Email already in use'],
    });
  });
});
