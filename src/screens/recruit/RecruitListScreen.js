import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { RecruitList, Sdiv, Stext, DefaultButtonSm } from "components";

import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";

const TMP_RECRUIT_ITEM = [
  {
    date: "4시간 전",
    title: "Brand  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    body: "AI  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    buttonText: "100",
    period: "2021/09/22 ~ 2021/10/02",
  },
  {
    date: "4시간 전",
    title: "Brand  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    body: "AI  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    buttonText: "100",
    period: "2021/09/22 ~ 2021/10/02",
  },
  {
    date: "4시간 전",
    title: "Brand  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    body: "AI  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    buttonText: "100",
    period: "2021/09/22 ~ 2021/10/02",
  },
  {
    date: "4시간 전",
    title: "Brand  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    body: "AI  승부 예측 프로그램 만드실 프론트엔드 개발자 분 구합니다 ",
    buttonText: "100",
    period: "2021/09/22 ~ 2021/10/02",
  },
];

export const RecruitListScreen = () => {
  const history = useHistory();

  const goRecruitDetail = () => {
    history.push("/recruit");
  };

  const goProjectEdit = () => {
    history.push("/recruit-edit");
  };

  return (
    <S.Body>
      <Container>
        <Sdiv col>
          <Row style={{ marginTop: 40, marginBottom: 40 }}>
            <Sdiv row>
              <Stext h3 g0 mgl={12}>
                # 프로젝트 모집 게시판
              </Stext>
              <Sdiv mgl={12}>
                <DefaultButtonSm
                  fillPrimary
                  title="모집글 쓰기"
                  onClick={goProjectEdit}
                />
              </Sdiv>
            </Sdiv>
          </Row>
          <Sdiv>
            {TMP_RECRUIT_ITEM.map((item) => {
              return (
                <Sdiv onClick={goRecruitDetail}>
                  <RecruitList
                    date={item.date}
                    title={item.title}
                    body={item.body}
                    buttonText={item.buttonText}
                    period={item.period}
                  />
                </Sdiv>
              );
            })}
          </Sdiv>
        </Sdiv>
      </Container>
    </S.Body>
  );
};

const S = {};

S.Body = styled.div`
  flex: 1;
  width: 100%;
`;
