import { NavLink } from "react-router-dom"

const LoginForm = () => {
  return (
    <>
    <form>
        <label htmlFor="email">E-post:</label><br />
        <input type="text" id="email" name="email" /><br />

        <label htmlFor="password">Lösenord</label><br />
        <input type="text" id="password" name="password" /><br />

        <input type="submit" value="Logga in"/><br />
    </form>
    
    <NavLink to="/register">Inte medlem? Skaffa konto här!</NavLink>
    </>
  )
}

export default LoginForm
