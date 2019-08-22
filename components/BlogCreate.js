import React, { Component, Fragment } from 'react';
import moment from 'moment';
import slugify from 'slugify';
import Router from 'next/router';

export default class BlogCreate extends Component {
  titleRef = React.createRef();

  introRef = React.createRef();

  contentRef = React.createRef();

  cancel = () => {
    Router.push('/');
  };

  save = () => {
    console.log('saved');

    const newBlog = {
      title: this.titleRef.current.value,
      slug: slugify(this.titleRef.current.value),
      intro: this.introRef.current.value,
      content: this.contentRef.current.value,
      createdAt: moment().unix(),
      userID: 'gSwzGOq8spM02Ury9tRS' // TODO FIX ME
    };

    this.props.addBlog(newBlog);
  };

  render() {
    return (
      <Fragment>
        <div className="content">
          <div className="field">
            <label className="label">Title</label>
            <div className="control has-icons-right">
              <input
                ref={this.titleRef}
                className="input"
                placeholder="Blog title"
                name="title"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <textarea
                ref={this.introRef}
                className="textarea"
                placeholder="Blog Intro"
                name="intro"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea
                ref={this.contentRef}
                className="textarea"
                placeholder="Blog content"
                rows="7"
                name="content"
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={this.save}>
                Save
              </button>
            </div>
            <div className="control">
              <button className="button is-text" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
