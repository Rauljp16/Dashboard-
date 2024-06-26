import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import fondo from "../images/fondo.jpg";
import styled from "styled-components";

function Login() {
  const [email, setEmail] = useState("rauljp16@gmail.com");
  const [password, setPassword] = useState("hotel miranda");
  const userName = "Raúl";
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const loginStyled = styled.div`
  
  `

  const fondoStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    position: "absolute",
    width: "100%",
    height: "100vh",
    left: "0",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loginStyle = {
    display: "flex",
    gap: "20px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 8px #135846",
    borderRadius: "8px",
    padding: "40px 70px",
    backgroundColor: "#ffffffba",
    color: "#e23428d5",
    scale: "1.2",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "rauljp16@gmail.com" && password === "hotel miranda") {
      dispatch({
        type: "LOGIN",
        email: email,
      });
      dispatch({
        type: "UPDATEUSER",
        user: userName,
      });
      navigate("/dashboard");
    } else {
      alert("Invalid date");
    }
  };

  return (
    <div style={fondoStyle}>
      <form style={loginStyle} onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">LOGIN</button>
        <p>To access...</p>
        <p>EMAIL: rauljp16@gmail.com</p>
        <p>PASSWORD: hotel miranda</p>
      </form>
    </div>
  );
}

export default Login;
