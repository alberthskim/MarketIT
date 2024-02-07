import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(true)

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const toggleToInput = () => {
    setVisible(!visible)
  }

  return (
    <div className="sign-up-container">
      <div><img className="market-logo-login" src="marketit-logo-login.png" alt="logo"/></div>
      <div className="signup-form-area">

      <form onSubmit={handleSubmit} className="signup-form">
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        {visible ? (
            <>
            <h1 style={{color:'#2e343a', paddingBottom:"1rem", textAlign:'center'}}>Create An Account</h1>
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
            <h1 style={{color:'#2e343a', paddingBottom:"1rem", textAlign:'center'}}>Create An Account</h1>
            <label className="email-input">
              <input
                className="signup-email-area"
                type="text"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className="signup-username-area"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className="signup-password-area"
                type="password"
                value={password}
                placeholder="Create Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className="signup-confirm-password-area"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="signup-button">Sign Up</button>
            </>
            )}
            </form>
            <p style={{textAlign:"center", paddingTop: '1rem', color:'gray'}}>Already have an account? <Link to='/login' style={{color:"#0ba37f", textDecoration:'none'}}>Log In</Link></p>
      </div>
    </div>
  );
}

export default SignupFormPage;
