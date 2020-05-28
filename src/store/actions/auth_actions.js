import * as actionTypes from './actionTypes'
import {closeModal} from './modal_actions'
import {toastr} from 'react-redux-toastr'
import {SubmissionError,reset} from 'redux-form'

 export const login=(userInfo)=>{
     return async (dispatch,getState,{getFirebase})=>{
        //  dispatch({
        //     type:actionTypes.LOGIN,
        //     email:userInfo.email,
        //     password:userInfo.password
        // })
        const firebase=getFirebase()
        try{
             await firebase.auth().signInWithEmailAndPassword(userInfo.email,userInfo.password)
            dispatch(closeModal())
            toastr.success('Success', `Welcome ${userInfo.email}`)
        }
        catch(error){
            console.log(error)
            toastr.error('something wroing in login')
            throw new SubmissionError(
                {
                    _error:error.message
                }
            )
        }

        
     }
}
export const register=(userInfo)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        try{
            let createduser= await firebase
            .auth()
            .createUserWithEmailAndPassword(userInfo.email,userInfo.password)
        console.log(createduser)
        await createduser.user.updateProfile(
            {
                displayName: userInfo.displayName
            }
        )
        let newuser={
            displayName: userInfo.displayName,
            createdAt:firestore.FieldValue.serverTimestamp()
        }
        await firestore.set(`users/${createduser.user.uid}`,{...newuser}) // add and set r different by using new id and default id
        dispatch(closeModal())
        }
        catch(error){
            console.log(error)
            toastr.error('something wroing in register')
            throw new SubmissionError(
                {
                    _error:error.message
                }
            )
        }

    }
}
export const socialLogin=(selectedprovider)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        try{
        let user=await firebase.login({
            provider:selectedprovider,
            type:'popup'
        })
        if( user.additionalUserInfo.isNewUser) {
            await firestore.set(`users/${user.user.uid}`,
            {
                displayName:user.profile.displayName,
                photoURL: user.profile.avatarUrl,
                createdAt:firestore.FieldValue.serverTimestamp()

            })
        }
        dispatch(closeModal())
        }
        catch(error){
            console.log(error)
            toastr.error(error.message)
            // throw new SubmissionError(
            //     {
            //         _error:error.message
            //     }
            // )
        }

    }
}
export const updatepassword=(creds)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        let user=firebase.auth().currentUser
        try{
          await user.updatePassword(creds.newPassword1);
          dispatch(reset('account'))
          toastr.success('Success','Password has been updated Successfully')
        }catch(error){
             throw new SubmissionError(
                {
                    _error:error.message
                }
            )
        }
    }
}
// export const logout=()=>{
//     return {
//         type:actionTypes.LOGOUT,
//     }
// }