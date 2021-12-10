import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import axios from "axios";
import dotenv from 'dotenv';
import {
  InputWithTitle,
  TextareaWithTitle,
  InputImage,
  Sdiv,
  Stext,
  DefaultButtonSm,
  ModalContainer,
  BadgeDefaultGray,
  ProfileElem,
  CardProfile,
  DefaultButton,
} from "components";

import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { InputWithToggleBtn } from "components/Input/Input";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import Cookies from "universal-cookie";


export const ProjectUploadScreen = () => {
  const cookies = new Cookies();
  const [prj, setPrj] = useState({
    //id: 0,
    participatedNickname: String(cookies.get('memberId')),
    projectManager: cookies.get('nickname'),
    progress: -1, // 0:ongoing, 1: complete
    projectName: "",
    content: "",
    projectLink: "https://jambit.com",
    githubLink: "https://github/jambit.com",
    viewCount: 0,
    replyCount: 0,
    techStack: "",
    likesCount: 0,
  });

  const [techStackList, setTechStackList] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(undefined);
  const [participants, setParticipants] = useState([]);
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [memberString, setMemberString] = useState("");
  const frm = new FormData();
  
  const history = useHistory();
  
  const [showModal, setShowModal] = useState(false);
  
  useEffect(()=>{
    const getTechStack = async ()=>{
      
      const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/skill/all`);
      
      res.data.map(item=>{
        item.selected = false;
        item.searched = true;
      })
      setTechStackList(res.data);
      
    }
    getTechStack();
    setPrj({...prj, participatedNickname:cookies.get('memberId'), projectManager:cookies.get('nickname')})
    
  },[])
  
  const handleCloseFilter=()=>{
    setShowSearchFilter(false);
  }
  useEffect(()=>{
    window.addEventListener('click', handleCloseFilter);
    return()=>{
      window.removeEventListener('click', handleCloseFilter);
    }
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
    
    setPrj({...prj, techStack:prjStack});
    setShowModal(false);
  };

  //setPrj없이 모달을 그냥 닫는다. 
  const onClickCloseModal = ()=>{

    setShowModal(false);
  }
  
  //프로젝트 업로드 폼에 입력한 값을로 setPrj를 한다. 
  const handleChange = (prop) => (e) => {
		setPrj({ ...prj, [prop]: e.target.value })
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

  //입력이 완료된 프로젝트를 이미지와 함께 등록한다. 
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

  useEffect(()=>{
    let addedMemId = String(cookies.get('memberId'));
    
    participants.forEach((item)=>{
      
        addedMemId = addedMemId +'#' +String(item.id);

      
    })
    
    setPrj({...prj, participatedNickname:addedMemId});
  },[participants])

  //스택 추가 모달창 안의 검색 기능 - input으로 get요청을 한다. 
  const handleStackSearch = async (searchInput)=>{
    const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/skill/list?skillName=${searchInput}`);
    
    const tmpList = [...techStackList];
    tmpList.forEach(tmpItem=>{
      if(res.data.filter(e=>e.id === tmpItem.id).length>0){
        tmpItem.searched = true;
      }else{
        tmpItem.searched = false;
      }
    })
    
    setTechStackList(tmpList);
    
    
  }

 

  //이미지를 컴퓨터에서 가져오고 대상 파일을 setImgFile한다. 
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
  const handleParticipateChange = async (e)=>{
    
    setSearchInput(e.target.value);
    await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/list?nickname=${e.target.value}`)
      .then(res=>{
        setSearchedMembers(res.data);
      })
      .catch(e=>{
        console.log(e.response);
      })
  }
  useEffect(()=>{
    if(searchInput && searchedMembers.length>0 && searchedMembers.filter(item=>{return cookies.get('memberId') == item.id}).length ===0){
      setShowSearchFilter(true);
    }
  },[searchInput])
  const handleAddParticipant = (id)=>{
    
    setParticipants([...participants, 
      ...searchedMembers.filter(member=>{
        let isDup = false;
        participants.forEach(mem=>{
          if(mem.id === member.id) {
            isDup= true;
            return false;
          }
        })
      if(!isDup){
      return member.id === id;

      }else return false;
     
    })]);
  }

  const handleRemoveParticipant = (id)=>{
    setParticipants(participants.filter(member=>{
      return member.id !== id;
    }))
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
            <InputWithToggleBtn 
              title="프로젝트 상태"  
              name="progress" 
              handleProgress={handleProgress}
              name1="진행중"
              name2="완료됨"
              selected={undefined}
            />
            <Sdiv mgt={24} />
            <Sdiv row>
              <InputImage title="프로젝트 이미지" onChange={handleImageUpload}/>
              {
                imgUrl && 
                <Sdiv mgt={30} mgl={20}>
                  <img src={imgUrl} width={80} height={80}/>
                </Sdiv>
              }
            </Sdiv>
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 링크" onChange={handleChange('projectLink')} name="projectLink"/>
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 Github 링크" onChange={handleChange('githubLink')} name="githubLink"/>
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
            <InputWithTitle title="프로젝트 참여 인원" onChange={handleParticipateChange} hooraceholder="닉네임으로 검색하세요..."/>
            {
              searchInput && searchedMembers.length>0 && 
              <StyledSeachResult show={showSearchFilter}>
                {searchedMembers.map(item=>{
                  if(item.id == cookies.get('memberId')) return;
                 
                  return(
                  <Sdiv style={{borderBottom:`0.5px solid ${colors.gray6}`, width:"100%"}}>
                    <ProfileElem 
                      src={item.profileImage} 
                      title={item.nickname}
                      onClick={()=>{handleAddParticipant(item.id)}}
                    />
                  </Sdiv>

                  )
                })}
              </StyledSeachResult>
              
            }
            <Sdiv mgt={24} />
            <Sdiv row>
            {
              participants.map(item=>{
                return(
                    <Sdiv w={200} mgr={10}>
                      <CardContainer>
                        <Sdiv col jct act>
                          <CardProfileImage src={item.profileImage} />
                          <Stext mgt={4} mgb={8} s1 g0>
                            {item.nickname}
                          </Stext>
                          
                        </Sdiv>
                        <Sdiv mgt={8} />
                        <DefaultButton fillPrimary onClick={()=>{handleRemoveParticipant(item.id)}} title="삭제" />
                      </CardContainer>
                    </Sdiv>
                )
              })
            }
              </Sdiv>
            <Sdiv mgt={24} />
            <TextareaWithTitle title="프로젝트 설명" onChange={handleChange('content')} name="content"/>
          </Sdiv>
          <Sdiv mgt={40} jed>
            <DefaultButtonSm fillPrimary title="프로젝트 등록하기" onClick={handleRegister}/>
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
          <DefaultButtonSm title="닫기" linePrimary onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="완료" fillPrimary onClick={onClickCompleteModal} />
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

const StyledSeachResult = styled.div`
width: 13%;
display:${(props)=>props.show ? 'block' : 'none'};
/*border: 1px solid ${colors.primary};*/
height:150px;
overflow-y:hidden;
background: #f3f3f4;
border-radius: 8px;
position:absolute;
font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 140% */
  
  /* g0 */

  color: #0d0c22;
`;

const CardContainer = styled.div`
  max-width: 200px;

  display: flex;
  flex-direction: column;
  padding: 24px;
  justify-content: center;
  
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 12px;
  
`;

const CardProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  object-fit: cover;
  
`;