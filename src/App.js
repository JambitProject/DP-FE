import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  HomeScreen,
  ProfileScreen,
  LoginScreen,
  PortfolioDetailScreen,
  PortfolioEditScreen,
  ProjectDetailScreen,
  ProjectEditScreen,
  ProjectUploadScreen,
  RecruitEditScreen,
  RecruitDetailScreen,
  RecruitListScreen,
  MyPortfolioScreen,
} from "screens";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import styled, { ThemeProvider } from "styled-components";
import { Sdiv, Stext, DefaultButtonSm } from "components";
import { ReactComponent as LogoMain } from "images/LogoMain.svg";
import { ReactComponent as IcMore } from "images/IcMore.svg";
import { ReactComponent as IcBell } from "images/IcBell.svg";
import { ReactComponent as IcSearch } from "images/IcSearch.svg";
import { dark, light } from "styles/theme";
import { colors } from "styles/colors";

import { Row, Col, Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import LoginCallback from "screens/login/LoginCallback";
import Cookies from "universal-cookie";
import { LocalSeeOutlined } from "@mui/icons-material";
import axios from "axios";


export const App = () => {
  const history = useHistory();
  const location = useLocation();
  const cookies = new Cookies();
  const [themeMode, setThemeMode] = useState(false); // 테마 모드 세팅
  const theme = themeMode == false ? light : dark; // 테마 환경에 맞는 테마 컬러 가져오기. 
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('access-token'));
  const [myFollowees, setMyFollowees] = useState([]);
  const [myLikedProjects, setMyLikedProjects] = useState([]);
  const [myLikedBoards, setMyLikedBoards] = useState([]);

  const onClickLogout=()=>{
    cookies.remove('memberId');
    cookies.remove('nickname');
    localStorage.clear();
    setCurrentUser(null);
  }

  const onClickLogin=()=>{
    history.push("/login");
  }

  useEffect(()=>{
    setCurrentUser(cookies.get('memberId'));
  }, [cookies.get('memberId')])

  useEffect(()=>{
    const getUserMetadata = async ()=>{
      await axios
        .all([
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/follow/following/${cookies.get('nickname')}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/project/favorite/${cookies.get('nickname')}`),
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/board/favorite/${cookies.get('nickname')}`),
        ])
        .then(axios.spread((followeesPromise, likedProjectsPromise, likedBoardPromise)=>{
          setMyFollowees(followeesPromise.data);
          setMyLikedProjects(likedProjectsPromise.data);
          setMyLikedBoards(likedBoardPromise.data);
        }))
        .catch(e=>{
          console.log(e.response);
        })
      
    }
    if(cookies.get('memberId')){
      getUserMetadata();
      
    }else{

    }
  },[])

  const handleFollowees = ()=>{

  }

  return (
    <ThemeProvider theme={theme}>
      <S.Body>
        {location.pathname != "/login" && (
          <>
            <Navbar
              collapseOnSelect
              expand="lg"
              style={{ height: 80, background: "white", zIndex: 10}}
              fixed="top"
              >
              <Container style={{ background: "white", zIndex: 10 }}>
                <Navbar.Brand href="/">
                  <S.LogoMain />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href={currentUser ? "/myportfolio" : "/login"}>
                      {location.pathname === "/myportfolio" ? ( //주소에 따라 스타일 변경
                        <Stext s3 primary style={{ cursor: "pointer" }}>
                          내 포트폴리오
                        </Stext>
                      ) : (
                        <Stext s3 g4 style={{ cursor: "pointer" }}>
                          내 포트폴리오
                        </Stext>
                      )}
                    </Nav.Link>
                    
                    <Nav.Link href="/recruit-list">
                      {location.pathname === "/recruit-list" ? ( //주소에 따라 스타일 변경
                        <Stext s3 primary style={{ cursor: "pointer" }}>
                          프로젝트 모집 게시판
                        </Stext>
                      ) : (
                        <Stext s3 g4 style={{ cursor: "pointer" }}>
                          프로젝트 모집 게시판
                        </Stext>
                      )}
                    </Nav.Link>
                  </Nav>
                  <Nav>
                    <S.NoShowInMobile>
                      <Sdiv row act>
                        <Sdiv style={{ position: "relative" }}>
                          <S.IcSearch>
                            <IcSearch />
                          </S.IcSearch>
                          <S.SearchBar placeholder="검색어를 입력하세요." />
                        </Sdiv>
                        {/* <Sdiv mgl={20} pdt={4} pdb={4} pdr={4} pdl={4}>
                          <IcBell />
                        </Sdiv> */}
                        {currentUser && <Sdiv mgl={16}>
                          <Nav.Link href="/portfolio-edit">
                            <S.Avatar />
                          </Nav.Link>
                        </Sdiv>}
                        {
                          currentUser ? 
                          <DefaultButtonSm 
                            title="로그아웃"
                            fillPrimary
                            onClick={onClickLogout}
                          /> //로그인된상태
                          :
                          <DefaultButtonSm 
                            title="로그인"
                            fillPrimary
                            onClick={onClickLogin}
                          /> //로그인안된상태
                        }
                      </Sdiv>
                      {console.log(myFollowees)}
                    </S.NoShowInMobile>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Sdiv h={80} bg={colors.gray7} />
          </>
        )}

        <Switch location={location} history={history}>
          <Route exact path="/"> 
            <HomeScreen  
              myLikedProjects={currentUser && myLikedProjects}
              setMyLikedProjects={currentUser && setMyLikedProjects}
            />
          </Route>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/myportfolio">
            <MyPortfolioScreen
              myLikedProjects={myLikedProjects}
              setMyLikedProjects={setMyLikedProjects}
            />
          </Route>
          <Route exact path="/portfolio/:nickname"> 
            <PortfolioDetailScreen  
              myFollowees={myFollowees} 
              setMyFollowees={setMyFollowees}
              myLikedProjects={myLikedProjects}
              setMyLikedProjects={setMyLikedProjects}
            />
          </Route>
          <Route exact path="/portfolio-edit">
            <PortfolioEditScreen 
              component={PortfolioEditScreen} 
              myFollowees={myFollowees}
              myLikedProjects={myLikedProjects}
            />
          </Route>
          <Route exact path="/project/:id">
            <ProjectDetailScreen
              myLikedProjects={currentUser && myLikedProjects}
              setMyLikedProjects={currentUser && setMyLikedProjects}
            />
          </Route>
          <Route exact path="/project-edit" component={ProjectEditScreen} />
          <Route exact path="/project-upload" component={ProjectUploadScreen} />
          <Route exact path="/recruit-edit" component={RecruitEditScreen} />
          <Route exact path="/recruit/:id">
            <RecruitDetailScreen
              myLikedProjects={currentUser && myLikedProjects}
              setMyLikedProjects={currentUser && setMyLikedProjects}
              myLikedBoards={currentUser && myLikedBoards}
              setMyLikedBoards={currentUser && setMyLikedBoards}
            />
          </Route>
          <Route exact path="/recruit-list">
            <RecruitListScreen
              myLikedBoards={currentUser && myLikedBoards}
              setMyLikedBoards={currentUser && setMyLikedBoards}
            />
          </Route>
          <Route exact path="/logincallback" component={LoginCallback} />
        </Switch>
      </S.Body>
    </ThemeProvider>
  );
};

const S = {};

S.Body = styled.div`
  background-color: ${(props) => props.theme.colors.bgColor};
  min-height: 100vh;
  transition: all 0.25s linear;
`;

S.LogoMain = styled(LogoMain)`
  fill: ${(props) => props.theme.colors.titleColor};
  transition: all 0.25s linear;
`;
S.IcMore = styled(IcMore)`
  fill: ${(props) => props.theme.colors.titleColor};
  transition: all 0.25s linear;
`;

S.Avatar = styled.img`
  background-image: url('https://source.unsplash.com/random/32x32');
  height: 32px;
  width: 32px;
  border-radius: 100px;
`;

S.SearchBar = styled.input`
  background-color: ${colors.gray7};
  width: 240px;
  height: 40px;
  border-radius: 8px;
  border: none;
  padding-left: 40px;
  margin-right: 20px;
  font-size: 14px;
  font-weight: bold;
  ::placeholder {
    color: ${colors.gray5};
  }
`;

S.IcSearch = styled.div`
  position: absolute;
  left: 14px;
  top: 6px;
`;

S.NoShowInMobile = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
