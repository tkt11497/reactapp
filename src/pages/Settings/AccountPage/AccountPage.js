import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../components/form/TextInput';
import {combineValidators,composeValidators,matchesField, hasLengthGreaterThan,isRequired} from 'revalidate'

const AccountPage = (props) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {props.provider=='password'&&
      <div>
        <Header color="teal" sub content="Change password" />
        <p>Use this form to update your account settings</p>
       
        <Form onSubmit={props.handleSubmit(props.updatepassword)}>
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="New Password"
          />
          <Field
            width={8}
            name="newPassword2"
            type="password"
            inline={true}
            basic={true}
            pointing="left"
            component={TextInput}
            placeholder="Confirm Password"
          />
          {props.error && (
            <Label basic color="red">
              {props.error}
            </Label>
          )}
          <Divider />
          <Button size="large" positive content="Update Password" disabled={props.invalid||props.submitting||props.pristine}/>
        </Form>
        
      </div>
    }
     {props.provider=='facebook.com'&&
      <div>
        <Header color="teal" sub content="Facebook Account" />
        <p>Please visit Facebook to update your account settings</p>
        <Button type="button" color="facebook">
          <Icon name="facebook" />
          Go to Facebook
        </Button>
      </div>
    }
     {props.provider=='google.com'&&
      <div>
        <Header color="teal" sub content="Google Account" />
        <p>Please visit Google to update your account settings</p>
        <Button type="button" color="google plus">
          <Icon name="google plus" />
          Go to Google
        </Button>
      </div>
    }
    </Segment>
  );
};
const validate=combineValidators({
    newPassword1:composeValidators(
        isRequired({message:'Please enter new password'}),
        hasLengthGreaterThan(5)({message:'password need to be at least 6 characters'})
    )(),
    newPassword2:composeValidators(
        isRequired({message:'Please confirm your password'}),
        matchesField('newPassword1')({message:'Passwords do not match'}),
        hasLengthGreaterThan(5)({message:'password need to be at least 6 characters'})
    )()

})

export default  reduxForm({ form: 'account',validate })(AccountPage);
