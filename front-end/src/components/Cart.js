// Import from react
import { useState } from "react";

// Import axios
import axios from "axios";

// Import from react-redux
import { useSelector } from "react-redux";

// Import components from react-redux
import { useDispatch } from "react-redux";

// Import from react-bootstrap
import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

// Component to display login form
const Cart = () => {
  // State for Modal Dialog (Delete Item)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  // Get cart
  const User = useSelector((state) => state.loggedInUser);
  const uid = JSON.parse(User)._id;
  const cart = useSelector((state) => state.cart);

  // Declare dispatch
  const dispatch = useDispatch();

  const showModal = (id, name) => {
    setId(id);
    setName(name);
    handleShow();
  };

  const confirmRemoveItem = () => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
    handleClose();
  };

  // Limit Pay button by User and has to be student type
  const getUserandRank = () => {
    return User && JSON.parse(User).permissionRank === 100;
  };

  // Pay for all courses, axios multiple post setup
  const payForCourses = () => {
    let ax = [];
    cart.map((item) => {
      return ax.push(axios.post(`/payments/payforcourse/${uid}/${item._id}`));
    });
    axios.all(ax).then((result) => {
      if (result) {
        alert("Paid for course!");
        dispatch({ type: "CLEAR_CART" });
      }
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Cart Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete {name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={confirmRemoveItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "100px",
              marginBottom: "100px",
            }}
          >
            No Items
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Table striped bordered hover responsive>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>Quantity</th>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>1</td>
                      <td>{item.name}</td>
                      <td>{item.category.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => showModal(item._id, item.name)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {getUserandRank() && (
                  <tr>
                    <td colspan="5">
                      <Button
                        style={{ alignSelf: "stretch", width: "100%" }}
                        onClick={payForCourses}
                      >
                        Pay
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
