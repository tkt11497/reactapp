import React from 'react'
import {Form, Label} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
 const DateInput = ({
    input,
    width,
    label,
    placeholder,
    type,
    meta: { touched, error, warning },
    ...rest
  }) => {
      const handleBlur=({ target: { value } })=>{
          if(value==''){
          
            input.onBlur(value)
          }else{
            input.onBlur (new Date(value))
          }
          
          
      }
    return (
        <Form.Field error={touched&& !!error}>
            <label>{label} </label>
            <DatePicker {...rest}  
            placeholderText={placeholder}
            selected={input.value?
                (Object.prototype.toString.call(input.value) === '[object Date]')? input.value:input.value.toDate()
                :null} 
            onChange={input.onChange} // give date object
            onBlur={handleBlur} // give date string
            onChangeRaw={e=>e.preventDefault()}/>
            
            {touched &&((error && <Label basic color='red'>{error}</Label>) ||(warning && <Label basic color='red'>{warning}</Label>))}
        </Form.Field>
    )
}
export default DateInput