import React, { useState } from "react";
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
  RecruitEditScreen,
  RecruitDetailScreen,
  RecruitListScreen,
} from "screens";
import styled, { ThemeProvider } from "styled-components";
import { Sdiv, Stext } from "components";
import { ReactComponent as LogoMain } from "images/LogoMain.svg";
import { ReactComponent as IcMore } from "images/IcMore.svg";
import { ReactComponent as IcBell } from "images/IcBell.svg";
import { ReactComponent as IcSearch } from "images/IcSearch.svg";
import { dark, light } from "styles/theme";
import { colors } from "styles/colors";

import { Row, Col, Container, NavDropdown, Navbar, Nav } from "react-bootstrap";

export const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [themeMode, setThemeMode] = useState(false); // 테마 모드 세팅
  const theme = themeMode == false ? light : dark; // 테마 환경에 맞는 테마 컬러 가져오기.
  
  return (
    <ThemeProvider theme={theme}>
      <S.Body>
        {location.pathname != "/login" && (
          <>
            <Navbar
              collapseOnSelect
              expand="lg"
              style={{ height: 80, background: "white", zIndex: 10 }}
            >
              <Container style={{ background: "white", zIndex: 10 }}>
                <Navbar.Brand href="/">
                  <S.LogoMain />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/portfolio">
                      {location.pathname === "/portfolio" ? ( //주소에 따라 스타일 변경
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
                        <Sdiv mgl={20} pdt={4} pdb={4} pdr={4} pdl={4}>
                          <IcBell />
                        </Sdiv>
                        <Sdiv mgl={16}>
                          <Nav.Link href="/portfolio-edit">
                            <S.Avatar />
                          </Nav.Link>
                        </Sdiv>
                      </Sdiv>
                    </S.NoShowInMobile>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Sdiv h={1} bg={colors.gray7} />
          </>
        )}

        <Switch location={location}>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/portfolio" component={PortfolioDetailScreen} />
          <Route exact path="/portfolio-edit" component={PortfolioEditScreen} />
          <Route exact path="/project" component={ProjectDetailScreen} />
          <Route exact path="/project-edit" component={ProjectEditScreen} />
          <Route exact path="/recruit-edit" component={RecruitEditScreen} />
          <Route exact path="/recruit" component={RecruitDetailScreen} />
          <Route exact path="/recruit-list" component={RecruitListScreen} />
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
