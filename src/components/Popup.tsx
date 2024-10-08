import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export interface InfoPopup {
  title: string;
  info: string;
}

interface PropsPopup {
  infoPopup: InfoPopup;
  setOpenPopup: (open: boolean) => void;
  openPopup: boolean;
}

const GlobalStyle = createGlobalStyle<{ isBlurred: boolean }>`
  #app-content {
    filter: ${({ isBlurred }) => (isBlurred ? 'blur(5px)' : 'none')};
    pointer-events: ${({ isBlurred }) => (isBlurred ? 'none' : 'auto')};
  }
`;

const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(226, 226, 226, 0.233);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const PopupContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 4px #1a573dcc;
  left: 33%;
  top: 30%;
  min-width: 35%;
  min-height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  text-align: center
`;

const CloseButton = styled.p`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
`;

const Popup = ({ infoPopup, setOpenPopup, openPopup }: PropsPopup) => {
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <GlobalStyle isBlurred={openPopup} />
      {openPopup && (
        <>
          <PopupOverlay onClick={handleClose} />
          <PopupContainer>
            <CloseButton onClick={handleClose}>CERRAR</CloseButton>
            <h2>{infoPopup.title}</h2>
            <p>{infoPopup.info}</p>
          </PopupContainer>
        </>
      )}
    </>
  );
};

export default Popup;
