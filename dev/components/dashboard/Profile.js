import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getOneUser  } from '../../actions/usersActionCreators';
import User_Feeds from './User_Feeds';
import User_Info from './User_Info';

class Profile extends Component {

  constructor(props){
    super(props);
    if(this.props.params) {
      this.props.getUserProfile(this.props.params.id);
    } else if (this.props.activeUser) {
      this.props.getUserProfile(this.props.activeUser.id);
    } else {
      this.props.getUserProfile(0)
    }
  }

  render() {
    return (
      <div >
       <h1>Profile</h1>
       <div className='row'>
         <User_Info user={this.props.viewedProfile}/>
         <User_Feeds user={this.props.viewedProfile}/>
       </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    activeUser: state.auth.activeUser,
    viewedProfile: state.user.viewedProfile
  };
}

var dashboard = connect(mapStateToProps, {
  getUserProfile: getOneUser
})(Profile);
export default dashboard;
