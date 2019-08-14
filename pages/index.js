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

  static async getInitialProps() {
    let blogs = [];
    await firestore
      .collection('blogs')
      .get()
      .then(documentSet => {
        documentSet.forEach(doc => {
          blogs.push({
            id: doc.id,
            ...doc.data()
          });
        });
        return blogs;
      });

    return { blogs };
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

        <hr />

        <div>
          <h2>From Props</h2>
          {this.props.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </div>

        <hr />

        <div className="jas">
          <BlogList blogs={this.state.blogs} />
        </div>
      </div>
    );
  }
}
