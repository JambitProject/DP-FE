import { DefaultButtonSm } from 'components';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {Sdiv} from "components";
export const TestScreen = (props) => {
  const [positionList, setPositionList] = useState([{
    position: "프론트",
    count: 1,
    
  },]);
  const optionList = [
    "프론트",
    "백엔드",
    "DevOps",
    "AI",
    "데이터",
  ]
  const numberList = [1,2,3,4,5];
  const [selectCnt, setSelectCnt] = useState(1);
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

  const onClickAdd = ()=>{
    setSelectCnt(selectCnt+1);
    let tmpObj = {
      position:"프론트",
      count:1,
      
    }
    setPositionList([...positionList, tmpObj]);
  }
  const onClickDelete = (i)=>{
    setSelectCnt(selectCnt-1)
    let tmpList = [...positionList];
    tmpList.splice(i,1);
    setPositionList(tmpList);
  }
  
  return(
    <div>
      {
        
        positionList.map((item, i)=>{
          
          return(
            
          <Sdiv row>
            <Form.Select onChange={(e)=>{handleChangePosition(e,i)}}>
              {
                optionList.map(opt=>{
                  let selected = item.position === opt;
                  return <option value={opt} selected={selected}>{opt + " 개발자" +"  selected:" + selected}</option>
                })
              }
            </Form.Select>
            <br/>
            <Form.Select onChange={(e)=>{handleChangeCount(e,i)}}>
              {
                numberList.map((num)=>{
                  let selected = false;
                  
                  if(num == item.count) selected = true;
                  return <option value={num} selected={selected}>{num + "명   index:" + i + "   item.count:" + item.count + "   selected:" + selected}</option>
                })
              }
            </Form.Select>
            {
              selectCnt > 1 ?  
              <DefaultButtonSm title="삭제하기" linePrimary onClick={()=>{onClickDelete(i)}}/>
              :
              null
            }          
            </Sdiv>
          )
        })
      }
      <br/>
      <DefaultButtonSm title="추가하기" onClick={onClickAdd}/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div>
        {
          
          positionList.map(item=>{
            return <div>
              <div>
                {item.position}&nbsp; &nbsp; &nbsp; &nbsp; {item.count}
              </div>
            </div>
          }) 
        }
      </div>
    </div>
  )
}

