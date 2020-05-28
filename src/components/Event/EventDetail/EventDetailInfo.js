import React,{useState} from 'react'
import { Segment,Grid,Icon,Button} from 'semantic-ui-react'
import EventMap from '../EventMap/EventMap'
import {format} from 'date-fns'
const EventDetailInfo = ({event}) => {
  const[isMapOpen,setMapToggle]=useState(false)
    return (
           <Segment.Group>
              <Segment attached="top">
                <Grid>
                  <Grid.Column width={1}>
                    <Icon size="large" color="teal" name="info" />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <p>{event.description}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign="middle">
                  <Grid.Column width={1}>
                    <Icon name="calendar" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    {event.date&&<span>{format(event.date.toDate(),'EEEE do LLL')} at {' '}
                                                {format(event.date.toDate(),'h:mm a')} </span> }
                        
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign="middle">
                  <Grid.Column width={1}>
                    <Icon name="marker" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={11}>
                        <span>{event.venue}</span>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button color="teal" size="tiny" content={isMapOpen? 'Hide Map':'Show Map'} onClick={()=>setMapToggle(!isMapOpen)}/>
                  </Grid.Column>
                </Grid>
              </Segment>
              {isMapOpen&&<EventMap venueLatLng={event.venueLatLng}/>}
            </Segment.Group>
    )
}
export default EventDetailInfo