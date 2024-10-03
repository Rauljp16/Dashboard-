import React from "react";
import styled from "styled-components";
import commentsJson from "../../data/comments.json";

// Estilos con Styled Components
const CommentsContainer = styled.div`
  display: flex;
  justify-content: center;
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
  padding: 30px;
  background-color: #fafafa;
  max-width: 400px;
  min-height: 250px;
`;
const DivUserInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
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
  margin-bottom: 20px;
`;

const CommentName = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
`;

const CommentTimeAgo = styled.p`
  color: #007455;
  font-size: 14px;
  letter-spacing: 0.4px;
`;

function Comments() {
  return (
    <CommentsContainer>
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
    </CommentsContainer>
  );
}

export default Comments;
