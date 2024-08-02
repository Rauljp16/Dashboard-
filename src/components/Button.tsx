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
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    scale: 1.1;
    background-color: ${({ color }) =>
    color === "green" ? "#55c25536" : "#dc354636"};
    color: white;
  }
`;

//cambiar el tipo any si este componente es necesario mas adelante
function Button({ color, name }: any) {
  return <ButtonStyled color={color}>{name}</ButtonStyled>;
}

export default Button;
