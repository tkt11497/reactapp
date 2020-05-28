import React, { Fragment } from 'react'
import {connect}from 'react-redux'
import {Segment,Item,Button,Icon,List,Label} from'semantic-ui-react'
import EventAttendee from '../EventAttendee/EventAttendee'
import {format ,parseISO} from 'date-fns'
import { Link } from 'react-router-dom'
import {objectToArray} from '../../../helpers/helpers'
import {joinEvent,canceljoinEvent,openModal}from '../../../store/actions/index'

const Eventitem = (props)=> {
    
        const {event,auth,loading}=props
    let attendees=event.attendees&&objectToArray(event.attendees)
    let isHost=event.hostUid==auth.uid
    let isGoing=attendees&& attendees.some(attendee=>attendee.id==props.auth.uid)
    const authenticated= auth.isLoaded&&!auth.isEmpty
    const handleJoinEvent=(event)=>{
      if(authenticated){
        props.joinEvent(props.event)
      }else{
        props.openModal('loginModal')
      }
        
    }
        return (
                 <Segment.Group>
                    <Segment>
                      <Item.Group>
                        <Item>
                          <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                          <Item.Content>
                             <Item.Header as={Link} to={`/eventdetail/${event.id}`}>{event.title}</Item.Header>
                            <Item.Description>
                                Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                            </Item.Description>
                            {event.isCancelled&&<Label style={{top:'-40px'}} ribbon='right' color='red' content='This event has been cancelled'/>}
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Segment>
                    <Segment>
                      <span>
                        <Icon name="clock" /> {format(event.date.toDate(),'EEEE do LLL')} at {' '}
                                                {format(event.date.toDate(),'h:mm a')} |
                        <Icon name="marker" /> {event.venue}
                      </span>
                    </Segment>
                    <Segment secondary>
                      <List horizontal>
                          {event.attendees&&objectToArray(event.attendees).map((item)=><EventAttendee key={item.id} attendee={item}/>)}
                        
                      </List>
                    </Segment>
                    <Segment clearing>
                        <span>{event.description}</span>
                        
                      
                    {!isHost&&<Fragment>
                      {isGoing?<Button onClick={()=>props.canceljoinEvent(props.event)}floated="right">Cancel Attendding</Button>:
                      !props.event.isCancelled&&<Button color="teal" loading={loading} onClick={()=>handleJoinEvent(props.event)} floated="right">JOIN THIS EVENT</Button>
                      }
                      </Fragment>}
                      <Button as={Link} to={`/eventdetail/${event.id}`} color="teal" floated="right" content="View"  />
                    </Segment>
                  </Segment.Group>
        )
    }

const mapStateToProps=(state,ownProps)=>{
  return{
    auth:state.firebase.auth,
    loading:state.async.isLoading
  }
}
const mapDispatchToProps={
  joinEvent,
  canceljoinEvent,
  openModal,
}
export default connect(mapStateToProps,mapDispatchToProps)(Eventitem)