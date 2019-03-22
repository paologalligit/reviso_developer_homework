/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'semantic-ui-react';
import validator from 'validator';

export default ({
  name, value, placeholder, onChange, type, errorMessages, isSubmitting,
}) => {
  let error;
  let errorMessage;

  if (value === '') {
    error = true;
    errorMessage = errorMessages.empty;
  } else {
    error = type === 'numeric' ? !validator.isDecimal(value) : !validator.isAlpha(value);
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
