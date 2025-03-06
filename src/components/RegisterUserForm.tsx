import InfoDiv from "./InfoDiv"
import "../css/UserForm.css"; 
import { useState } from "react";

const RegisterUserForm = () => {
    //interface för ny användare
    interface NewUser {
        user_name: string, 
        email: string, 
        password: string
    }

    //state för användare och för errormeddelanden 
    const [userData, setUserData] = useState<NewUser>({user_name:"", email:"", password:""}); 
    const [error, setError] = useState<string>(); 

    const registerUser = async (event : any) => {

        event.preventDefault(); 

        try {
            const response = await fetch("http://localhost:3000/adduser", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(userData)
            })

            if(!response.ok) {
                setError("Något gick fel vid registeringen. Försök igen senare"); 
            } 

            console.log("Användare skapad"); 

        } catch(error) { 
            console.log(error)
        }

    }

  return (
        <>
        <form onSubmit={registerUser}>
            <label htmlFor="userName">Användarnamn:</label> <br /><br />
            <input type="text" id="userName" name="userName" value={userData.user_name} 
            onChange={(event) => setUserData({...userData, user_name: event.target.value})}
            /> <br /><br />

            <label htmlFor="email">E-post:</label><br /><br />
            <input type="text" id="email" name="email" value={userData.email}
            onChange={(event) => setUserData({...userData, email: event.target.value})}
            /><br /><br />

            <label htmlFor="password">Lösenord:</label><br /><br />
            <input type="text" id="password" name="password" value={userData.password}
            onChange={(event) => setUserData({...userData, password: event.target.value})}
            /> <br /><br />

            <input id="registerBtn" type="submit" value="Skapa användare"/><br />
        </form>
        <span>{error && error}</span>
        <br />
        <InfoDiv />
        </>
  )
}

export default RegisterUserForm
