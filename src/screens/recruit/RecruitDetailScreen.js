import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import defaultImg from "images/pngs/defaultImg.png"
import defaultProfileImg from "images/defaultProfileImg.svg"
import {
  BadgeDefaultGray,
  CardProfile,
  CommentList,
  ProejctTitle,
  Sdiv,
  Stext,
  TextareaComment,
  CardProjectHome,
  ModalContainer,
  DefaultButton,
  DefaultButtonSm,
} from "components";
import { colors } from "styles/colors";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import { ReactComponent as IcArrowLeft } from "images/IcArrowLeft.svg";
import { ReactComponent as IcArrowRight } from "images/IcArrowRight.svg";
import axios from "axios";
import Cookies from "universal-cookie";

const TMP_STACK_BADGE_ITEMS = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const TMP_COMMENT_ITEMS = [
  { name: "name1", comment: "comment", timeString: "약 3시간 전" },
  { name: "name2", comment: "comment", timeString: "약 3시간 전" },
  { name: "name3", comment: "comment", timeString: "약 3시간 전" },
  { name: "name4", comment: "comment", timeString: "약 3시간 전" },
];

export const RecruitDetailScreen = () => {
  const history = useHistory();
  const {id} = useParams();
  const cookies = new Cookies();
  const [thisBoard, setThisBoard] = useState({});
  const [boardPrj, setBoardPrj] = useState({});
  const [positionList, setPositionList] = useState([]);
  const [boardOwner, setBoardOwner] = useState({});
  const [isPrjLiked, setIsPrjLiked] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [showCommentEditModal, setShowCommentEditModal] = useState(false);
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [targetComment, setTargetComment] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  


  //모집글 관심 추가 실행
  const onClickLike = async ()=>{
    if(cookies.get('nickname')===undefined){
      setShowLoginModal(true);
      return;
    }
    setIsLiked(true);
    await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend`, {
      nickname:cookies.get('nickname'),
      refId:id,
      targetType:0,
      isDeleted: false,
    }).then((res)=>{
      
    })
    .catch(e=>{
      console.log(e.response);
    })

  }

  //모집글 관심 철회
  const onClickUnlike = ()=>{
    if(thisBoard.nickname === "찢재명"){
      alert("XX같은 X야, 쯧쯧쯧, 이것도 취소해봐라. 좋아요 눌렀다가 취소하려니까 좋더냐?");
      return;
    }else{

      setIsLiked(false);
      axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend?targetType=POST&nickname=${cookies.get('nickname')}&refId=${id}`)
        .then((thisId)=>{
          deleteRecommentDto(thisId.data);
        })
        .catch(e=>{
          console.log(e);
        })
    }
  }

  //id에 맞는 recommend Dto를 삭제한다. 
  const deleteRecommentDto = async (dtoId)=>{
    await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend/${dtoId}`)
    .then((res)=>{
      
    })
    .catch(e=>console.log(e.response))      
  }

  //내 댓글 수정 모달 창
  const onClickCommentEdit=()=>{
    setShowCommentEditModal(true);
  }

  //내 댓글 삭제 모달 창
  const onClickCommentDelete = ()=>{
    setShowCommentDeleteModal(true);
  }

  //모든 모달창 그냥 닫기
  const onClickCloseModal =()=>{
    setShowCommentEditModal(false);
    setShowCommentDeleteModal(false);
  }

  //내 댓글 수정 put 요청
  const putAjax = async (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    await axios.put(url, sendParam, {headers:headers})
    .then(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/post/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
    })
    .catch((e)=>{
      console.log(sendParam);
      console.log(e);
    })
  }

  //내 댓글 업로드 post요청 
  const handleCommentUpload = async ()=>{
    let newCommentObj = {
      nickname: cookies.get('nickname'),
      content: inputValue,
      postId: id,
      targetType:0,

    }
    
    postAjax(JSON.stringify(newCommentObj), '/reply');
    
  }
  //내 댓글 업로드 post요청
  const postAjax = async (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    await axios.post(url, sendParam, {headers:headers})
      .then(async ()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/post/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
      }) 
    .catch((e)=>{
      console.log(e.response)
    })
  }

  //내 댓글 수정 onChange
  const onChangeCommentEdit=(e)=>{
    setTargetComment({...targetComment, content:e.target.value})
  }

  const handleCommentChange = (e)=>{
    setInputValue(e.target.value);
  }
  //처음 마운트 될 때 현재 모집글 id로 BoardDto를 get해온다. 
  useEffect(()=>{
    const getThisBoardInfo = async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/board/${id}`)
        .then(async res=>{
          await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/${res.data.projectRefId}`)
            .then(async (res2)=>{
              
              setBoardPrj(res2.data);
              if(cookies.get('nickname')){
                await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend/project/${res.data.projectRefId}/${cookies.get('nickname')}`)
                  .then(res4=>{
                    setIsPrjLiked(res4.data);
                  })
                  .catch(e=>{
                    console.log(e.response);
                  })
              }
            })
            .catch(e=>{
              console.log(e);
            })
          await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/${res.data.nickname}`)
            .then(res3=>{
              setBoardOwner(res3.data);
            })
            .catch(e=>{
              console.log(e.response);
            })
          setThisBoard(res.data);

        })
        .catch(e=>{
          console.log(e);
        })
    }
    const getPositionList = async()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/position/list?postId=${id}`)
        .then(res=>{
          setPositionList(res.data);
        })
    }
    getThisBoardInfo();
    getPositionList();
  },[])

  //처음 마운트 될 때 현재 모집글의 댓글 list를 get해온다.
  useEffect(()=>{
    const getCommentList = async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/post/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
        .catch(e=>{
          console.log(e.response);
        })
    }
    getCommentList();
  },[])
  useEffect(()=>{
    const getIsLiked = async()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend/post/${id}/${cookies.get('nickname')}`)
        .then(res=>{
          setIsLiked(res.data);
        })
        .catch(e=>{
          console.log(e.response);
        })
    }
    getIsLiked();
  },[])
  //내 댓글 삭제하기 delete 요청
  const deleteAjax = async (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    await axios.delete(url, sendParam, {headers:headers})
    .then(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/post/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
    })
    .catch((e)=>{
      console.log(sendParam);
      console.log(e);
    })
  }


  return (
    <S.Body>
      <Container>
        <Row style={{ marginTop: 40 }}>
          {
            thisBoard && 
            <TextProjectContainer col>
              <TextProjectBack
                onClick={() => {
                  history.go(-1);
                }}
              >
                목록으로 {">"}
              </TextProjectBack>
              <TextProjectTitle>{thisBoard.progressType=="COMPLETE" ? "[모집마감] " + thisBoard.title : thisBoard.title}</TextProjectTitle>
              <Sdiv row sb act mgb={16}>
                <TextProjectInfo>{`조회수: ${0} 관심: ${thisBoard.likesCount} 댓글: ${thisBoard.replyCount}`}</TextProjectInfo>
                <Sdiv>
                  {
                    cookies.get('nickname') === thisBoard.nickname 
                    ?
                    <DefaultButtonSm onClick={()=>{history.push(`/recruit-edit/${id}`)}} fillSecondary title="모집글 수정하기" />
                    :
                    
                      isLiked ?
                      <DefaultButtonSm onClick={onClickUnlike} fillPrimary title="관심 손절하기" />
                      :
                      <DefaultButtonSm onClick={onClickLike} linePrimary title="관심 추가하기" />
                      
                    
                    
                  }
                </Sdiv>
              </Sdiv>
              <Line />
            </TextProjectContainer>
          }
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 모집 개요
              </Stext>
            </Sdiv>
            <Sdiv mgb={30} mgt={30}>
              <S.TextIntroduce>
                {thisBoard.content}
              </S.TextIntroduce>
            </Sdiv>
            <Sdiv mgt={28} row>
              {
                positionList.length > 0 &&
                positionList.map(item=>{
                  return <Sdiv mgr={5}>
                    <BadgeDefaultGray title={item.position + " " +item.count+"명"}/>
                  </Sdiv>
                })
              }
            </Sdiv>  
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={76} mgb={28} h3 g0>
                # 요구 기술스택
              </Stext>
            </Sdiv>
            <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              {
                thisBoard.skillList&& 
                thisBoard.skillList.map((item) => (
                  
                    <BadgeDefaultGray title={item} />
                 
                ))
              }
            </Sdiv>
          </Col>
        </Row>
        <Sdiv row style={{ display: "flex", flexWrap: "wrap" }}>
          <Sdiv w={300} mgr={30}>
            <Row>
              <Col>
                <Sdiv row>
                  <Stext mgt={72} h3 g0 mgr={24}>
                    # 프로젝트 정보
                  </Stext>
                </Sdiv>
              </Col>
            </Row>
            <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
              <S.ProfileCol>
                {
                  boardPrj && boardPrj.imgList &&
                  <CardProjectHome 
                    src={boardPrj.imgList[0] || defaultImg}
                    title={boardPrj.projectName} 
                    progress={boardPrj.progress}
                    likesCount={boardPrj.likesCount}
                    isLiked={isPrjLiked}
                    onClick={()=>{history.push(`/project/${boardPrj.id}`)}}
                  />

                }
              </S.ProfileCol>
            </S.ProfileRow> 
          </Sdiv>
          <Sdiv w={300}>
            <Row>
              <Col>
                <Sdiv row>
                  <Stext mgt={72} h3 g0>
                    # 담당자 정보
                  </Stext>
                </Sdiv>
              </Col>
            </Row>
            <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
              <S.ProfileCol>
                <CardProfile 
                  onClickProfile={()=>{history.push(`/portfolio/${boardOwner.nickname}`)}} 
                  prifileSrc={boardOwner.profileImage}
                  name={boardOwner.nickname}
                  subTitle={boardOwner.description}
                  skillList={boardOwner.skillList}
                />
              </S.ProfileCol>
            </S.ProfileRow>
          </Sdiv>
        </Sdiv>

        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={72} mgb={28} h3 g0>
                # 댓글
              </Stext>
            </Sdiv>
            <Sdiv col mgb={68} style={{ gap: "24px 0px" }}>
            {commentList && commentList.map((item) => {
                
                const dateString = item.createdDate.slice(0,10);
                const timeString = item.createdDate.slice(11,16);
                let isMine = false;
                let isOwner = false;
                const isEdited=(item.lastModifiedDate !== item.createdDate ? true : false);
                const editedTime = item.lastModifiedDate;
                if(item.nickname===cookies.get('nickname')){
                  isMine = true;
                }
                if(item.nickname===thisBoard.nickname){
                  isOwner = true;
                }
                
                
                return (
                  <CommentList
                    name={item.nickname}
                    comment={item.content}
                    dateString={dateString}
                    timeString={timeString}
                    isDeleted={item.isDeleted}
                    isMine={isMine}
                    isOwner={isOwner}
                    onClickModify={()=>{
                      onClickCommentEdit();
                      setTargetComment({id:item.id, createdDate:item.createdDate, content:item.content, targetType:0, postId:thisBoard.id})
                      
                    }}
                    onClickDelete={()=>{
                      onClickCommentDelete();
                      setTargetComment({id:item.id, createdDate:item.createdDate, content:item.content, targetType:0, postId:thisBoard.id})
                    }}
                    isEdited={isEdited}
                    editedTime={isEdited && editedTime}
                    src={item.isDeleted ? defaultProfileImg : item.profileImage}
                  />
                );
              })}
            </Sdiv>
            <TextareaComment
              value={inputValue} 
              onChange={handleCommentChange} 
              onClick={()=>{
                if(cookies.get('nickname')){
                  handleCommentUpload();
                  setInputValue("");
                }else{
                  setShowLoginModal(true);
                }
              }}
            />
          </Col>
        </Row>
      </Container>
      <ModalContainer show={showCommentEditModal}>
        <Stext h3 g0 mgb={20}>
          # 댓글 수정하기
        </Stext>
        {/* {
          commentList.forEach(item=>{
            if(item.id === targetCommentId){
              setTargetComment(item);
            }
          })
        } */}
        <StyledTextareaComment
          //value={value}
          onChange={onChangeCommentEdit}
          placeholder={targetComment.content}
        />
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="취소" linePrimary onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="수정하기" fillPrimary onClick={()=>{
            putAjax(targetComment, '/reply');
            onClickCloseModal();
          }} />
        </Sdiv>
        
      </ModalContainer>
      <ModalContainer show={showCommentDeleteModal}>
        <Stext h3 g0 mgb={20}>
          잠시만요!<br/>
          Don't press the confirm button yet.<br/>
          댓글을 삭제하시겠습니까?
        </Stext>
        
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="취소" linePrimary onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="삭제하기" fillPrimary onClick={()=>{
            deleteAjax(targetComment, `/reply/${targetComment.id}`)
            onClickCloseModal();
          }}/>
        </Sdiv>
        
      </ModalContainer>
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

S.ProfileCol = styled(Col)`
  padding: 0px;
  width: 300px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;

S.TextIntroduce = styled.pre`
  font-family: Pretendard;
  font-style: bold;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  /* or 138% */

  /* g3 */

  color: black;
`;

S.ImageMain = styled.img`
  width: 100%;
  aspect-ratio: 883/504;
  background-image: url('https://source.unsplash.com/random/883x504');
`;

S.ArrowContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 18px;
`;
S.ArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.length > 8 ? 40 + props.length * 24 : 240)}px;
  /* margin-left: 24px; */
`;

const StyledTextareaComment = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 8px 12px;
  border: 0px;
  background: #f3f3f4;
  border-radius: 6px;
  resize: none;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 140% */

  /* g0 */

  color: #0d0c22;
`;

const TextProjectTitle = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #0d0c22;

  margin-bottom: 16px;
`;

const TextProjectBack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #f25625;

  margin-bottom: 20px;
  cursor: pointer;
`;

const TextProjectInfo = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  /* g3 */

  color: #656577;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray7};
`;

const TextProjectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;