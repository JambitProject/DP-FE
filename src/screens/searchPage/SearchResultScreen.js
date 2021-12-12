import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components"
import {
  Sdiv,
  Stext,
  CardProfile,
  CardProjectHome,
} from "components";

import { Row, Col, Container } from "react-bootstrap";
import Cookies from 'universal-cookie';
import defaultProfileImg from "images/defaultProfileImg.svg";
export const SearchResultScreen = ({myLikedProjects,searchMember, searchPrj, searchType}) => {
  //const { search } = useLocation();  
  const {type, query} = useParams();
  const history = useHistory();
  const cookies = new Cookies();
  const goProject=(id)=>{
    
    history.push(`/project/${id}`);
  }
  
  const goProfile=(nickname)=>{
    if(nickname === cookies.get('nickname')){
      history.push('/myportfolio');
    }else{
      history.push(`/portfolio/${nickname}`);
    }
  }
  
  return(
    <S.Body>
      <Container>
        <Row>
          <Col>
            <Sdiv col>
              <Sdiv row act>
                <Stext mgb={18} mgt={40} h2 g0>
                  {
                  `'${query.replace('%23', '#')}' ${searchType==="STACK" ? "기술 스택" : "제목, 닉네임"} 검색 결과`}
                </Stext>
              </Sdiv>
              
              </Sdiv>
            
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv col>
              <Sdiv row act>
                <Stext mgb={18} mgt={40} h3 g0>
                  # 프로젝트 내 검색 결과 
                </Stext>
              </Sdiv>
              <S.ProfileRow xs={2} sm={2} md={3}>
                  {searchPrj && searchPrj.length > 0 ? searchPrj.map((item) => {
                    let isLiked=false;
                    if(myLikedProjects){
                      myLikedProjects.forEach(prjItem=>{
                        if(item.id === prjItem.id){
                          isLiked = true;
                          return false;
                        }
                      })
                    }
                    return (
                      <S.ProfileCol>
                       <Sdiv>
                          <CardProjectHome
                            src={item.imgList[0]}
                            title={item.projectName}
                            subTitle={"subTitle"}
                            progress={item.progress}
                            onClick={()=>{goProject(item.id)}}
                            likesCount={item.likesCount}
                            isLiked={isLiked}
                          />
                        </Sdiv>
                      </S.ProfileCol>
                    );  
                })
                :
                <Sdiv>
                  <Stext mgb={18} mgt={40} h3 g3>
                    검색결과가 없어요 👿
                  </Stext>  
                </Sdiv>
                }
                </S.ProfileRow>
            </Sdiv>
          </Col>
        </Row>
        <Row>
          <Col>
            <Sdiv col mgt={44}>
              <Stext mgb={18} h3 g0>
                # 프로필 내 검색결과
              </Stext>
              
            </Sdiv>
          </Col>
        </Row>
        <S.ProfileRow xs={1} sm={2} md={3} lg={4}>
          {searchMember && searchMember.length > 0 ? searchMember.map((item) => {
            return (
              <Col>
                <CardProfile
                  prifileSrc={item.profileImage ? item.profileImage : defaultProfileImg}
                  onClickProfile={()=>{goProfile(item.nickname)}}
                  name={item.nickname}
                  subTitle={item.description}
                  skillList={item.skillList}
                />
              </Col>
            );
          })
        :
        <Sdiv mgl={10}>
          <Stext mgb={18} mgt={40} h3 g3>
            검색결과가 없어요 👿
          </Stext>  
        </Sdiv>
        }
        </S.ProfileRow>


        
      </Container>
    </S.Body>
  )
};

const S = {};

S.Body = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

S.ProfileCol = styled(Col)`
  padding: 0px;
`;

S.ProfileRow = styled(Row)`
  gap: 16px 0px;
  margin-top: 48px;
`;

