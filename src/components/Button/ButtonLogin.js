import { Sdiv } from "components";
import React from "react";
import styled from "styled-components";

export const ButtonLogin = ({ Logo, onClick, title, style }) => {
  return (
    <ButtonContainer onClick={onClick && onClick} style={style}>
      <LogoContainer>{Logo && <Logo />}</LogoContainer>
      <Sdiv s2 g0>
        {title}
      </Sdiv>
      <LogoContainer />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.16);
  border-radius: 8px;

  padding: 16px 24px;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  width: 20px;
`;
