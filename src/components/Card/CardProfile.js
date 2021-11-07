import React from "react";
import styled from "styled-components";

import { ReactComponent as IcListP } from "images/IcListPrimary.svg";
import { ReactComponent as IcListS } from "images/IcListSecondary.svg";
import { DefaultButton, Sdiv, Stext } from "components";
import { colors } from "styles/colors";

export const CardProfile = ({
  prifileSrc,
  techStacks = [
    { id: 1, title: "BACKEND" },
    { id: 2, title: "SPRING" },
    { id: 3, title: "WEB-ENGINEERING" },
    { id: 4, title: "FRONTEND" },
    { id: 5, title: "JAVASCRIPT" },
  ],
  name = "ComHolic",
  subTitle = "안녕안녕",
  onClickProfile,
}) => {
  return (
    <CardContainer>
      <Sdiv col jct act>
        <CardProfileImage src={prifileSrc} />
        <Stext mgt={4} mgb={8} s1 g0>
          {name}
        </Stext>

        <Stext center mgb={16} c2 g4>
          {subTitle}
        </Stext>
      </Sdiv>

      {techStacks.slice(0, 3).map((item, index) => {
        return (
          <Sdiv row mgb={12}>
            {index % 2 == 0 ? <IcListP /> : <IcListS />}
            <Stext mgl={4} c1 g0>
              {item.title}
            </Stext>
          </Sdiv>
        );
      })}

      <Sdiv mgt={8} />
      <DefaultButton onClick={onClickProfile && onClickProfile} title="View Profile" />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  padding: 24px;
  justify-content: center;

  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 12px;
`;

const CardProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  object-fit: cover;
  background-image: url('https://source.unsplash.com/random/60x60');
`;
