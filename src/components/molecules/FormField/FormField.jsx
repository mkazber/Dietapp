import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${Label} {
    margin: 10px 0;
  }
`;

const FormField = React.forwardRef(({ onChange, value, label, name, id, type = 'text', isTextarea, ...props }, ref) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>
        {label}
        {isTextarea ? (
          <Input
            isTextarea
            as="textarea"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            data-testid={label}
            {...props}
            ref={ref}
          />
        ) : (
          <Input
            name={name}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            data-testid={label}
            {...props}
            ref={ref}
          />
        )}
      </Label>
    </Wrapper>
  );
});

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
};

export default FormField;
