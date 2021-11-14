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
} from "components";
import { colors } from "styles/colors";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import { ReactComponent as IcArrowLeft } from "images/IcArrowLeft.svg";
import { ReactComponent as IcArrowRight } from "images/IcArrowRight.svg";

// slider 세팅
let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerPadding: "0px",
  beforeChange: (current, next) => console.log(current, next),
  afterChange: (current) => console.log(current),
};

const TMP_STACK_BADGE_ITEMS = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const TMP_PRIFILE_ITEM = [
  {
    name: "ComHolic1",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic2",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic3",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic4",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic5",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic6",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic7",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic8",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic9",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic10",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
];

const TMP_COMMENT_ITEMS = [
  { name: "name1", comment: "comment", timeString: "약 3시간 전" },
  { name: "name2", comment: "comment", timeString: "약 3시간 전" },
  { name: "name3", comment: "comment", timeString: "약 3시간 전" },
  { name: "name4", comment: "comment", timeString: "약 3시간 전" },
];

const TMP_IMG_LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export const ProjectDetailScreen = () => {
  const history = useHistory();

  const sliderRef = useRef();

  const goProfile = () => {
    history.push("/portfolio");
  };

  const slickNext = () => {
    sliderRef.current.slickNext();
  };

  const slickPrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }
  return (
    <S.Body>
      <Container>
        <Row>
          <div className="project-slick">
            <Slider ref={sliderRef} {...settings}>
              {TMP_IMG_LIST.map((item) => (
                <S.ImageMain />
              ))}
            </Slider>

            <S.ArrowContainer>
              <S.ArrowWrapper length={TMP_IMG_LIST.length}>
                <div className="cursor" style={{ zIndex: 2 }} onClick={slickPrev}>
                  <IcArrowLeft />
                </div>
                <div className="cursor" style={{ zIndex: 2 }} onClick={slickNext}>
                  <IcArrowRight />
                </div>
              </S.ArrowWrapper>
            </S.ArrowContainer>
          </div>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col>
            <ProejctTitle title="AI 승부 예측 프로그램" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 프로젝트 링크
              </Stext>
            </Sdiv>
            <Sdiv mgt={24} style={{ gap: "16px 0px" }} col>
              <Stext>http://www.xxx.com</Stext>
              <Stext>http://www.xxx.com</Stext>
              <Stext>http://www.xxx.com</Stext>
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={76} mgb={28} h3 g0>
                # 기술스택(프로젝트에 사용)
              </Stext>
            </Sdiv>
            <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              {TMP_STACK_BADGE_ITEMS.map((item) => (
                <BadgeDefaultGray title={item.title} />
              ))}
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={72} h3 g0>
                # 참여유저
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
          {TMP_PRIFILE_ITEM.map((item) => {
            return (
              <Col onClick={handleTop}>
                <CardProfile onClickProfile={goProfile} name={item.name} subTitle={item.subTitle} />
              </Col>
            );
          })}
        </S.ProfileRow>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 프로젝트 소개
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
  background-image: url('https://source.unsplash.com/random/1500x800');
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
