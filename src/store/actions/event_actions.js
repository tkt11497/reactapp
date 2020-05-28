import * as actionTypes from '../actions/actionTypes'
import {toastr} from 'react-redux-toastr'
import {asyncActionStart,asyncActionFinish,asyncActionError}from './index'
import firebase from '../../config/firebase'
export const creatEvent=(data)=>{
    return async (dispatch, getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        let user=firebase.auth().currentUser
        let profile= getState().firebase.profile
        let modified_event={
            ...data,
            hostUid:user.uid,
            hostedBy:profile.displayName,
            hostPhotoURL:profile.photoURL||'/assets/user.png',
            created:new Date(),
            isCancelled:false,
            attendees:{
                [user.uid]:{
                    going:true,
                    joinDate:new Date(),
                    photoURL:profile.photoURL||'/assets/user.png',
                    displayName:profile.displayName,
                    host: true
                }
            }
        }
        dispatch(asyncActionStart())
        try{
        let createdEvent=await firestore.add('events',modified_event)
        await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`,{
            eventId:createdEvent.id,
            userUid:user.uid,
            eventDate:data.date,
            host:true
        })
        toastr.success('Success','Event has been created')
        dispatch(asyncActionFinish())
        return createdEvent;

    }catch(error){
        console.log(error)
        dispatch(asyncActionError())
        toastr.error('OPPS','Something went wrong creating event')
    }
    }
}
export const cancelToggle=(isCancelled,eventId)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore()
        const message=isCancelled?'Do you want to canel the event':'Do you want to reactivate the event'
    try{
        toastr.confirm(message,{
            onOk:async()=>{
                await firestore.update(`events/${eventId}`,{isCancelled:isCancelled})
                toastr.success('Success','Event has been Updated')
                            }    
        })
        
        
    }catch(error){
        console.log(error)
    }
}
}
export const deleteEvent=(toDeleteEvent)=>{
    return async (dispatch, getState,{getFirebase,getFirestore})=>{
        
        try{
        dispatch({
            type: actionTypes.DELETE_EVENT,
            toDeleteEventId:toDeleteEvent.id
        })
        toastr.success('Success','Event has been deleted')
    }catch(error){
        toastr.error('OPPS','Something went wrong')
    }
    }
}
export const updateEvent=(toUpdateEvent)=>{
    // return async (dispatch,getState,{getFirebase,getFirestore})=>{
        return async (dispatch,getState)=>{
        // const firestore=getFirestore()
        const firestore=firebase.firestore()
        const eventsRef=firestore.collection('events')
        const dateEqual=getState().firestore.ordered.events[0].date.isEqual(toUpdateEvent.date)
        dispatch(asyncActionStart())
        try{
        const event_attendeeRef= firestore.collection('event_attendee')
       
           
        if(!dateEqual){
            const batch= firestore.batch()
            batch.update(eventsRef.doc(toUpdateEvent.id),toUpdateEvent)
            const event_attendeeQuery= await event_attendeeRef.where('eventId','==',toUpdateEvent.id)
            const event_attendeeQuerySnap= await event_attendeeQuery.get()
            for(let i=0;i<event_attendeeQuerySnap.docs.length;i++){
                await batch.update(event_attendeeRef.doc(event_attendeeQuerySnap.docs[i].id),{
                    eventDate:toUpdateEvent.date
                })
            }
            await batch.commit()
        }else{
            await eventsRef.doc(toUpdateEvent.id).update(toUpdateEvent)
            
        }
       
       dispatch(asyncActionFinish())
        // await firestore.update(`events/${toUpdateEvent.id}`,toUpdateEvent)    
        toastr.success('Success','Event has been Updated')
    }catch(error){
        console.log(error)
        toastr.error('OPPS','Something went wrong')
    }
    }
    
  
}
export const getEventsForDashboard=(lastEvent)=>
     async(dispatch,getState)=>{
        const firestore=firebase.firestore();
        const today= new Date()
        const eventsRef=firestore.collection('events')
        
        try{
            dispatch(asyncActionStart())
            let startAfter=lastEvent && await firestore.collection('events').doc(lastEvent.id).get()
            let query
            lastEvent ? 
            (query=eventsRef.where('date','>=',today).orderBy('date').startAfter(startAfter).limit(2)):
            (query=eventsRef.where('date','>=',today).orderBy('date').limit(2))
            let querySnap=await query.get()

            if(querySnap.docs.length===0){
                dispatch(asyncActionFinish())
                return querySnap
            }


            let events=[]
            for(let i =0;i<querySnap.docs.length;i++){
                let evt={...querySnap.docs[i].data(),id:querySnap.docs[i].id}
                events.push(evt)
            }
            console.log(events)
            dispatch ({type:actionTypes.GET_EVENTS,events})
            dispatch(asyncActionFinish())
            return querySnap
        }catch(error){
            dispatch(asyncActionError())
            console.log(error)
        }
    }
export const addEventComment=(eventId,values,parentId)=>{
    return async (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        const profile=getState().firebase.profile
        const user=firebase.auth().currentUser
        let newcomment={
            parentId:parentId,
            displayName:profile.displayName,
            photoURL:profile.photoURL||'/assets/user.png',
            uid:user.uid,
            text:values.comment,
            date:Date.now()
        }
        try{
            await firebase.push(`event_chat/${eventId}`,newcomment)
        }catch(error){
            console.log(error)
            toastr.error('opps','Problem adding comment')
        }
    }
}