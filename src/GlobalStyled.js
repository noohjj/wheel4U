import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "15%",
  moPadding: "20px",
};

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}

body{
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    font-family: "Noto Sans KR", sans-serif;
    letter-spacing: -1px;
    box-shadow: 0px 0px 5px 5px #e8eaf6;
}

a{
    text-decoration: none;
    color: #13a89e;
}

`;
