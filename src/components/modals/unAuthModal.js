import React, {Component} from 'react';
import {Modal, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {closeModal, openModal} from "../../store/actions/index";



class UnauthModal extends Component {
    handleClose=()=>{
        this.props.history.goBack();
        this.props.closeModal()
    }
    render() {
        const {openModal, closeModal} = this.props;
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.handleClose}
            >
                <Modal.Header>
                    You need to be signed in to do that!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Please either login or register to see this page</p>
                        <Button.Group widths={4}>
                            <Button fluid color='teal' onClick={() => openModal("loginModal")}>Login</Button>
                            <Button.Or />
                            <Button fluid positive onClick={() => openModal("registerModal")}>Register</Button>
                        </Button.Group>
                        <Divider/>
                        <div style={{textAlign: 'center'}}>
                            <p>Or click cancel to continue as a guest</p>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
const mapDispatchToProps = {closeModal, openModal};
export default withRouter(connect(null, mapDispatchToProps)(UnauthModal));