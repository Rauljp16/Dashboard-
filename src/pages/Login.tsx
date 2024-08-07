import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import fondo from "../images/fondo.jpg";
import styled from "styled-components";

const loginStyled = styled.div``;

const fondoStyle: React.CSSProperties = {
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

const loginStyle: React.CSSProperties = {
  display: "flex",
  gap: "18px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 0px 2px #0c3b2f",
  borderRadius: "8px",
  padding: "40px 120px",
  backgroundColor: "#ffffff21",
  backdropFilter: "blur(9px)",
  WebkitBackdropFilter: "blur(9px)",
  color: "#0b362b",
  scale: "1.1",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const userName = "Raúl";
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { dispatch } = authContext;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await loginUser();
    if (token) {
      dispatch({
        type: "LOGIN",
        email: email,
        token: token,
      });
      dispatch({
        type: "UPDATEUSER",
        user: userName,
      });
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const loginUser = async () => {
    const apiUrl = import.meta.env.VITE_API_DOMAIN_LOGIN;

    const data = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      setToken(result.token);
      return result.token;
    } catch (error) {
      console.error("Error:", error);
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
