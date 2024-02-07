import styled from 'styled-components';
//import BannerBG from 'common/assets/image/hosting/banner-bg.jpg';
import BannerBG from 'common/assets/image/ALM_Background.jpg';

const AboutWrapper = styled.section`
  padding-top: 100px;
  padding-bottom: 160px;
  background-image: url(${BannerBG});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  @media (max-width: 990px) {
    padding-top: 100px;
    padding-bottom: 120px;
    min-height: auto;
  }
  @media (max-width: 575px) {
    padding-top: 100px;
    padding-bottom: 60px;
  }
  .particle {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .about_container {
    position: relative;
  }
`;

export const SearchWrapper = styled.div`
  @media (min-width: 576px) {
    display: flex;
    align-items: stretch;
    height: 70px;
    box-shadow: 0px 6px 15.98px 1.02px rgba(56, 86, 122, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 990px) and (min-width: 576px) {
    height: 65px;
  }
  .domain_search_input {
    flex-grow: 1;
    box-shadow: none;
    outline: none;
    .field-wrapper {
      border: 0;
    }
    .field-wrapper,
    input {
      height: 100%;
      box-shadow: none;
      outline: none;
    }
    input {
      font-size: 17px;
      padding-left: 50px;
      padding-right: 30px;
      text-shadow: none;
      border: 1px solid #ebebeb;
      &:focus {
        border-color: #ebebeb;
      }

      @media (min-width: 576px) {
        border-right: 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-color: #f4f5f7;
        &:focus {
          border-color: #f4f5f7;
        }
      }
      @media (max-width: 575px) {
        height: 52px;
        padding-left: 20px;
        margin-bottom: 20px;
      }
    }
  }
  .domain_search_select {
    min-width: 165px;
    @media (max-width: 575px) {
      height: 52px;
      margin-bottom: 20px;
    }
    .select__control,
    .select-field__wrapper {
      height: 100%;
    }
    .select__control {
      padding: 0 15px 0 10px;
      box-shadow: none;
      position: relative;
      border-color: #ebebeb;
      @media (min-width: 576px) {
        border-color: #f4f5f7;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        &:before {
          content: '';
          position: absolute;
          width: 1px;
          height: 55%;
          background: #d9d9d9;
          display: block;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }

      .select__placeholder {
        font-size: 17px;
        color: #0f2137;
      }
      .select__indicator {
        color: #0f2137;
      }
    }
    .select__indicator-separator {
      display: none;
    }
  }

  .domain_search_button {
    width: 160px;
    @media (min-width: 576px) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    @media (max-width: 575px) {
      height: 52px;
      width: 100%;
    }
  }
`;

export const List = styled.li`
  text-align: center;
  margin-top: 17px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    font-size: 17px;
    font-weight: 400;
    color: #0f2137;
    padding: 8px 12px;
    button {
      width: auto;
      margin: auto;
    }
    }
  }
`;

export const HeaderList = styled.ul`
  text-align: center;
  margin-top: 17px;
  width: 100%;
  ul {
    width: 100%;
    border-bottom: 5px solid black;
    padding-bottom: 12px;
    li {
      display: flex;
      justify-content: center;
      font-size: 17px;
      font-weight: 400;
      color: #0f2137;
      padding: 8px 12px;
      a:link {
        color: blue;
      }
      a:visited {
        color: blue;
      }
      a:hover {
        color: red;
      }
      }
    }
  }
`;

export const Expierence_Projects_Block = styled.ul`
  text-align: center;
  margin-top: 17px;
  width: 100%;
  display: flex;
    li {
      display: block;
      flex-direction: row;
      
      width: 100%;
      font-size: 17px;
      font-weight: 400;
      color: #0f2137;
      padding: 8px 12px;
      margin: 8px;
      a:link {
        color: blue;
      }
      a:visited {
        color: blue;
      }
      a:hover {
        color: red;
      }
    }
  }
`;

export const DiscountWrapper = styled.div`
  text-align: center;
`;

export const DiscountLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  border-radius: 4em;
  border: 1px solid #f6f6f7;
  padding: 7px 25px;
  box-shadow: 0px 7px 25px 0px rgba(22, 53, 76, 0.05);
  margin-bottom: 30px;
  background-color: #fff;
  @media (max-width: 575px) {
    padding: 7px 10px;
  }
`;

export default AboutWrapper;
