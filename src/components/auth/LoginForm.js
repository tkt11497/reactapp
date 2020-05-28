import React from 'react';
import { Form, Segment, Button,Label,Divider } from 'semantic-ui-react';
import { Field ,reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {composeValidators,combineValidators, isRequired,hasLengthGreaterThan} from 'revalidate'
import TextInput from '../../components/form/TextInput';
import {login,socialLogin} from '../../store/actions/index'
import SocialLogin from './SocialLogin'


const LoginForm = (props) => {
  return (
    <Form  size="large" onSubmit={props.handleSubmit(props.Login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="email"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {props.error&&<Label basic color='red'>{props.error}</Label>}
        <Button loading={props.submitting} fluid size="large" type="submit" color="teal" disabled={props.invalid||props.submitting||props.pristine}>
          Login
        </Button>
        <Divider horizontal>
          Or
        </Divider>
        <SocialLogin socialLogin={props.socialLogin}/>
      </Segment>
    </Form>
  );
};
const validate=combineValidators({
  email:isRequired('email'),
  password:isRequired('password')
})
const mapDispatchToProps=dispatch=>{
  return{
    Login:(value)=>dispatch(login(value)),
    socialLogin:(provider)=>dispatch(socialLogin(provider))
  }
}
export default connect(null,mapDispatchToProps)(reduxForm({form:'loginform',validate})(LoginForm));