import styled from "styled-components";
import commentsJson from "../../data/comments.json";


const CommentsContainer = styled.div`
    width: 100%;
    overflow: auto;
    padding: 20px;
`;
const CommentsDiv = styled.div`
      display: flex;
    border-radius: 8px;
    gap: 30px;
  width: fit-content;
`;

const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 0px 16px rgba(204, 204, 204, 1);
  border-radius: 8px;
  padding: 10px 14px;
  background-color: #fafafa;
  width: 260px;
  font-size: 14px;
`;
const DivUserInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  overflow: auto;
`;
const CommentImage = styled.img`
      width: 55px;
    height: 65px;
    border-radius: 8px;
    object-fit: cover;
    object-position: top;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentText = styled.p`
  margin-bottom: 10px;
`;

const CommentName = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
`;

const CommentTimeAgo = styled.p`
  color: #007455;
  font-size: 12px;
  letter-spacing: 0.4px;
`;

function Comments() {
  return (
    <CommentsContainer>
      <CommentsDiv>
        {commentsJson.map((comment) => (
          <CommentCard key={comment.name}>
            <CommentText>{comment.comment}</CommentText>
            <DivUserInfo>
              <CommentImage src={comment.photo} alt="usuario" />
              <CommentInfo>
                <CommentName>{comment.name}</CommentName>
                <CommentTimeAgo>{comment.timeAgo}</CommentTimeAgo>
              </CommentInfo>
            </DivUserInfo>
          </CommentCard>
        ))}
      </CommentsDiv>
    </CommentsContainer>
  );
}

export default Comments;
