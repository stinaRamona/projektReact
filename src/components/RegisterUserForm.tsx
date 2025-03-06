import InfoDiv from "./InfoDiv"
import "../css/UserForm.css"; 

const RegisterUserForm = () => {
  return (
        <>
        <form id="userForm">
            <label htmlFor="userName">Användarnamn:</label> <br /><br />
            <input type="text" id="userName" name="userName" /> <br /><br />

            <label htmlFor="email">E-post:</label><br /><br />
            <input type="text" id="email" name="email" /><br /><br />

            <label htmlFor="password">Lösenord:</label><br /><br />
            <input type="text" id="password" name="password" /> <br /><br />

            <input id="registerBtn" type="submit" value="Skapa användare"/><br />
        </form>
        <br />
        <InfoDiv />
        </>
  )
}

export default RegisterUserForm
