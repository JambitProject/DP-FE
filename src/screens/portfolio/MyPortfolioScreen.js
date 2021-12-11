import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { BadgeDefaultGray, DefaultButtonSm, Sdiv, Stext, CardProjectHome } from "components";
import defaultImg from 'images/pngs/defaultImg.png';
import { Row, Col, Container } from "react-bootstrap";
import Slider from "react-slick";

import { ReactComponent as IcSetting } from "images/IcSetting.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import { ConstructionOutlined, IosShare } from "@mui/icons-material";
import defaultProfileImg from "images/defaultProfileImg.svg";
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

export const MyPortfolioScreen = () => {

  const history = useHistory();

  const [prjList, setPrjList] = useState([]);
 
  const cookies = new Cookies();
  const [member, setMember] = useState({});
  const [myTechStack, setMyTechStack] = useState([]);
  const [totalFollowers, setTotalFollowers] = useState(0);
  useEffect(() => {
    const getAjax = async () => {
      await axios
        .all([
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/project/${parseInt(cookies.get('memberId'))}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/${cookies.get('nickname')}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/skill/me?member_id=${parseInt(cookies.get('memberId'))}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/follow/total/follower/${cookies.get('nickname')}`)
        ])
        .then(
          axios.spread((projectPromise, memberPromise, myStackPromise, followerCnt)=>{
            setTotalFollowers(followerCnt.data);
            setMember(memberPromise.data);  //내정보(닉네임, 소개한마디 등)
            setMyTechStack([...myStackPromise.data]); //내기술스택
            setPrjList([...projectPromise.data])  //내프로젝트들
        }))
        .catch((e)=>{
          console.log('실패');
          console.log(e.response);
          
        })
        
    }
    getAjax();
    
  },[]);

  const goProjectUpload = () => {

    history.push("/project-upload");
  };

  const goPortfolioEdit = () => {
    history.push("/portfolio-edit");
  };

  const goProject = (id) => {
    history.push(`/project/${id}`);
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }

  
  return (
    <S.Body>
      <Container>
        <Sdiv mgt={10}>
          <S.PortFolioImage />
        </Sdiv>
        <Row xs={1} sm={1} md={2} style={{ marginTop: 36, gap: "16px 0px" }}>
          <Col>
            <Sdiv row act>
              <S.ImageProfile src={member.profileImage ? member.profileImage : defaultProfileImg}/>
              <Sdiv col mgl={12} mgr={24}>
                <Stext s2 g0>
                  {cookies.get('nickname')}
                </Stext>
                <Stext b2 g0>
                  {member.description}
                </Stext>
                <Stext s3 g0 style={{color:`${colors.primary}`}}>
                  {'팔로워: '+totalFollowers +"명"}
                </Stext>
            
                
              </Sdiv>
              {/*<DefaultButtonSm line />*/}
            </Sdiv>
          </Col>
          
          
          <Col>
            <Sdiv act row style={{ gap: "0px 4px", flexWrap: "wrap" }} jed>
              {myTechStack && myTechStack.map((item) => (
                <BadgeDefaultGray title={item.skillName} />
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
              {/* <div style={{ maxWidth: 306 }}>
                <Slider {...settings}>
                  {TMP_SLIDER_ITEM.map((item) => {
                    return (
                      <Stext style={{ width: 0 }} g0 s1 center>
                        {item.title}
                      </Stext>
                    );
                  })}
                </Slider>
              </div> */}
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
              <DefaultButtonSm fillPrimary title="새 프로젝트 업로드 하기" onClick={goProjectUpload} />
            </Sdiv>
          </Col>
        </Row>
        <S.ProfileRow xs={2} sm={2} md={3}>
          
          {prjList.map((item) => {
              console.log(item);
              return (
                <S.ProfileCol>
                  <Sdiv onClick={handleTop} >
                    <CardProjectHome
                      src={item.imgList[0]}
                      title={item.projectName}
                      subTitle={"subTitle"}
                      progress={item.progress}
                      onClick={()=>{goProject(item.id)}}
                      likesCount={item.likesCount}
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

const BadgeContainerSm = styled.div`
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  margin-top:8px;
  flex-direction: row;
  justify-content: center;
  color: ${props=> props.selected ? 'white' : 'black'};
  background-color: ${props => props.selected ? colors.primary : colors.gray7}
`;
