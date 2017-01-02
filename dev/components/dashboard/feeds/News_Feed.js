import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOnePost } from '../../../actions/postsActionCreators'

class News_Feed extends Component {

  handleSelect(event){
    console.log('you clicked on post id:', event.target.value);
  }

  render() {

    return (
      <div className="feed_content">
       <ul>
         {this.props.userFeed.map( post =>
           <li
             onClick={(e) => {
               this.handleSelect(e);
               this.props.getOnePost(post.id)
             }}
             key={post.id} className='list-item' value={post.id}>
             <div>
               <img className="userPic" src={post.userInfo.profPic} />
             </div>
             <p>{post.description}</p>
             {/* UserId: {post.UserId} postId: {post.id} */}
           </li>
         )}
       </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // returns input state as props in output
  return {
  };
}

function mapDispatchToProps(dispatch) {
  // pass the result of selectBook to all reducers
  return bindActionCreators({ getOnePost: getOnePost }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(News_Feed);
