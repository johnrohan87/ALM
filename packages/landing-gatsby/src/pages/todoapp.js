import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
//import { Link } from 'gatsby';
import { ThemeProvider } from 'styled-components';
//import Sticky from 'react-stickynode';
import { hostingTheme } from 'common/theme/hosting';
import { GlobalStyle } from 'containers/Hosting/hosting.style'; //, ContentWrapper
import { ResetCSS } from 'common/assets/css/style';
import Navbar from 'containers/Hosting/Navbar_About';
//import Box from 'common/components/Box';
//import Text from 'common/components/Text';
//import Container from 'common/components/UI/Container';
import TodoApp from '../containers/ALM/Todo/index.js';

//import Layout from 'components/layout';
//import { DrawerProvider } from 'common/contexts/DrawerContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import SEO from 'components/seo';

import { getUser, isLoggedIn } from '../common/services/auth';

const ToDoApp = () => {
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/');
    }
  }, []);

  return (
    <ThemeProvider theme={hostingTheme}>
      <ParallaxProvider>
        <ResetCSS />
        <GlobalStyle />
        <Navbar />
        <SEO title="ToDoApp" />
        <TodoApp />
        {/*<Link to="/">Go back to the homepage</Link>*/}
      </ParallaxProvider>
    </ThemeProvider>
  );
};

export default ToDoApp;
