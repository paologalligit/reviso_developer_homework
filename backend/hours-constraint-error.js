/* eslint-disable react/jsx-filename-extension */
class HoursConstraintError extends Error {
  constructor(message) {
    super();
    this.name = 'HoursConstraintError';
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HoursConstraintError;
