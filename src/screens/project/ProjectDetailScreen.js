import React, { useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  BadgeDefaultGray,
  CardProfile,
  CommentList,
  
  DefaultButtonSm,
  Sdiv,
  Stext,
  TextareaComment,
  ModalContainer,
} from "components";
import defaultImg from 'images/pngs/defaultImg.png'
import { colors } from "styles/colors";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Slider from "react-slick";
import { ReactComponent as IcArrowLeft } from "images/IcArrowLeft.svg";
import { ReactComponent as IcArrowRight } from "images/IcArrowRight.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import defaultProfileImg from "images/defaultProfileImg.svg";
// slider 세팅
let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerPadding: "0px",
  beforeChange: (current, next) => console.log(current, next),
  afterChange: (current) => console.log(current),
};

const TMP_PRIFILE_ITEM = [
  {
    name: "ComHolic1",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic2",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic3",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic4",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic5",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic6",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic7",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic8",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic9",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
  {
    name: "ComHolic10",
    subTitle: "안녕하세요. 저는 개발자입니다.저와 프로젝트 하나 해보실래요?",
  },
];

const TMP_COMMENT_ITEMS = [
  { name: "name1", comment: "comment", timeString: "약 3시간 전" },
  { name: "name2", comment: "comment", timeString: "약 3시간 전" },
  { name: "name3", comment: "comment", timeString: "약 3시간 전" },
  { name: "name4", comment: "comment", timeString: "약 3시간 전" },
];

const TMP_IMG_LIST = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export const ProjectDetailScreen = () => {
  
  const history = useHistory();
  const [thisPrj, setThisPrj] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let { id } = useParams(); //이 프로젝트의 고유아이디
  const cookies = new Cookies();
  
  const [targetComment, setTargetComment] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [recommendDtoId, setRecommendDtoId] = useState(-1);

  //get요청 따로따로 2번하지말고 axios.all([axios.get(), axios.get()]) 하고 결과는 spread하면 된다
  useEffect(() => {
    const getAjax=async()=>{
      
      await axios
        .all([
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/${id}`), 
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/skill/${id}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/project/${id}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/member/${id}`)
        ])
        .then(
          axios.spread((projectPromise, techStackPromise, commentPromise, participantsPromise) =>{
            setThisPrj({...projectPromise.data, techStack:techStackPromise.data});
            console.log(techStackPromise.data);
            setCommentList([...commentPromise.data]);
            setParticipants(participantsPromise.data);
          })
        )
        .catch(e=>console.log(e))
          
    }

    const getIsLiked = async()=>{
      await axios.all([
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend/project/${id}/${cookies.get('nickname')}`),
      ])
        .then(
          axios.spread((isLikedPromise)=>{
            setIsLiked(isLikedPromise.data);

        }))
        .catch(e=>{
          console.log(e.response);
        })
      
      }
    
    getAjax();
    if(cookies.get('nickname')){
      getIsLiked();
    }
        
  },[]);

  //수정, 삭제 모달창 열고 닫힐 때마다 commentList refresh
  // useEffect(()=>{
  //   const getCommentList = async ()=>{
  //     await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/project/${id}`)
  //       .then(res=>{
  //         setCommentList([...res.data]);
  //       })
  //       .catch(e=>{
  //         console.log(e.response);
  //       })
  //   }
  //   getCommentList();
  // },[showModal, showDeleteModal])

  const sliderRef = useRef();

  const goProfile = (id) => {
    history.push(`/portfolio/${id}`);
  };

  const slickNext = () => {
    sliderRef.current.slickNext();
  };

  const slickPrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }
  const handleCommentChange = (e)=>{
    setInputValue(e.target.value);
  }

  const postAjax = async (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    await axios.post(url, sendParam, {headers:headers})
      .then(async ()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/project/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
      }) 
    .catch((e)=>{
      console.log(e.response)
    })
  }
  const putAjax = async (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    console.log(sendParam);
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    await axios.put(url, sendParam, {headers:headers})
    .then(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/project/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
    })
    .catch((e)=>{
      console.log(sendParam);
      console.log(e);
    })
  }
  const deleteAjax = async (sendParam, urlParam)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}${urlParam}`;
    await axios.delete(url, sendParam, {headers:headers})
    .then(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/reply/project/${id}`)
        .then(res=>{
          setCommentList(res.data);
        })
    })
    .catch((e)=>{
      console.log(sendParam);
      console.log(e);
    })
  }
  const handleCommentUpload = async ()=>{
    let newCommentObj = {
      nickname: cookies.get('nickname'),
      content: inputValue,
      projectId: id,
      targetType:1,

    }
    
    postAjax(JSON.stringify(newCommentObj), '/reply');
    
  }

  // //현재 연월날짜 스트링으로 리턴
  // const getDateString = ()=>{
  //   let today = new Date();
  //   const year = today.getFullYear();
  //   const month = ('0' + (today.getMonth() + 1)).slice(-2);
  //   const day = ('0' + today.getDate()).slice(-2);
  //   const hours = ('0' + today.getHours()).slice(-2); 
  //   const minutes = ('0' + today.getMinutes()).slice(-2);
  //   const seconds = ('0' + today.getSeconds()).slice(-2); 
    
  //   return year + '-' + month  + '-' + day;
  // }

  // //현재 시각 스트링으로 리턴 
  // const getTimeString = ()=>{
  //   let today = new Date();
  //   const hours = ('0' + today.getHours()).slice(-2); 
  //   const minutes = ('0' + today.getMinutes()).slice(-2);
  //   const seconds = ('0' + today.getSeconds()).slice(-2);

  //   return hours + ':' + minutes  + ':' + seconds;
  // }

  //내 댓글 수정
  const onClickModify=()=>{
    setShowModal(true);
  }

  //내 댓글 삭제
  const onClickDelete = ()=>{
    setShowDeleteModal(true);
  }
  
  const onClickCloseModal =()=>{
    setShowModal(false);
    setShowDeleteModal(false);
  }
  const onChangeCommentEdit=(e)=>{
    setTargetComment({...targetComment, content:e.target.value})
  }
  //프로젝트 관심 추가 실행
  const onClickLike = async ()=>{
    if(cookies.get('nickname')===undefined){
      setShowLoginModal(true);
      return;
    }
    setIsLiked(true);
    await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend`, {
      nickname:cookies.get('nickname'),
      refId:id,
      targetType:1,
      isDeleted: false,
    }).then((res)=>{
      
    })
    .catch(e=>{
      console.log(e.response);
    })

  }

  
  //id에 맞는 recommend Dto를 삭제한다. 
  const deleteRecommentDto = (dtoId)=>{
    axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend/${dtoId}`)
    .then((res)=>{
      console.log("deleted");
    })
    .catch(e=>console.log(e.response))      
  }
  
  //프로젝트 관심 철회
  const onClickUnlike = ()=>{
    if(thisPrj.projectManager === "찢재명"){
      alert("XX같은 X야, 쯧쯧쯧, 이것도 취소해봐라. 좋아요 눌렀다가 취소하려니까 좋더냐?");
      return;
    }else{

      setIsLiked(false);
      axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/recommend?targetType=PROJECT&nickname=${cookies.get('nickname')}&refId=${id}`)
        .then((thisId)=>{
          deleteRecommentDto(thisId.data);
        })
        .catch(e=>{
          console.log(e);
        })
    }
  }

  return (
    <S.Body>
      <Container>
        <Row>
          <div className="project-slick">
            <Slider ref={sliderRef} {...settings}>
              {thisPrj.imgList && thisPrj.imgList.map(src=>{
                
                return(
                  <S.ImageMain src={src}/>
                );
              })}
            </Slider>

            <S.ArrowContainer>
              <S.ArrowWrapper length={TMP_IMG_LIST.length}>
                <div className="cursor" style={{ zIndex: 2 }} onClick={slickPrev}>
                  <IcArrowLeft />
                </div>
                <div className="cursor" style={{ zIndex: 2 }} onClick={slickNext}>
                  <IcArrowRight />
                </div>
              </S.ArrowWrapper>
            </S.ArrowContainer>
          </div>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col>
            <TextProjectContainer col>
              <TextProjectBack
                onClick={() => {
                  history.go(-1);
                }}
              >
                목록으로 {">"}
              </TextProjectBack>
              <TextProjectTitle>{thisPrj.projectName}</TextProjectTitle>
              <Sdiv row sb act mgb={16}>
                <TextProjectInfo>{`조회수: ${0} 관심: ${thisPrj.likesCount} 댓글: ${thisPrj.replyCount}`}</TextProjectInfo>
                <Sdiv>
                  {
                    cookies.get('nickname') === thisPrj.projectManager 
                    ?
                    <DefaultButtonSm onClick={()=>{history.push(`/project-edit/${id}`)}} fillSecondary title="프로젝트 수정하기" />
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 프로젝트 소개
              </Stext>
            </Sdiv>
            <Sdiv mgt={28}>
              <S.TextIntroduce>
                {thisPrj.content}
              </S.TextIntroduce>
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 프로젝트 링크
              </Stext>
            </Sdiv>
            <Sdiv mgt={24} style={{ gap: "16px 0px" }} col>
              <a href={'http://' + thisPrj.projectLink}>
                <Stext>{thisPrj.projectLink}</Stext>
              </a>
            </Sdiv>
          </Col>
          <Col>
            <Sdiv row>
              <Stext mgt={40} h3 g0>
                # 프로젝트 Github 링크
              </Stext>
            </Sdiv>
            <Sdiv mgt={24} style={{ gap: "16px 0px" }} col>
              <a href={'http://' + thisPrj.githubLink}>
                <Stext>{thisPrj.githubLink}</Stext>
              </a>
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={76} mgb={28} h3 g0>
                # 기술스택(프로젝트에 사용)
              </Stext>
            </Sdiv>
            <Sdiv row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
              {/*TMP_STACK_BADGE_ITEMS */}
              {/**/}
              {thisPrj.techStack && thisPrj.techStack.map((item) => (
                <BadgeDefaultGray title={item.skillName} />
              ))}
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv row>
              <Stext mgt={72} h3 g0>
                # 참여유저
              </Stext>
            </Sdiv>
          </Col>
        </Row>
        <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
          {participants && participants.map((item) => {
            return (
              <Col >
                <CardProfile onClickProfile={()=>{goProfile(item.id)}} name={item.name} subTitle={item.subTitle} />
              </Col>
            );
          })}
        </S.ProfileRow>
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
                if(item.nickname===thisPrj.projectManager){
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
                      onClickModify();
                      setTargetComment({id:item.id, createdDate:item.createdDate, content:item.content, targetType:1, projectId:thisPrj.id})
                      
                    }}
                    onClickDelete={()=>{
                      onClickDelete();
                      setTargetComment({id:item.id, createdDate:item.createdDate, content:item.content, targetType:1, projectId:thisPrj.id})
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
      <ModalContainer show={showModal}>
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
      <ModalContainer show={showDeleteModal}>
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
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;

S.TextIntroduce = styled.pre`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  /* or 138% */

  /* g3 */

  color: #656577;
`;

S.ImageMain = styled.img`
  width: 100%;
  aspect-ratio: 883/504;
  background-image: url('https://source.unsplash.com/random/883*504');
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
