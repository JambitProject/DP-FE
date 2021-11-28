import axios from 'axios';
import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router';
import Sdiv from 'styled-components';
import styled, { css } from "styled-components";
import { useState } from 'react';

const GoogleLoginBtn = ({ }) => {
  const history = useHistory();
  let user={};
  

  const onSuccessGoogle = async (response)=>{
    console.log(response);
    console.log(response.profileObj.email);
    
    const email = response.profileObj.email;
    
    const isNewMember = await axios.get(`http://15.165.194.66:8080/member/check/${email}`);
    console.log(isNewMember);
    if(isNewMember.data=== ""){ 
      alert('어머니')
      const idx = response.profileObj.email.indexOf('@');
      const nickName = response.profileObj.email.substring(0, idx);
      
      user = {
        userId:`${response.profileObj.email}`,
        nickname:`${nickName}`,
        skillSet:"",
        description:"Hi, I'd like to order 4000 lattes to go please",
      };
      console.log(user);
      
      const headers = {
        "Accept" : "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
      const memberIdPromise = await axios.post(`http://15.165.194.66:8080/member`, user, {headers:headers});
      const tokenPromise = await axios.get(`http://15.165.194.66:8080/member/access-token?nickname=${user.nickname}`);
      
      localStorage.setItem('access-token', tokenPromise.data);
      localStorage.setItem('memberId', memberIdPromise.data);
      localStorage.setItem('nickname', user.nickname);
    
     
      console.log(user);

    }else{
      const token = await axios.get(`http://15.165.194.66:8080/member/access-token?nickname=${isNewMember.data.nickname}`);
      localStorage.setItem('access-token', token.data);
      localStorage.setItem('memberId', isNewMember.data.id);
      localStorage.setItem('nickname', isNewMember.data.nickname);
    }
    console.log(localStorage);
    history.push('/');
    
  }
  useEffect(()=>{
    
  })
  const onFailureGoogle = (response)=>{
    console.log('실패');
    console.log(response);
  }
  return (
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_API_KEY}
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
          cookiePolicy={'single_host_origin'}
          buttonText={"구글로 시작하기"}
        />
      </div>
    )
  
  }
export default GoogleLoginBtn;