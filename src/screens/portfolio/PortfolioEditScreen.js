import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components"
import {
  BadgeDefaultGray,
  DefaultButtonSm,
  InputWithTitle,
  ListMyPost,
  ModalContainer,
  Sdiv,
  Stext,
  CardProfile,
  TextareaWithTitle,
  CardProjectHome,
} from "components";

import { Row, Col, Container } from "react-bootstrap";
import { colors } from "styles/colors";
import axios from "axios";
import Cookies from 'universal-cookie';
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
  
 
  
];

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

export const PortfolioEditScreen = () => {

  const [member, setMember] = useState({
    //id: 0,
    userId:"",  //이메일
    nickname:"",  //닉네임(기본값은 이메일에서 @전까지의 스트링)
    description:"", //소개한마디
    skillSet:"",  //기술 스택
  });

  const history = useHistory();
  const [techStackList, setTechStackList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const cookies = new Cookies();
  const onClickOpenModal = () => {
    setShowModal(true);
  };

  //서버에 put한다. 
  const putAjax = (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    axios.put(url, sendParam, {headers:headers})
      .then(()=>{
        
      })
      .catch((e)=>{
        console.log(sendParam);
        console.log(e);
      })
  }
  //서버에 post한다. 
  const postAjax = (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    axios.post(url, sendParam, {headers:headers})
      .then(()=>{
        
      })
      .catch((e)=>{
        console.log(sendParam);
        console.log(urlParam);
        console.log(e);
      })
  }
  //추가된 기술 스택을 member 스테이트의 techStack 프로퍼티 형식에 맞게 세팅해준다.
  const onClickCompleteModal = () => {
    
    let memberStack = "";
    let cnt = 0;
    techStackList.forEach((item)=>{
      if(item.selected===true){
        if(cnt===0){
          memberStack = item.id;
          cnt++;
        }
        else{
          memberStack = memberStack + '#' + item.id;
        }
        
      }
    })  
    setMember({...member, skillSet:memberStack});
    setShowModal(false);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }

  const goProfile = ()=>{
    history.push('/portfolio')
  }

  const onClickSave = ()=>{
    //닉변을 한 경우 쿠키를 재세팅 한다. 
    if(cookies.get('nickname') !== member.nickname){
      cookies.set('nickname', member.nickname);
    }
    //멤버업데이트 
    putAjax({...member}, "/member");
    const skillSetRegisterObj = {
      memberId:parseInt(cookies.get('memberId')),
      skill:member.skillSet,
    }
    postAjax(JSON.stringify(skillSetRegisterObj), "/member/skill");
    history.push('/myportfolio');
    
  }

  //get요청 따로따로 2번하지말고 axios.all([axios.get(), axios.get()]) 하고 결과는 spread하면 된다
  useEffect(()=>{
    
    const getAjax = async ()=>{
      
      await axios
        .all([
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/skill/all`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/skill/me?member_id=${parseInt(cookies.get('memberId'))}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/${cookies.get('nickname')}`),
         ])
        .then(
          axios.spread((allStack, myStack, memberInfo) =>{
            const tmpMyStack = [...myStack.data];
            let tmpAllStack = [...allStack.data];
            tmpAllStack.forEach(tmpItem=>{
              if(tmpMyStack.filter(e=>e.id === tmpItem.id).length>0){
                tmpItem.selected = true;
              }else{
                tmpItem.selected = false;
              }
              tmpItem.searched = true;
            });
            setTechStackList([...tmpAllStack]);
            setMember(memberInfo.data);
            
            console.log(memberInfo);
            console.log(myStack);
          })
        )
        .catch((e)=>{
          console.log("get 오류")
          console.log(e);
        })
      
    }
    getAjax();
    
  },[]);

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
    
    setTechStackList(tmpList);
    
    
  }

  return (
    <S.Body>
      <Container>
        <Row>
          <Col>
            <Sdiv row act mgt={42}>
              <S.ImageProfile />
              <Sdiv col mgl={12} mgr={24}>
                <Stext s2 g0>
                  {cookies.get('nickname')}
                </Stext>
                <Stext b2 g0>
                  {member.description}
                </Stext>
              </Sdiv>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgr={10} h3 g0>
                # 내 기술스택
              </Stext>
              <DefaultButtonSm
                onClick={onClickOpenModal}
                line
                title="추가/수정"
              />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              {techStackList && techStackList.map((item) => (

                item.selected && <BadgeDefaultGray title={item.skillName} />
              ))}
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Stext mgb={30} h3 g0>
              # 내정보
            </Stext>
            <InputWithTitle title="닉네임 변경" />
            <Sdiv h={20} />
            <InputWithTitle title="소개 한마디 변경" />
            <Sdiv mgt={20} jed>
              <DefaultButtonSm fill title="변경사항 저장하기" onClick={onClickSave}/>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext h3 g0>
                # Followers
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
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
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={80} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext h3 g0>
                # Following
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
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
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={80} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgr={10} h3 g0>
                # 나의 모집중인 글
              </Stext>
              <DefaultButtonSm line title="모집글 쓰기" />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
              <ListMyPost />
              <ListMyPost />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
        <Row>
          <Col>
            <Sdiv row>
              <Stext h3 g0>
                # 관심추가한 프로젝트 모집 글
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={30} />
        <Row>
          <Col>
            <Sdiv>
              <ListMyPost />
              <ListMyPost />
            </Sdiv>
          </Col>
        </Row>
        <Sdiv h={40} />
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

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;
