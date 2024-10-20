import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(88, 88, 88, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 330px;
  height: 200px;
  text-align: center;
  justify-content: center;
`;

const DivButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ModalButton = styled.button`
  padding: 10px;
  background-color: #007455;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: gray;
`;

const DeleteModal = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => {
  return (
    <ModalBackground>
      <ModalContent>
        <h3>are you sure you want to delete?</h3>
        <DivButtons>
          <ModalButton onClick={onConfirm}>OK</ModalButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </DivButtons>
      </ModalContent>
    </ModalBackground>
  );
};

export default DeleteModal;
