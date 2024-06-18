import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginStyle = {
    position: "absolute",
    display: "flex",
    gap: "10px",
    width: "100%",
    height: "100%",
    left: "0",
    top: "0",
    backgroundColor: "cadetblue",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "rauljp16@gmail.com" && password === "hotel miranda") {
      alert("funciona");
      navigate("/dashboard");
    } else {
      alert("Email o password incorrecto.");
    }
  };

  return (
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
  );
}

export default Login;
