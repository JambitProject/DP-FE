import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
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
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import Cookies from "universal-cookie";

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
  const cookies = new Cookies();
  const {id} = useParams();
  const [prj, setPrj] = useState({});

  const [techStackList, setTechStackList] = useState([]);
  
  const frm = new FormData();

  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  useEffect(()=>{
    const getTechStack = async ()=>{

      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/skill/all`)
        .then(async (res)=>{
          await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/skill/${id}`)
            .then(res2=>{
              const tmpList = [];
              res.data.forEach(item=>{
                tmpList.push({...item, searched:true, selected:false});
              })
              tmpList.forEach(item=>{
                res2.data.forEach(item2=>{
                  if(item2.id === item.id){
                    item.selected = true;
                    return false;
                  }
                })
              })
              setTechStackList(tmpList);

            })
        })
     
      
    }
    const getPrj = async()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/${id}`)
        .then(res=>{
          setPrj(res.data);
        })
    }
    getTechStack();
    getPrj();
    
  },[])

  const onClickOpenModal = () => {
    setShowModal(true);
  };

  //추가된 기술 스택을 prj 스테이트의 techStack 프로퍼티 형식에 맞게 세팅해준다.
  const onClickCompleteModal = () => {
    
    let prjStack = "";
    let cnt = 0;
    techStackList.forEach(item=>{
      if(item.selected===true){
        if(cnt===0){
          prjStack = item.id;
          cnt++;
        }else{
          prjStack = prjStack + '#' + item.id;
        }
        
      }
    })  
    console.log(prjStack);
    setPrj({...prj, techStack:prjStack});
    setShowModal(false);
  };

  //setPrj없이 모달을 그냥 닫는다. 
  const onClickCloseModal = ()=>{
    setShowConfirmModal(false);
    setShowModal(false);
  }

  //프로젝트 업로드 폼에 입력한 값을로 setPrj를 한다. 
  const handleChange = (prop) => (e) => {
		setPrj({ ...prj, [prop]: e.target.value })
	}
  const deletePrj = async ()=>{
    await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/project/${id}`)
      .then(()=>{history.push('/myportfolio')})
      .catch(e=>console.log(e.response));
    
  }
  //prj를 이용해서 서버에 post한다. 
  const postAjax = (sendParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}/project`;
    axios.post(url, sendParam, {headers:headers})
      .then(()=>{
        history.push('/myportfolio');
        
      })
      .catch((e)=>{
        console.log(sendParam);
        console.log(e);
      })
  }

  //수정이 완료된 프로젝트를 수정요청한다. 
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
      const headers = {
        "Accept" : "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
     axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/project`, JSON.stringify(prj), {headers:headers})
      .then(()=>{
        history.push(`/project/${id}`);
      })
      .catch(e=>{
        console.log(e.response);
      })
      
    }
  }

  //프로젝트 진행사항을 셋팅한다.(setPrj) 
  const handleProgress = (progress)=>{
		setPrj({ ...prj, progress: progress });
  }

  //스택 버튼을 클릭하면 selected가 toggle되게 한다
  const handleStackButtonSelect = (thisId)=>{

    setTechStackList(techStackList.map((item)=>{
        return item.id===thisId ? {...item, selected: (!item.selected)} : {...item};
      })
    );   
  }

  //스택 추가 모달창 안의 검색 기능 - input으로 get요청을 한다. 
  const handleStackSearch = async (searchInput)=>{
    const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/skill/list?skillName=${searchInput}`);
    console.log(res.data);
    const tmpList = [...techStackList];
    tmpList.forEach(tmpItem=>{
      if(res.data.filter(e=>e.id === tmpItem.id).length>0){
        tmpItem.searched = true;
      }else{
        tmpItem.searched = false;
      }
    })
    console.log(tmpList);
    setTechStackList(tmpList);
    
    
  }

  useEffect(()=>{
    console.log(prj)
  },[prj])
  return (
    <S.Body>
      <Container>
        <Sdiv col>
          <Sdiv row act>
            <Stext mgb={18} mgt={40} h3 g0>
              # 프로젝트 수정하기
            </Stext>
          </Sdiv>
          <Sdiv>
            <InputWithTitle title="프로젝트 제목" onChange={handleChange('projectName')} name="projectName" placeholder={prj.projectName}/>
            <Sdiv mgt={24} />
            <InputWithToggleBtn 
              title="프로젝트 상태"  
              name="progress" 
              handleProgress={handleProgress} 
              name1="진행중" 
              name2="완료됨"
              selected={prj.progress}
            />
            <Sdiv mgt={24} />
            
            <InputWithTitle title="프로젝트 링크" onChange={handleChange('projectLink')} name="projectLink" placeholder={prj.projectLink}/>
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 Github 링크" onChange={handleChange('githubLink')} name="githubLink" placeholder={prj.githubLink}/>
            <Sdiv mgt={24} />
            <Sdiv mgb={12}>
              <Stext s4 g0 mgb={12}>
                사용한 언어, 프레임워크
              </Stext>
              <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              
              {
                techStackList && techStackList.map(item=>{
                  if(item.selected){
                    return <BadgeDefaultGray title={item.skillName}/>
                  }
                })
              }
              </Sdiv>
              <Sdiv jst mgt={15}>
                <DefaultButtonSm linePrimary title="추가/수정" onClick={onClickOpenModal}/>
              </Sdiv>
            </Sdiv>
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 참여 인원" />
            <Sdiv mgt={24} />
            <TextareaWithTitle title="프로젝트 설명" onChange={handleChange('content')} name="content" placeholder={prj.content}/>
          </Sdiv>
          
          <Sdiv mgt={40} ct>
            <ButtonContainerSm 
                onClick={handleRegister}
                style={{width:"300px"}}
                fillSecondary
                
              >
              <Sdiv s2>수정하기</Sdiv>
            </ButtonContainerSm>
          </Sdiv>
          <Sdiv mgt={40} ct>
            <ButtonContainerSm 
                onClick={()=>{setShowConfirmModal(true)}}
                style={{width:"300px"}}
                fillPrimary
                
              >
              <Sdiv s2>프로젝트 삭제하기</Sdiv>
            </ButtonContainerSm>
          </Sdiv>
        </Sdiv>
      </Container>
      <ModalContainer show={showModal}>
        <Stext h3 g0 mgb={20}>
          # 기술스택 추가하기
        </Stext>
        <Sdiv h={16} />
        <Sdiv col mgt={28} style={{ width: "100%" }}>
          <Sdiv row >
            <InputWithTitle placeholder="검색어를 입력하세요..." style={{ width: "100%" }} title="기술스택 선택" onChange={(e)=>{handleStackSearch(e.target.value)}}/>
          </Sdiv>
          <S.ModalStackContainer>
            {techStackList.map((item) => {
              return item.searched && <BadgeDefaultGray title={item.skillName} onClick={()=>{handleStackButtonSelect(item.id)}} selected={item.selected}/>;
            })}
          </S.ModalStackContainer>
        </Sdiv>
        <Sdiv h={28} />
        <Stext s4 g0 mgb={5}>
          추가된 기술 스택
        </Stext>
        <Sdiv mgt={3} row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
          {
            techStackList.map((item) => {
                if(item.selected){
                  return <BadgeDefaultGray title={item.skillName} onClick={()=>{handleStackButtonSelect(item.id)}} selected={item.selected}/>
                }
              }
            )
          }
        </Sdiv>
        <Sdiv h={78} />
        <S.Line />
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="닫기" line onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="완료" onClick={onClickCompleteModal} />
        </Sdiv>
        
      </ModalContainer>
      <ModalContainer show={showConfirmModal}>
        <Stext h3 g0 mgb={20}>
          정말 프로젝트를 삭제하시겠습니까?
        </Stext>
        
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="취소" linePrimary onClick={()=>{
            setShowConfirmModal(false);
          }} />
          <Sdiv w={4} />
          <DefaultButtonSm title="삭제하기" fillPrimary onClick={()=>{
            deletePrj();
            setShowConfirmModal(false);
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

S.ImageProfile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background-image: url('https://source.unsplash.com/random/48x48');
`;

S.ModalTextSm = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
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

const ButtonContainerSm = styled.div`
  
  border-radius: 8px;

  padding: 8px 12px;
  display: flex;

  ${(props) => props.fillPrimary && fillPrimary}
  ${(props) => props.fillSecondary && fillSecondary}
  ${(props) => props.linePrimary && linePrimary}
  ${(props) => props.lineSecondary && lineSecondary}

  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

const fillPrimary = css`
  border: 1px solid ${colors.primary};
  background-color: ${colors.primary} !important;
  color: ${colors.white} !important;
`;

const fillSecondary = css`
  border: 1px solid ${colors.secondary};
  background-color: ${colors.secondary} !important;
  color: ${colors.white} !important;
`;

const linePrimary = css`
  border: 1px solid ${colors.primary}; 
  background-color: transparent !important;
  color: ${colors.primary} !important;
`;

const lineSecondary = css`
  border: 1px solid ${colors.secondary};
  background-color: transparent !important;
  color: ${colors.secondary} !important;
`;