import React from "react";
import styled from "styled-components";

import { ReactComponent as IcHeart } from "images/IcHeart.svg";
import { Sdiv, Stext } from "components";

export const DropdownMain = ({
  defaultText="all",
  itemList=["JAVA", "SPRING", "DJANGO"],
  
}) => {

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <S.DropdownContainer
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <Sdiv mgl={16}>
        <IcDropArrowDown />
      </Sdiv>
    </S.DropdownContainer>
  ));

  return(
    <Sdiv row style={{ display: "flex", flexWrap: "wrap", gap: `8px 0` }}>
      <Dropdown>
        <Dropdown.Toggle
          as={CustomToggle}
          variant="success"
          id="dropdown-basic"
        >
          <Stext b2 g4>
            스택 필터
          </Stext>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          <Dropdown.Item>JAVA</Dropdown.Item>
          <Dropdown.Item>SPRING</Dropdown.Item>
          <Dropdown.Item>Django</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Sdiv>
  );
};
