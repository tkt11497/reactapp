import React from 'react';
import { Form, Segment, Button,Label,Divider } from 'semantic-ui-react';
import { Field ,reduxForm} from 'redux-form';
import TextInput from '../../components/form/TextInput';
import {composeValidators,combineValidators, isRequired,hasLengthGreaterThan} from 'revalidate'
import {register,socialLogin} from '../../store/actions/index'
import {connect}from 'react-redux'
import SocialLogin from './SocialLogin'
const RegisterForm = (props) => {
  return (
    <div>
      <Form size="large" onSubmit={props.handleSubmit(props.register)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="email"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
           {props.error&&<Label basic color='red'>{props.error}</Label>}
          <Button loading={props.submitting} fluid size="large" color="teal" disabled={props.invalid||props.submitting||props.pristine}>
            Register
          </Button>
          <Divider horizontal>
            OR
          </Divider>
          <SocialLogin socialLogin={props.socialLogin}/>
        </Segment>
      </Form>
    </div>
  );
};
const validate=combineValidators({
  displayName:isRequired('displayName'),
  email:isRequired('email'),
  password:composeValidators(
    isRequired('password'),
    hasLengthGreaterThan(5)({message:'password need to be at least 6 characters'})
  )()
})
const mapDispatchToProps={
  register,
  socialLogin
}
export default connect(null,mapDispatchToProps)( reduxForm({form:'registerform',validate})(RegisterForm));