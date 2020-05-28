import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';

import Spinner from '../Spinner/Spinner';




class LoadingModal extends Component {
    render() {
        return (
            <Modal
                size='large'
                open={true} 
                basic
            >
                {/* <Modal.Header>
                    Login to Re-vents
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description> */}
                        <Spinner />
                    {/* </Modal.Description>
                </Modal.Content> */}
            </Modal>
        );
    }
}

export default LoadingModal;