import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { fetchDocumentFromCollectionByFieldName } from '../lib/utility';

class Blog extends Component {
  state = {
    blog: null
  };

  componentDidMount() {
    // find the blog
    fetchDocumentFromCollectionByFieldName({
      collectionName: 'blogs',
      fieldName: 'slug',
      value: this.props.router.query.slug
    }).then(blog => {
      // update the state
      console.log(blog);
      this.setState({ blog });
    });
    // update the state
  }

  render() {
    if (this.state.blog === null) {
      return <div>Loading Content</div>;
    }

    return (
      <div>
        <h1>This is Blog Page</h1>
        <h1>{this.props.router.query.slug}</h1>
        <h1>{this.state.blog.title}</h1>
      </div>
    );
  }
}

export default withRouter(Blog);
