import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { Form } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import {
  InputWithTitle,
  TextareaWithTitle,
  Sdiv,
  Stext,
  DefaultButtonSm,
  ModalContainer,
  BadgeDefaultGray,
  CardProjectHome,
  InputWithToggleBtn,
  
} from "components";

import { Col, Container } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";


const selectBoxStyle={
  display:"inline-block",
  width:"200px",
  height:"50px",  
  marginRight:"10px",
}
const numberBoxStyle={
  display:"inline-block",
  width:"100px",
  height:"50px",  
  marginRight:"10px",
}
const optionList = [
  "프론트엔드",
  "백엔드",
  "풀스택",
  "DevOps",
  "모바일",
  "AI",
  "데이터"
]
const numberList = [0,1,2,3,4,5];

export const RecruitEditScreen = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const {id} = useParams();
  const [showModal, setShowModal] = useState(false);  //스택추가 모달
  const [showPrjModal, setShowPrjModal] = useState(false);  //프로젝트 연동 모달
  const [showConfirmModal, setShowConfirmModal] = useState(false);  //프로젝트 연동 모달
  const [selectCnt, setSelectCnt] = useState(1);  //몇 개의 포지션을 구하는지
  const [positionList, setPositionList] = useState([]);  //포지션 별 정보 담은 obj 리스트
  const [refPrjId, setRefPrjId] = useState(-1);
  const [myPrjList, setMyPrjList] = useState([]);
  const [techStackList, setTechStackList] = useState([]);
  const [recruitDto, setRecruitDto] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const onClickOpenModal = () => {
    setShowModal(true);
  };
  const onClickOpenPrjModal = () => {
    setShowPrjModal(true);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };
  const onClickClosePrjModal = () => {
    setShowPrjModal(false);
  };
  //추가된 기술 스택을 prj 스테이트의 techStack 프로퍼티 형식에 맞게 세팅해준다.
  const onClickCompleteModal = () => {
  
    let tmpStack = "";
    let cnt = 0;
    techStackList.forEach(item=>{
      if(item.selected===true){
        if(cnt===0){
          tmpStack = item.id;
          cnt++;
        }else{
          tmpStack = tmpStack + '#' + item.id;
        }
        
      }
    })  
    setRecruitDto({...recruitDto, skillSet:tmpStack});
    setShowModal(false);
  };
  const onClickCompletePrjModal = () => {
  
    myPrjList.forEach((item)=>{
      if(item.selected){
        setRecruitDto({...recruitDto, projectRefId:item.id});
      }
    })
    setShowPrjModal(false);
  };
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
  useEffect(()=>{
    myPrjList.map(item=>{
      if(item.selected){
        setRefPrjId(item.id);
        setRecruitDto({...recruitDto, projectRefId:item.id});
      }
    })
  },[myPrjList])

  //프로젝트 추가 모달창 안의 검색 기능 - input으로 get요청을 한다. 
  const handlePrjSearch = async (searchInput)=>{
    const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/list?projectName=${searchInput}`);
    
    const tmpList = [...myPrjList];
    tmpList.forEach(tmpItem=>{
      if(res.data.filter(e=>e.id === tmpItem.id).length>0){
        tmpItem.searched = true;
      }else{
        tmpItem.searched = false;
      }
    })
    setMyPrjList(tmpList);
    
    
  }
  //모집포지션 변경
  const handleChangePosition=(e, i)=>{ 
    let tmpList = [];
    
    positionList.forEach(item=>{
      tmpList.push(JSON.parse(item));
    })

    tmpList[i].position = e.target.value;
    tmpList = tmpList.map(item=>{
      return JSON.stringify(item);
    })
    setPositionList(tmpList);
  }

  //해당포지션 인원 수 변경
  const handleChangeCount=(e, i)=>{  
    let tmpList = [];
    positionList.forEach(item=>{
      tmpList.push(JSON.parse(item));
    })

    tmpList[i].count = e.target.value;
    tmpList = tmpList.map(item=>{
      return JSON.stringify(item);
    })
    setPositionList(tmpList);
  }

  //포지션 추가 버튼 클릭 시
  const onClickPositionAdd = ()=>{
    setSelectCnt(selectCnt + 1);
    let tmpObj = {
      position:"프론트엔드",
      count:1,
    }
    setPositionList([...positionList, JSON.stringify(tmpObj)]);
  }

  //포지션 아이템 삭제버튼 클릭 시
  const onClickPositionDelete = (i)=>{
    setSelectCnt(selectCnt-1)
    let tmpList = [...positionList];
    tmpList.splice(i,1);
    setPositionList(tmpList);
  }

  //positionList가 변경될 때마다 recruitDto에 반영시킴
  useEffect(()=>{
    setRecruitDto({...recruitDto, positionList:positionList})
  },[positionList])
  
  //Input 내용들을 recruitDto에 반영 
  const handleInputChange = (prop)=>(e)=>{
    setRecruitDto({ ...recruitDto, [prop]: e.target.value });
  }

  //선택한 프로젝트 아이템의 selected가 true가 되고, 이전에 selected가 true인 item을 false로 바꾼다.
  const handlePrjButtonSelect = (thisId)=>{
    setMyPrjList(myPrjList.map(item=>{
      return item.id === thisId ? {...item, selected:(!item.selected)}: item.selected ? {...item, selected:false} : {...item}
    }))
  }

  //recruitDto를 폼데이터로 만들어서 post 날림
  const handleRegister=async ()=>{
    
    //const frm = new FormData();
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    //frm.append('boardDto', JSON.stringify({...recruitDto}));

    await axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/board`, JSON.stringify(recruitDto), {headers:headers})
      .then(()=>{
        history.push(`/recruit/${id}`);
      }).catch(e=>{
      })

  }

  const checkDuplicate = ()=>{
    let tmpList = [];
    let tmpSet = new Set();
    positionList.forEach(item=>{
      tmpList.push(JSON.parse(item));
    })
    tmpList.forEach(item=>{
      tmpSet.add(item.position);
    })
    return tmpSet.size !== positionList.length;
  }

  useEffect(()=>{
  },[recruitDto])
  //mount될 때 내 프로젝트 리스트와 스택리스트를 get해와서 techStackList와 
  useEffect(()=>{
    const getData = async ()=>{
      await axios.all([
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/project/${parseInt(cookies.get('memberId'))}`),
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/skill/all`),
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/board/${id}`),
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/position/list?postId=${id}`)
        
      ])
      .then(
        axios.spread(async (prjPromise, stackPromise, boardPromise, res)=>{
          
          if(boardPromise.data.projectRefId !== -1){
            await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/${boardPromise.data.projectRefId}`)
              .then(res=>{
                setRefPrjId(res.data.id);
                prjPromise.data.map(item=>{
                  item.selected = item.id === res.data.id;
                  item.searched = true;
              })
            })
            
          }else{
            prjPromise.data.map(item=>{
              item.searched = true;
              item.selected = false;
            })
          }
          setMyPrjList([...prjPromise.data]);
          stackPromise.data.forEach(item=>{
            item.selected = false;
            boardPromise.data.skillList.forEach(skill=>{
              if(item.skillName === skill) item.selected = true;
            })
            item.searched = true;
          })
          setTechStackList([...stackPromise.data]);
          
          setRecruitDto({...boardPromise.data, positionList:res.data.map(item=>{return JSON.stringify(item)})});
          setPositionList(res.data.map(item=>{return JSON.stringify(item)}));
          setSelectCnt(res.data.length);
        })
      )
      .catch(e=>{
      })
    }
    
    getData();
  },[]);

  // useEffect(()=>{
  //   const getPositionList = async()=>{
  //     await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/position/list?postId=${id}`)
  //       .then(res=>{
  //         setRecruitDto({...recruitDto, positionList:res.data.map(item=>{return JSON.stringify(item)})});
  //         setPositionList(res.data.map(item=>{return JSON.stringify(item)}));
  //         setSelectCnt(res.data.length);
  //       })
  //       .catch(e=>{
  //       })
  //   }
  //   getPositionList();

  // },[])


  const goProject = (id)=>{
    history.push(`/project/${id}`);
  }
  const deleteBoard = async ()=>{
    await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/board/${id}`)
      .then(()=>{history.push('/recruit-list')})
    
  }

  const handleProgress = (progress)=>{
		setRecruitDto({ ...recruitDto, progressType: progress });
  }
  return (
    <S.Body>
      <Container>
        <Sdiv col>
          <Sdiv row act>
            <Stext mgb={18} mgt={40} h3 g0>
              # 프로젝트 모집글 수정
            </Stext>
          </Sdiv>
          <Sdiv>
            <InputWithTitle title="모집글 제목" onChange={handleInputChange('title')} name="title" hooraceholder={recruitDto.title}/>
            <Sdiv mgt={24} />
            <InputWithToggleBtn 
              title="프로젝트 상태"  
              name="progress" 
              handleProgress={handleProgress} 
              name1="모집중" 
              name2="모집마감"
              selected={recruitDto.progressType}
            />
            <Sdiv mgt={24} />
            <Sdiv mgb={12}>
              <Stext s4 g0 mgb={12}>
                모집 포지션, 인원수
              </Stext>
            </Sdiv>
            <Sdiv>
              {
                positionList && positionList.map((tmpItem, i)=>{
                  const item = JSON.parse(tmpItem)
                  return(
                    <Sdiv mgb={5} row>
                      <Form.Select style={selectBoxStyle} onChange={(e)=>{handleChangePosition(e,i)}}>
                        {
                          optionList.map(opt=>{
                            let selected = item.position === opt;
                            return <option value={opt} selected={selected}>{opt + " 개발자"}</option>
                          })
                        }
                      </Form.Select>
                      <br/>
                      <Form.Select style={numberBoxStyle} onChange={(e)=>{handleChangeCount(e,i)}}>
                        {
                          numberList.map((num)=>{
                            let selected = false;
                            if(num == item.count) selected = true;
                            return <option value={num} selected={selected}>{num + "명"}</option>
                          })
                        }
                      </Form.Select>
                      {
                        selectCnt > 1 ?  
                        //<RemoveCircleOutlineIcon onClick={()=>{onClickPositionDelete(i)}} cursor="pointer"/>
                        <IconButton aria-label="delete" onClick={()=>{onClickPositionDelete(i)}}>
                          <ClearIcon color="disabled"/>
                        </IconButton>
                        :
                        null
                      }     
                    </Sdiv>
                  )
                

                })
              }
              <Sdiv jst mgt={15}>
                <DefaultButtonSm linePrimary title="포지션 추가" onClick={onClickPositionAdd}/>
              </Sdiv>
            </Sdiv>
            
            <Sdiv mgt={24} />
            <Sdiv mgb={12}>
              <Stext s4 g0 mgb={3}>
                우대 스택
              </Stext>
              <Sdiv row>
                {
                  techStackList.map(item=>{
                    if(item.selected){
                      return <BadgeDefaultGray style={{ marginRight: "7px" }} title={item.skillName}/>
                    }
                  })
                }
              </Sdiv>
              <Sdiv jst mgt={20}>
                <DefaultButtonSm linePrimary title="스택추가" onClick={onClickOpenModal}/>
              </Sdiv>
            </Sdiv>
            <Sdiv mgt={24} />
            <TextareaWithTitle title="모집 상세 설명" onChange={handleInputChange('content')} name="content" hooraceholder={recruitDto.content}/>
            <Sdiv mgt={24} />
            <Sdiv mgb={12}>
              <Stext s4 g0 mgb={3}>
                프로젝트 변경
              </Stext>
              <Sdiv row>
                {
                  myPrjList.map(item=>{
                    if(item.selected){
                      return (
                          <Sdiv w={300}>
                            <CardProjectHome 
                            //title, progress = "ONGOING", likesCount = 0, subTitle, onClick, isLiked
                              src={item.imgList[0]}
                              title={item.projectName}
                              progress={item.progress}
                              likesCount={item.likesCount}
                              onClick={()=>{goProject(item.id)}}
                              isLiked={false}
                            />
                          </Sdiv>
                      )
                    }
                  })
                }
              </Sdiv>
              <Sdiv jst mgt={20}>
                <DefaultButtonSm linePrimary title="프로젝트 추가/변경" onClick={onClickOpenPrjModal}/>
              </Sdiv>
            </Sdiv>
            <Sdiv mgt={24} />
            <InputWithTitle title="연락처" onChange={handleInputChange('contact')} name="contact" hooraceholder={recruitDto.contact}/>
            
            
          </Sdiv>
          
          <Sdiv mgt={40} ct>
            <ButtonContainerSm 
                onClick={()=>{
                  
                  if(recruitDto.title===""){
                    alert("모집글 제목은 필수 항목입니다. ");
                    return;
                  }else if(checkDuplicate()){
                    alert("모집 포지션 중에 중복된 값이 있습니다. ");
                    return;
                  }
                  setShowConfirmModal(true)
              }}
                style={{width:"300px"}}
                fillSecondary
                
              >
              <Sdiv s2>수정하기</Sdiv>
            </ButtonContainerSm>
          </Sdiv>
          <Sdiv mgt={40} ct>
            <ButtonContainerSm 
                onClick={()=>{setShowDeleteModal(true)}}
                style={{width:"300px"}}
                fillPrimary
                
              >
              <Sdiv s2>모집글 삭제하기</Sdiv>
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
          <DefaultButtonSm title="닫기" linePrimary onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="완료" fillPrimary onClick={onClickCompleteModal} />
        </Sdiv>
        
      </ModalContainer>
      <ModalContainer show={showPrjModal}>
        <Stext h3 g0 mgb={20}>
          # 내 프로젝트 연동하기
        </Stext>
        <Sdiv h={16} />
        <Sdiv col mgt={28} style={{ width: "100%" }}>
          <Sdiv row >
            <InputWithTitle placeholder="검색어를 입력하세요..." style={{ width: "100%" }} title="프로젝트 선택" onChange={(e)=>{handlePrjSearch(e.target.value)}}/>
          </Sdiv>
          <S.ModalStackContainer>
            {myPrjList.map((item) => {
              return item.searched && <BadgeDefaultGray title={item.projectName} onClick={()=>{handlePrjButtonSelect(item.id)}} selected={item.selected}/>;
            })}
          </S.ModalStackContainer>
        </Sdiv>
        <Sdiv h={28} />
        <Stext s4 g0 mgb={5}>
          추가된 프로젝트
        </Stext>
        <Sdiv mgt={3} row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
          {
            myPrjList.map((item) => {
                if(item.selected){
                  return <BadgeDefaultGray title={item.projectName} onClick={()=>{handlePrjButtonSelect(item.id)}} selected={item.selected}/>
                }
              }
            )
          }
        </Sdiv>
        <Sdiv h={78} />
        <S.Line />
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="닫기" linePrimary onClick={onClickClosePrjModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="완료" fillPrimary onClick={onClickCompletePrjModal} />
        </Sdiv>
        
      </ModalContainer>
      <ModalContainer show={showConfirmModal}>
        <Stext h3 g0 mgb={20}>
           모집글을 수정하겠습니까?
        </Stext>
        
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="취소" linePrimary onClick={()=>{
            setShowConfirmModal(false);
          }} />
          <Sdiv w={4} />
          <DefaultButtonSm title="확인" fillPrimary onClick={()=>{
            handleRegister();
            setShowConfirmModal(false);
          }}/>
        </Sdiv>
        
      </ModalContainer>
      <ModalContainer show={showDeleteModal}>
        <Stext h3 g0 mgb={20}>
          정말 모집글을 삭제하시겠습니까?
        </Stext>
        
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="취소" linePrimary onClick={()=>{
            setShowDeleteModal(false);
          }} />
          <Sdiv w={4} />
          <DefaultButtonSm title="삭제하기" fillPrimary onClick={()=>{
            deleteBoard();
            setShowDeleteModal(false);
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
