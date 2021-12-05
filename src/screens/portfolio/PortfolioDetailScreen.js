import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { BadgeDefaultGray, DefaultButtonSm, Sdiv, Stext, CardProjectHome } from "components";
import defaultImg from 'images/pngs/defaultImg.png';
import { Row, Col, Container } from "react-bootstrap";
import Slider from "react-slick";

import { ReactComponent as IcSetting } from "images/IcSetting.svg";
import axios from "axios";
import Cookies from "universal-cookie";

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

export const PortfolioDetailScreen = ({myFollowees, setMyFollowees}) => {
  const { nickname } = useParams(); //url파라미터로 넘어온 포트폴리오 주인 닉네임
  const history = useHistory();
  const cookies = new Cookies();
  const [prjList, setPrjList] = useState([]); //포트폴리오 주인의 프로젝트들
  const [imgList, setImgList] = useState([]); //포트폴리오 주인 프로젝트들의 이미지리스트
  const [thisMember, setThisMember] = useState({
    // userId:"giregi",
    // nickname:"nigimi",
    // description: "니가가라 하와이",
    skillList:[],
  }); // 포트폴리오 주인 정보
  
  //const [isMyFollowee, setIsMyFollowee] = useState(localStorage.getItem('targetNickName')===nickname ? localStorage.getItem('isMyFollowee') : false);
  const [isMyFollowee, setIsMyFollowee] = useState(false);
  const [followDtoId, setFollowDtoId] = useState(-1);
  

  useEffect(()=>{
    
    if(myFollowees){
      
      for(let i = 0; i<myFollowees.length; i++){
       
        if(myFollowees[i].followee === nickname){
          setIsMyFollowee((prevState)=>true);
          setFollowDtoId(()=> myFollowees[i].id);
          break;
        }
      } 
    }
    
  },[])
  
  useEffect(() => {
    const getAjax = async () => {
      
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/${nickname}`)
      .then((res)=>{
        setThisMember(res.data);
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/project/${res.data.id}`)
        .then((prjPromise)=>{
          setPrjList(prjPromise.data);
        }).catch(e=>{
          console.log(e.response);
        })
      }).catch(e=>{
        console.log(e.response);
      })
      
    }
    getAjax();
    
  },[]);

  
  const goProject = (id) => {
    history.push(`/project/${id}`);
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }
  const handleFollow = async ()=>{
    const tmpFollowDto = {
      nickname:cookies.get('nickname'),
      followee:nickname,
    }
    await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/follow`, tmpFollowDto)
      .then(res=>{
        console.log(res)
        setFollowDtoId(()=>res.data)
      })
      .catch(e=>{
        console.log(e);
      })
    setIsMyFollowee((prevState)=>true);
    await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/follow/following/${cookies.get('nickname')}`)
        .then(res=>{
          setMyFollowees([...res.data]);
        })
        .catch(e=>{
          console.log(e.response);
        })
    //localStorage.removeItem('isMyFollowee');
    //localStorage.setItem('targetNickName', nickname);
  }

  const handleUnfollow =async ()=>{
    if(nickname==="찢재명"){
      alert('다시는 언팔할 수 없습니다. 영원히 찢재명을 팔로우해야합니다');
    }
    else{
      
      await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/follow/${followDtoId}`);
      setIsMyFollowee((prevState)=> false);
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/follow/following/${cookies.get('nickname')}`)
        .then(res=>{
          setMyFollowees([...res.data]);
        })
        .catch(e=>{
          console.log(e.response);
        })
      //localStorage.removeItem('isMyFollowee');
      //localStorage.setItem('targetNickName', nickname);
    }

  }

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
                  {thisMember && thisMember.nickname}
                  
                </Stext>
                <Stext b2 g0>
                  {thisMember && thisMember.description}
                </Stext>
              </Sdiv>
              
              {
                
                //localStorage.getItem('targetNickname')===nickname || isMyFollowee ? 
                isMyFollowee ? 
                <DefaultButtonSm 
                  fillPrimary title="신고하기"
                  onClick={handleUnfollow}
                /> 
                : 
                <DefaultButtonSm
                  linePrimary title="후장빨기"
                  onClick={handleFollow}
                />
              }
              
            </Sdiv>
          </Col>
          <Col>
            <Sdiv act row style={{ gap: "0px 4px", flexWrap: "wrap" }} jed>
              { thisMember && thisMember.skillList.map((item) => (
                <BadgeDefaultGray title={item} />
              )) }
             
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
            
          </Col>
        </Row>
        <S.ProfileRow xs={2} sm={2} md={3}>
          
          {prjList.map((item) => {
              return (
              <S.ProfileCol>
               <Sdiv onClick={handleTop} >
                  <CardProjectHome
                    src={item.imgList[0]}
                    title={item.projectName}
                    subTitle={"subTitle"}
                    progress={item.progress}
                    onClick={()=>{goProject(item.id)}}
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
