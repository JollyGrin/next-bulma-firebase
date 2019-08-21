import Head from 'next/head';
import { firestore } from '../lib/db';
import React, { Component } from 'react';
import {
  fetchCollectionDocs,
  fetchDocumentFromCollection
} from '../lib/utility';
import BlogList from '../components/BlogList';

export default class Index extends Component {
  state = {
    blogs: []
  };

  constructor(props) {
    super(props);
    this.collectionRef = firestore.collection('blogs');
  }

  blogListener = () => {
    fetchCollectionDocs('blogs').then(blogs => {
      this.setState({ blogs });
    });
  };

  // subscribe to firestore realtime for changes
  componentDidMount() {
    this.unsubscribe = this.collectionRef.onSnapshot(
      this.blogListener,
      error => {
        console.log(`Error on Firebase Snapshot: ${error}`);
      }
    );
  }

  // unsubscribe from firestore listener
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Head>
          <title>{process.env.PROJECT_NAME} - Home Page</title>
        </Head>

        <BlogList blogs={this.state.blogs} />
      </div>
    );
  }
}
