import { NavLink } from "react-router-dom"; 
import Wave from "../assets/wave.svg"; 
import "../css/Header.css"; 

const Header = () => {
  return (
    <>
    <header>
        <h1 id="logo">Logga</h1>
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
