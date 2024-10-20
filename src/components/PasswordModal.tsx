import React, { useState } from 'react';
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
  gap: 20px;
  width: 330px;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const PasswordInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DivButtons = styled.div`
display: flex;
gap: 30px;
`;

const ModalButton = styled.button`
  padding: 10px;
  background-color: #007455;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PasswordModal = ({ onSubmit, onCancel }: { onSubmit: (password: string) => void, onCancel: () => void }) => {
  const [password, setPassword] = useState('');

  return (
    <ModalBackground>
      <ModalContent>
        <h3>Enter Password</h3>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DivButtons>
          <ModalButton onClick={() => onSubmit(password)}>Submit</ModalButton>
          <ModalButton onClick={onCancel} style={{ backgroundColor: 'gray' }}>Cancel</ModalButton>
        </DivButtons>
      </ModalContent>
    </ModalBackground>
  );
};

export default PasswordModal;
