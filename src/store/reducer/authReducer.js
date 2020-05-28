import * as actionTypes from '../actions/actionTypes'
const initailState={
    authenticated:false,
    currentUser:null
}

const reducer=(state=initailState,action)=>{
    switch (action.type){
        case actionTypes.LOGIN:
            return{...state,authenticated:true,currentUser:action.email}
        case actionTypes.LOGOUT:
            return{...state,authenticated:false,currentUser:null}
        default:
            return state
    }

}
export default reducer