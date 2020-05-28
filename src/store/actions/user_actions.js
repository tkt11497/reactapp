import {toastr} from 'react-redux-toastr'
import {asyncActionStart,asyncActionFinish,openModal,closeModal}from './index'
import cuid from 'cuid';
import firebase from '../../config/firebase'
import * as actionTypes from '../actions/actionTypes'
import { asyncActionError } from './Async_actions';
export const  updateprofile=(user)=>{
    return async (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        const{isLoaded, isEmpty,...updatedUser}=user// to emit isladed and isenmoty from user
        try{
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Your Profile has been updated')
        }
        catch(error){
            console.log(error)
        }
     }
}
export const uploadPhoto=(file,filename)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(asyncActionStart())
        dispatch(openModal('loadingModal'))
        let newFilename=cuid()+'.' +filename
        const firebase=getFirebase()
        const firestore=getFirestore()
        let user= firebase.auth().currentUser
        const path=`${user.uid}/user_images`
        const options={
            name:newFilename
        }
        try {
            //upload file to firebase storage
            let uploadedfile=await firebase.uploadFile(path,file,null,options)
            //get url of photo from uploaded imagfe
            let downloadURL= await uploadedfile.uploadTaskSnapshot.ref.getDownloadURL()
            //user docuemnt from firestore 
            let userDoc= await firestore.get(`users/${user.uid}`)
            //user has photo? if not update the profile with new image
            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL:downloadURL
                })
                await user.updateProfile({
                    photoURL:downloadURL
                })

            }
            //add the images to firestore collection
            await firestore.add(
                {
                    collection:'users',
                    doc:user.uid,
                    subcollections:[{collection:'photos'}]
                },
                {
                    name:newFilename,
                    url:downloadURL
                }

            )
            dispatch(asyncActionFinish())
            dispatch(closeModal('loadingModal'))
        }
        catch(error){
            console.log(error)
        }
    }
}
export const deletePhoto=(photo)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        
        const firebase=getFirebase()
        const firestore=getFirestore()
        let user= firebase.auth().currentUser
        try{
             firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
             firestore.delete({
                 collection:'users',
                 doc:user.uid,
                 subcollections:[
                     {
                         collection:'photos',
                         doc:photo.id
                     }
                 ]
             })

        }catch(error){
            console.log(error)
            throw new Error('Opps error deleting photo')
            //toastr.error('Opps',error.message)
        }
    }
}
export const setMainphoto=(photo)=>{
    return async (dispatch,getState)=>{
       
        const firestore=firebase.firestore()
        const user = firebase.auth().currentUser
        const today= new Date()
        let userDocRef=firestore.collection(`users`).doc(user.uid);
        let event_attendeeRef=firestore.collection('event_attendee')
        
     



        dispatch(asyncActionStart())
        try{
            let batch=firestore.batch()
            batch.update(userDocRef,{
                photoURL:photo.url
            })

            let activityQuery=await firestore.collection('activity').where('hostUid','==',user.uid)
            let acitivitySnap=await activityQuery.get()
            for(let i=0;i<acitivitySnap.docs.length;i++){
                
                batch.update(firestore.collection('activity').doc(acitivitySnap.docs[i].id),{
                    photoURL:photo.url
                })
            }






            let eventQuery= await event_attendeeRef.where('userUid','==',user.uid).where('eventDate','>=',today)
            let eventQuerySnap= await eventQuery.get()
            for (let i=0;i<eventQuerySnap.docs.length;i++){
                let eventDocRef=await firestore
                .collection('events')
                .doc(eventQuerySnap.docs[i].data().eventId)
                let event= await eventDocRef.get()
                if(event.data().hostUid==user.uid){
                    batch.update(eventDocRef,{
                        hostPhotoURL:photo.url,
                        [`attendees.${user.uid}.photoURL`]:photo.url
                    })
                }else{
                    batch.update(eventDocRef,{
                        [`attendees.${user.uid}.photoURL`]:photo.url
                    })
                }
            }
            console.log(batch)
            await batch.commit()
            dispatch(asyncActionFinish())
            // await firebase.updateProfile({
            //     photoURL:photo.url
            // })

        }catch(error){
            console.log(error)
            dispatch(asyncActionError())
            throw new Error('Opps error setting main photo')
           
            //toastr.error('Opps',error.message)
        }
    }
}
export const joinEvent=(event)=>{
    // return async (dispatch,getState,{getFirebase,getFirestore})=>{
    return async (dispatch,getState)=>{
        const firestore=firebase.firestore()
        const user=firebase.auth().currentUser
        const profile= getState().firebase.profile;
        const attendee={
            going:true,
            joinDate:new Date(),
            photoURL:profile.photoURL||'/assets/user.png',
            displayName:profile.displayName,
            host:false
        }
        try{
        dispatch(asyncActionStart())
        let eventDocRef=firestore.collection('events').doc(event.id)
        let event_attendeeRef=firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`)
        await firestore.runTransaction(async (transaction)=>{
            await transaction.get(eventDocRef)
            await transaction.update(eventDocRef,{
                [`attendees.${user.uid}`]:attendee
            })
            await transaction.set(event_attendeeRef,{
                eventId:event.id,
                userUid:user.uid,
                eventDate:event.date,
                host:false
            })
        })
        dispatch(asyncActionFinish())
        toastr.success('Success','You have joined this event')
        
            // await firestore.update(`events/${event.id}`,{
            //     [`attendees.${user.uid}`]:attendee
            // })
            // await firestore.set(`event_attendee/${event.id}_${user.uid}`,{
            //     eventId:event.id,
            //     userUid:user.uid,
            //     eventDate:event.date,
            //     host:false

            // })

        }catch(error){
            toastr.error('Opps','Error Joinning Event')
            console.log(error)
        }
    }
}
export const canceljoinEvent=(event)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        const user=firebase.auth().currentUser
        try{
            await firestore.update(`events/${event.id}`,{
                [`attendees.${user.uid}`]:firestore.FieldValue.delete()
            })
            await firestore.delete(`event_attendee/${event.id}_${user.uid}`)
            toastr.success('Success','You have unregistered this event')
        }catch(error){
            toastr.error('Opps','Error Joinning Event')
            console.log(error)
        }
    }
}
export const getUserEvents=(userUid,activeTab)=>{
    return async (dispatch,getState)=>{
        const firestore=firebase.firestore()
        dispatch(asyncActionStart())
        const today=new Date(Date.now())
        let eventRef= firestore.collection('event_attendee')
        let query;
        switch(activeTab){
            case 1:// past events
                query=eventRef.where('userUid','==',userUid).where('eventDate','<=',today).orderBy('eventDate','desc')
                break;
            case 2:// future events
                query=eventRef.where('userUid','==',userUid).where('eventDate','>=',today).orderBy('eventDate')
                break;
            case 3:// user hosted events
                query=eventRef.where('userUid','==',userUid).where('host','==',true).orderBy('eventDate','desc')
                //console.log('asdsaqda')
                break;
            default:
                query=eventRef.where('userUid','==',userUid).orderBy('eventDate','desc')
        }
        try{
            let querySnap=await query.get()
            let events=[]
            for(let i=0;i<querySnap.docs.length;i++){
                let evt= await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get()
                
                events.push({...evt.data(),id:evt.id})
            }
            dispatch({type:actionTypes.GET_EVENTS,events})
            dispatch(asyncActionFinish())
        }catch(error){
            console.log(error)
            dispatch(asyncActionError())
        }
    }
}