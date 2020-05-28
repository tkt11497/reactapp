import React ,{Fragment}from 'react'
import {Segment,Image,Item,Button,Header,Label} from 'semantic-ui-react'
import classes from './eventdetail.module.css';
import {format } from 'date-fns'
import { Link } from 'react-router-dom';
const EventDetailHeader = (props) => {
 
  const handleJoinEvent=(event)=>{
    if(props.authenticated){
      props.joinEvent(props.event)
    }else{
      props.openModal('loginModal')
    }
      
  }
    return (
           <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${props.event.category}.jpg`} fluid className={classes.Imagestyle} />
        
                <Segment basic style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '5%',
                    width: '100%',
                    height: 'auto',
                    color: 'white',
                }}>
                  <Item.Group>
                    <Item>
                      <Item.Content >
                        <Header
                          size="huge"
                          content={props.event.title}
                          style={{ color: 'white' }}
                        />
                        {props.event.date&& <p>{format(props.event.date.toDate(),'EEEE do LLLL')}</p>}
                        
                        <p>
                          Hosted by <strong><Link to={`/profile/${props.event.hostUid}`}>{props.event.hostedBy}</Link></strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom" clearing>
              {props.event.isCancelled&&<Label size='large' color='red' content="This event has been canceled"/>}
                {!props.isHost&&<Fragment>
                  {props.isGoing?<Button onClick={()=>props.canceljoinEvent(props.event)}>Cancel Attendding</Button>:
                  !props.event.isCancelled&& <Button color="teal" loading={props.loading} onClick={handleJoinEvent}>JOIN THIS EVENT</Button>
                  }
                 
                </Fragment>}
                {props.isHost&&<Button color="orange" floated="right" as={Link} to={`/manageEvent/${props.event.id}`}>
                  Manage Event
                </Button>}
              </Segment>
            </Segment.Group>
    )
}
export default EventDetailHeader
