// Import from react
import { useState, useEffect } from "react";

// Import from react
import axios from "axios";

// Import from react-redux
import { useSelector } from "react-redux";

// Import from react-router-dom
import { useParams, Link } from "react-router-dom";

// Import from react-router
import Container from "react-bootstrap/Container";

// Import from bootstrap
import Button from "react-bootstrap/Button";

// Component to show the footer
const Category = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get slug from userParams
  const { id } = useParams();

  // Get user
  const User = useSelector((state) => state.loggedInUser);

  // Get id, we first need to parse User
  let uid = JSON.parse(User)._id;

  useEffect(() => {
    // Get specific id
    axios.get(`/courses/${id}`).then((result) => {
      setCourse(result.data);
      setLoading(true);
    });
  }, [id]);

  return (
    <Container className="mt-4 mb-4">
      {!loading ? (
        <div className="notifydiv">Loading...</div>
      ) : (
        <>
          <h2>{course.name}</h2>
          <div>
            {course.description}
            <br />
            {course.price}
            <br />
            {uid !== course.teacher ? (
              <Link to={`/courses/${course._id}`}>
                <Button size="sm">Pay</Button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default Category;
