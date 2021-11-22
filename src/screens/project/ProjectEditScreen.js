import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import axios from "axios";

import {
  InputWithTitle,
  TextareaWithTitle,
  InputImage,
  Sdiv,
  Stext,
  DefaultButtonSm,
  ModalContainer,
  BadgeDefaultGray,
} from "components";

import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { InputWithToggleBtn } from "components/Input/Input";

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
//프로젝트 엔티티 형식
/*
  {
    id: number,         
    participatedNickname: string,
    progress: boolean,
    projectName: string, 
    content: string,
    link: string,
    viewCount: number,
    replyCount: number,
    techStack: string[],
    likesCount: number,
  }
*/
export const ProjectEditScreen = () => {
  
  const [prj, setPrj] = useState({
    //id: 0,
    participatedNickname: "jambit",
    progress: -1, // 0:ongoing, 1: complete
    projectName: "",
    content: "",
    link: "https://jambit.com",
    viewCount: 0,
    replyCount: 0,
    techStack: "",
    likesCount: 0,
  });

  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(undefined);
  const frm = new FormData();

  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const onClickOpenModal = () => {
    setShowModal(true);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (prop) => (e) => {
		setPrj({ ...prj, [prop]: e.target.value })
	}

  const postAjax = (sendParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = "http://15.165.194.66:8080/project";
    axios.post(url, sendParam, {headers:headers})
      .then(()=>{
      
      })
      .catch((e)=>{
        console.log(sendParam);
        console.log(e);
      })
    
  }

  const handleRegister = () => {
    
    if(prj.projectName===""){
      alert("프로젝트 이름은 필수 입력 항목입니다");
      return;
    }else if(prj.content ===""){
      alert("프로젝트 설명은 필수 입력 항목입니다");
      return;
    }else if(prj.progress < 0){
      alert("프로젝트 상태는 필수 선택 사항입니다");
      return;
    }else{
     //frm.append("image", []);
      frm.append('projectDto',JSON.stringify({...prj})); 
      frm.append('image', imgFile);
      postAjax(frm);
      
      history.push('/portfolio');
    }
  }

  const handleProgress = (progress)=>{
		setPrj({ ...prj, progress: progress });
  }

  const handleImageUpload = (e)=>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      const fileType = ["image/jpeg", "image/jpg", "image/png"];
      if (fileType.includes(file.type)) {
        setImgFile(file);
        setImgUrl(reader.result);
        
      } else {
        alert("지원하지 않는 형식입니다.");
      }
    };
    reader.readAsDataURL(file);
  }
  
  return (
    <S.Body>
      <Container>
        <Sdiv col>
          <Sdiv row act>
            <Stext mgb={18} mgt={40} h3 g0>
              # 프로젝트 등록하기
            </Stext>
          </Sdiv>
          <Sdiv>
            <InputWithTitle title="프로젝트 제목" onChange={handleChange('projectName')} name="projectName"/>
            <Sdiv mgt={24} />
            <InputWithToggleBtn title="프로젝트 상태"  name="progress" handleProgress={handleProgress}/>
            <Sdiv mgt={24} />
            <InputImage title="프로젝트 이미지" onChange={handleImageUpload}/>
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 링크" />
            <Sdiv mgt={24} />
            <InputWithTitle
              title="사용한 언어, 프레임워크"
              onClick={onClickOpenModal}
            />
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 참여 인원" />
            <Sdiv mgt={24} />
            <TextareaWithTitle title="프로젝트 설명" onChange={handleChange('content')} name="content"/>
          </Sdiv>
          <Sdiv mgt={40} jed>
            <DefaultButtonSm fill title="프로젝트 등록하기" onClick={handleRegister}/>
          </Sdiv>
        </Sdiv>
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
