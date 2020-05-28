import * as actionTypes from './actionTypes'

 export const asyncActionStart=(name)=>{
    return {
        type:actionTypes.ASYNC_ACTION_START,
        name
    }
}
export const asyncActionFinish=()=>{
    return {
        type:actionTypes.ASYNC_ACTION_FINISH,
    }
}
export const asyncActionError=()=>{
    return {
        type:actionTypes.ASYNC_ACTION_ERROR
    }
}