
import styled from "styled-components";

export const InputStyled = styled.input`
  padding: 10px;
  border: 1px solid #4f6a63;
  border-radius: 4px;
  width: 80%;
  background-color: #ffffff58;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 2px #185336;
  }

  &::placeholder {
    color: #0b362b;
    letter-spacing: 1px;
  }
`;
export const InputStyledError = styled.input`
  padding: 10px;
  border: 1px solid #ce0707d8;

  border-radius: 4px;
  width: 80%;
  background-color: #ffffff58;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 2px #ce07079d;
  }

  &::placeholder {
    color: #f10909;
    letter-spacing: 1px;
  }
`;


