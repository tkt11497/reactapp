import React from 'react'
import {Form, Label,Select} from 'semantic-ui-react'
 const SelectInput = ({
    input,
    width,
    multiple,
    options,
    label,
    placeholder,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
        <Form.Field error={touched&& !!error}>
            <label>{label} </label>
            <Select {...input} 
            onChange={(e,data)=>input.onChange(data.value)} 
            value={input.value|| null} 
            options={options} 
            multiple={multiple}  
            placeholder={placeholder}
             type={type}/>
            {touched &&((error && <Label basic color='red'>{error}</Label>) ||(warning && <Label basic color='red'>{warning}</Label>))}
        </Form.Field>
    )
}
export default SelectInput