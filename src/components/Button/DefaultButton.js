import { Sdiv } from "components";
import React from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";

export const DefaultButton = ({ Logo, onClick, title, style }) => {
  return (
    <ButtonContainer onClick={onClick && onClick} style={style}>
      <Sdiv s4 g0>
        {title}
      </Sdiv>
    </ButtonContainer>
  );
};

export const DefaultButtonSm = ({ onClick, title = "Follow", style, fillPrimary, fillSecondary, linePrimary, lineSecondary }) => {
  return (
    <ButtonContainerSm 
      onClick={onClick && onClick} 
      style={style}
      fillPrimary={fillPrimary && fillPrimary}
      fillSecondary={fillSecondary && fillSecondary}
      linePrimary={linePrimary && linePrimary}
      lineSecondary={lineSecondary && lineSecondary}
    >
      <Sdiv s5>{title}</Sdiv>
    </ButtonContainerSm>
  );
};

const ButtonContainer = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;

  padding: 8px 24px;
  display: flex;

  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

const ButtonContainerSm = styled.div`
  
  border-radius: 8px;

  padding: 8px 12px;
  display: flex;

  ${(props) => props.fillPrimary && fillPrimary}
  ${(props) => props.fillSecondary && fillSecondary}
  ${(props) => props.linePrimary && linePrimary}
  ${(props) => props.lineSecondary && lineSecondary}

  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

const fillPrimary = css`
  border: 1px solid ${colors.primary};
  background-color: ${colors.primary} !important;
  color: ${colors.white} !important;
`;

const fillSecondary = css`
  border: 1px solid ${colors.secondary};
  background-color: ${colors.secondary} !important;
  color: ${colors.white} !important;
`;

const linePrimary = css`
  border: 1px solid ${colors.primary}; 
  background-color: transparent !important;
  color: ${colors.primary} !important;
`;

const lineSecondary = css`
  border: 1px solid ${colors.secondary};
  background-color: transparent !important;
  color: ${colors.secondary} !important;
`;
