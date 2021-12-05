import React from "react";
import styled from "styled-components";

import { ReactComponent as IcHeart } from "images/IcHeart.svg";
import { Sdiv, Stext } from "components";
import Form from 'react-bootstrap/Form';

export const SelectNumber = ({
  optionList=[1,2,3,4,5],
  onSelect,
  style,
})=>{
  
  return (
    <Form.Select aria-label="Default select example" style={style} onSelect={onSelect} >
      {
        optionList.map((item)=>{
          return(
            <option value={item}>{item + "명"}</option>
          );
        })
      }
      
    </Form.Select>
  )
}