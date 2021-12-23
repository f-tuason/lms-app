// Import from react
import { useState, useEffect } from "react";

// Import from react
import axios from "axios";

// Import components from react-redux
import { useDispatch } from "react-redux";

// Import components from react-router-dom
import { Link } from "react-router-dom";

// Import from react-bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// Component to show the footer
const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add cart
  // const cart = useSelector((state) => state.cart);

  // Declare dispatch
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch({ type: "ADD_CART_ITEM", payload: item });
  };

  useEffect(() => {
    axios.get("/courses").then((result) => {
      setCourses(result.data);
      setLoading(true);
    });
  }, []);

  return (
    <Container className="mt-4 mb-4">
      {!loading ? (
        <div className="notifydiv">Loading...</div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              direction: "column",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            {courses.map((course) => {
              return (
                <div
                  key={course._id}
                  style={{
                    border: "1px solid",
                    padding: "20px",
                    width: "350px",
                    marginBottom: "10px",
                    marginRight: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src="https://www.reviler.org/wp-content/uploads/2010/06/club-8.jpg"
                    alt="test"
                    width="300"
                    style={{ marginBottom: "10px" }}
                  />
                  <br />
                  <h5>{course.name}</h5>
                  <p>
                    {course.description}
                    <br />
                    Enrolled: {course.student.length}
                  </p>
                  <Link to={`/course/${course._id}`}>
                    <Button size="sm">View Course</Button>
                  </Link>
                  &nbsp;
                  <Button size="sm" onClick={() => addToCart(course)}>
                    Add to Cart
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
