import { NavLink } from "react-router-dom"
import "../css/UserForm.css"; 

const LoginForm = () => {
  return (
    <>
    <form>
        <label htmlFor="email">E-post:</label><br /><br />
        <input type="text" id="email" name="email" /><br /><br />

        <label htmlFor="password">Lösenord</label><br /> <br />
        <input type="text" id="password" name="password" /><br /><br />

        <input type="submit" value="Logga in"/><br /><br />
    </form>
    <br />
    <p><NavLink className="inTextLink" to="/register">Inte medlem? Skaffa konto här!</NavLink></p>
    </>
  )
}

export default LoginForm
