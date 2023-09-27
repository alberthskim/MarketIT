import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session"

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
    }

    return (
        <div className="home-page-container">
            <h1>Post get rendered here</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default HomePage;
