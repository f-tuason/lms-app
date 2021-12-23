// Import from react
import { useState, useEffect } from "react";

// Import axios
import axios from "axios";

// Import from react-redux
import { useDispatch, useSelector } from "react-redux";

// Import from react-redux
import { Link } from "react-router-dom";

// Import from react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Component to display login form
const MyProfile = () => {
  // Get currently logged in user
  const User = useSelector((state) => state.loggedInUser);
  const uid = JSON.parse(User)._id;
  // const [rank, setRank] = useState(JSON.parse(User).permissionRank);
  const [outlines, setOutlines] = useState([]);

  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Declare dispatch
  const dispatch = useDispatch();

  // Submit Form Handler function
  const onSubmitFormHandler = (e) => {
    // Prevent default behavior of form
    e.preventDefault();

    // We will have the POST request here
    axios
      .put("/update/" + User._id, {
        firstName,
        lastName,
        email,
      })
      .then((result) => {
        if (result) {
          User.firstName = firstName;
          User.lastName = lastName;
          User.email = email;
          dispatch({ type: "SET_LOGGEDIN_USER", payload: User });
          alert("Updated Profile");
        }
      });
  };

  useEffect(() => {
    setFirstName(User.firstName);
    setLastName(User.lastName);
    setEmail(User.email);
  }, [User]);

  useEffect(() => {
    console.log(uid);
    axios.get(`/users/${uid}`).then((response) => {
      setCourses(response.data.course);
      setLoading(true);
    });
  }, []);

  useEffect(() => {
    if (course.length === 24) {
      axios.get(`/outlines/outlinebycourse/${course}`).then((result) => {
        let res = result.data;
        res.sort((a, b) => {
          return a.idx - b.idx;
        });
        setOutlines(res);
      });
    }
  }, [course]);

  return (
    <Container>
      <Row>
        <Col className="pt-4 pb-4 centeredcol">
          <div className="outerdiv1">
            <h3 className="outerheader1">Hi {JSON.parse(User).firstName}</h3>
            <div className="innerdiv">
              Courses&nbsp;
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="1">Open to Select</option>
                {loading &&
                  courses.map((result) => {
                    return (
                      <option key={result._id} value={result._id}>
                        {result.name}
                      </option>
                    );
                  })}
              </select>
              <br />
              <br />
              <Button>
                <Link to={`/paidcourse/${course}`} className="link5">
                  Goto Course
                </Link>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
