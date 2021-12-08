import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as IcCamera } from "images/IcCamera.svg";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

import { DefaultButtonSm, Sdiv, Stext, SelectMain, SelectNumber } from "components";
import { colors } from "styles/colors";

export const InputWithTitle = ({
  title = "title",
  value,
  onChange,
  style,
  onClick,
  name,
  placeholder,
  hooraceholder,
  maxlength,
  type,
}) => {
  return (
    <Sdiv style={style} mgb={12}>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <StyledInput
        placeholder={placeholder || hooraceholder}
        value={value}
        onChange={onChange && onChange}
        onClick={onClick && onClick}
        name={name}
        maxLength={maxlength && maxlength}
        type={type}
      />
    </Sdiv>
  );
};

export const InputWithToggleBtn = ({
  title = "title",
  value,
  onChange,
  style,
  onClick,
  name1,
  name2,
  name,
  handleProgress,
  selected,
})=>{
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleSelect=(progress)=>{
    handleProgress(progress);
  }
  return (
    
    <Sdiv style={style}>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <br/>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value={"ONGOING"} selected={selected ? (selected=="ONGOING" ? true : false) : undefined} onClick={()=>{
          handleSelect("ONGOING")}} style={{color:`${colors.primary}`}}>
          {name1}
        </ToggleButton>
        <ToggleButton value={"COMPLETE"} selected={selected ? (selected=="COMPLETE" ? true : false) : undefined} onClick={()=>{
          handleSelect("COMPLETE");
        }} style={{color:`${colors.secondary}`}}>
          {name2}
        </ToggleButton>
      </ToggleButtonGroup>
    </Sdiv>
  );
}

export const TextareaWithTitle = ({ title = "title", value, onChange, name, placeholder, hooraceholder }) => {
  return (
    <Sdiv>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <StyledTextarea value={value} onChange={onChange && onChange} placeholder={placeholder && placeholder || hooraceholder}/>
    </Sdiv>
  );
};

export const InputImage = ({ title = "title", value, onChange, handleImageUpload}) => {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(undefined);

  const handleFileOnChange = (event, i) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      const fileType = ["image/jpeg", "image/jpg", "image/png"];
      if (fileType.includes(file.type)) {
        setImgFile(file);
        setImgUrl(reader.result);
      } else {
        alert("지원하지 않는 형식입니다.");
      }
    };
    reader.readAsDataURL(file);
  };

  
  return (
    <Sdiv col>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <Sdiv h={80} style={{ position: "relative" }}>
        <label for="input-file">
          <StyledFakeCameraButton>
            <IcCamera />
          </StyledFakeCameraButton>
          <StyledUploadButton
            style={{ display: "none" }}
            value={value}
            onChange={onChange}
            type="file"
            id="input-file"
            accept="image/*"
          />
        </label>
      </Sdiv>
    </Sdiv>
  );
};

export const TextareaComment = ({ value, onChange, onClick }) => {
  return (
    <Sdiv col>
      <StyledTextareaComment
        value={value}
        onChange={onChange && onChange}
        placeholder="댓글 달기..."
      />
      <Sdiv jed aed>
        <span style={{ width: 70, marginTop: 20 }}>
          <DefaultButtonSm onClick={onClick} fillPrimary title="댓글 작성" />
        </span>
      </Sdiv>
    </Sdiv>
  );
};

export const InputWithSelectGroup = ({
  title="선택",
  style,
  style1, 
  style2,
  optionList,
  repeat=1,
  listBody=[1,1,1],
  onChangePosition,
  onChangeNumber,
})=>{
  let arr = [];
  for(let i=0; i<repeat; i++){
    arr.push(0);
  }
  return (
    <Sdiv style={style} mgb={12}>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <Sdiv>
        {
          listBody.map((item, i)=>{
            return(
              <Sdiv mgb={5}>
                <SelectMain style={style1} onChange={(e)=>{onChangePosition(e,i)}} optionList={optionList} />
                <SelectNumber style={style2} onChange={(e)=>{onChangeNumber(e,i)}} optionList={[1,2,3,4,5]}/>
              </Sdiv>
            )
          })
        }
      </Sdiv>
    </Sdiv>
  )
}
const StyledInput = styled.input`
width: 100%;
padding: 12px 14px;
border: 0px;
background: #f3f3f4;
border-radius: 6px;
font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 140% */
  
  /* g0 */

  color: #0d0c22;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 98px;
  padding: 12px 14px;
  border: 0px;
  background: #f3f3f4;
  border-radius: 6px;
  resize: none;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 140% */

  /* g0 */

  color: #0d0c22;
`;

const StyledUploadButton = styled.input`
  height: 80px;
  width: 80px;
  background-color: ${colors.gray7};
  border-radius: 8px;
`;

const StyledFakeCameraButton = styled.div`
  height: 80px;
  width: 80px;
  background-color: ${colors.gray7};
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledTextareaComment = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 8px 12px;
  border: 0px;
  background: #f3f3f4;
  border-radius: 6px;
  resize: none;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 140% */

  /* g0 */

  color: #0d0c22;
`;
