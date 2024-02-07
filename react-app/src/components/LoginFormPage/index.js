import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(true)

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const toggleToInput = () => {
    setVisible(!visible)
  }

  return (
    <div className="login-page-container">
      <div><img className="market-logo-login" src="marketit-logo-login.png" alt="logo"/></div>
      <div className="form-area">
          <form className="login-form" onSubmit={handleSubmit}>
            {visible ? (
            <>
            <h1 style={{color:'#2e343a', paddingBottom:"1rem", textAlign:'center'}}>Welcome Back</h1>
            <label className="email-input">
              <input
                className="email-area"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </label>
              <button className="continue-button" type="submit" onClick={toggleToInput}>
                Continue
              </button>
              </>
            ) : (
              <>
                <h1 style={{color:'#2e343a', paddingBottom:"1rem", textAlign:'center'}}>Enter Your Password</h1>
                <label className="email-input">
                  <input
                    className="email-area"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  {/* {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))} */}
                </label>
                <label className="password-input">
                  <input
                    className="password-area"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                  />
                  {/* {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))} */}
                </label>
                <button className="continue-button" type="submit" onClick={handleSubmit}>
                Continue
                </button>
              </>
            )}
          </form>
          <p style={{textAlign:"center", paddingTop: '1rem', color:'gray'}}>Don't Have An Account? <Link to='/signup' style={{color:"#0ba37f", textDecoration:'none'}}>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginFormPage;
