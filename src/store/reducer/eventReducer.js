import * as actionTypes from '../actions/actionTypes'

 const initialState = []

const eventUpdater=(state,action)=>{
    const updatedEvents= state.events.map((event)=>{
        if(event.id==action.toUpdateEvent.id){
          return {...action.toUpdateEvent}
        }else{
          return event
        }
  })
  return {
      ...state,events:updatedEvents
  }
}

const eventDeleter=(state,action)=>{
    const deletedEvents=state.events.filter(event=>{
        return event.id!=action.toDeleteEventId
    })
    return {
        ...state,events:deletedEvents
    }
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_EVENTS:
            return action.events
       case actionTypes.CREATE_EVENT:
           return {...state,events:[...state.events,action.event]}
       case actionTypes.DELETE_EVENT:
            return eventDeleter(state,action)
            
        case actionTypes.UPDATE_EVENT:
            return eventUpdater(state,action)
        default:
            return state;
    }
};
export default reducer;