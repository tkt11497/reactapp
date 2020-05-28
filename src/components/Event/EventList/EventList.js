import React, { Component } from 'react'
import Eventitem from'../EventItem/Eventitem'
import InfiniteScroll  from 'react-infinite-scroller'

export default class EventList extends Component {
    render() {
        const {events,loading,moreEvents,getNextEvents}=this.props
        return (
            <React.Fragment>
                {events&&events.length!==0&&
                <InfiniteScroll
                pageStart={0}
                loadMore={getNextEvents} 
                hasMore={!loading&&moreEvents} 
                initialLoad={false}
                >

                {events&&events.map((event)=><Eventitem key={event.id} 
                event={event}  />)}

                </InfiniteScroll>    
                
                
                }
               
            </React.Fragment>
        )
    }
}
