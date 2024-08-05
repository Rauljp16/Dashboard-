import styled from "styled-components";

const ButtonStyled = styled.button`
    background-color: ${({ color }) =>
    color === "green" ? "#195219" : "#dc3546"};
    border: none;
    color: white;
  font-size:16px;
  border-radius: 8px;
  padding: 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    scale: 1.1;
    box-shadow: 1px 1px 8px 3px #195219;
  }
`;

//cambiar el tipo any si este componente es necesario mas adelante
function Button({ color, name, disabled }: any) {
  return <ButtonStyled color={color}>{name}</ButtonStyled>;
}

export default Button;
