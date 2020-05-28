import React from 'react'
import {Form, Label} from 'semantic-ui-react'
 const TextInput = ({
    input,
    width,
    label,
    placeholder,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
        <Form.Field error={touched&& !!error}>
            <label>{label} </label>
            <input {...input}  placeholder={placeholder} type={type}/>
            {touched &&((error && <Label basic color='red'>{error}</Label>) ||(warning && <Label basic color='red'>{warning}</Label>))}
        </Form.Field>
    )
}
export default TextInput
