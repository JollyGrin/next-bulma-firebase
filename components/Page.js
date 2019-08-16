import React, { Component } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import getConfig from 'next/config';
import TheHead from './TheHead';
import TheNav from './TheNav';
import TheFooter from './TheFooter';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

class Page extends Component {
  render() {
    return (
      <div className="site">
        <TheHead />
        <TheNav />
        <main className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1 is-mobile">
              {this.props.children}
            </div>
          </div>
        </main>
        <TheFooter />
        <style jsx>{`
          .site {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
          }
          main {
            flex: 1;
          }
        `}</style>
      </div>
    );
  }
}

export default Page;
