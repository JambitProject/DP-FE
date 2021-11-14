import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";

import {
  InputWithTitle,
  TextareaWithTitle,
  InputImage,
  Sdiv,
  Stext,
  DefaultButtonSm,
  ModalContainer,
  BadgeDefaultGray,
} from "components";

import { Row, Col, Container, Dropdown } from "react-bootstrap";

const TMP_STACK_BADGE_ITEMS = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const TMP_STACK_BADGE_ITEMS_MODAL = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

export const RecruitEditScreen = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const onClickOpenModal = () => {
    setShowModal(true);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <S.Body>
      <Container>
        <Sdiv col>
          <Sdiv row act>
            <Stext mgb={18} mgt={40} h3 g0>
              # 프로젝트 구인 글 작성
            </Stext>
          </Sdiv>
          <Sdiv>
            <InputWithTitle title="모집글 제목" />
            <Sdiv mgt={24} />
            <InputWithTitle title="모집 포지션, 인원 수 (ex.프론트엔드 1명)" />
            <Sdiv mgt={24} />
            <InputWithTitle title="우대 스택" onClick={onClickOpenModal} />
            <Sdiv mgt={24} />
            <TextareaWithTitle title="모집 상세 설명" />
            <Sdiv mgt={24} />
            <InputWithTitle title="연락처" />
          </Sdiv>
          <Sdiv mgt={40} jed>
            <DefaultButtonSm fill title="모집글 게시하기" />
          </Sdiv>
        </Sdiv>
      </Container>
      <ModalContainer show={showModal}>
        <Stext h3 g0 mgb={20}>
          # 기술스택 추가하기
        </Stext>
        <S.ModalTextSm>기술스택 선택</S.ModalTextSm>
        <Sdiv h={16} />
        <S.ModalStackContainer>
          {TMP_STACK_BADGE_ITEMS_MODAL.map((item) => {
            return <BadgeDefaultGray title={item.title} />;
          })}
        </S.ModalStackContainer>
        <Sdiv row aed mgt={28} style={{ width: "100%" }}>
          <InputWithTitle style={{ width: "100%" }} title="직접 추가" />
          <Sdiv w={60} mgl={8}>
            <DefaultButtonSm line title="추가" />
          </Sdiv>
        </Sdiv>
        <Sdiv h={28} />
        <S.ModalTextSm>추가된 기술 스택</S.ModalTextSm>
        <Sdiv mgt={4} row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
          {TMP_STACK_BADGE_ITEMS.map((item) => (
            <BadgeDefaultGray title={item.title} />
          ))}
        </Sdiv>
        <Sdiv h={78} />
        <S.Line />
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="닫기" line onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="완료" onClick={onClickCloseModal} />
        </Sdiv>
      </ModalContainer>
    </S.Body>
  );
};

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.ImageProfile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background-image: url('https://source.unsplash.com/random/48x48');
`;

S.ModalTextSm = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 22px;
  /* identical to box height, or 220% */

  /* g0 */

  color: #0d0c22;
`;

S.ModalStackContainer = styled.div`
  height: 104px;
  width: 100%;
  overflow-y: scroll;
  flex-wrap: wrap;
  display: flex;
  gap: 4px;
`;

S.Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray7};
`;
