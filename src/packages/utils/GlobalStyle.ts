import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  body,html{
    padding: 0;
    margin: 0;

    font-size: 14px;
  }
  button{
    padding: 10px;
    
  }
    label{
        min-width: 100px;
    }
  * {
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 0;
    margin: 0;
      &:focus,&:focus-visible{
          outline: none!important;
          box-shadow: none!important;
      }
      //&::-webkit-scrollbar {
      //    display: none;
      //    width: 0;
      //}
  }
  dl,dt,ul,li{
    padding: 0;
    margin: 0;
    
  }
  li {
    list-style: none;
  }
  input{
    min-height: 40px;
  }

`;

export default GlobalStyle;
