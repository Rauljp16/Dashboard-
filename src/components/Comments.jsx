import commentsJson from "../../comments.json";
function Comments() {
  const commentsStyle = {
    display: "flex",
    backgroundColor: "#ffff",
    margin: "30px",
    borderRadius: "8px",
  };
  const commentsCardStyle = {
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 2px 8px rgba(204, 204, 204, 0.5) ",
    borderRadius: "8px",
    margin: "30px",
    box: "8px",
    padding: "30px",
  };
  return (
    <div style={commentsStyle}>
      {commentsJson.map((comment) => (
        <div style={commentsCardStyle} key={comment.name}>
          <p>{comment.comment}</p>
          <div>
            <img
              style={{ width: "80px" }}
              src={comment.photo}
              alt="Habitacion de hotel"
            />
            <div>
              <p>{comment.name}</p>
              <p>{comment.timeAgo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
