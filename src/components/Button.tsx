import styled from "styled-components";

const ButtonStyled = styled.button`
  width: 107px;
  background-color: ${({ color }) =>
    color === "green" ? "#103f0dca" : "#dc3546"};
  border: none;
  color: white;
  font-size: 14px;
  line-height: 1;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    /* scale: 1.1; */
    background-color: ${({ color }) =>
    color === "green" ? "#0b410b" : "#dc3546"};
    box-shadow: 1px 1px 4px 1px #4d6b4d;
  }
`;

function Button({ color, name }: any) {
  return (
    <ButtonStyled className="btn-styled" color={color}>
      {name}
    </ButtonStyled>
  );
}

export default Button;
