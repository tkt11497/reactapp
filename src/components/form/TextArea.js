import React from 'react'
import {Form, Label} from 'semantic-ui-react'
 const TextArea = ({
    input,
    width,
    rows,
    label,
    placeholder,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
        <Form.Field error={touched&& !!error}>
            <label>{label} </label>
            <textarea {...input}  placeholder={placeholder} type={type} rows={rows}/>
            {touched &&((error && <Label basic color='red'>{error}</Label>) ||(warning && <Label basic color='red'>{warning}</Label>))}
        </Form.Field>
    )
}
export default TextArea