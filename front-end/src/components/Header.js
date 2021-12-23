import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          color: "white",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div style={{ paddingRight: "10px" }}>Login</div>
        <div style={{ paddingRight: "10px" }}>Register</div>
      </Container>
    </Navbar>
  );
};

export default Header;
