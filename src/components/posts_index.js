import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  onDeleteClick(id) {
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item row" key={post.id}>
          <Link
            to={`/posts/${post.id}`}
            className="col-md-7 col-sm-6 post-title"
            style={{ marginTop: '7px' }}
          >
            {post.title}
          </Link>
          <h6
            className="col-md-3 col-sm-3 post-cat"
            style={{ marginTop: '10px' }}
          >
            Category:&nbsp;&nbsp;
            <span>{post.categories}</span>
          </h6>
          <div className="col-md-2 col-sm-3 button-div">
            <button
              className="btn btn-danger"
              onClick={this.onDeleteClick.bind(this, post.id)}
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts:</h3>
        <ul className="list-group" style={{ marginTop: '30px' }}>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchPosts}, dispatch);
//   //return bindActionCreators({fetchPosts: fetchPosts}, dispatch);
// }

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostsIndex);
// export default connect(null, {fetchPosts:fetchPosts})(PostsIndex);
// export default connect(null, mapDispatchToProps)(PostsIndex);
