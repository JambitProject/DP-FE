import React from 'react';
import {useParams, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const LoginCallback = ({history, location}) => {
  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const url = "https://github.com/login/oauth/access_token";
      let parameters = {
        "client_id": `438c059de873159f241c`,
        "client_secret": `c97008ee189e4d96398a56d2c2a551a59bcb020d`,
        "code": `${code}`
      }
      const headers = {  
        "Accept" : "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        
      }
      
      try {
        const res = await axios.post(`${url}`, parameters, {headers:headers});
        const data = res;
        
        console.log(data);
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('ProfileURL', data.avatar_url);

        
      } catch (error) {}
    };

    getToken();
  }, []);

  return <></>;

}

export default LoginCallback;