import React, { Component, Fragment } from 'react';
import { fetchDocumentFromCollection } from '../lib/utility';
import Link from 'next/link';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetchDocumentFromCollection({
      id: this.props.userID,
      collectionName: 'users'
    }).then(user => {
      this.setState({ user });
    });
  }

  render() {
    if (this.state.user === null) {
      return null;
    }

    return (
      <Fragment>
        <div className="user-profile">
          <div className="avatar">
            <figure className="image is-48x48">
              <img src={this.state.user.avatar} alt="User Profile Photo" />
            </figure>
          </div>
          <Link href="#">
            <a>
              <span>{this.state.user.name}</span>
            </a>
          </Link>
        </div>
        <style jsx>{`
          .user-profile {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          figure {
            margin-right: 0.3rem;
            margin-left: 0;
          }
        `}</style>
      </Fragment>
    );
  }
}
