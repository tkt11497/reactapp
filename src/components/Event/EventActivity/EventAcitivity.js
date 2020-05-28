import React from 'react'
import {Header, Segment,Feed, Sticky} from 'semantic-ui-react'
import EventAcitivityItem from './EventActivityItem'
 const EventAcitivity = ({activity,contextRef}) => {
    return (
        <Sticky context={contextRef} offset={120} styleElement={{zIndex:0}} >
            <Header attached='top' content='Recent Activity'></Header>
            <Segment attached>
               <Feed>
                    {activity&&activity.map(activityItem=>(
                        <EventAcitivityItem 
                        key={activityItem.id}
                        activity={activityItem}/>
                    ))}
               </Feed>
            </Segment>
        </Sticky>
    )
}
export default EventAcitivity