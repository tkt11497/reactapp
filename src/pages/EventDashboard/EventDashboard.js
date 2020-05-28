import React, { Component ,createRef} from 'react'
import {Grid, Button} from 'semantic-ui-react'
import EventList from '../../components/Event/EventList/EventList'
import classes from './eventdashboard.module.css'
import {creatEvent,updateEvent,deleteEvent,getEventsForDashboard} from '../../store/actions/index'
import Loading from '../../components/utils/Loading'
import { connect } from 'react-redux'
import {firestoreConnect}from 'react-redux-firebase'
import EventAcitivity from '../../components/Event/EventActivity/EventAcitivity'
import Spinner from '../../components/Spinner/Spinner'
import firebase from '../../config/firebase'
 class EventDashboard extends Component {
   

  //  formhandler=()=>{
  //    this.setState((prevState)=>{
  //      return {
  //        isFormOpen:!prevState.isFormOpen
  //      }
  //    }
  //    )
  //    console.log(this.state.isFormOpen)
  //  }

  //  createEventHandler=()=>{
  //    this.setState({
  //      isFormOpen:true,
  //      selectedEvent:null
  //    })
  //  }
  //  closeFormHandler=()=>{
  //    this.setState({
  //      isFormOpen:false
  //    })
  //  }

  //  submiter=(data)=>{
  //   this.props.createEvent(data)
  //   this.setState({
  //     isFormOpen:false
  //   })
  //  }
  //  updateEventHandler=(toUpdateEvent)=>{
  //   this.props.Eventupdater(toUpdateEvent)
  //   this.setState({
  //     isFormOpen:false
  //   })
     
  //  }
  //  deleteEventHandler=(toDeleteEvent)=>{
  //    const deletedEvents=this.state.events.filter((event)=>{
  //      return event.id!=toDeleteEvent.id
  //    })
  //    this.setState({
  //      events:deletedEvents
  //    })
  //  }

  //  selectEventHandler=(sevent)=>{
  //    this.setState({
  //     selectedEvent:sevent,
  //     isFormOpen:true
  //    })
  //  }
  // let db= firebase.firestore()
    // db.collection("events")
    // .onSnapshot((docs)=> {
    //     console.log("Current data: ", docs);
    //     this.props.getEventsForDashboard()
    // });
    state={
      moreEvents:false,
      loadingInitail:true,
      loadedEvents:[],
      firestore: firebase.firestore()
     }
     firestore= firebase.firestore()
     unsubscribe;
     contextRef=createRef()
  componentDidMount= async ()=>{
    let next=await this.props.getEventsForDashboard()
    console.log(next,'saadsdsadsa')
    if(next&&next.docs&&next.docs.length>1){
      console.log(next.docs.length,'saddaasdasdsadsadsaHIdsadsadsa')
      this.setState({
        moreEvents:true,
        // loadingInitail:false
      })
    } 


  
  }
  componentDidUpdate=(prevProps)=>{
    
    if(this.props.events!==prevProps.events){
      
      // this.setState({
      //   loadedEvents:[...this.state.loadedEvents,...this.props.events]
      // },
      let getUpdateData=async ()=>{
        let lastEvent=this.props.events[this.props.events.length-1]
        let endAt=lastEvent && await this.firestore.collection('events').doc(lastEvent.id).get()
        this.unsubscribe=this.firestore.collection("events").where('date','>=',new Date()).orderBy('date').endAt(endAt)
        .onSnapshot((snapshot)=> {
          console.log("Current data: ", snapshot);
          let events=[]
          for(let i =0;i<snapshot.docs.length;i++){
            let evt={...snapshot.docs[i].data(),id:snapshot.docs[i].id}
            events.push(evt)
        }
          // snapshot.forEach((doc) => events.push(doc.data()))
          console.log(events,'kii')
          //this.props.getEventsForDashboard()
          this.setState({
            loadedEvents:events
          })
      });
      
      }
      getUpdateData()
      
    }
  }
  componentWillUnmount(){
    this.unsubscribe&&this.unsubscribe()
  }
  getNextEvents=async ()=>{
    const {events}=this.props
    const lastEvent= events && events[events.length-1]
    let next=await this.props.getEventsForDashboard(lastEvent)
    if(next&&next.docs&&next.docs.length<=1){
      console.log(next.docs.length,'sad')
      this.setState({
        moreEvents:false
      })
    } 

  }
  
    render() {  
       const{isFormOpen}=this.state
       const{events,loading,activity}=this.props
      //  if(this.state.loadingInitail){
      //    return <Loading inverted={false} />
      //  }
        return (
           <Grid >
               <Grid.Column computer={10} mobile={16} tablet={10}>\
                  <div ref={this.contextRef}>
                     <EventList 
                     events={this.state.loadedEvents} 
                     getNextEvents={this.getNextEvents} 
                     loading={loading} 
                     moreEvents={this.state.moreEvents}   
                     />
                  </div>

               </Grid.Column>
               <Grid.Column computer={6} mobile={16} tablet={6}>
               
                
                   
                <EventAcitivity activity={activity} contextRef={this.contextRef}/>
                    
               </Grid.Column>
               <Grid.Column computer={10} mobile={16} tablet={10}>
                  {loading&&<Spinner/>}
               </Grid.Column>
               
           </Grid>
           
        )
    }
}

const mapStateToProps=state=>{
  return{
    events:state.events,
    loading :state.async.isLoading,
    activity: state.firestore.ordered.activity
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    EventDeleter:(event)=>dispatch(deleteEvent(event)),
    getEventsForDashboard:(lastEvent)=>dispatch(getEventsForDashboard(lastEvent   ))
  }
}

//export default connect(mapStateToProps,mapDispatchToProps)(firestoreConnect([{collection:'events', where: ['date', '>=', new Date()]}]) (EventDashboard));
//export default connect(mapStateToProps,mapDispatchToProps)(EventDashboard)
export default connect(mapStateToProps,mapDispatchToProps)
(firestoreConnect([{collection:'activity', 
                    orderBy: ['timestamp', 'desc'],
                    limit:5
                  }]) (EventDashboard));