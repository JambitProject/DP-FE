import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components"
import {
  BadgeDefaultGray,
  DefaultButtonSm,
  InputWithTitle,
  ListMyPost,
  ModalContainer,
  Sdiv,
  Stext,
  CardProfile,
  TextareaWithTitle,
  CardProjectHome,
} from "components";

import { Row, Col, Container } from "react-bootstrap";
import { colors } from "styles/colors";
const TMP_PRIFILE_ITEM = [
  {
    name: "ComHolic1",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic2",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic3",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  
 
  
];

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

export const PortfolioEditScreen = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const onClickOpenModal = () => {
    setShowModal(true);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };
  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }

  const goProfile = ()=>{
    history.push('/portfolio')
  }
  return (
    <S.Body>
      <Container>
        <Row>
          <Col>
            <Sdiv row act mgt={42}>
              <S.ImageProfile />
              <Sdiv col mgl={12} mgr={24}>
                <Stext s2 g0>
                  Lorem
                </Stext>
                <Stext b2 g0>
                  Lorem ipsum dolor
                </Stext>
              </Sdiv>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgr={10} h3 g0>
                # 기술스택
              </Stext>
              <DefaultButtonSm
                onClick={onClickOpenModal}
                line
                title="추가/수정"
              />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              {TMP_STACK_BADGE_ITEMS.map((item) => (
                <BadgeDefaultGray title={item.title} />
              ))}
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Stext mgb={30} h3 g0>
              # 내정보
            </Stext>
            <InputWithTitle title="닉네임" />
            <Sdiv h={20} />
            <InputWithTitle title="소개 한마디 변경" />
            <Sdiv mgt={20} jed>
              <DefaultButtonSm fill title="변경사항 저장하기" />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext h3 g0>
                # Followers
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
              <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
                {TMP_PRIFILE_ITEM.map((item) => {
                  return (
                    <Col onClick={handleTop}>
                      <CardProfile
                        onClickProfile={goProfile}
                        name={item.name}
                        subTitle={item.subTitle}
                        
                      />
                    </Col>
                  );
                })}
              </S.ProfileRow>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={80} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext h3 g0>
                # Following
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
              <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
                {TMP_PRIFILE_ITEM.map((item) => {
                  return (
                    <Col onClick={handleTop}>
                      <CardProfile
                        onClickProfile={goProfile}
                        name={item.name}
                        subTitle={item.subTitle}
                        
                      />
                    </Col>
                  );
                })}
              </S.ProfileRow>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={80} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgr={10} h3 g0>
                # 나의 모집중인 글
              </Stext>
              <DefaultButtonSm line title="모집글 쓰기" />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
              <ListMyPost />
              <ListMyPost />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext h3 g0>
                # 관심추가한 프로젝트 모집 글
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
              <ListMyPost />
              <ListMyPost />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
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

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;
