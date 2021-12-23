// Import from react
import { useState } from "react";

// Import axios
import axios from "axios";

// Import from react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Component to display login form
const AddCategory = () => {
  // Default form state
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");

  // Submit Form Handler function
  const onSubmitFormHandler = (e) => {
    // Prevent default behavior of form
    e.preventDefault();

    // Axios call
    axios.axios
      .post("/permissions", {
        name,
        rank,
      })
      .then((result) => {
        alert("Permission has been added!");
        setName("");
        setRank("");
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
            <h3 className="outerheader1">Add Permission</h3>
            <div className="innerdiv">
              <form onSubmit={onSubmitFormHandler}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
                <br />
                <Form.Label htmlFor="rank">Rank</Form.Label>
                <Form.Control
                  id="rank"
                  name="rank"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  required
                />
                <br />
                <Button variant="primary" type="submit">
                  Add Permission
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategory;
