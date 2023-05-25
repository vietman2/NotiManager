import "./SignIn.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

import { setToken } from "../../store/slices/auth";
import logo from "../../assets/notimanager-logo-transparent.png";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail(email.trim());
    setPassword(password.trim());

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    const exp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const result = exp.test(email);

    if (result === false) {
      setError("Invalid email");
      return;
    }

    try {
      const response = await axios.post(
        "/api/signin/",
        JSON.stringify({
          username: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const token = response.data.token;

      setToken(token);
      navigate(`/home`);
    } catch (error: any) {
      if (!error.response) {
        setError("Error connecting to server");
      } else {
        setError("Invalid email or password");
      }
    }
  };

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  return (
    <div className="SignIn">
      <img alt="" height="100px" width="400px" src={logo} />
      <br />
      <br />
      <form onSubmit={handleSignIn}>
        <Stack spacing={2}>
          {error && (
            <div className="error" data-testid="error-message">
              {error}
            </div>
          )}
          <TextField
            inputProps={{ "data-testid": "email-input" }}
            className="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            inputProps={{ "data-testid": "password-input" }}
            className="password"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <LoadingButton
            fullWidth
            data-testid="signin-button"
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </LoadingButton>
          <br />
          <LoadingButton
            fullWidth
            data-testid="signup-button"
            size="large"
            variant="contained"
            onClick={() => handleSignUp()}
          >
            Sign Up
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}
