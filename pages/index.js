import Head from 'next/head';
import base, { firestore } from '../lib/db';
import React, { Component } from 'react';
import BlogList from '../components/BlogList';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [] };
  }

  componentDidMount() {
    this.ref = base
      .get('blogs', {
        context: this,
        withIds: true,
        query: ref => ref.orderBy('createdAt', 'desc')
      })
      .then(blogs => {
        this.setState({ blogs });
      })
      .catch(error => {
        console.log(`There was an error on fetching the blogs ${error}`);
      });
  }

  // unsubscribe from firestore listener
  componentWillUnmount() {
    base.removeBinding(this.ref);
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
