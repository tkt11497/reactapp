import * as actionTypes from '../actions/actionTypes'
const initialState={
    isLoading:false,
    name:null
}
const reducer =(state=initialState,action)=>{

    switch(action.type){
        case actionTypes.ASYNC_ACTION_START:
            return {...state,isLoading:true,name:action.name}
        case actionTypes.ASYNC_ACTION_FINISH:
            return {...state,isLoading:false,name:null}
        case actionTypes.ASYNC_ACTION_ERROR:
            return {...state,isLoading:false,error:'ERROR'}
        default:
            return state
    }


}
export default reducer