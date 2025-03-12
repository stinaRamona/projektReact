import { NavLink } from "react-router-dom"; 
import Wave from "../assets/wave.svg"; 
import "../css/Header.css";
import LogoWhite from "../assets/pageturn_logo_white.svg"
import { useAuth } from "../context/AuthContext";

const Header = () => {

  const {user, logout} = useAuth(); 

  return (
    <>
    <header>
        <div id="logoWrapper">
            <NavLink to="/"><img src={LogoWhite} alt="PageTurn logga" /></NavLink>
        </div>
        <ul>
            <li><NavLink className="nav-link" to="/">Start</NavLink></li>
            <li>{user && <NavLink className="nav-link" to="/userpage">Min sida</NavLink>}</li>
            <li>
              {!user ?  <NavLink className="nav-link" to="/login">Logga in</NavLink> : <button id="logOutBtn" onClick={logout}>Logga ut</button>}
            </li>
        </ul>
    </header>
    <img src={Wave} alt="en våg som bakgrund för navigationen" />
    </>
  )
}

export default Header
