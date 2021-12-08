import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { RecruitList, Sdiv, Stext, DefaultButtonSm, ModalContainer } from "components";

import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import Cookies from "universal-cookie";
import axios from "axios";



export const RecruitListScreen = () => {
  const history = useHistory();
  const cookies = new Cookies();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const [boardDtoList, setBoardDtoList] = useState([]);

  const goRecruitUpload = () => {
    
    if(cookies.get('nickname') === undefined){
      setShowLoginModal(true);
      return;
    }
    history.push("/recruit-upload");
  };

  const goRecruitDetail = (id)=>{
    history.push(`/recruit/${id}`);
  }
  //첫 마운트 시 board를 가져온다 
  useEffect(()=>{
    const getBoardDtoList = async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/board/list`)
        .then((res)=>{
          setBoardDtoList(res.data.content);
          
        })
        .catch(e=>{
          console.log(e.response);
        })
    }
    getBoardDtoList();
  },[])

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
                  onClick={goRecruitUpload}
                />
              </Sdiv>
            </Sdiv>
          </Row>
          <Sdiv>
            {boardDtoList && boardDtoList.map((item) => {
              return (
                <Sdiv onClick={()=>{goRecruitDetail(item.id)}}>
                  <RecruitList
                    date={item.date}
                    title={item.title}
                    body={item.body}
                    progress={item.progressType}
                    src={item.profileImage}
                    replyCount={item.replyCount}
                    viewCount={item.viewCount}
                    likesCount={item.likesCount}
                    skillList={item.skillList}
                  />
                </Sdiv>
              );
            })}
          </Sdiv>
        </Sdiv>
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
  width: 100%;
`;
