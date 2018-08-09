import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      // const id = this.props.match.params.id; //原始写法
      const { id } = this.props.match.params; //es6牛逼写法
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link className="btn btn-primary single-post-back" to="/">
          Back to Dashboard
        </Link>
        <button
          className="btn btn-danger pull-xs-right single-post-delete"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <div className="single-post-wrapper">
          <h3 className="single-post-title">{post.title}</h3>
          <h6 className="single-post-cat">Category: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({ fetchPost:fetchPost } , dispatch);
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
