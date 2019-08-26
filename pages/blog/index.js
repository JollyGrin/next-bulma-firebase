import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import base from '../../lib/db';
import { fetchDocumentFromCollectionByFieldName } from '../../lib/utility';
import BlogShow from '../../components/BlogShow';
import BlogEdit from '../../components/BlogEdit';

class Blog extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      blog: null,
      editMode: false
    };
  }

  toggleEditMode = () => {
    if (this._isMounted) {
      this.setState(prevState => ({
        editMode: !prevState.editMode
      }));
    }
  };

  updateBlog = blog => {
    if (this._isMounted) {
      this.setState({ blog });
    }
    Router.push(`/blog?slug=${blog.slug}`, `/blog/${blog.slug}`);
  };

  componentDidMount() {
    this._isMounted = true;

    fetchDocumentFromCollectionByFieldName({
      collectionName: 'blogs',
      fieldName: 'slug',
      value: this.props.router.query.slug
    }).then(blog => {
      // set the state

      if (this._isMounted) {
        this.setState({ blog });
      }

      this.ref = base.syncDoc(`/blogs/${blog.id}`, {
        context: this,
        state: 'blog'
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    base.removeBinding(this.ref);
  }

  render() {
    // TODO, fix if statement
    if (this.state.blog === null) {
      return <div>Loading Content</div>;
    }

    if (this.state.editMode) {
      return (
        <BlogEdit
          toggleEditMode={this.toggleEditMode}
          blog={this.state.blog}
          updateBlog={this.updateBlog}
        />
      );
    }

    return (
      <BlogShow blog={this.state.blog} toggleEditMode={this.toggleEditMode} />
    );
  }
}

export default withRouter(Blog);
