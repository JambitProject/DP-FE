import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { BadgeDefaultGray, DefaultButtonSm, Sdiv, Stext, CardProjectHome, ModalContainer } from "components";
import { Row, Col, Container } from "react-bootstrap";

import axios from "axios";
import Cookies from "universal-cookie";
import defaultProfileImg from "images/defaultProfileImg.svg";

export const PortfolioDetailScreen = ({myFollowees, setMyFollowees}) => {
  const { nickname } = useParams(); //url파라미터로 넘어온 포트폴리오 주인 닉네임
  const history = useHistory();
  const cookies = new Cookies();
  const [prjList, setPrjList] = useState([]); //포트폴리오 주인의 프로젝트들
  const [thisMember, setThisMember] = useState({
    
    skillList:[],
  }); // 포트폴리오 주인 정보
  
  //const [isMyFollowee, setIsMyFollowee] = useState(localStorage.getItem('targetNickName')===nickname ? localStorage.getItem('isMyFollowee') : false);
  const [isMyFollowee, setIsMyFollowee] = useState(false);
  const [followDtoId, setFollowDtoId] = useState(-1);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    if(cookies.get('nickname') === undefined){
      setShowLoginModal(true);
      return;
    }
    const tmpFollowDto = {
      nickname:cookies.get('nickname'),
      followee:nickname,
    }
    await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/follow`, tmpFollowDto)
      .then(res=>{
        
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

  return (
    <S.Body>
      <Container>
        <S.PortFolioImage />
        <Row xs={1} sm={1} md={2} style={{ marginTop: 36, gap: "16px 0px" }}>
          <Col>
            <Sdiv row act>
              <S.ImageProfile src={thisMember.profileImage ? thisMember.profileImage : defaultProfileImg}/>
              <Sdiv col mgl={12} mgr={24}>
                <Stext s2 g0>
                  {thisMember && thisMember.nickname}
                  
                </Stext>
                <Stext b2 g0>
                  {thisMember && thisMember.description}
                </Stext>
                {/* <Stext s3 g0 style={{color:`${colors.primary}`}}>
                  {'팔로워: '+totalFollowers +"명"}
                </Stext> */}
              </Sdiv>
              
              {
                
                //localStorage.getItem('targetNickname')===nickname || isMyFollowee ? 
                isMyFollowee ? 
                <DefaultButtonSm 
                  fillPrimary title="Following"
                  onClick={handleUnfollow}
                /> 
                : 
                <DefaultButtonSm
                  linePrimary title="Follow"
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
      <ModalContainer show={showLoginModal}>
        <Stext h3 g0 mgb={20}>
          로그인이 필요합니다.
        </Stext>
        
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="취소" linePrimary onClick={()=>{
            setShowLoginModal(false);
          }} />
          <Sdiv w={4} />
          <DefaultButtonSm title="로그인으로" fillPrimary onClick={()=>{
            history.push('/login');
          }}/>
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
`;

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 40px 0px;
  margin-top: 18px;
`;
