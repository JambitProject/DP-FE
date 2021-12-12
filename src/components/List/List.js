import { DefaultButtonSm, Sdiv, Stext } from "components";
import React from "react";
import { useHistory } from "react-router-dom";
import styled  from "styled-components";
import { colors } from "styles/colors";

import Toggle from "react-toggle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ListMyPost = ({ title = "title", subtitle = "subtitle" }) => {
  return (
    <MyPostContainer>
      <Sdiv col>
        <Stext s3 g0 mgb={12}>
          {title}
        </Stext>
        <Stext c2 g3>
          {subtitle}
        </Stext>
      </Sdiv>
      <Sdiv col aed>
        <Sdiv row mgb={18}>
          <Stext mgr={12} c2 g4>
            수정
          </Stext>
          <Stext c2 style={{ color: "#EB5757" }}>
            삭제
          </Stext>
        </Sdiv>
        <Sdiv row>
          <Stext mgr={6} c2 g4>
            공개여부
          </Stext>
          <label>
            <Toggle
              // defaultChecked={this.state.tofuIsReady}
              icons={false}
              // onChange={this.handleTofuChange}
            />
          </label>
        </Sdiv>
      </Sdiv>
    </MyPostContainer>
  );
};

const MyPostContainer = styled.div`
  width: 100%;
  padding: 34px 0px;
  border-top: 1px solid ${colors.gray7};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProejctTitle = ({
  title,
  viewCount = 0,
  likesCount = 0,
  replyCount = 0,
  onClickAdd,
}) => {
  const history = useHistory();
  
  return (
    <TextProjectContainer col>
      <TextProjectBack
        onClick={() => {
          history.go(-1);
        }}
      >
        목록으로 {">"}
      </TextProjectBack>
      <TextProjectTitle>{title}</TextProjectTitle>
      <Sdiv row sb act mgb={16}>
        <TextProjectInfo>{`조회수: ${viewCount} 관심: ${likesCount} 댓글: ${replyCount}`}</TextProjectInfo>
        <Sdiv>
          <DefaultButtonSm onClick={onClickAdd && onClickAdd} linePrimary title="관심 추가하기" />
        </Sdiv>
      </Sdiv>
      <Line />
    </TextProjectContainer>
  );
};

const TextProjectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextProjectTitle = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 32px;
  color: #0d0c22;

  margin-bottom: 16px;
`;

const TextProjectBack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #f25625;

  margin-bottom: 20px;
  cursor: pointer;
`;

const TextProjectInfo = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  /* g3 */

  color: #656577;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray7};
`;

export const CommentList = ({
  src,
  name = "name",
  comment = "comment",
  dateString = "dateString",
  timeString = "timeString",
  isDeleted,
  isMine,
  isOwner, 
  onClickModify,
  onClickDelete,
  isEdited,
  editedTime,
}) => {
  // const dateString = item.createdDate.slice(0,10);
  // const timeString = item.createdDate.slice(11,16);

  const parsedTime = editedTime.toString().slice(0,10) + " " + editedTime.toString().slice(11,16);
  return (
    <CommentContainer>
      <Sdiv flex row>
        <Sdiv ct>
          <CommentImg src={src} />
        </Sdiv>
        <Sdiv col mgt={4} mgl={12}>
          {
            isMine ?
            <Stext s3 g0 mgb={2} isMine>
              {isDeleted? "알 수 없음" : name}
              {
                isDeleted ? 
                null
                :
                isOwner ? 
                <Stext s3 mgl={10} secondary>
                  글 작성자
                </Stext>
                :
                null
              }
            </Stext>
            :
            <Stext s3 g0 mgb={2}>
              {isDeleted? "알 수 없음" : name}
              {
                isDeleted ? 
                null
                :
                (isOwner ? 
                <Stext s3 mgl={10} secondary>
                  글 작성자
                </Stext>
                :
                null)
              }
            </Stext>
        
          }
          <Stext b2 g3>
            {isDeleted ? "작성자에 의해 삭제된 댓글입니다." : comment}
          </Stext>
          <Sdiv>
            <Stext c1 g4 mgr={5}>
              {!isDeleted && dateString}
            </Stext>
            <Stext c1 g4 mgr={10}>
              {!isDeleted && timeString}
            </Stext>
            <Stext c1 nigger>
              {!isDeleted && isEdited && parsedTime + "에 수정됨"}
            </Stext>
          </Sdiv>
        </Sdiv>
      </Sdiv>
      {
        isMine ? 
        <Sdiv ct>
          
            <Sdiv mgr={18} >
              {!isDeleted ? <EditIcon cursor='pointer' onClick={onClickModify}/> : null}
            </Sdiv>
          
          
            <Sdiv>
              {!isDeleted ? <DeleteIcon cursor='pointer' onClick={onClickDelete}/> : null}
              
            </Sdiv>
          
        </Sdiv>  
        :
        null
      }
             
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  
`;

const CommentImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  
`;
