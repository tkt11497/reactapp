
import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../components/form/DateInput";
import PlaceInput from "../../../components/form/PlacesInput";
import TextInput from "../../../components/form/TextInput";
import RadioInput from "../../../components/form/RadioInput";

class BasicSetting extends Component {

    render() {
        const {pristine, submitting} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={this.props.handleSubmit(this.props.updateprofile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                        <label>Gender: </label>
                      <Field 
                      name='gender'
                      type='radio'
                      value='male'
                      label='Male'
                      component={RadioInput}
                      />
                    <Field 
                      name='gender'
                      type='radio'
                      value='female'
                      label='Female'
                      component={RadioInput}
                      />
                      
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Date of Birth' 
                        dateFormat='dd LLL yyy' 
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode='select'
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile', enableReinitialize:true,destroyOnUnmount:false})(BasicSetting);