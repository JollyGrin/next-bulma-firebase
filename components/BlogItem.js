import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import DateFormatter from './DateFormatter';
import UserInfo from './UserInfo';

export default class BlogItem extends Component {
  render() {
    const { title, intro, createdAt, userID, id, slug } = this.props.blog;

    return (
      <Fragment>
        <div className="content is-medium blog">
          <div>
            <h3 className="title has-text-centered">{title}</h3>
            <div className="subtitle is-6 has-text-centered">
              <UserInfo userID={userID} />
              <DateFormatter timestamp={createdAt} />
            </div>
          </div>
          <p className="has-text-centered is-size-5 blog-intro">{intro}</p>
          <div>
            <div className="is-pulled-right is-size-7">
              <Link as={`/blog/${slug}`} href={`/blog?slug=${slug}`}>
                <a>Read More</a>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          .blog {
            padding-bottom: 2rem;
            border-bottom: 2px solid whitesmoke;
          }
          .blog-intro {
            margin-top: 2rem;
          }
        `}</style>
      </Fragment>
    );
  }
}
