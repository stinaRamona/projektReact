import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const BaseLayout = () => {
  return (
    <>
    <Header /> 

    <main>
        <Outlet /> 
    </main>

    <Footer />
    </>
  )
}

export default BaseLayout
