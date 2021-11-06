import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  BadgeDefaultGray,
  CardProfile,
  CommentList,
  ProejctTitle,
  Sdiv,
  Stext,
  TextareaComment,
  CardProjectHome,
} from "components";
import { colors } from "styles/colors";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import { ReactComponent as IcArrowLeft } from "images/IcArrowLeft.svg";
import { ReactComponent as IcArrowRight } from "images/IcArrowRight.svg";

const TMP_STACK_BADGE_ITEMS = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const TMP_COMMENT_ITEMS = [
  { name: "name1", comment: "comment", timeString: "약 3시간 전" },
  { name: "name2", comment: "comment", timeString: "약 3시간 전" },
  { name: "name3", comment: "comment", timeString: "약 3시간 전" },
  { name: "name4", comment: "comment", timeString: "약 3시간 전" },
];

export const RecruitDetailScreen = () => {
  const history = useHistory();

  const goProfile = () => {
    history.push("/portfolio");
  };

  return (
    <S.Body>
      <Container>
        <Row style={{ marginTop: 40 }}>
          <Col>
            <ProejctTitle title="AI 승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다." />
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 모집 개요
              </Stext>
            </Sdiv>
            <Sdiv mgt={28}>
              <S.TextIntroduce>
                {`프론트엔드 개발자 (1명)

저희가 개발중인 AI 승부 예측 프로그램의 모바일 클라이언트
사이드 프론트엔드 개발 가능하신 분 찾고 있습니다!  `}
              </S.TextIntroduce>
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={76} mgb={28} h3 g0>
                # 요구사항
              </Stext>
            </Sdiv>
            <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              {TMP_STACK_BADGE_ITEMS.map((item) => (
                <BadgeDefaultGray title={item.title} />
              ))}
            </Sdiv>
          </Col>
        </Row>
        <Sdiv row style={{ display: "flex", flexWrap: "wrap" }}>
          <Sdiv w={300}>
            <Row>
              <Col>
                <Sdiv row>
                  <Stext mgt={72} h3 g0 mgr={24}>
                    # 프로젝트 정보
                  </Stext>
                </Sdiv>
              </Col>
            </Row>
            <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
              <S.ProfileCol>
                <CardProjectHome />
              </S.ProfileCol>
            </S.ProfileRow>
          </Sdiv>
          <Sdiv w={300}>
            <Row>
              <Col>
                <Sdiv row>
                  <Stext mgt={72} h3 g0>
                    # 담당자 정보
                  </Stext>
                </Sdiv>
              </Col>
            </Row>
            <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
              <S.ProfileCol>
                <CardProfile onClickProfile={goProfile} />
              </S.ProfileCol>
            </S.ProfileRow>
          </Sdiv>
        </Sdiv>

        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={72} mgb={28} h3 g0>
                # 댓글
              </Stext>
            </Sdiv>
            <Sdiv col mgb={68} style={{ gap: "24px 0px" }}>
              {TMP_COMMENT_ITEMS.map((item) => {
                return (
                  <CommentList
                    name={item.name}
                    comment={item.comment}
                    timeString={item.timeString}
                  />
                );
              })}
            </Sdiv>
            <TextareaComment />
          </Col>
        </Row>
      </Container>
    </S.Body>
  );
};

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.ProfileCol = styled(Col)`
  padding: 0px;
  width: 300px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;

S.TextIntroduce = styled.pre`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  /* or 138% */

  /* g3 */

  color: #656577;
`;

S.ImageMain = styled.img`
  width: 100%;
  aspect-ratio: 883/504;
  background-color: ${colors.gray4};
`;

S.ArrowContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 18px;
`;
S.ArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.length > 8 ? 40 + props.length * 24 : 240)}px;
  /* margin-left: 24px; */
`;
