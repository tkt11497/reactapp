import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Icon, Button}from 'semantic-ui-react'
import {geocodeByAddress,getLatLng} from 'react-places-autocomplete'
import {reduxForm,Field} from 'redux-form'
import PlacesInput from '../../components/form/PlacesInput'
import {connect} from 'react-redux'
import {openModal,asyncModalOpen} from '../../store/actions/index'
const Marker = () => <Icon name='map marker alternate'  size='big' color='teal' />;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 20
  };
  state={
    cityLatLng:{},
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
  componentDidMount=()=>{
    navigator.geolocation.getCurrentPosition(this.getPosition)
  }
 getPosition=(position)=>{
   const lat=position.coords.latitude
   const lng=position.coords.longitude
   this.setState({
    cityLatLng:{lat:lat,
    lng:lng}
   }
    
   )
 }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50vw' }}>
        <Button name="test" loading={this.props.element=='test'&&this.props.loading} onClick={(e)=>this.props.asyncModalOpen('testModal',null,e.target.name)} >a Open Modal</Button>
        <Button name="test1" loading={this.props.element=='test1'&&this.props.loading} onClick={(e)=>this.props.asyncModalOpen('testModal',null,e.target.name)} > Open Modal</Button>
         <Field name="city" component={PlacesInput} type="text" label="Event City" placeholder="City"  
        onSelecter={this.handleSelectCity}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBZj09EooVd3EVzULdsI2-E1VS2R2OXKz4'}}
          defaultZoom={this.props.zoom}
          center ={this.state.cityLatLng}
        >
          <Marker
            lat={this.state.cityLatLng.lat}
            lng={this.state.cityLatLng.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
// const mapDispatchToProps=dispatch=>{
//   return {
//     openModal:(name,props)=>dispatch(openModal(name)),
//   }
// }
const mapDispatchToProps={
  asyncModalOpen
}
const mapStateToProps=(state,ownPorps)=>{
  return {
    loading:state.async.isLoading,
    element:state.async.name
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (reduxForm({form:'testfrom'})(SimpleMap))