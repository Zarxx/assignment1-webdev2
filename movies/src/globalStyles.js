import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff;
    color: #333;
  }

  /* Dark mode styles */
  body.dark-mode {
    background-color: #333;
    color: #fff;
  }
`;