import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { firestore } from '../../lib/db';
import { fetchDocumentFromCollectionByFieldName } from '../../lib/utility';
import BlogShow from '../../components/BlogShow';

class Blog extends Component {
  state = {
    blog: null
  };

  constructor(props) {
    super(props);
    this.blogSlug = this.props.router.query.slug;
    this.collectionName = 'blogs';
  }

  blogListener = () => {
    fetchDocumentFromCollectionByFieldName({
      collectionName: this.collectionName,
      fieldName: 'slug',
      value: this.blogSlug
    }).then(blog => {
      this.setState({ blog });
    });
  };

  componentDidMount() {
    this.blogListener();

    this.unsubscribe = firestore
      .collection(this.collectionName)
      .where('slug', '==', this.blogSlug)
      .onSnapshot(this.blogListener, error => {
        console.log(`firestone snapshot error ${error}`);
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.blog === null) {
      return <div>Loading Content</div>;
    }

    const {
      title,
      intro,
      content,
      createdAt,
      userID,
      id,
      slug
    } = this.state.blog;

    return <BlogShow blog={this.state.blog} />;
  }
}

export default withRouter(Blog);
