import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import fondo from "../images/fondo.webp";
import styled from "styled-components";
import Button from "../components/Button";
import { InputStyled, InputStyledError } from "../components/Input";

const Fondo = styled.div`
  background-image: url(${fondo});
  background-size: cover;
  background-position: center bottom;
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const LoginForm = styled.form`
  display: flex;
    gap: 18px;
    width: 100%;
    max-width: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 6px 0px #4f6a63;
    border-radius: 4px;
    margin: 0 40px;
    padding: 20px;
    background-color: #ffffff21;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    color: #01300b;
    font-weight: 800;
    transform: scale(1);


  @media (min-width: 1000px) {
    padding: 40px 60px;
    max-width: 600px;
  }
`;

const Title = styled.h1`
font-family: sans-serif;
font-size: 35px;
font-weight: 700;
letter-spacing: 3px;
`;
const Text = styled.p`
  margin: 5px 0;
  font-family: sans-serif;

`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isActiveEmail, setIsActiveEmail] = useState(true)
  const [isActivePass, setIsActivePass] = useState(true)

  if (!authContext) {
    return null;
  }

  const { dispatch } = authContext;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsActiveEmail(false);
      valid = false;
    } else {
      setIsActiveEmail(true);
    }

    if (password.length < 2) {
      setIsActivePass(false);
      valid = false;
    } else {
      setIsActivePass(true);
    }

    if (!valid) return;

    const result = await loginUser();
    if (result) {
      dispatch({
        type: "LOGIN",
        token: result.token.token,
        userData: result.token.user,

      });
      dispatch({
        type: "UPDATEUSER",
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
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fondo>
      <LoginForm onSubmit={handleSubmit}>
        <Title>LOGIN</Title>
        {isActiveEmail ? (
          <InputStyled
            type="email"
            placeholder="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        ) : (
          <InputStyledError
            type="email"
            placeholder="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />)}
        {isActivePass ? (
          <InputStyled
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />) : (
          <InputStyledError
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />)}

        <Button color="green" name="LOGIN" ></Button>
        <Text>To access...</Text>
        <Text>EMAIL: rauljp16@gmail.com</Text>
        <Text>PASSWORD: hotel miranda</Text>
      </LoginForm>
    </Fondo>
  );
}

export default Login;
