import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { firestore } from '../../lib/db';
import { fetchDocumentFromCollectionByFieldName } from '../../lib/utility';
import BlogShow from '../../components/BlogShow';
import BlogEdit from '../../components/BlogEdit';

class Blog extends Component {
  _isMounted = false;

  state = {
    blog: null,
    editMode: false
  };

  constructor(props) {
    super(props);
    this.blogSlug = this.props.router.query.slug;
    this.collectionName = 'blogs';
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  };

  blogListener = () => {
    fetchDocumentFromCollectionByFieldName({
      collectionName: this.collectionName,
      fieldName: 'slug',
      value: this.blogSlug
    }).then(blog => {
      // set the state

      if (this._isMounted) {
        this.setState({ blog });
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.blogListener();

    this.unsubscribe = firestore
      .collection(this.collectionName)
      .where('slug', '==', this.blogSlug)
      .onSnapshot(this.blogListener, error => {
        console.log(`firestone snapshot error ${error}`);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unsubscribe();
  }

  render() {
    if (this.state.blog === null) {
      return <div>Loading Content</div>;
    }

    if (this.state.editMode) {
      return <BlogEdit />;
    }

    return (
      <BlogShow blog={this.state.blog} toggleEditMode={this.toggleEditMode} />
    );
  }
}

export default withRouter(Blog);
