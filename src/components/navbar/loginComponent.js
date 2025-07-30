"use client";
import { useState } from "react";
import AuthClass from "../../firebase/authClass"; 
import { FaEnvelope, FaLock, FaExclamationTriangle, FaGoogle } from "react-icons/fa";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailValid, setEmailValid] = useState(null); 
  const [passwordValid, setPasswordValid] = useState(null); 

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await AuthClass.login({ email, password });
      onClose();
    } catch (err) {
      setError("The email or password is incorrect");
      setEmailValid(false);
      setPasswordValid(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await AuthClass.LoginWithGoogle();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="card-content">
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${emailValid === false ? 'is-danger' : ''}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailValid(email ? true : false)}
          />
          <span className="icon is-small is-left">
            <FaEnvelope />
          </span>
          {emailValid === false && (
            <span className="icon is-small is-right has-text-danger">
              <FaExclamationTriangle /> 
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${passwordValid === false ? 'is-danger' : ''}`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordValid(password ? true : false)}
          />
          <span className="icon is-small is-left">
            <FaLock />
          </span>
          {passwordValid === false && (
            <span className="icon is-small is-right has-text-danger">
              <FaExclamationTriangle />
            </span>
          )}
        </div>
      </div>

      {error && <p className="help is-danger">{error}</p>}

      <div className="control mt-4">
        <button
          className={`button is-primary is-rounded is-fullwidth ${loading ? "is-loading" : ""}`}
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </button>
      </div>

      {/* Botones de login con Google y Github */}
      <div className="field mt-4">
        <button
          className="button is-primary is-rounded is-fullwidth mb-4"
          onClick={handleLoginWithGoogle}
        >
          <span className="icon">
            <FaGoogle />
          </span>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
