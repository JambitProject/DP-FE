import { Sdiv } from "components";
import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import defaultProfileImg from "images/defaultProfileImg.svg"
export const BadgeDefaultGray = ({ title = "JAVA", style, onClick, selected}) => {
  return (
    <BadgeContainerSm style={style} onClick={onClick && onClick} selected={selected}>
      <Sdiv s4>
        {'#'+title}
      </Sdiv>
    </BadgeContainerSm>
  );
};

export const ProfileElem = ({style, onClick, src, title})=>{
  return(
    
      
        <MemberContainerSm style={style} onClick={onClick && onClick}>
          <Sdiv mgl={3}>
            <S.Avatar style={{}} src={src ? src : defaultProfileImg}/>
          </Sdiv>
          <Sdiv s4 ct mgl={5}>
            {title}
          </Sdiv>
        </MemberContainerSm>
      
    
  );
}
const S = {};
const BadgeContainerSm = styled.div`
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  margin-top:8px;
  flex-direction: row;
  justify-content: center;
  color: ${props=> props.selected ? 'white' : 'black'};
  background-color: ${props => props.selected ? colors.primary : colors.gray7}
`;

const MemberContainerSm = styled.div`
  padding-top: 3px;
  padding-bottom:3px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${props=> props.selected ? 'white' : 'black'};
  
  &:hover{
    background-color:${colors.gray5};
  }
  `;

S.Avatar = styled.img`
  
  height: 32px;
  width: 32px;
  border-radius: 100px;
`;
