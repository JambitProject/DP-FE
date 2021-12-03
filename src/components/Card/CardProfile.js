import React from "react";
import styled from "styled-components";

import { ReactComponent as IcListP } from "images/IcListPrimary.svg";
import { ReactComponent as IcListS } from "images/IcListSecondary.svg";
import { DefaultButton, Sdiv, Stext } from "components";
import { colors } from "styles/colors";

export const CardProfile = ({
  prifileSrc,
  skillList,
  name = "ComHolic",
  subTitle = "안녕안녕",
  onClickProfile,
}) => {
  let arr = [1,2,3];
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

      {/* {skillList && skillList.slice(0,3).map((item, index) => {
        return (
          <Sdiv row mgb={12}>
            {index % 2 == 0 ? <IcListS /> : <IcListP />}
            <Stext mgl={4} c1 g0>
              {item}
            </Stext>
          </Sdiv>
        );
      })} */}
      {skillList && arr.map(i=>{
        return (
          <Sdiv row mgb={12}>
            {skillList[i-1] ? i % 2 == 0 ? <IcListS /> : <IcListP /> : <Sdiv mgt={20}/> }            
            <Stext mgl={4} c1 g0>
              {skillList[i-1]}
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
