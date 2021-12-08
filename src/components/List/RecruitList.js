import { BadgeDefaultGray, Sdiv, Stext } from "components";
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
  likesCount = 0,
  progress = "ONGOING",
  viewCount,
  src,
  replyCount,
  skillList=[],
}) => {
  return (
    <Container>
      
      <Sdiv row>
        <Sdiv row mgt={30}>
          <Avatar src={src}/>
        </Sdiv>
        
        
          <Sdiv col mgl={16}>
            <Sdiv row mgb={8}>
              {
                progress==="ONGOING" ?
                <DefaultButtonSm fillPrimary title="모집중" />
                :
                <DefaultButtonSm fillSecondary title="모집마감" />
              }
            </Sdiv>
            <Stext h3 g0 mgb={6}>
              {title}
            </Stext>
          <Sdiv row jst>
            <Sdiv row>
              {
                skillList.length > 0 ?
                skillList.map((item)=>{
                  return <Sdiv mgr={5}>
                    <BadgeDefaultGray title={item}/>
                  </Sdiv>
                })
                :
                null
              }
            </Sdiv>
          </Sdiv>
            </Sdiv>
      </Sdiv>
            <TextProjectInfo>{`조회수: ${viewCount} 관심: ${likesCount} 댓글: ${replyCount}`}</TextProjectInfo>
      
     
      
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 34px 0px;
  border-top: 1px solid ${colors.gray6};
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

const TextProjectInfo = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */
  display:flex;
  align-items:center;
  justify-contents:center;
  /* g3 */
  margin-bottom:28px;
  color: #656577;
`;
