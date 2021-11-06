import { Sdiv, Stext } from "components";
import React from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { DefaultButtonSm } from "components";

import Toggle from "react-toggle";

export const RecruitList = ({
  date = "date",
  title = "title",
  body = "body",
  period = "period",
  buttonText = "buttonText",
}) => {
  return (
    <Container>
      <Sdiv row>
        <Avatar />
        <Sdiv col mgl={16}>
          <Stext c1 g3>
            {date}
          </Stext>
          <Stext h3 g0 mgb={6}>
            {title}
          </Stext>
          <Stext b2 g3>
            {body}
          </Stext>
        </Sdiv>
      </Sdiv>
      <Sdiv col aed>
        <Sdiv row mgb={8}>
          <DefaultButtonSm line title={"관심 +" + buttonText} />
        </Sdiv>
        <Sdiv row>
          <Stext mgr={6} pdt={4} c1 g0>
            모집기간: {period}
          </Stext>
        </Sdiv>
      </Sdiv>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 34px 0px;
  border-top: 1px solid ${colors.gray7};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 34px;
  cursor: pointer;
`;

const Avatar = styled.img`
  background-color: ${colors.gray4};
  height: 48px;
  width: 48px;
  border-radius: 100px;
  @media (max-width: 800px) {
    display: none;
  }
`;
