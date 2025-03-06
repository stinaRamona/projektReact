import "../css/Footer.css"; 

const Footer = () => {
  return (
    <footer>
        <div className="footer_info">
        <p><i className="fa-regular fa-registered"></i> PageTurn</p> 
        <p>Bokbindaregatan 5</p>
        <p>401 20 Göteborg</p>
    </div>  
    
    <div className="footer_info">
        <p><i className="fa-brands fa-instagram"></i> @pageturn</p>
        <p><i className="fa-brands fa-facebook"></i> PageTurn</p>
    </div>

    <div className="footer_info">
        <p><i className="fa-regular fa-envelope"></i> kontakt@pageturn.se</p>
        <p><i className="fa-solid fa-phone"></i> 010-00-00-10</p>
    </div>
    </footer>
  )
}

export default Footer
