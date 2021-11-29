import { Sdiv } from "components";
import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";

export const BadgeDefaultGray = ({ title = "JAVA", style, onClick, selected}) => {
  return (
    <BadgeContainerSm style={style} onClick={onClick && onClick} selected={selected}>
      <Sdiv s4 >
        {'#'+title}
      </Sdiv>
    </BadgeContainerSm>
  );
};

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
