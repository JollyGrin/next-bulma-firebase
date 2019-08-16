// const withSass = require('@zeit/next-sass');

// module.exports = withSass();

require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  serverRuntimeConfig: {
    // only available on the serverside
    secret: '123'
  },

  publicRuntimeConfig: {
    // this will be available on both server & client
    NProgressShowSpinner: false
  },

  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
};
