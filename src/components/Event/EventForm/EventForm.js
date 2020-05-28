/*global google*/
import React, { Component } from 'react'
import {Segment,Form,Button,Grid, Header} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withFirestore}from 'react-redux-firebase'
import {toastr} from 'react-redux-toastr'
import classes from '../EventForm/eventForm.module.css'
import {creatEvent,updateEvent,cancelToggle} from '../../../store/actions/index'
import TextInput from '../../form/TextInput'
import TextArea from '../../../components/form/TextArea'
import SelectInput from '../../../components/form/SelectInput'
import DateInput from '../../../components/form/DateInput'
import PlacesInput from '../../../components/form/PlacesInput'
import {reduxForm,Field} from 'redux-form'
import {composeValidators,combineValidators, isRequired,hasLengthGreaterThan} from 'revalidate'
import {geocodeByAddress,getLatLng} from 'react-places-autocomplete'

class EventForm extends Component {

        // state={...this.props.event}
        // onChangeHandler=(event)=>{
        //   console.log(event.target.value)
        //  event.persist()
          
        //  this.setState((prevState)=>{
        //    console.log('asdsadsa',event)
        //    return {...prevState,formdata:{
        //      ...prevState.formdata,[event.target.name]:event.target.value
        //    }}
        //  })
          
        // }
        // componentDidMount=()=>{
        //   if(this.props.selectedEvent){
        //     this.setState({
        //       ...this.props.selectedEvent,isRemove:false
        //     })
        //   }
        // }
        // onChangeHandler=(e)=>{
        //   this.setState({
        //     [e.target.name]:e.target.value
        //   })
        // }
        state={
          cityLatLng:{},
          venueLatLng:{}
        }
        componentDidMount=async()=>{
         
          await this.props.firestore.setListener(`events/${this.props.match.params.id}`)// set does not update live data like firestore connect
          
        
        }
        componentWillUnmount=async()=>{
          await this.props.firestore.unsetListener(`events/${this.props.match.params.id}`)
        }
        FormSubmit= async (value)=>{
          try{
            value.venueLatLng=this.state.venueLatLng
            // e.preventDefault()
            //validation
            if(Object.keys(value.venueLatLng).length===0){
              value.venueLatLng=this.props.event.venueLatLng
            }
             if(this.props.initialValues.id){
            await this.props.Eventupdater(value)
            this.props.history.push(`/eventdetail/${this.props.initialValues.id}`)
             }else{
            //  const updatedData={...value,id:Math.random().toFixed(2)*100,hostPhotoURL:"/assets/user.png",hostedBy:'BOB'}
           let createdEvent=await this.props.createEvent(value)
           this.props.history.push(`/eventdetail/${createdEvent.id}`)
             }
          }catch(error){
            console.log(error)
          }
        
        }
        handleSelectCity=(city)=>{
          geocodeByAddress(city).then((result)=>getLatLng(result[0]))
          .then((latLng)=>{
            this.setState({
              cityLatLng:latLng
            })
          })
          .then(()=>this.props.change('city',city))
        }
        handleSelectVenue=(venue)=>{
          geocodeByAddress(venue).then((result)=>getLatLng(result[0]))
          .then((latLng)=>{
            this.setState({
              venueLatLng:latLng
            })
          })
          .then(()=>this.props.change('venue',venue))
        }
    render() {
      // console.log(this.props.event.isCancelled===undefined,'asdas')
      const category = [
          {key: 'drinks', text: 'Drinks', value: 'drinks'},
          {key: 'culture', text: 'Culture', value: 'culture'},
          {key: 'film', text: 'Film', value: 'film'},
          {key: 'food', text: 'Food', value: 'food'},
          {key: 'music', text: 'Music', value: 'music'},
          {key: 'travel', text: 'Travel', value: 'travel'},
      ];
        return (  
        <Grid>
          <Grid.Column width={10}>
                
        <Segment className={classes.HI}>
        <Form onSubmit={this.props.handleSubmit(this.FormSubmit)}>
        <Header color='teal' sub content='Event Detail'/>
        <Field name="title" component={TextInput} type="text" label="Event Title" placeholder="Give your Event a Name" />
        <Field name="category" component={SelectInput} multiple={false} options={category} label="Event Category" placeholder="What is your event about?" />
        <Field name="description" component={TextArea}  rows="3" type="text" label="Event Description" placeholder="Tell us about your event" />
        <Header color='teal' sub content='Event Location'/>
        <Field name="city" component={PlacesInput} type="text" label="Event City" placeholder="City" options={{types:['(cities)']}} 
        onSelecter={this.handleSelectCity}/>
        <Field name="venue" component={PlacesInput} type="text" label="Event Venue" placeholder="Venue"
         options={{location: new window.google.maps.LatLng(this.state.cityLatLng), radius:1000}}
        onSelecter={this.handleSelectVenue} />
        <Field name="date" component={DateInput} 
        type="text" 
        label="Event Date" 
        placeholder="Date" 
        dateFormat="dd LLL yyyy h:mm a"
        showTimeSelect 
        timeFormat='HH:mm'/>
                 
          <Button loading={this.props.loading} positive type="submit" disabled={this.props.invalid||this.props.submitting||this.props.pristine}>
            Submit
          </Button>
          <Button disabled={this.props.loading} type="button" onClick={()=>this.props.history.push(this.props.match.params.id?
          `/eventdetail/${this.props.match.params.id }`:'/eventdashboard')}>Cancel</Button>
          {(this.props.event.isCancelled!==undefined)&&<Button 
          type='button'
          color={this.props.event.isCancelled?'green':'red'} 
          floated='right'
          content={this.props.event.isCancelled?'Reactivate Event':'Cancel event'} 
          onClick={()=>this.props.cancelToggle(!this.props.event.isCancelled,this.props.event.id)}/>}

        </Form>
      </Segment>
      </Grid.Column>
    </Grid>
      
                  
        )
    }
}
const validate=combineValidators({
  title:isRequired({message:'Event title is required'}),
  category:isRequired({message:'Event category is required'}),
  description:composeValidators(
    isRequired({message:'description is required'}), hasLengthGreaterThan(4)({message:'description need to be at least 5 characters'})
  )(),
  city:isRequired('city'),
  venue:isRequired('venue'),
  date:isRequired('date')

})

const mapStateToProps=(state,OwnProps)=>{
  const eventId=OwnProps.match.params.id 
    let event={}
    if(state.firestore.ordered.events&& state.firestore.ordered.events.length>0){
        event=state.firestore.ordered.events.filter(event=>event.id==eventId)[0]||{}
    }
return{
  initialValues:event,// if some keys and values in event change it does not know and rerender the component
  event,
  loading:state.async.isLoading
}
}
const mapDispatchToProps=dispatch=>{
  return{
    createEvent:(data)=>dispatch(creatEvent(data)),
    Eventupdater:(toUpdateEvent)=>dispatch(updateEvent(toUpdateEvent)),
    cancelToggle:(isCancelled,eventId)=>dispatch(cancelToggle(isCancelled,eventId))
  }
}
export default withFirestore(connect(mapStateToProps,mapDispatchToProps)(reduxForm({form:'eventForm',validate,enableReinitialize:true})(EventForm)))