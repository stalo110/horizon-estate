import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../request/AxiosInstance";

const Verify = () => {
  const verify = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState({} as { error: string });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(verify);
  const [message, setMessage] = useState("");

  interface Verify {
    verify: number;
  }

  const hanldeVerification = async () => {
    const data = {
      id: user._id,
      email: user.email,
    };
    try {
      await AxiosInstance.post("/auth/send_verification", data);
      setMessage("check your mail for OTP code");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        code: Number(code),
        email: user.email,
      };
      const info = await AxiosInstance.post("/auth/verify_code", data);
      console.log(data);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <div className="Auth-form-container" style={{marginTop: -150}}>
      <form className="Auth-form" onSubmit={handleVerify}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Verify Email</h3>
          {error.error && (
            <p className="text-danger text-center">{error.error}</p>
          )}
          {message && <p className="text-success text-center">{message}</p>}
          <div className="form-group mt-3">
            <input
              type="number"
              name="verify"
              className="form-control mt-1"
              placeholder="Enter your 4 digit verification code"
              onChange={({ target }) => setCode(target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-info"
              disabled={code.length !== 4}
            >
              {loading && (
                <div
                  className="spinner-border mr-3 spinner-border-sm"
                  role="status"
                ></div>
              )}

              <span className="pl-3"> Verify </span>
            </button>

            <a
              href="#"
              onClick={hanldeVerification}
              className={`cursor-pointer ${loading && "text-grey"}`}
            >
              Resend Verification Code
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Verify;
