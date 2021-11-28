import React from 'react';
import styled from 'styled-components';

const GithubLoginBtn = () => {
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_API_KEY}&scope=repo:status&redirect_uri=http://localhost:3000/`;

  return (
    <>
      <button href={loginUri}></button>
    </>
  );
};

const GithubBtn = styled.a`

`;

export default GithubLoginBtn;