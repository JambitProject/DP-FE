import React from "react";
import styled from "styled-components";

import { ReactComponent as IcHeart } from "images/IcHeart.svg";
import { Sdiv, Stext } from "components";
import Form from 'react-bootstrap/Form';
export const SelectMain = ({
  optionList=["JAVA", "SPRING", "DJANGO"],
  style,
  onChange,
})=>{
  return (
    <Form.Select aria-label="Default select example" style={style} onChange={onChange}>
      {
        optionList.map((item)=>{
          return(
            <option value={item}>{item}</option>
          );
        })
      }
      
    </Form.Select>
  )
}