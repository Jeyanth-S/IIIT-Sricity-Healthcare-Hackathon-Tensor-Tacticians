import "./navbar.css"
import logo from "../../assets/images/logo.png"
import search from "../../assets/images/search.png"

const Navbar = () => {
  return (
    <div className="navbar-container">

      <div className="logo">
        <img src={logo} alt="medic-logo" />
      </div>

      <div className="nav-items">
        <h3>Home</h3>
        <h3>About Us</h3>
        <h3>Hospitality</h3>
        <h3>Insights</h3>
        <h3>Medical Contact</h3>
      </div>

      <div className="side-nav-items">
        <h3>Login</h3>
        <img src={search} alt="search" />
      </div>


    </div>
  )
}

export default Navbar