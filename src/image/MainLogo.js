import logoImage from "../image/wheel4u.png";
import React from "react";
import styled from "styled-components";

const LogoImage = styled.img`
  width: 150px; /* 원하는 크기로 조정 */
  height: auto;
`;

const Logos = () => {
  return <LogoImage src={logoImage} alt="logo" />;
};

export default Logos;
