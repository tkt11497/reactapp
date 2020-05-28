import * as actionTypes from '../actions/actionTypes'
import {asyncActionStart,asyncActionFinish} from './index'
export const openModal=(modalName,modalProps)=>{
   
    return{
        type: actionTypes.MODAL_OPEN,
        modalName,
        modalProps
    
    }
}
export const closeModal=(modalName,modalProps)=>{
    return{
        type: actionTypes.MODAL_CLOSE,
        modalName,
        modalProps
      
    }
}
const delay=ms=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}
export const asyncModalOpen=(modalName,modalProps,name)=>{
    return async dispatch=>{
        dispatch(asyncActionStart(name))
        await delay(3000)
        dispatch(openModal(modalName,modalProps))
        dispatch(asyncActionFinish())
    }

}
