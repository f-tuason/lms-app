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
const AddOutline = () => {
  // Default form state
  const [idx, setIdx] = useState("");
  const [main, setMain] = useState("");
  const [secondary, setSecondary] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isVisible, setIsVisible] = useState(0);
  const [course, setCourse] = useState("");

  const [loading, setLoading] = useState("");
  const [courses, setCourses] = useState([]);

  const User = useSelector((state) => state.loggedInUser);
  const uid = JSON.parse(User)._id;

  // Submit Form Handler function
  const onSubmitFormHandler = (e) => {
    // Prevent default behavior of form
    e.preventDefault();

    // Axios call
    let postBody = {
      course,
      idx,
      description,
      videourl: videoURL,
      isvisible: isVisible,
    };

    if (main !== "") {
      postBody.main = main;
    } else {
      postBody.secondary = secondary;
    }

    console.log(postBody);
    axios
      .post("/outlines", postBody)
      .then((result) => {
        alert("Outline is added!");
        setIdx("");
        setMain("");
        setSecondary("");
        setDescription("");
        setVideoURL("");
        setIsVisible(0);
      })
      .catch((error) => {
        console.log("Error in axios call!");
      });
  };

  useEffect(() => {
    axios.get(`/courses/findbyteacher/${uid}`).then((result) => {
      setCourses(result.data);
      setLoading(true);
    });
  }, [uid]);

  return (
    <Container>
      <Row>
        <Col className="pt-4 pb-4 centeredcol">
          <div className="outerdiv1">
            <div>
              <h3 className="outerheader1">Add Outline</h3>
              <div className="innerdiv">
                <h3>Courses</h3>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="1">Choose a course here</option>
                  {loading &&
                    courses.map((result) => {
                      return (
                        <option key={result._id} value={result._id}>
                          {result.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div>
              <h3>Add Outline</h3>
              <div className="innerdiv">
                <form onSubmit={onSubmitFormHandler}>
                  <Form.Label htmlFor="idx">IDX</Form.Label>
                  <Form.Control
                    id="idx"
                    name="idx"
                    type="number"
                    value={idx}
                    onChange={(e) => setIdx(e.target.value)}
                    required
                    autoFocus
                  />
                  <br />
                  <Form.Label htmlFor="main">Main Header</Form.Label>
                  <Form.Control
                    id="main"
                    name="main"
                    value={main}
                    onChange={(e) => setMain(e.target.value)}
                  />
                  <br />
                  <Form.Label htmlFor="secondary">Secondary Header</Form.Label>
                  <Form.Control
                    id="secondary"
                    name="secondary"
                    value={secondary}
                    onChange={(e) => setSecondary(e.target.value)}
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
                  <Form.Label htmlFor="videourl">Video URL</Form.Label>
                  <Form.Control
                    id="videourl"
                    name="videourl"
                    type="url"
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                  />
                  <br />
                  <Form.Label htmlFor="isvisible">Visible?</Form.Label>
                  <Form.Control
                    id="isvisible"
                    name="isvisible"
                    type="number"
                    value={isVisible}
                    onChange={(e) => setIsVisible(e.target.value)}
                  />
                  <br />
                  <Button variant="primary" type="submit">
                    Add Outline
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOutline;
