/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// ./gatsby-browser.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@popperjs/core/dist/umd/popper.min.js';

import React from 'react';

import { GlobalProvider } from './src/common/contexts/GlobalContext';
export const wrapRootElement = GlobalProvider;
/*
import React from 'react';
import { silentAuth } from './src/common/utils/auth';

import StoreProvider from './src/common/utils/store/wrap-with-provider';

class SessionCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleCheckSession = () => {
    this.setState({ loading: false });
  };

  componentDidMount() {
    silentAuth(this.handleCheckSession);
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    );
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <SessionCheck>
      <StoreProvider>{element}</StoreProvider>
    </SessionCheck>
  );
};
*/
