import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {compose}from 'redux'
import {toastr}from 'react-redux-toastr'
import { Grid } from 'semantic-ui-react'
import {withFirestore,firebaseConnect,isEmpty}from 'react-redux-firebase'
import EventDetailHeader from '../../components/Event/EventDetail/EventDetailHeader'
import EventChat from '../../components/Event/EventDetail/EventChat'
import EventDetailInfo from '../../components/Event/EventDetail/EventDetailInfo'
import EventSidebar from '../../components/Event/EventDetail/EventSidebar'
import {objectToArray,createDataTree} from '../../helpers/helpers'
import {joinEvent,canceljoinEvent,addEventComment,openModal}from '../../store/actions/index'
import Loading from '../../components/utils/Loading'
import NotFound from '../../components/notFound/NotFound'


const EventDetail=(props)=>{
    useEffect( () => {
        let fetchData=async ()=>{
            let event= await props.firestore.setListener(`events/${props.match.params.id}`)// it does not update live data like firestore connect
            // if(!event.exists){
            //     props.history.push('/eventdashboard');
            //     toastr.error('Sorry','Event Not Found')
            // }
        }
        fetchData()
        return async function cleanup(){
            await props.firestore.unsetListener(`events/${props.match.params.id}`)
        }
          
     }
      ,[]);

    
    let attendees=props.event.attendees&&objectToArray(props.event.attendees).sort((a,b)=>{
        return a.joinDate.toDate()-b.joinDate.toDate()
    })
    let isHost=props.event.hostUid==props.auth.uid
    let isGoing=attendees&& attendees.some(attendee=>attendee.id==props.auth.uid)
    const chatTree=!isEmpty(props.event_chat)&&createDataTree(props.event_chat)
    const authenticated= props.auth.isLoaded&&!props.auth.isEmpty
    const loading=props.requesting[`events/${props.match.params.id}`]
    //console.log(chatTree)
    if(loading){
        return <Loading inverted={false} />
    }
    if(Object.keys(props.event).length===0){
        return <NotFound/>
    }
    
  
    return (
      
        <Grid>
            <Grid.Column width="10">
                <EventDetailHeader 
                loading={props.loading} 
                event={props.event} 
                isHost={isHost} 
                isGoing={isGoing} 
                joinEvent={props.joinEvent} 
                canceljoinEvent={props.canceljoinEvent} 
                openModal={props.openModal} 
                authenticated={authenticated}/>
                <EventDetailInfo event={props.event}/>
                {authenticated&&<EventChat addEventComment={props.addEventComment} eventId={props.event.id} event_chat={chatTree} />}
            </Grid.Column>
            <Grid.Column width="6">
                <EventSidebar attendees={attendees}/>
            </Grid.Column>
        </Grid>
    )
    
}

const mapStateToProps=(state,ownProps)=>{
    const eventId=ownProps.match.params.id 
    let event={}
    if(state.firestore.ordered.events&& state.firestore.ordered.events.length>0){
        event=state.firestore.ordered.events.filter(event=>event.id==eventId)[0]||{}
    }
    return{
        event,
        auth:state.firebase.auth,
        event_chat:!isEmpty(state.firebase.data.event_chat)&&objectToArray(state.firebase.data.event_chat[ownProps.match.params.id ]),
        requesting:state.firestore.status.requesting
    }
}
const mapDispatchToProps={
    joinEvent,
    canceljoinEvent,
    addEventComment,
    openModal
}

export default compose(
    withFirestore,
    connect(mapStateToProps,mapDispatchToProps),
    firebaseConnect(props=>([`event_chat/${props.match.params.id}`]))

) (EventDetail)
