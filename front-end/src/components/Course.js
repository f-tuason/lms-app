// Import from react
import { useState, useEffect } from "react";

// Import from react
import axios from "axios";

// Import from react-redux
import { useDispatch } from "react-redux";

// Import from react-router-dom
import { useParams } from "react-router-dom";

// Import from react-router
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

// Import from bootstrap
import Button from "react-bootstrap/Button";

// Component to show the footer
const Course = () => {
  const [outline, setOutline] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // Get slug from userParams
  const { id } = useParams();

  // Get user
  // const User = useSelector((state) => state.loggedInUser);

  // Declare dispatch
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch({ type: "ADD_CART_ITEM", payload: item });
  };

  // Get id, we first need to parse User
  // let uid = JSON.parse(User)._id;

  useEffect(() => {
    // Get specific id
    axios.get(`/courses/${id}`).then((result) => {
      setCourse(result.data);
      setLoading(true);
    });

    axios.get(`/outlines/outlinebycourse/${id}`).then((result) => {
      setOutline(result.data);
      setLoading2(true);
    });
  }, [id]);

  return (
    <Container className="mt-4 mb-4">
      {!loading ? (
        <div className="notifydiv">Loading...</div>
      ) : (
        <>
          <Row>
            <Col style={{ textAlign: "left" }}>{loading && course.name}</Col>
            <Col style={{ textAlign: "center" }}>Price: {course.price}</Col>
            <Col style={{ textAlign: "right" }}>
              <Button onClick={() => addToCart(course)} size="sm">
                Add to Cart
              </Button>
            </Col>
          </Row>
          <div>
            <h2 style={{ textAlign: "center", color: "blue" }}>
              {course.name}
            </h2>
            <h5 style={{ textAlign: "center" }}>{course.description}</h5>
            <div>
              <br />
              <Accordion defaultActiveKey="0">
                {loading2 &&
                  outline
                    .sort((a, b) => {
                      return a.idx - b.idx;
                    })
                    .map((result) => {
                      return (
                        <>
                          {result.isvisible === 1 && (
                            <Accordion.Item
                              key={result._id}
                              eventKey={result._id}
                            >
                              {result.main !== "" ? (
                                <Accordion.Header>
                                  {result.main}
                                </Accordion.Header>
                              ) : (
                                <Accordion.Header>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {result.secondary}
                                </Accordion.Header>
                              )}

                              <Accordion.Body>
                                <p>{result.description}</p>
                                <p>
                                  <a href={result.videourl}>video link</a>
                                </p>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}
                        </>
                      );
                    })}
              </Accordion>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Course;
