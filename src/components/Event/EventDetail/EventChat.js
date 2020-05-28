import React, { Fragment ,useState} from 'react'
import {Header,Comment,Form,Button,Segment} from 'semantic-ui-react'
import EventChatForm from './EventChatForm'
import {Link}from 'react-router-dom'
import {formatDistance}from 'date-fns'
const EventChat = ({addEventComment,eventId,event_chat}) => {
  const [showReplyForm, setReplyForm] = useState(false);
  const [selectedForm,setSelectedForm]= useState(null)

  const handleReplyFormopen=(id)=>{
    setReplyForm(true)
    setSelectedForm(id)
  }
  const handleCloseReplyForm=()=>{
    setReplyForm(false)
    setSelectedForm(null)
  }
    return (
            <Fragment>
              <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
              >
                <Header>Chat about this event</Header>
              </Segment>
        
              <Segment attached>
                <Comment.Group>
                  {event_chat&&event_chat.map(comment=>(
                     <Comment key={comment.id}>
                     <Comment.Avatar src={comment.photoURL||"/assets/user.png"} />
                     <Comment.Content>
                       <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                       <Comment.Metadata>
                        <div>{comment.date&&formatDistance(comment.date,Date.now())} ago</div>
                       </Comment.Metadata>
                      <Comment.Text>{comment.text}</Comment.Text>
                       <Comment.Actions>
                         <Comment.Action onClick={()=>handleReplyFormopen(comment.id)}>Reply</Comment.Action>
                        
                       </Comment.Actions>
                       {showReplyForm&&selectedForm==comment.id&&
                         <EventChatForm 
                         addEventComment={addEventComment} 
                         eventId={eventId} 
                         form={`reply_${comment.id}`} 
                         handleCloseReplyForm={handleCloseReplyForm}
                         parentId={comment.id}
                         />}
                     </Comment.Content>
                        {comment.childNodes&&comment.childNodes.map(child=>(
                            <Comment.Group key={child.id}>
                            <Comment >
                              <Comment.Avatar src={child.photoURL||"/assets/user.png"} />
                              <Comment.Content>
                                <Comment.Author as={Link} to={`/profile/${child.uid}`}>{child.displayName}</Comment.Author>
                                <Comment.Metadata>
                                  <div>{child.date&&formatDistance(child.date,Date.now())} ago</div>
                                </Comment.Metadata>
                                <Comment.Text>{child.text}</Comment.Text>
                                <Comment.Actions>
                                  <Comment.Action onClick={()=>handleReplyFormopen(child.id)}>Reply</Comment.Action>
                                  
                                </Comment.Actions>
                                {showReplyForm&&selectedForm==child.id&&
                                  <EventChatForm 
                                  addEventComment={addEventComment} 
                                  eventId={eventId} 
                                  form={`reply_${child.id}`} 
                                  handleCloseReplyForm={handleCloseReplyForm}
                                  parentId={child.parentId}
                                  />}
                              </Comment.Content>
                            </Comment>
                      </Comment.Group>
                        )

                        )}
                          
                            
                   </Comment>
                  ))}
                       
                </Comment.Group>
                <EventChatForm 
                addEventComment={addEventComment} 
                eventId={eventId} form={'newComment'} 
                parentId={0}/>
              </Segment>
              </Fragment>
    )
}
export default EventChat
