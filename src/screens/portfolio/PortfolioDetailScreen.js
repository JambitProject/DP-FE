import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { BadgeDefaultGray, DefaultButtonSm, Sdiv, Stext, CardProjectHome } from "components";

import { Row, Col, Container } from "react-bootstrap";
import Slider from "react-slick";

import { ReactComponent as IcSetting } from "images/IcSetting.svg";

// slider 세팅
let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  beforeChange: (current, next) => console.log(current, next),
  afterChange: (current) => console.log(current),
};

const TMP_STACK_BADGE_ITEMS = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const TMP_PROJECT_ITEM = [
  { title: "title1", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
  { title: "title2", subTitle: "subTitle1", progress: 1, LikeCount: 999 },
  { title: "title3", subTitle: "subTitle1", progress: 1, LikeCount: 999 },
  { title: "title4", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
  { title: "title5", subTitle: "subTitle1", progress: 1, LikeCount: 999 },
  { title: "title6", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
  { title: "title7", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
  { title: "title8", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
  { title: "title9", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
  { title: "title10", subTitle: "subTitle1", progress: 0, LikeCount: 999 },
];

const TMP_SLIDER_ITEM = [
  { title: "MOST POPULAR" },
  { title: "MOST POPULAR" },
  { title: "MOST POPULAR" },
  { title: "MOST POPULAR" },
  { title: "MOST POPULAR" },
];

export const PortfolioDetailScreen = () => {
  const history = useHistory();

  const goProjectEdit = () => {
    history.push("/project-edit");
  };
  const goPortfolioEdit = () => {
    history.push("/portfolio-edit");
  };

  const goProject = () => {
    history.push("/project");
  };

  return (
    <S.Body>
      <Container>
        <S.PortFolioImage />
        <Row xs={1} sm={1} md={2} style={{ marginTop: 36, gap: "16px 0px" }}>
          <Col>
            <Sdiv row act>
              <S.ImageProfile />
              <Sdiv col mgl={12} mgr={24}>
                <Stext s2 g0>
                  Lorem
                </Stext>
                <Stext b2 g0>
                  Lorem ipsum dolor
                </Stext>
              </Sdiv>
              <DefaultButtonSm line />
            </Sdiv>
          </Col>
          <Col>
            <Sdiv act row style={{ gap: "0px 4px", flexWrap: "wrap" }} jed>
              {TMP_STACK_BADGE_ITEMS.map((item) => (
                <BadgeDefaultGray title={item.title} />
              ))}
              <Sdiv className="cursor" onClick={goPortfolioEdit} mgl={16}>
                <IcSetting />
              </Sdiv>
            </Sdiv>
          </Col>
        </Row>
        <Row xs={1} sm={1} md={3} style={{ marginTop: 54, gap: "30px 0px" }}>
          <Col></Col>
          <Col>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div style={{ maxWidth: 306 }}>
                <Slider {...settings}>
                  {TMP_SLIDER_ITEM.map((item) => {
                    return (
                      <Stext style={{ width: 0 }} g0 s1 center>
                        {item.title}
                      </Stext>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col>
            <Stext h3 g0>
              # 프로젝트
            </Stext>
          </Col>
          <Col>
            <Sdiv jed>
              <DefaultButtonSm fill title="새 프로젝트 업로드 하기" onClick={goProjectEdit} />
            </Sdiv>
          </Col>
        </Row>
        <S.ProfileRow xs={2} sm={2} md={3}>
          {TMP_PROJECT_ITEM.map((item) => {
            return (
              <S.ProfileCol>
               <Sdiv>
                  <CardProjectHome
                    title={item.title}
                    subTitle={item.subTitle}
                    progress={item.progress}
                    onClick={goProject}
                  />
                </Sdiv>
              </S.ProfileCol>
            );
          })}
        </S.ProfileRow>
      </Container>
    </S.Body>
  );
};

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`;

S.PortFolioImage = styled.img`
  max-width: 1320px;
  width: 100%;
  height: 224px;
  object-fit: cover;
  background-image: url('https://source.unsplash.com/random/1320x224');
`;

S.ImageProfile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background-image: url('https://source.unsplash.com/random/48x48');
`;

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 40px 0px;
  margin-top: 18px;
`;
