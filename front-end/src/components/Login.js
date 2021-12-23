// Import from react
import { useState } from "react";

// Import axios
import axios from "axios";

// Import from react-router-dom
import { useHistory } from "react-router-dom";

// Import from react-redux
import { useDispatch } from "react-redux";

// Import from react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Component to display login form
const Login = () => {
  // Default form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare history
  const history = useHistory();

  // Declare dispatch
  const dispatch = useDispatch();

  // Submit Form Handler function
  const onSubmitFormHandler = (e) => {
    // Prevent default behavior of form
    e.preventDefault();

    // Axios call
    axios
      .post("/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.data.error) {
          alert("Login Error!");
          return;
        }
        let user = {
          _id: result.data.user._id,
          firstName: result.data.user.firstName,
          lastName: result.data.user.lastName,
          email: result.data.user.email,
          permissionName: result.data.user.permission.name,
          permissionRank: result.data.user.permission.rank,
        };
        dispatch({ type: "SET_LOGGEDIN_USER", payload: user });
        history.push("/");
      })
      .catch((error) => {
        console.log("Error in axios call!");
      });
  };

  return (
    <Container>
      <Row>
        <Col className="pt-4 pb-4 centeredcol">
          <div className="outerdiv1">
            <h3 className="outerheader1">Login</h3>
            <div className="innerdiv">
              <form onSubmit={onSubmitFormHandler}>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <br />
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <br />
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
