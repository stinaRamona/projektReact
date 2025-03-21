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
    const [error, setError] = useState<string []>([]); 

    const registerUser = async (event : any) => {

        event.preventDefault(); 

        const errors = []; 

        if(!userData.user_name) {
            errors.push("Du måste ange ett användarnamn"); 
        }

        if(!userData.email) {
            errors.push("Du måste ange en korrekt mailadress"); 
        }

        if(!userData.password) {
            errors.push("Du måste ange ett lösenord"); 
        }

        if(errors.length > 0 ) {
            setError(errors); 
            return; 
        }

        try { 

            const response = await fetch("http://localhost:3000/adduser", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(userData)
            })

            if(!response.ok) {
                setError(["Något gick fel vid registeringen. Försök igen senare"]); 
            } 

            console.log("Användare skapad");

            //skriver ut att användaren är skapad
            setError(["Användare skapad! Du kan nu logga in"]); 

            //rensar formulär efter input
            setUserData({user_name:"", email: "", password:""}) 

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
            <input type="password" id="password" name="password" value={userData.password}
            onChange={(event) => setUserData({...userData, password: event.target.value})}
            /> <br /><br />

            <input id="registerBtn" type="submit" value="Skapa användare"/><br />
        </form>
        {error.length > 0 && error.map((err, index) => <p className="errorMsg" key={index}>{err}</p>)}
        <br />
        <InfoDiv />
        </>
  )
}

export default RegisterUserForm
