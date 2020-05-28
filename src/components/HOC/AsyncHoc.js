import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from '../Spinner/Spinner'
export default function(Cmp) {
    class AsyncHoc extends Component {
  
      render() {
          
        if (this.props.loading) {
        return (
          <Cmp/>
        );
        } else {
        return (
          <Spinner/>
        );
        }
      }
    }
  
    const mapStateToProps = state => ({
      loading: state.firebase.auth.isLoaded
    });
  
    const mapDispatchToProps = {
    
    };
  
    return connect(mapStateToProps, mapDispatchToProps)(AsyncHoc);
  }