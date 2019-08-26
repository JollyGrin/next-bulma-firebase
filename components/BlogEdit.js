import React, { Component, Fragment } from 'react';
import DateFormatter from './DateFormatter';
import moment from 'moment';
import slugify from 'slugify';
import { basename } from 'path';

const Confirmation = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="notification is-success">
      <button className="delete is-small" onClick={props.closeConfirmation} />
      <p>
        {' '}
        Your changes have been successfully saved. Click{' '}
        <a
          onClick={props.toggleEditMode}
          className="is-link has-text-weight-bold"
        >
          here
        </a>{' '}
        to view the post.
      </p>
    </div>
  );
};

export default class BlogEdit extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      title: props.blog.title,
      intro: props.blog.intro,
      content: props.blog.content,
      createdAt: props.blog.createdAt,
      hasModified: false
    };
  }

  save = () => {
    const blog = {
      title: this.state.title,
      slug: slugify(this.state.title, { lower: true }),
      intro: this.state.intro,
      content: this.state.content,
      createdAt: moment().unix(),
      userID: 'gSwzGOq8spM02Ury9tRS'
    };
    this.props.updateBlog(blog);
    if (this._isMounted) {
      this.setState({ hasModified: true });
    }
  };

  closeConfirmation = () => this.setState({ hasModified: false });

  handleChange = event => {
    if (this._isMounted) {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { title, intro, content, createdAt } = this.state;

    return (
      <Fragment>
        <Confirmation
          toggleEditMode={this.props.toggleEditMode}
          closeConfirmation={this.closeConfirmation}
          show={this.state.hasModified}
        />
        <div className="content">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                placeholder="Blog title"
                value={title}
                onChange={this.handleChange}
                name="title"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Intro</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="blog intro"
                value={intro}
                onChange={this.handleChange}
                name="intro"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Intro</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="blog content"
                value={content}
                onChange={this.handleChange}
                name="intro"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <span>Last Updated: </span>
              <strong className="has-text-info">
                <DateFormatter timestamp={createdAt} />
              </strong>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={this.save}>
                Update
              </button>
            </div>
            <div className="control">
              <button
                className="button is-text"
                onClick={this.props.toggleEditMode}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
