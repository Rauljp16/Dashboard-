
import styled from "styled-components";

export const InputStyled = styled.input`
  padding: 10px;
  border: 1px solid #4f6a63;
  border: none;
  border-bottom: 2.5px solid #6b6b6b7d;
  width: 80%;
  background-color: transparent;

  &:focus {
    outline: none;
    border: none;
    border-bottom: 2.5px solid #185336;
  }

  &::placeholder {
    color: #0b362b;
    letter-spacing: 1px;
    font-weight: 600;
  }
`;
export const InputStyledError = styled.input`
  padding: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 2.5px solid #ce070784;
  width: 80%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #990707;
    letter-spacing: 1px;
  }
`;


