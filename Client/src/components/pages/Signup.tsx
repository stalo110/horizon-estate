import React, { useState } from "react";

import Axios from "axios";

import AxiosInstance from "../../request/AxiosInstance";

// import from "./signup.css";

import { useNavigate } from "react-router-dom";
interface ERROR {
  fullName: string;

  email: string;

  password: string | null;
}

interface FORM {
  auth: {
    fullName: string;

    email: string;

    password: string;

    ConfirmPassword: string;

    _id: string;
  };
}
interface Values {
  name: string;
  value: string;
}

export default function Signup() {
  const [emailIsValid, setEmailIsValid] = useState(false);

  const [form, setForm] = useState({} as FORM);

  const [error, setError] = useState({} as ERROR);

  const [errors, setErrors] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegex.test(email);
  };

  const handleChange = ({ name, value }: Values) => {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });

    if (value !== "") {
      if (name === "password") {
        if (value.length <= 4) {
          setError((prev) => {
            return { ...prev, password: "password must be above 4 characters" };
          });
        } else {
          setError((prev) => ({ ...prev, password: null }));
        }
      } else {
        setError((prev) => ({ ...prev, [name]: null }));
      }
    } else {
      setError((prev) => ({ ...prev, [name]: "This field must not be empty" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(error).every((item) => !item) &&
      Object.values(form).length === 3
    ) {
      setLoading(true);

      try {
        const {
          data: { auth },
        } = await AxiosInstance.post<FORM>("/auth/register/user", form);

        const send = {
          email: auth.email,

          id: auth._id,
        };

        await AxiosInstance.post("/auth/send_verification", send);

        localStorage.setItem("user", JSON.stringify(auth));

        setLoading(false);

        navigate("/verify", { state: send });
      } catch (error) {
        setLoading(false);

        console.log(error);

        if (error) {
          setErrors(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>

          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <a href="/login">Sign In</a>
            </span>
          </div>

          {errors && <p className="text-danger text-center">{errors}</p>}

          <div className="form-group mt-3">
            <label>Full Name</label>

            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="fullName"
              onChange={(event) => handleChange(event.target)}
            />

            <p className="text-danger">{error?.fullName}</p>
          </div>

          <div
            className={"form-group mt-3 ${emailIsValid ? 'valid' : 'invalid'}"}
          >
            <label>Email address</label>

            <input
              type="email"
              className="form-control mt-1"
              name="email"
              placeholder="Email Address"
              //onChange={(e) => setEmail(e.target.value)}

              onChange={(event) => handleChange(event.target)}
            />

            <p className="text-danger">{error?.email}</p>
          </div>

          <div className="form-group mt-3">
            <label>Password</label>

            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              onChange={(event) => handleChange(event.target)}
            />

            <p className="text-danger">{error?.password}</p>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-info"
              disabled={loading || Object.values(form).length != 3}
            >
              {loading && (
                <div
                  className="spinner-border mr-3 spinner-border-sm"
                  role="status"
                ></div>
              )}

              <span className="pl-3"> Sign Up </span>
            </button>
          </div>

          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
