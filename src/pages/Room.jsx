import styled from "styled-components";
function Room() {
  return (
    <>
      <ButtonStyledComp>ROOM</ButtonStyledComp>
    </>
  );
}
const ButtonStyledComp = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  border: 2px solid green;
  border-radius: 8px;
  padding: 10px 20px;
  background-color: white;
  color: #a5ffa5;
  font-size: 16px;
  cursor: pointer;
  transition: all 1s ease;

  &:hover {
    background-color: #00c700;
    color: white;
    scale: 5;
  }
`;

export default Room;
