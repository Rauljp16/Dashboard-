import styled from "styled-components";

const ButtonStyled = styled.button`
  border: 3px solid
    ${({ color }) => (color === "green" ? "#55c255" : "#dc3545")};
  color: ${({ color }) => (color === "green" ? "#55c255" : "#dc3545")};
  font-size: larger;
  border-radius: 8px;
  width: 100px;
  height: 40px;
  padding: 8px 20px;
  cursor: pointer;
  margin-left: 200px;
  &:hover {
    scale: 1.2;
    background-color: ${({ color }) =>
    color === "green" ? "#55c25536" : "#dc354636"};
    color: white;
  }
`;

//cambiar el tipo any si este componente es necesario mas adelante
function Button({ color }: any) {
  return <ButtonStyled color={color}>Click</ButtonStyled>;
}

export default Button;
