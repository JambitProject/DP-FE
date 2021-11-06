import { Sdiv } from "components";
import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";

export const BadgeDefaultGray = ({ title = "JAVA", style }) => {
  return (
    <BadgeContainerSm style={style}>
      <Sdiv s4 g0>
        #{title}
      </Sdiv>
    </BadgeContainerSm>
  );
};

const BadgeContainerSm = styled.div`
  border-radius: 8px;

  padding: 8px 12px;
  display: flex;

  flex-direction: row;
  justify-content: center;

  background-color: ${colors.gray7};
`;
