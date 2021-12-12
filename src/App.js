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
  RecruitUploadScreen,
  
} from "screens";
import styled, { ThemeProvider } from "styled-components";
import { Sdiv, Stext, DefaultButtonSm, BasicSelect } from "components";
import { ReactComponent as LogoMain } from "images/LogoMain.svg";
import { ReactComponent as IcMore } from "images/IcMore.svg";
import { ReactComponent as IcSearch } from "images/IcSearch.svg";
import { dark, light } from "styles/theme";
import { colors } from "styles/colors";

import {Container, Navbar, Nav } from "react-bootstrap";
import LoginCallback from "screens/login/LoginCallback";
import {TestScreen} from "screens/TestScreen";
import Cookies from "universal-cookie";
import axios from "axios";
import defaultProfileImg from "images/defaultProfileImg.svg";
import { SearchResultScreen } from "screens/searchPage/SearchResultScreen";

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
  const [memberDto, setMemberDto] = useState({});
  const [searchInput, setSearchInput] = useState(""); //검색어
  const [searchType, setSearchType] = useState("STACK");  //검색타입 (스택, 제목,닉네임)
  const [searchMember, setSearchMember] = useState([]);
  const [searchPrj, setSearchPrj] = useState([]);
  const onClickLogout=()=>{
    cookies.remove('memberId');
    cookies.remove('nickname');
    localStorage.clear();
    setCurrentUser(null);
  }

  const onClickLogin=()=>{
    history.push("/login");
  }

  const getSearchResult=async (query, type)=>{
    const headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    await axios.all([
      axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/member/search`, JSON.stringify({type:type, payload:query.replace('%23', '#')}), {headers:headers}),
      axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/project/search`, JSON.stringify({type:type, payload:query.replace('%23', '#')}),{headers:headers}),
    ])
    .then(
      axios.spread((memberPromise, projectPromise)=>{
        
        setSearchMember(memberPromise.data);
        setSearchPrj(projectPromise.data);
      })
    ).catch(e=>{
      console.log(e.response);
    })
    const queryStr = `/${type}/${query.replace('#', "%23")}`;
    history.push(`/search${queryStr}`)
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
          axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/${cookies.get('nickname')}`),
        ])
        .then(axios.spread((followeesPromise, likedProjectsPromise, likedBoardPromise, memberPromise)=>{
          setMyFollowees(followeesPromise.data);
          setMyLikedProjects(likedProjectsPromise.data);
          setMyLikedBoards(likedBoardPromise.data);
          setMemberDto(memberPromise.data);
        }))
        .catch(e=>{
          console.log(e.response);
        })
      
    }
    if(cookies.get('memberId')){
      getUserMetadata();
      
    }
  },[])

  const handleSearchInputChange = (e)=>{
    
    setSearchInput(e.target.value.replace('#', '%23'));
    
  }

  const handleEnter =(e)=>{
    if(e.key === "Enter"){
      getSearchResult(searchInput, searchType);
    }
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
                          <S.IcSearch onClick={()=>{getSearchResult(searchInput, searchType)}}>
                            <IcSearch />
                          </S.IcSearch>
                          <S.SearchBar 
                            placeholder="검색어를 입력하세요." 
                            onKeyPress={(e)=>{handleEnter(e)}}
                            onChange={handleSearchInputChange} 
                          />
                        </Sdiv>
                        <Sdiv w={150} mgl={5} pdt={4} pdb={4} pdr={4} pdl={4}>
                          <BasicSelect 
                            searchType={searchType}
                            setSearchType={setSearchType}
                            label={"검색 타입"}
                          />
                        </Sdiv> 
                        {
                          currentUser && 
                          <Sdiv mgl={16}>
                            <Nav.Link href="/portfolio-edit">
                              <S.Avatar src={memberDto.profileImage ? memberDto.profileImage : defaultProfileImg}/>
                            </Nav.Link>
                          </Sdiv>
                        }
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
              myLikedBoards={myLikedBoards}
            />
          </Route>
          <Route exact path="/project/:id">
            <ProjectDetailScreen
              myLikedProjects={currentUser && myLikedProjects}
              setMyLikedProjects={currentUser && setMyLikedProjects}
            />
          </Route>
          <Route exact path="/project-edit/:id" component={ProjectEditScreen} />
          <Route exact path="/project-upload" component={ProjectUploadScreen} />
          <Route exact path="/recruit-upload" component={RecruitUploadScreen} />
          <Route exact path="/recruit-edit/:id" component={RecruitEditScreen} />
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
          <Route exact path="/test" component={TestScreen} />
          
          <Route path="/search/:type/:query">
            <SearchResultScreen 
              myLikedProjects={myLikedProjects}
              searchMember={searchMember}
              searchPrj={searchPrj}
              searchInput={searchInput}
              searchType={searchType}
            />
          </Route>
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
  
  height: 32px;
  width: 32px;
  border-radius: 100px;
`;

S.SearchBar = styled.input`
  background-color: ${colors.gray7};
  width: 300px;
  height: 55px;
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
  top: 13px;
`;

S.NoShowInMobile = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
