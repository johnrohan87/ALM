import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
//import Icon from 'react-icons-kit';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
//import Button from 'common/components/Button';
//import Input from 'common/components/Input';
//import Select from 'common/components/Select';
//import Container from 'common/components/UI/Container';
import ParticlesComponent from '../../Hosting/Particle';
import BannerWrapper, {
  //SearchWrapper,
  List,
  //DiscountWrapper,
  //DiscountLabel,
  HeaderList,
  Expierence_Projects_Block,
} from './about.style';
//import AniLink from "gatsby-plugin-transition-link/AniLink";

//import { search } from 'react-icons-kit/feather/search';

const AboutMeSection = ({
  row,
  col,
  title,
  description,
  button,
  textArea,
  searchArea,
  discountAmount,
  discountText,
}) => {
  const Data = useStaticQuery(graphql`
    query {
      hostingJson {
        ABOUTME_INFO {
          name
          job
          linkedin
          github
        }
      }
    }
  `);

  return (
    <BannerWrapper id="about_section">
      <ParticlesComponent />
      <HeaderList className="about_container">
        <Box {...row}>
          <Box {...textArea}>
            <Heading
              {...title}
              content={Data.hostingJson.ABOUTME_INFO[0].name}
              as="h1"
            />
            <Text
              {...description}
              //as="h2"
              content={Data.hostingJson.ABOUTME_INFO[0].job}
            />

            {Data.hostingJson.ABOUTME_INFO.map((info, index) => {
              return (
                //<text key={`test-index-${index}`}>{info.name}{info.address}</text>
                <ul>
                  {/*<List key={`test-index-${index}`} >{info.email}</List>
                <List key={`test-index-${index}`} >{info.address}</List>
                <List key={`test-index-${index}`} >{info.phone}</List>*/}

                  <List key={`test-index-${index}`}>
                    <a href={info.linkedin}>{info.linkedin}</a>
                  </List>
                  <List key={`test-index-${index}`}>
                    <a href={info.github}>{info.github}</a>
                  </List>
                </ul>
              );
            })}
            <Expierence_Projects_Block>
              <List>
                <h2>
                  <b>Professional Experience</b>
                </h2>
                <br />
                <b>
                  <i>Freelance Web Developer</i>
                </b>
                <br />
                <br />
                <b>2020 – present</b>
                <br />
                Creating and maintaining customer-specific websites with the
                most customer acquisition and highest organic search and SEO in
                mind.
                <br />
                <br />
                <b>
                  <i>Manager</i>
                </b>
                <br />
                <b>Batch Gastropub</b>
                <br />
                <br />
                <b>2016 – present</b>
                <br />
                <b>Brickell, United States</b>
                <br />
                Coordinates schedules for FOH restaurant staff Ensures daily
                standards of restaurant grounds and personnel are upheld Directs
                the production of brand products necessary for daily operation
                Maintains store IT Equipment and all Maintenance needs Resolves
                guest concerns to ensure guest retention and satisfaction
                Provides staff critique and product knowledge to ensure growth.
                <br />
                <br />
              </List>
              <List>
                <h2>
                  <b>Projects</b>
                </h2>
                <br />
                <br />
                <h3>
                  <b>
                    <a href="https://akgspecialtyinc.com/">AKG Specialty Inc</a>
                  </b>
                </h3>
                <b>
                  <i>Project Developer</i>
                </b>
                <br />
                <b>Current</b>
                <br />
                Setup and deploy a React.js and Gatsby Web application for a
                Miami-based Roofing Contractor. Gather information from the
                client to develop content and images for the webpage. Manage all
                aspects of the project from DNS, Netlify Hosting, Backlinks,
                KeyWords, and SEO.
                <br />
                <br />
                <h3>
                  <b>
                    <Link to="/">Affiliate Lead Marketing</Link>
                  </b>
                </h3>
                <b>
                  <i>Project Developer</i>
                </b>
                <br />
                <br />
                <b>Current</b>
                <br />
                Develop and launch React.js with Gatsby Freelance Developer
                Project Web application to display current projects and connect
                with clients.
              </List>
            </Expierence_Projects_Block>
          </Box>
        </Box>
      </HeaderList>
    </BannerWrapper>
  );
};

AboutMeSection.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  searchArea: PropTypes.object,
  discountAmount: PropTypes.object,
  discountText: PropTypes.object,
};

AboutMeSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    display: 'inline',
    pr: '15px',
    pl: '15px',
  },
  textArea: {
    width: ['100%', '100%', '90%', '100%', '55%'],
  },
  title: {
    fontSize: ['26px', '32px', '42px', '46px', '55px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px', '25px', '25px', '25px'],
    lineHeight: '1.31',
    textAlign: 'center',
  },
  description: {
    fontSize: ['15px', '16px', '16px', '16px', '16px'],
    color: '#343d48cc',
    lineHeight: '1.75',
    mb: '0',
    textAlign: 'center',
  },
  button: {
    title: 'Search',
    type: 'button',
    fontSize: '18px',
    fontWeight: '500',
    color: '#fff',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
    iconPosition: 'left',
  },
  searchArea: {
    className: 'search_area',
    width: ['100%', '100%', '80%', '100%', '70%'],
    mt: ['45px', '50px', '60px', '60px', '60px'],
  },
  discountAmount: {
    fontSize: ['13px', '14px', '14px', '14px', '14px'],
    fontWeight: '600',
    color: '#eb4d4b',
    mb: 0,
    as: 'span',
    mr: '0.4em',
  },
  discountText: {
    fontSize: ['13px', '14px', '14px', '14px', '14px'],
    fontWeight: '400',
    color: '#0f2137',
    mb: 0,
    as: 'span',
  },
};

export default AboutMeSection;
