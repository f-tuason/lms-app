// Import from react
import { useState, useEffect } from "react";

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

// Component to display login form
const AddCourse = () => {
  // Default form state
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  // Get user
  const User = useSelector((state) => state.loggedInUser);

  // Submit Form Handler function
  const onSubmitFormHandler = (e) => {
    // Prevent default behavior of form
    e.preventDefault();

    if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    // Axios call
    axios
      .post("/courses", {
        name,
        category,
        description,
        image,
        price,
        teacher: JSON.parse(User)._id,
      })
      .then((result) => {
        alert("Course have been added");
        setName("");
        setDescription("");
        setImage("");
        setPrice(0);
      })
      .catch((error) => {
        console.log("Error in axios call!");
      });
  };

  useEffect(() => {
    axios.get("/categories").then((result) => {
      setCategories(Array.from(result.data));
      setLoading(true);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col className="pt-4 pb-4 centeredcol">
          <div className="outerdiv1">
            <h3 className="outerheader1">Add Course</h3>
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
                <Form.Label htmlFor="category">Category</Form.Label>
                <br />
                <Form.Select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="1">Select a category</option>
                  {loading &&
                    categories.map((cat) => {
                      return (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                </Form.Select>
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
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                  id="image"
                  name="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <br />
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                  id="price"
                  name="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <br />
                <Button variant="primary" type="submit">
                  Add Course
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
