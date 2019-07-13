import React from 'react';
import { FormFeedback, FormGroup, Label, Input} from 'reactstrap';

export const renderMultipleFields = (fields, props, autoFocus = false ) =>  {
  return fields.map((field, index) => {
    if(index===0){
      return inputField(field, props, autoFocus);
    }
    return inputField(field, props, false);
  });
};

export const renderField = (field, props, autoFocus = false ) =>  {
  return inputField(field, props, autoFocus);
};

const inputField = ({name, label, placeholder, required = true, type = 'text'}, props, autoFocus = false ) => {
  const { values, errors, touched, handleChange, handleBlur } = props;

  return(
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input type={type}
        name={name}
        id={name}
        key={name}
        autoComplete="new-password"
        placeholder={placeholder}
        valid={!errors[`${name}`]}
        invalid={touched[`${name}`] && !!errors[`${name}`]}
        autoFocus={autoFocus}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[`${name}`]} 
      />
      <FormFeedback>{errors[`${name}`]}</FormFeedback>
    </FormGroup>
  );
}