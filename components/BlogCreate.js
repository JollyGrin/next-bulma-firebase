import React, { Component, Fragment } from 'react';

export default class BlogCreate extends Component {
  titleRef = React.createRef();
  introRef = React.createRef();
  contentRef = React.createRef();

  cancelled = () => {
    console.log('cancelled');
  };

  save = () => {
    console.log('saved');
    console.log(this.titleRef.current.value);
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
              <button className="button is-text" onClick={this.cancelled}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
