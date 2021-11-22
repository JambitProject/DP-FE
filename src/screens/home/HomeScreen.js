import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { CardProfile, CardProjectHome, Sdiv, Stext } from "components";
import defaultImg from 'images/pngs/defaultImg.png';
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import axios from 'axios';
import { ReactComponent as IcDropArrowDown } from "images/IcDropArrowDown.svg";

// slider 세팅
let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  centerPadding: "0px",
  beforeChange: (current, next) => console.log(current, next),
  afterChange: (current) => console.log(current),
};

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
  {
    name: "ComHolic4",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic5",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic6",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic7",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic8",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic9",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
  {
    name: "ComHolic10",
    subTitle:
      "안녕하세요. 저는 백엔드 개발자입니다. 저와 프로젝트 하나 해보는 건 어떠세요? 제 프로필 구경해보세요.",
  },
];

export const HomeScreen = () => {
  const history = useHistory();
  const [prjList, setPrjList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const goProfile = () => {
    history.push("/portfolio");
  };

  const goProject = (id) => {
    history.push(`/project/${id}`);
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }
  useEffect(() => {
    const getAjax = async () => {
      
      const res = await axios.get("http://15.165.194.66:8080/project/top");
      setPrjList([...res.data]);
        
    }
    getAjax();
    
  },[]);

  const handleResize = (e) => {
    console.log("ee", e);
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.Body>
      <Container>
        <Row>
          <Col>
            <Sdiv col>
              <Sdiv row act>
                <Stext mgb={18} mgt={40} h3 g0>
                  # 프로젝트   
                </Stext>
              </Sdiv>
              <Sdiv className="custom-slick">
                <Slider
                  {...settings}
                  slidesToShow={isMobile ? 1 : 3}
                  slidesToScroll={isMobile ? 1 : 3}
                  arrows={!isMobile}
                >
                  {prjList.map((item) => {
                    return (
                    <S.ProfileCol>
                     <Sdiv onClick={handleTop} >
                        <CardProjectHome
                          src={defaultImg}
                          title={item.projectName}
                          subTitle={"subTitle"}
                          progress={item.progress}
                          onClick={()=>{goProject(item.id)}}
                        />
                      </Sdiv>
                    </S.ProfileCol>
                    );  
                })}
                </Slider>
              </Sdiv>
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv col mgt={44}>
              <Stext mgb={18} h3 g0>
                # 프로필 둘러보기
              </Stext>
              <Sdiv
                row
                style={{ display: "flex", flexWrap: "wrap", gap: `8px 0` }}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    variant="success"
                    id="dropdown-basic"
                  >
                    <Stext b2 g4>
                      스택 필터
                    </Stext>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>JAVA</Dropdown.Item>
                    <Dropdown.Item>SPRING</Dropdown.Item>
                    <Dropdown.Item>Django</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Sdiv>
            </Sdiv>
          </Col>
        </Row>
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
      </Container>
    </S.Body>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <S.DropdownContainer
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <Sdiv mgl={16}>
      <IcDropArrowDown />
    </Sdiv>
  </S.DropdownContainer>
));

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.DropdownContainer = styled.div`
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 8px;
  min-width: 143px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;
