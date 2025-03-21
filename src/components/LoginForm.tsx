import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/UserForm.css"; 

const LoginForm = () => {
  
  interface LoginForm {
    email: string, 
    password: string
  }
  //states 
  const [loginData, setLoginData] = useState<LoginForm>({email: "", password: ""}); 
  const [error, setError] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {login, user} = useAuth(); 
  const navigate = useNavigate(); 

  //om användare finns - till användarsida
  useEffect(() => {
    if(user) {
      navigate("/userpage")
    }
  }, [user]); 

  const loginUser = async (event: any) => {
    event.preventDefault(); 
    if(!loginData.email || !loginData.password) {
      setError("Du måste ange e-post och lösenord för att logga in"); 
      return; 
    }

    try {
      setIsLoading(true);
      await login(loginData); 

      if(!user) {
        setError("Det gick inte att logga in. Ange korrekt e-post och lösenord."); 
        return;
      }; 

      navigate("/userpage"); 
      console.log("Inloggad"); 

    } catch (error) {
      setError("Det gick inte att logga in. Ange korrekt e-post och lösenord.");
      // konsoll koll för utveckling 
      console.log("login error: " + error); 
    } finally {
      setIsLoading(false);

    }

  }

  return (
    <>
    <form onSubmit={loginUser}>
        <label htmlFor="email">E-post:</label><br /><br />
        <input type="text" id="email" name="email" value={loginData.email}
        onChange={(event) => setLoginData({...loginData, email: event.target.value})}
        /><br /><br />

        <label htmlFor="password">Lösenord</label><br /> <br />
        <input type="password" id="password" name="password" value={loginData.password}
        onChange={(event) => setLoginData({...loginData, password: event.target.value})}
        /><br /><br />

        <input type="submit" value="Logga in"/><br /><br />
    </form>
    <br />
    {error && <p className="errorMsg">{error}</p>}
    {isLoading && <em>Loggar in...</em>}
    <br />
    <p><NavLink className="inTextLink" to="/register">Inte medlem? Skaffa konto här!</NavLink></p>
    </>
  )
}

export default LoginForm
