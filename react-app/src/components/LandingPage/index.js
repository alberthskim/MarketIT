import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";
import "./landingpage.css"

function LandingPage() {
    const history = useHistory();
    return (
        <div className="landing-container">
            <div className="left-side" style={{color: 'white'}}>
                <h1>Welcome To MarketIt</h1>
                <p>A place where you can advertise!</p>
            </div>
            <div className="right-side">
                <h1 style={{color: 'white'}}>Get Started</h1>
                <div className="buttons" onClick={() => history.push('/login')}>
                    <button className="log-in-button">
                        Log In
                    </button>
                    <button className='sign-up-button'>
                        Sign Up
                    </button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;
