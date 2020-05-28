import * as actionTypes from '../actions/actionTypes'

 const initialState = null


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
       case actionTypes.MODAL_OPEN:
           return {...state,modalName:action.modalName,modalProps:action.modalProps}
       case actionTypes.MODAL_CLOSE:
            return null;
        default:
            return state;
    }
};
export default reducer;