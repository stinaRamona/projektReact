

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

    <a href="#">Inte medlem? Skaffa konto här!</a>
    </>
  )
}

export default LoginForm
