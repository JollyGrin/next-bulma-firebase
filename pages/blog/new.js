import React, { Component } from 'react';
import Router from 'next/router';
import { firestore } from '../../lib/db';
import BlogCreate from '../../components/BlogCreate';

export default class newBlog extends Component {
  addBlog = blog => {
    console.log('from new.js');
    console.log(blog);

    firestore
      .collection('blogs')
      .add(blog)
      .then(() => {
        Router.push(`/blog?slug=${blog.slug}`, `/blog/${blog.slug}`);
      });
  };

  render() {
    return (
      <div>
        <BlogCreate addBlog={this.addBlog} />
      </div>
    );
  }
}
