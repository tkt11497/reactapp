import React from 'react'
import {List,Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EventAttendee=(props)=>{
    return(
            <List.Item>
                <Image as={Link} to={`/profile/${props.attendee.id}`}size="mini" circular src={props.attendee.photoURL}></Image>
            </List.Item>)
}
export default EventAttendee