import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as IcCamera } from "images/IcCamera.svg";

import { DefaultButtonSm, Sdiv, Stext } from "components";
import { colors } from "styles/colors";

export const InputWithTitle = ({
  title = "title",
  value,
  onChange,
  style,
  onClick,
}) => {
  return (
    <Sdiv style={style}>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <StyledInput
        value={value}
        onChange={onChange && onChange}
        onClick={onClick && onClick}
      />
    </Sdiv>
  );
};

export const TextareaWithTitle = ({ title = "title", value, onChange }) => {
  return (
    <Sdiv>
      <Stext s4 g0 mgb={12}>
        {title}
      </Stext>
      <StyledTextarea value={value} onChange={onChange && onChange} />
    </Sdiv>
  );
};

export const InputImage = ({ title = "title", value, onChange }) => {
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
            onChange={(e) => handleFileOnChange(e)}
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
      <span style={{ width: 70, marginTop: 20 }}>
        <DefaultButtonSm onClick={onClick} title="댓글 작성" />
      </span>
    </Sdiv>
  );
};

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
