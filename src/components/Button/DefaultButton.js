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

export const DefaultButtonSm = ({ onClick, title = "Follow", style, fill = true, line }) => {
  return (
    <ButtonContainerSm onClick={onClick && onClick} fill={fill} line={line} style={style}>
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
  border: 1px solid ${colors.primary};
  border-radius: 8px;

  padding: 8px 12px;
  display: flex;

  ${(props) => props.fill && fill}
  ${(props) => props.line && line}

  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

const fill = css`
  background-color: ${colors.primary} !important;
  color: ${colors.white} !important;
`;

const line = css`
  background-color: transparent !important;
  color: ${colors.primary} !important;
`;
