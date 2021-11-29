import { DefaultButtonSm, Sdiv, Stext } from "components";
import React from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";

import Toggle from "react-toggle";

export const ListMyPost = ({ title = "title", subtitle = "subtitle" }) => {
  return (
    <MyPostContainer>
      <Sdiv col>
        <Stext s3 g0 mgb={12}>
          {title}
        </Stext>
        <Stext c2 g3>
          {subtitle}
        </Stext>
      </Sdiv>
      <Sdiv col aed>
        <Sdiv row mgb={18}>
          <Stext mgr={12} c2 g4>
            수정
          </Stext>
          <Stext c2 style={{ color: "#EB5757" }}>
            삭제
          </Stext>
        </Sdiv>
        <Sdiv row>
          <Stext mgr={6} c2 g4>
            공개여부
          </Stext>
          <label>
            <Toggle
              // defaultChecked={this.state.tofuIsReady}
              icons={false}
              // onChange={this.handleTofuChange}
            />
          </label>
        </Sdiv>
      </Sdiv>
    </MyPostContainer>
  );
};

const MyPostContainer = styled.div`
  width: 100%;
  padding: 34px 0px;
  border-top: 1px solid ${colors.gray7};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProejctTitle = ({
  title,
  viewCount = 0,
  likeCount = 0,
  commentCount = 0,
  onClickBack,
  onClickAdd,
}) => {
  const history = useHistory();

  return (
    <TextProjectContainer col>
      <TextProjectBack
        onClick={() => {
          history.go(-1);
        }}
      >
        목록으로 {">"}
      </TextProjectBack>
      <TextProjectTitle>{title}</TextProjectTitle>
      <Sdiv row sb act mgb={16}>
        <TextProjectInfo>{`조회수: ${viewCount} 관심: ${likeCount} 댓글: ${commentCount}`}</TextProjectInfo>
        <Sdiv>
          <DefaultButtonSm onClick={onClickAdd && onClickAdd} fill title="관심 추가하기" />
        </Sdiv>
      </Sdiv>
      <Line />
    </TextProjectContainer>
  );
};

const TextProjectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextProjectTitle = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #0d0c22;

  margin-bottom: 16px;
`;

const TextProjectBack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #f25625;

  margin-bottom: 20px;
  cursor: pointer;
`;

const TextProjectInfo = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  /* g3 */

  color: #656577;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray7};
`;

export const CommentList = ({
  src,
  name = "name",
  comment = "comment",
  timeString = "timeString",
}) => {
  return (
    <CommentContainer>
      <Sdiv>
        <CommentImg src={src} />
      </Sdiv>
      <Sdiv col mgt={4} mgl={12}>
        <Stext s3 g0 mgb={2}>
          {name}
        </Stext>
        <Stext b2 g3>
          {comment}
        </Stext>
        <Stext c1 g4>
          {timeString}
        </Stext>
      </Sdiv>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CommentImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${colors.gray4};
`;
