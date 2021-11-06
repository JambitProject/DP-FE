import { DefaultButtonSm, Sdiv, Stext } from "components";
import React from "react";
import { Container, Modal } from "react-bootstrap";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";

export const ModalContainer = ({ children, show, onHide }) => {
  return (
    <>
      {show ? (
        <StyledModalContainer>
          <Modal
            style={{ borderRadius: 16 }}
            onHide={onHide && onHide}
            show={show}
            backdrop="static"
            keyboard={false}
          >
            <StyledModalWrapper>{children}</StyledModalWrapper>
          </Modal>
        </StyledModalContainer>
      ) : null}
    </>
  );
};

const StyledModalContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModalWrapper = styled.div`
  padding: 26px 28px;
  background-color: #ffffff;
  border-radius: 16px;
`;
