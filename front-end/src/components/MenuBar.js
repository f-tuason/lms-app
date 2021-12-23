// Import from react-router-dom
import { Link } from "react-router-dom";

// Import from React-bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const MenuBar = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="link2">
            <img src="./lms.png" alt="logo" width="50" />
            &nbsp;Tinoy's LMS
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
