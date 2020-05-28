/*global google*/
import React, { Component, createRef } from 'react'

class test extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const googleScript = document.createElement('script')
    googleScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZj09EooVd3EVzULdsI2-E1VS2R2OXKz4&libraries=places'
    window.document.body.appendChild(googleScript)

    googleScript.addEventListener('load', ()=>{
      this.googleMap =this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }

  createGoogleMap = () =>
    new google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: 43.642567,
        lng: -79.387054,
      },
      disableDefaultUI: true,
    })

  createMarker = () =>
    new google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: this.googleMap,
    })

  render() {
    return (
      <div
        ref={this.googleMapRef}
        style={{ width: '400px', height: '300px' }}
      />
    )
  }
}
export default test
function duplicateCount(text){
    //...
    let arr=text.toUpperCase().split('').sort()
    let count=0
    let init=''
    for (let i in arr){
      if(init==arr[i]){
          count++
        for(let i in arr){ 
        if ( arr[i] === init) 
        { 
            arr.splice(i, 1); i--; 
          
        }
        
        }
        init=''
      }else{
      init=arr[i]
      }
    }
    return count
  }