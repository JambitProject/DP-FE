import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { ButtonLogin, Sdiv, Stext } from "components";
import { Row, Col, Container, Nav } from "react-bootstrap";

import LoginImage from "images/pngs/LoginImage.png";
import LogoGithub from "images/pngs/LogoGithub.png";

import { ReactComponent as LogoMain } from "images/LogoMain.svg";
import { ReactComponent as LogoGoogle } from "images/LogoGoogle.svg";
import GoogleLogin from "react-google-login";
import GoogleLoginBtn from "components/LoginBtn/GoogleLoginBtn";
import GithubLoginBtn from "components/LoginBtn/GithubLoginBtn";

const RenderGithub = () => {
  return <S.LogoImg src={LogoGithub} />;
};

export const LoginScreen = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  
  
  return (
    <S.Body>
      <Container fluid={true} style={{ padding: 0 }}>
        <Row sm="1" md="2" xs="1">
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 80,
            }}
          >
            <Sdiv act jct style={{ height: "100%" }}>
              <S.SignupContainer>
                <LogoMain />
                <Sdiv mgt={108}>
                  <Stext h2 g2>
                    Welcome
                  </Stext>
                  <Sdiv mgt={42} col act style={{ gap: 10 }}>
                    
                    <ButtonLogin
                      title="깃허브로 시작하기"
                      Logo={RenderGithub}
                      //onClick={}
                      href={`${process.env.REACT_APP_GITHUB_URI}`}
                    />
                    <GoogleLoginBtn />
                    <img src="http://15.165.194.66:8080/image?targetType=PROJECT&targetId=1"/>
                    <Stext c2 g3>
                      이용약관, 개인정보 수집 및 이용, 개인정보 제공 내용을
                      확인하였고 동의합니다.
                    </Stext>
                  </Sdiv>
                </Sdiv>
              </S.SignupContainer>
            </Sdiv>
          </Col>
          <Col>
            <S.ImageLogin
              style={{ height: window.screen.height }}
              src={LoginImage}
            />
          </Col>
        </Row>
      </Container>
    </S.Body>
  );
};

const S = {};

S.Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

S.LoginContainer = styled.div`
  flex: 1;
  height: 100%;
`;

S.ImageLogin = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

S.SignupContainer = styled.div`
  width: 360px;
  margin: 16px 0px;
`;

S.LogoImg = styled.img`
  height: 18px;
  width: 18px;
`;
