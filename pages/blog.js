import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { firestore } from '../lib/db';
import { fetchDocumentFromCollectionByFieldName } from '../lib/utility';
import DateFormatter from '../components/DateFormatter';

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

    return (
      <Fragment>
        <div className="content is-medium blog">
          <div>
            <h3 className="title has-text-centered">{title}</h3>
            <p className="subtitle is-6 has-text-centered">
              <Link href="#">
                <a>@jollygrin</a>
              </Link>
              <DateFormatter timestamp={createdAt} />
            </p>
          </div>
          <p className="has-text-centered is-size-5 blog-intro">{intro}</p>

          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <p>{content}</p>
              </div>
              <div className="column is-3">
                <p>More From Dean</p>
                <ul>
                  <li>🦅</li>
                  <li>🇺🇸</li>
                  <li>💰</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .blog {
            padding-bottom: 2rem;
            // border-bottom: 2px solid whitesmoke;
          }
          .blog-intro {
            margin-top: 2rem;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default withRouter(Blog);
