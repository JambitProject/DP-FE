import { colors } from "styles/colors";
import styled, { css } from "styled-components";

export const Stext = styled.span`
  word-break: keep-all;

  ${(props) => props.h1 && h1}
  ${(props) => props.h2 && h2}
  ${(props) => props.h3 && h3}
  ${(props) => props.s1 && s1}
  ${(props) => props.s2 && s2}
  ${(props) => props.s3 && s3}
  ${(props) => props.s4 && s4}
  ${(props) => props.s5 && s5}
  ${(props) => props.b1 && b1}
  ${(props) => props.b2 && b2}
  ${(props) => props.c1 && c1}
  ${(props) => props.c2 && c2}
  ${(props) => props.c3 && c3}

  ${(props) => props.primary && primary}
  ${(props) => props.secondary && secondary}
  ${(props) => (props.black || props.nigger) && black}
  ${(props) => props.g0 && g0}
  ${(props) => props.g1 && g1}
  ${(props) => props.g2 && g2}
  ${(props) => props.g3 && g3}
  ${(props) => props.g4 && g4}
  ${(props) => props.g5 && g5}
  ${(props) => props.g6 && g6}
  ${(props) => props.g7 && g7} 
  ${(props) => props.white && white}
  ${(props) => props.disableSelect && disableSelect} 
  ${(props) => props.isMine && isMine} 

  margin-top: ${(props) => props.mgt || 0}px;
  margin-bottom: ${(props) => props.mgb || 0}px;
  margin-left: ${(props) => props.mgl || 0}px;
  margin-right: ${(props) => props.mgr || 0}px;

  padding-top: ${(props) => props.pdt || 0}px;
  padding-bottom: ${(props) => props.pdb || 0}px;
  padding-left: ${(props) => props.pdl || 0}px;
  padding-right: ${(props) => props.pdr || 0}px;
  
  
  ${(props) => props.center && center}
  ${(props) => props.left && left}
  ${(props) => props.right && right}
`;

const h1 = css`
  font-family: "Pretendard-SemiBold";
  font-size: 36px;
  line-height: 42px;
`;
const h2 = css`
  font-family: "Pretendard-SemiBold";
  font-size: 30px;
  line-height: 36px;
`;
const h3 = css`
  font-family: "Pretendard-SemiBold";
  font-size: 24px;
  line-height: 32px;
`;
const s1 = css`
  font-family: "Pretendard-Bold";
  font-weight: bold;
  font-size: 17px;
  line-height: 22px;
`;
const s2 = css`
  font-family: "Pretendard-Bold";
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;
const s3 = css`
  font-family: "Pretendard-Bold";
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`;
const s4 = css`
  font-family: "Pretendard-Bold";
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
`;
const s5 = css`
  font-family: "Pretendard-Bold";
  font-weight: bold;
  font-size: 11px;
  line-height: 13px;
`;
const b1 = css`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
`;
const b2 = css`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;
const c1 = css`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  line-height: 20px;
`;
const c2 = css`
  font-family: "Pretendard-Medium";
  font-size: 11px;
  line-height: 18px;
`;
const c3 = css`
  font-family: "Pretendard-Medium";
  font-size: 10px;
  line-height: 14px;
`;
const isMine = css`
  color:${colors.primary};
`
const primary = css`
  color: ${colors.primary};
`;
const secondary = css`
  color: ${colors.secondary};
`;
const black = css`
  color: ${colors.black};
`;
const g7 = css`
  color: ${colors.gray7};
`;
const g6 = css`
  color: ${colors.gray6};
`;
const g5 = css`
  color: ${colors.gray5};
`;
const g4 = css`
  color: ${colors.gray4};
`;
const g3 = css`
  color: ${colors.gray3};
`;
const g2 = css`
  color: ${colors.gray2};
`;
const g1 = css`
  color: ${colors.gray1};
`;
const g0 = css`
  color: ${colors.gray0};
`;
const white = css`
  color: ${colors.white};
`;

const disableSelect = css`
  user-select: none;
`;

const center = css`
  text-align: center;
`;
const left = css`
  text-align: left;
`;
const right = css`
  text-align: right;
`;
