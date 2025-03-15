import { createGlobalStyle } from "styled-components";

import MerriweatherLightItalic from "../assets/fonts/Merriweather-LightItalic.ttf";
import RobotoLight from "../assets/fonts/Roboto-Light.ttf";
import RobotoThin from "../assets/fonts/Roboto-Thin.ttf";
import BeautifulPeople from "../assets/fonts/BeautifulPeoplePersonalUse-dE0g.ttf";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Merriweather';
    src: url(${MerriweatherLightItalic}) format('truetype');
    font-weight: 300;
    font-style: italic;
  }
  
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoThin}) format('truetype');
    font-weight: 100;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Beautify';
    src: url(${BeautifulPeople}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
