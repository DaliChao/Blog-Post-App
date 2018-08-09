import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const className = `form-group ${
      field.meta.touched && field.meta.error ? 'has-danger' : ''
    }`;
    if (field.label == 'Post Content') {
      return (
        <div className={className}>
          <label>{field.label}</label>
          <textarea className="form-control" {...field.input} />
          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
      );
    } else {
      return (
        <div className={className}>
          <label>{field.label}</label>
          <input className="form-control" type="text" {...field.input} />
          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
      );
    }
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/'); //navigate to home page after submit
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3 style={{ marginBottom: '30px' }}>Create a new post: </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Post Title" name="title" component={this.renderField} />

          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />

          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="btn btn-danger" to="/">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //这里传入的参数value，是一个object：{title：'', categories:'', content: ''},来自form里的值

  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }

  if (!values.content) {
    errors.content = 'Enter some content!';
  }

  return errors;
  //if error is empty, the form is fine to submit. Otherwise, not good to submit.
}

export default reduxForm({
  validate,
  // validate: validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));
