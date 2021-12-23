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

// Register - Registration of new users
const AddDiscount = () => {
  // Default state for form variables
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);

  const onUserRegisterHandler = (e) => {
    e.preventDefault();

    if (discount <= 0) {
      alert("Discount must be greater than 0");
      return;
    }

    // Axios call
    axios
      .post("/discounts", {
        name,
        code,
        description,
        discount,
      })
      .then((result) => {
        alert("Discount has been added!");
        setName("");
        setCode("");
        setDescription("");
        setDiscount(0);
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
            <h3 className="outerheader1">Add Discount</h3>
            <div className="innerdiv">
              <form onSubmit={onUserRegisterHandler}>
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
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <br />
                <Form.Label htmlFor="code">Code</Form.Label>
                <Form.Control
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <br />
                <Form.Label htmlFor="discount">Discount</Form.Label>
                <Form.Control
                  id="discount"
                  name="discount"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
                <br />
                <Button variant="primary" type="submit">
                  Add Discount
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDiscount;
