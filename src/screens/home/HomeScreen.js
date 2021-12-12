import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { CardProfile, CardProjectHome, Sdiv, Stext, } from "components";
import { Row, Col, Container, } from "react-bootstrap";
import axios from 'axios';
import { ReactComponent as IcDropArrowDown } from "images/IcDropArrowDown.svg";
import Cookies from "universal-cookie";
import defaultProfileImg from "images/defaultProfileImg.svg";
import {colors} from "styles/colors";
// slider 세팅

export const HomeScreen = ({myLikedProjects}) => {

  const history = useHistory();
  const [prjList, setPrjList] = useState([]); //홈화면에 뿌릴 프로젝트들 
  const [isMobile, setIsMobile] = useState(false);
  
  const [showMembers, setShowMembers] = useState([]); //홈화면에 뿌릴 유저 프로필들
  const [pageNum, setPageNum] = useState(0);  //멤버 현재 보고있는 페이지
  const [totalPage, setTotalPage] = useState(1); //멤버 토탈페이지
  const [totalPrjPage, setTotalPrjPage] = useState(1);
  const [prjPageNum, setPrjPageNum] = useState(0);

  const goProfile = (nickname) => {
    const cookies = new Cookies();
    if(nickname === cookies.get('nickname')){
      history.push('/myportfolio');
    }
    else{
      history.push(`/portfolio/${nickname}`);
    }
  };

  const goProject = (id) => {
    history.push(`/project/${id}`);
  };

  const handleTop = ()=>{
    window.scrollTo({
      top: 0,
      
    });
  }

  useEffect(() => {
    const getAjax = async () => {
      
      await axios
        .all([
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/top?size=4`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/recommend?size=4`)
        ])
        .then(axios.spread((prjPromise, memberPromise)=>{
          setPrjList(prjPromise.data.content);
          setTotalPrjPage(prjPromise.data.totalPages);
          console.log(memberPromise.data);
          setTotalPage(memberPromise.data.totalPages); 
          setShowMembers(memberPromise.data.content);
        }))
        .catch(e=>{
          
          console.log(e);
        })
        
        
      }
      setPageNum(0);
    getAjax();
  },[]);

  const onClickLoadMore = async ()=>{
    
    console.log(pageNum);
    await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/recommend?page=${pageNum+1}&size=4`)
      .then(res=>{
        console.log(res.data.content)
        setShowMembers([...showMembers, ...res.data.content]);
        setPageNum(pageNum+1);
      })
      .catch(e=>{
        console.log(e.response);
      })
  }
  const onClickLoadMorePrj = async ()=>{
    
    await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/top?page=${prjPageNum+1}&size=4`)
      .then(res=>{
        console.log(res.data.content)
        setPrjList([...prjList, ...res.data.content]);
        setPrjPageNum(prjPageNum+1);
      })
      .catch(e=>{
        console.log(e.response);
      })
  }
  const handleResize = (e) => {
    setIsMobile(window.innerWidth < 768);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.Body>
      <Container>
        <Row>
          <Col>
            
              <Sdiv row act>
                <Stext  mgt={40} h3 g0>
                  # 프로젝트   
                </Stext>
              </Sdiv>
                <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
              
                  {prjList && prjList.map((item) => {
                    let isLiked=false;
                    if(myLikedProjects){
                      myLikedProjects.forEach(prjItem=>{
                        if(item.id === prjItem.id){
                          isLiked = true;
                          return false;
                        }
                      })
                    }
                    return (
                    <S.ProfileCol>
                     <Sdiv mgt={15}>
                        <CardProjectHome
                          src={item.imgList[0]}
                          title={item.projectName}
                          subTitle={"subTitle"}
                          progress={item.progress}
                          onClick={()=>{goProject(item.id)}}
                          likesCount={item.likesCount}
                          isLiked={isLiked}
                        />
                      </Sdiv>
                    </S.ProfileCol>
                    );  
                })}
               </S.ProfileRow>
               {
                  totalPrjPage > (prjPageNum+1) ?
                  <Sdiv mgt={30} ct style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <ButtonContainerSm 
                      onClick={onClickLoadMorePrj}
                      style={{width:"13%"}}
                      fillPrimary
                    >
                      <Sdiv s3>더보기</Sdiv>
                    </ButtonContainerSm>
                  </Sdiv>
                :
                null
                  
                }
              
            
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv col mgt={44}>
              <Stext mgb={18} h3 g0>
                # 프로필 둘러보기
              </Stext>
              
            </Sdiv>
          </Col>
        </Row>
        <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
          {showMembers.map((item) => {
            
            return (
              <Col>
                <CardProfile
                  prifileSrc={item.profileImage ? item.profileImage : defaultProfileImg}
                  onClickProfile={()=>{goProfile(item.nickname)}}
                  name={item.nickname}
                  subTitle={item.description}
                  skillList={item.skillList}
                />
              </Col>
            );
          })}
        </S.ProfileRow>
          {
            totalPage > (pageNum+1) ?
            <Sdiv mgt={30} ct style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <ButtonContainerSm 
                onClick={onClickLoadMore}
                style={{width:"13%"}}
                fillPrimary
              >
                <Sdiv s3>더보기</Sdiv>
              </ButtonContainerSm>
            </Sdiv>
          :
          null
            
          }

        
      </Container>
    </S.Body>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <S.DropdownContainer
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <Sdiv mgl={16}>
      <IcDropArrowDown />
    </Sdiv>
  </S.DropdownContainer>
));

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.DropdownContainer = styled.div`
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 8px;
  min-width: 143px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
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