import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../images/fondo.jpg";

function Login({ setAuth }) {
  const [email, setEmail] = useState("rauljp16@gmail.com");
  const [password, setPassword] = useState("hotel miranda");
  const navigate = useNavigate();

  const fondoStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: "cover",
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
    boxShadow: "0px 0px 2px black",
    borderRadius: "8px",
    padding: "40px",
    backgroundColor: "rgb(255 255 255 / 0.5)",
    scale: "1.3",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "rauljp16@gmail.com" && password === "hotel miranda") {
      setAuth("rauljp16");
      navigate("/dashboard");
    } else {
      setAuth("");
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
