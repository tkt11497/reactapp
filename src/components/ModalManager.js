import React from 'react'
import {connect}from 'react-redux'
import testModal from '../pages/test/testModal'
import loginModal from '../components/modals/loginModal'
import registerModal from '../components/modals/registerModal'
import loadingModal from '../components/modals/loadingModal'
import unAuthModal from '../components/modals/unAuthModal'
const modals={
    testModal,
    loginModal,
    registerModal,
    loadingModal,
    unAuthModal

}

 const ModalManager = (props) => {
     let renderModal=null;
     if(props.currentmodal){
         const {modalName,modalProps}=props.currentmodal
         const ModalComponent=modals[modalName]
         renderModal=<ModalComponent {...modalProps}/>
     }
    return (
        <span>
           {renderModal} 
        </span>
    )
}

const mapStateToProps=(state)=>{
    return{
        currentmodal:state.modal
      }
}
export default connect(mapStateToProps) (ModalManager)