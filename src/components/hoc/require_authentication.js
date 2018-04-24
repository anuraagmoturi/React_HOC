import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {
  class Authencation extends Component {
    // static defines class level property
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    //edge case where user is on resource page and then clicks sign out,
    // he is kicked back to home
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated){
        this.context.router.push('/');
      }
    }

    render() {
      console.log(this.props.authenticated);
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps({authenticated}) {
    return {
      authenticated
    }
  }
  return connect(mapStateToProps)(Authencation);
}

