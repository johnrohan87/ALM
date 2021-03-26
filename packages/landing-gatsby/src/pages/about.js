import React from 'react';
import { Link } from 'gatsby';
import { ThemeProvider } from 'styled-components';
//import Sticky from 'react-stickynode';
import { hostingTheme } from 'common/theme/hosting';
import { GlobalStyle } from 'containers/Hosting/hosting.style'; //, ContentWrapper
import { ResetCSS } from 'common/assets/css/style';
import Navbar from 'containers/Hosting/Navbar_About';
//import Box from 'common/components/Box';
//import Text from 'common/components/Text';
//import Container from 'common/components/UI/Container';
import AboutSection from 'containers/Hosting/About';

//import Layout from 'components/layout';
//import { DrawerProvider } from 'common/contexts/DrawerContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import SEO from 'components/seo';

const About = () => (
  <ThemeProvider theme={hostingTheme}>
    <ParallaxProvider>
      <ResetCSS />
      <GlobalStyle />
      <Navbar />
      <SEO title="About Affiliate Lead Marketing" />
      <AboutSection />
      <Link to="/">Go back to the homepage</Link>
    </ParallaxProvider>
  </ThemeProvider>
);

export default About;
