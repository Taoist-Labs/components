import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  body,html{
    padding: 0;
    margin: 0;
    overscroll-behavior: none;
    font-size: 14px;
  }
  button{
    padding: 10px;
    
  }

  * {
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 0;
    margin: 0;

  }
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  dl,dt,ul,li{
    padding: 0;
    margin: 0;
    
  }
  li {
    list-style: none;
  }
  input{
    height: 30px;
  }

`;

export default GlobalStyle;
