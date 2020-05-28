import React, { Fragment,Component } from 'react'
import NavBar from '../NavBar/NavBar'
import {Container} from 'semantic-ui-react'

export default class PublicLayout extends Component {
    render() {
        return (
            <Fragment>
            <NavBar/>
            <Container className="main">
                {this.props.children}
            </Container>
            </Fragment>
        )
    }
}
