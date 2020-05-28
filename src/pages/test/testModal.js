import React from 'react'
import {Modal} from 'semantic-ui-react'
import {closeModal} from '../../store/actions/index'
import {connect}from 'react-redux'
const testModal = (props) => {
    return (
            <Modal closeIcon="close" open={true} onClose={props.closeModal}>
              <Modal.Header>Test Modal</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <p>Test Modal... nothing to see here</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
    )
}
const mapDispatchToProps=dispatch=>{
  return {
    closeModal:(name,props)=>dispatch(closeModal(name,props))
  }
}
export default connect(null,mapDispatchToProps)(testModal)