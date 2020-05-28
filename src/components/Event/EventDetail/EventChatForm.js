import React, { Component } from 'react'
import {Form,Button}from 'semantic-ui-react'
import {Field,reduxForm} from 'redux-form'
import TextArea from '../../form/TextArea'
 class EventChatForm extends Component {

     handleCommentSubmit=value=>{
        this.props.addEventComment(this.props.eventId,value,this.props.parentId)
        this.props.reset()
        if(this.props.parentId!==0){
        this.props.handleCloseReplyForm()
        }
     }
    render() {
        return (
            <Form reply onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
            <Field 
            name='comment' 
            type='text' 
            component={TextArea} 
            rows={2}
            />

            
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        )
    }
}
export default reduxForm({Fields:'comment'})(EventChatForm)