import React, { useState } from "react";

import Axios from "axios";

// import "./login.css"

import AxiosInstance from "../../request/AxiosInstance";

import { useNavigate } from "react-router-dom";

interface Form {
  email: String;

  password: string;
  token: string;
  user: Record<string, string | number>;
}

export default function Login({ changeAuthMode }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email,

      password,
    };

    setLoading(true);

    try {
      const { data } = await AxiosInstance.post<Form>(
        "/auth/login/user",
        formData
      );

      setLoading(false);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      setLoading(false);

      console.log(error);

      if (error) {
        setErrors(error.response.data.error);
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>

          <div className="text-center">
            Not registered yet?
            <span className="link-primary" onClick={changeAuthMode}>
              <a href="/signup"> Sign Up</a>
            </span>
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>

            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>

            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-info" disabled={loading}>
              {loading && (
                <div
                  className="spinner-border mr-3 spinner-border-sm"
                  role="status"
                ></div>
              )}

              <span className="pl-3"> Login </span>
            </button>
          </div>

          {errors && <p className="text-danger">{errors}</p>}
          {/* 
          <p className="text-center mt-2">

            Forgot <a href="/forgot">password?</a>

          </p> */}
        </div>
      </form>
    </div>
  );
}
