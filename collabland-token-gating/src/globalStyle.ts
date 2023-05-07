import PPMoriBold from '@/assets/resource/fonts/pp-mori-semibold.otf';
import PPMoriLight from '@/assets/resource/fonts/pp-mori-extralight.otf';
import PPMoriRegular from '@/assets/resource/fonts/pp-mori-regular.otf';
import { createGlobalStyle } from 'styled-components';

/**
 * Add 'font-display: optional' for fix layout shift issue
 */
const GlobalStyles = createGlobalStyle`
  :root{
    --collabland-black: #22252d;
    --collabland-orange: rgba(254, 152, 0, 1);
  }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: "PPMori";
    font-weight: 400;
    font-style: normal;
    background-color: #e9e9f4; 
    min-height: 100vh;
  }
  @font-face {
    font-family: "PPMori";
    src: url(${PPMoriLight}) format("opentype");
    font-weight: 200;
    // display: swap;
    // font-display: optional;
  }
  @font-face {
    font-family: "PPMori";
    src: url(${PPMoriRegular}) format("opentype");
    font-weight: 400;
    // display: swap;
    // font-display: optional;
  }
  @font-face {
    font-family: "PPMori";
    src: url(${PPMoriBold}) format("opentype");
    font-weight: 700;
    // display: swap;
    // font-display: optional;
  }
`;

export default GlobalStyles;
