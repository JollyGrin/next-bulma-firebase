import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import DateFormatter from './DateFormatter';
import RelatedBlogs from '../components/RelatedBlogs';
import UserInfo from '../components/UserInfo';

export default class BlogShow extends Component {
  render() {
    const {
      title,
      intro,
      content,
      createdAt,
      userID,
      id,
      slug
    } = this.props.blog;
    return (
      <Fragment>
        <Head>
          {title} | {process.env.PROJECT_NAME}
        </Head>
        <div className="content is-medium blog">
          <div>
            <h3 className="title has-text-centered">{title}</h3>
            <div className="subtitle is-6">
              <UserInfo userID={userID} />
            </div>
          </div>
          <p className="has-text-centered is-size-5 blog-intro">{intro}</p>
          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <p>{content}</p>
                <div className="is-size-7 publish-date">
                  This Blog was written {` `}
                  <em>
                    <DateFormatter timestamp={createdAt} />
                  </em>
                </div>
              </div>
              <RelatedBlogs />
            </div>
          </div>
        </div>

        <style jsx>{`
          .publish-date {
            margin-top: 1rem;
          }
        `}</style>
      </Fragment>
    );
  }
}
