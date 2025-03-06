import { NavLink } from "react-router-dom"; 
import Wave from "../assets/wave.svg"; 
import "../css/Header.css";
import LogoWhite from "../assets/pageturn_logo_white.svg"

const Header = () => {
  return (
    <>
    <header>
        <div id="logoWrapper">
            <img src={LogoWhite} alt="PageTurn logga" />
        </div>
        <ul>
            <li><NavLink className="nav-link" to="/">Start</NavLink></li>
            <li><NavLink className="nav-link" to="/login">Logga in</NavLink></li>
        </ul>
    </header>
    <img src={Wave} alt="en våg som bakgrund för navigationen" />
    </>
  )
}

export default Header
