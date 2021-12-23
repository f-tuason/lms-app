// Import from react
import { useState, useEffect } from "react";

// Import from react-router-dom
import { useHistory } from "react-router-dom";

// Import axios
import axios from "axios";

// Import from react-redux
import { useSelector } from "react-redux";

// Import from react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Register - Registration of new users
const Register = (props) => {
  // Default state for form variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [permission, setPermission] = useState("6194ced76af0b6bd01cc393a");

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  //const User = useSelector((state) => state.loggedInUser);
  // const Rank = JSON.parse(User).permissionRank;

  const onUserRegisterHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Password must be equal to Confirm Password!");
      return;
    }

    // Check if the email exists
    axios
      .post("/email-exists", { email })
      .then((res) => {
        // If email exists, dont register
        // If not, continue with registration
        // res.data , true or false
        let user = {
          firstName,
          lastName,
          email,
          password,
          permission,
        };

        if (!res.data) {
          // Proceed
          axios.post("/register", user).then((res) => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPassword2("");
            setPermission("");
            history.push("/login");
          });
        } else {
          alert("Email already exists!");
        }
      })
      .catch((error) => {
        console.log("Error in axios call!");
      });
  };

  useEffect(() => {
    axios.get("/permissions").then((result) => {
      setPermissions(Array.from(result.data));
      setLoading(true);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col className="pt-4 pb-4 centeredcol">
          <div className="outerdiv2">
            <h3 className="outerheader2">Register</h3>
            <div className="innerdiv">
              <form onSubmit={onUserRegisterHandler}>
                <Form.Label htmlFor="permission">Permission</Form.Label>
                <Form.Select
                  name="permission"
                  id="permission"
                  required
                  value={permission}
                  onClick={(e) => setPermission(e.target.value)}
                >
                  {loading &&
                    permissions.map((permission) => {
                      return (
                        <option key={permission._id} value={permission._id}>
                          {permission.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <br />
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <Form.Control
                  id="firstname"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <br />
                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <Form.Control
                  id="lastname"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <br />
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
                <Form.Label htmlFor="password2">Confirm Password</Form.Label>
                <Form.Control
                  id="password2"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <br />
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
