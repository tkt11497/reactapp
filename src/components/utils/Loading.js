import React from 'react'
import {Dimmer,Loader} from 'semantic-ui-react'
import Spinner from '../Spinner/Spinner'
 const Loading = ({inverted=true,content}) => {

    return (
        <Dimmer inverted={inverted} active={true}>
            <Spinner content={content}/>
        </Dimmer>
    )
}
export default Loading