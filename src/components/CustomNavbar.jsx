import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
    return (
      <Navbar className="navbar">
        <Link to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
      </Navbar>
    );
}
 
export default CustomNavbar;