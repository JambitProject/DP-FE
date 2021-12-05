import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { Form } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {
  InputWithTitle,
  TextareaWithTitle,
  InputImage,
  Sdiv,
  Stext,
  DefaultButtonSm,
  ModalContainer,
  BadgeDefaultGray,
  SelectMain,
  SelectNumber,
} from "components";

import { Row, Col, Container, Dropdown, InputGroup } from "react-bootstrap";
import { InputWithSelectGroup } from "components/Input/Input";

const TMP_STACK_BADGE_ITEMS = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const TMP_STACK_BADGE_ITEMS_MODAL = [
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
  { title: "JAVA" },
  { title: "React" },
  { title: "NodeJS" },
  { title: "Redux" },
];

const selectBoxStyle={
  display:"inline-block",
  width:"200px",
  height:"50px",  
  marginRight:"10px",
}
const numberBoxStyle={
  display:"inline-block",
  width:"100px",
  height:"50px",  
  marginRight:"10px",
}
const optionList = [
  "프론트엔드",
  "백엔드",
  "풀스택",
  "DevOps",
  "모바일",
  "AI",
  "데이터"
]
const numberList = [1,2,3,4,5];

export const RecruitEditScreen = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [selectCnt, setSelectCnt] = useState(1);  //몇 개의 포지션을 구하는지
  const [positionList, setPositionList] = useState([{
    position:"프론트",
    count:1,
  },]);  //포지션 별 정보 담은 obj 리스트
  const onClickOpenModal = () => {
    setShowModal(true);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };
  const handleChangePosition=(e, i)=>{ //모집포지션 변경
    let tmpList = [...positionList];
    tmpList[i].position = e.target.value;
    setPositionList(tmpList);
  }
  const handleChangeCount=(e, i)=>{  //해당포지션 인원 수 변경
    let tmpList = [...positionList];
    tmpList[i].count = e.target.value;
    setPositionList(tmpList);
  }
  const onClickPositionAdd = ()=>{
    setSelectCnt(selectCnt + 1);
    let tmpObj = {
      position:"프론트",
      count:1,
    }
    setPositionList([...positionList, tmpObj]);
  }
  
  const onClickPositionDelete = (i)=>{
    setSelectCnt(selectCnt-1)
    let tmpList = [...positionList];
    tmpList.splice(i,1);
    setPositionList(tmpList);
  }
  
  return (
    <S.Body>
      <Container>
        <Sdiv col>
          <Sdiv row act>
            <Stext mgb={18} mgt={40} h3 g0>
              # 프로젝트 구인 글 작성
            </Stext>
          </Sdiv>
          <Sdiv>
            <InputWithTitle title="모집글 제목" />
            <Sdiv mgt={24} />
            <Sdiv mgb={12}>
              <Stext s4 g0 mgb={12}>
                모집 포지션, 인원수
              </Stext>
            </Sdiv>
            <Sdiv>
              {
                positionList.map((item, i)=>{
                  return(
                    <Sdiv mgb={5} row>
                      <Form.Select style={selectBoxStyle} onChange={(e)=>{handleChangePosition(e,i)}}>
                        {
                          optionList.map(opt=>{
                            let selected = item.position === opt;
                            return <option value={opt} selected={selected}>{opt + " 개발자"}</option>
                          })
                        }
                      </Form.Select>
                      <br/>
                      <Form.Select style={numberBoxStyle} onChange={(e)=>{handleChangeCount(e,i)}}>
                        {
                          numberList.map((num)=>{
                            let selected = false;
                            if(num == item.count) selected = true;
                            return <option value={num} selected={selected}>{num + "명"}</option>
                          })
                        }
                      </Form.Select>
                      {
                        selectCnt > 1 ?  
                        //<RemoveCircleOutlineIcon onClick={()=>{onClickPositionDelete(i)}} cursor="pointer"/>
                        <IconButton aria-label="delete" onClick={()=>{onClickPositionDelete(i)}}>
                          <ClearIcon color="disabled"/>
                        </IconButton>
                        :
                        null
                      }     
                    </Sdiv>
                  )
                })
              }
              <Sdiv w={100} h={30} mgr={15}>
                <DefaultButtonSm fillSecondary title="포지션 추가" onClick={onClickPositionAdd}/>
              </Sdiv>
            </Sdiv>
            
            <Sdiv mgt={24} />
            <InputWithTitle title="우대 스택" onClick={onClickOpenModal} />
            <Sdiv mgt={24} />
            <TextareaWithTitle title="모집 상세 설명" />
            <Sdiv mgt={24} />
            <InputWithTitle title="프로젝트 추가" onClick={onClickOpenModal} />
            <Sdiv mgt={24} />
            <InputWithTitle title="연락처" />
            
            
          </Sdiv>
          <Sdiv mgt={40} jed>
            <DefaultButtonSm fill title="모집글 게시하기" />
          </Sdiv>
        </Sdiv>
      </Container>
      <ModalContainer show={showModal}>
        <Stext h3 g0 mgb={20}>
          # 기술스택 추가하기
        </Stext>
        <S.ModalTextSm>기술스택 선택</S.ModalTextSm>
        <Sdiv h={16} />
        <S.ModalStackContainer>
          {TMP_STACK_BADGE_ITEMS_MODAL.map((item) => {
            return <BadgeDefaultGray title={item.title} />;
          })}
        </S.ModalStackContainer>
        <Sdiv row aed mgt={28} style={{ width: "100%" }}>
          <InputWithTitle style={{ width: "100%" }} title="직접 추가" />
          <Sdiv w={60} mgl={8}>
            <DefaultButtonSm line title="추가" />
          </Sdiv>
        </Sdiv>
        <Sdiv h={28} />
        <S.ModalTextSm>추가된 기술 스택</S.ModalTextSm>
        <Sdiv mgt={4} row style={{ gap: "0px 4px", flexWrap: "wrap" }}>
          {TMP_STACK_BADGE_ITEMS.map((item) => (
            <BadgeDefaultGray title={item.title} />
          ))}
        </Sdiv>
        <Sdiv h={78} />
        <S.Line />
        <Sdiv row jed mgt={28}>
          <DefaultButtonSm title="닫기" line onClick={onClickCloseModal} />
          <Sdiv w={4} />
          <DefaultButtonSm title="완료" onClick={onClickCloseModal} />
        </Sdiv>
      </ModalContainer>
    </S.Body>
  );
};

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.ImageProfile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background-image: url('https://source.unsplash.com/random/48x48');
`;

S.ModalTextSm = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 22px;
  /* identical to box height, or 220% */

  /* g0 */

  color: #0d0c22;
`;

S.ModalStackContainer = styled.div`
  height: 104px;
  width: 100%;
  overflow-y: scroll;
  flex-wrap: wrap;
  display: flex;
  gap: 4px;
`;

S.Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray7};
`;
