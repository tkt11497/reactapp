import React from 'react'
import {Segment,Icon,Grid} from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react';
const EventMap = (props) => {
    const zoom=15
    const Marker = () => <Icon name='map marker alternate'  size='big' color='teal' />;
    return (
        <Segment attached='bottom'>
        <Grid>
        <Grid.Column width={16}>
        <div style={{ height: '200px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBZj09EooVd3EVzULdsI2-E1VS2R2OXKz4'}}
          defaultZoom={zoom}
          center ={props.venueLatLng}
        >
          <Marker
            lat={props.venueLatLng.lat}
            lng={props.venueLatLng.lng}
          />
        </GoogleMapReact>
        </div>
        </Grid.Column>
        </Grid>
        </Segment>
    )
}
export default EventMap