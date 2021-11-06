import styled, { css } from "styled-components";
import { colors } from "styles/colors";

// margin : ${props => props.margin.map(i => i + 'px') || 0};

export const Sdiv = styled.div`
  ${(props) => props.row && row}
  ${(props) => props.col && col}
  ${(props) => props.ct && ct}
  ${(props) => props.start && start}
  ${(props) => props.aed && aed}
  ${(props) => props.jed && jed}
  ${(props) => props.ast && ast}
  ${(props) => props.jst && jst}
  ${(props) => props.act && act}
  ${(props) => props.jct && jct}
  ${(props) => props.sb && sb}

  ${(props) => props.white && white}

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
  ${(props) => props.disableSelect && disableSelect} 


  /*마진 속성*/
  ${(props) => props.mg && mg}
  margin-top: ${(props) => props.mgt || 0}px;
  margin-bottom: ${(props) => props.mgb || 0}px;
  margin-left: ${(props) => props.mgl || 0}px;
  margin-right: ${(props) => props.mgr || 0}px;

  /*패딩 속성*/
  padding-top: ${(props) => props.pdt || 0}px;
  padding-bottom: ${(props) => props.pdb || 0}px;
  padding-left: ${(props) => props.pdl || 0}px;
  padding-right: ${(props) => props.pdr || 0}px;

  /*나머지 속성*/
  ${(props) => props.bg && bg}
  border-radius: ${(props) => props.br || 0}px;

  ${(props) => props.flex && flex}

  width: ${(props) => (props.w ? props.w + "px" : "auto")};
  height: ${(props) => (props.h ? props.h + "px" : "auto")};

  //gap 속성
  gap: ${(props) => (props.g ? props.g + "px" : 0)};

  ${(props) => props.center && center}
  ${(props) => props.left && left}
  ${(props) => props.right && right}
`;

const mg = css`
  margin: ${(props) => props.mg}px;
`;
const bg = css`
  background-color: ${(props) => props.bg};
`;
const flex = css`
  flex: ${(props) => props.flex};
`;

const row = css`
  display: flex;
  flex-direction: row;
`;
const col = css`
  display: flex;
  flex-direction: column;
`;

const ct = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sb = css`
  display: flex;
  justify-content: space-between;
`;

const start = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ast = css`
  display: flex;
  align-items: flex-start;
`;

const jst = css`
  display: flex;
  justify-content: flex-start;
`;

const aed = css`
  display: flex;
  align-items: flex-end;
`;

const jed = css`
  display: flex;
  justify-content: flex-end;
`;

const jct = css`
  display: flex;
  justify-content: center;
`;

const act = css`
  display: flex;
  align-items: center;
`;

const white = css`
  background-color: white;
`;

const h1 = css`
  font-family: "Pretendard-SemiBold";
  font-size: 36px;
  line-height: 42px;
`;
const h2 = css`
  font-family: "Pretendard-SemiBold";
  font-size: 28px;
  line-height: 36px;
`;
const h3 = css`
  font-family: "Pretendard-SemiBold";
  font-size: 21px;
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
