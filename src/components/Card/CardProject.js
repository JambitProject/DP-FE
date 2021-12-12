import React from "react";
import styled from "styled-components";

import { ReactComponent as IcHeart } from "images/IcHeart.svg";
import { Sdiv, Stext } from "components";
import { colors } from "styles/colors";

export const CardProjectHome = ({ src, title, progress = "ONGOING", likesCount = 0, subTitle, onClick, isLiked }) => {
  const RenderProgress = () => {
    switch (progress) {
      case "ONGOING":
        return (
          <BadgeProgress bg={colors.primary}>
            <Stext s5 white>
              진행중
            </Stext>
          </BadgeProgress>
        );
      case "COMPLETE":
        return (
          <BadgeProgress bg={colors.secondary}>
            <Stext s5 white>
              완료됨
            </Stext>
          </BadgeProgress>
        );
    }
  };
  return (
    <CardContainer onClick={onClick && onClick}>
      <CardHomeImage src={src} />
      <Stext b1 g0 mgb={6}>
        {title.length >= 21 ? title.slice(0, 19) + "..." : title}
      </Stext>
      <HomeInfoContainer>
        <Sdiv row act>
          <RenderProgress />
          <Stext mgl={4} c1 g4>
        
          </Stext>
        </Sdiv>
        <Sdiv row act>
          <IcHeart fill={isLiked ? colors.primary :colors.gray4}/>
          <Stext mgl={4} s4 g3>
            {likesCount}
          </Stext>
        </Sdiv>
      </HomeInfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin-right: 13px;
  margin-left: 13px;
  cursor: pointer;
  z-index: 1000;
`;

const CardHomeImage = styled.img`
  max-width: 600px;
  aspect-ratio: 277 / 196;
  border-radius: 10px;
  margin-bottom: 12px;
  
  
`;

const HomeInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BadgeProgress = styled.div`
  padding: 4px 6px;
  background-color: ${(props) => props.bg};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
