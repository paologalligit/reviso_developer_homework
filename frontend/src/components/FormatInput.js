/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'semantic-ui-react';
import validator from 'validator';

export default ({
  name,
  value,
  placeholder,
  onChange,
  type,
  errorMessages,
  isSubmitting,
  notEmpty,
}) => {
  let error;
  let errorMessage;

  // not empty value check
  if (value === '' && notEmpty) {
    error = true;
    errorMessage = errorMessages.empty;
  } else {
    // type check
    if (type === 'numeric') {
      error = value === '' ? false : !validator.isDecimal(value);
    } else {
      error = !validator.isAlpha(value);
    }
    errorMessage = errorMessages.type;
  }

  return (
    <div>
      <Input
        error={error && isSubmitting}
        name={name}
        value={value}
        placeholder={placeholder}
        fluid
        onChange={onChange}
      />
      {error && isSubmitting ? errorMessage : null}
    </div>
  );
};
