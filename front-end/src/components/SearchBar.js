// Import from react
import { useState, useEffect } from "react";

// Import from react-router-dom
import { Link, useHistory } from "react-router-dom";

// Import from react-redux
import { useSelector, useDispatch } from "react-redux";

// Import from axios
import axios from "axios";

// Import from Bootstrap 5
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});

  const User = useSelector((state) => state.loggedInUser);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // Declare history
  const history = useHistory();

  const showCart = () => {
    if (cart.length > 0) {
      return <Badge bg="primary">{cart.length}</Badge>;
    }
  };

  const onSearch = () => {
    history.push(`/search/:${searchTerm}`);
  };

  const getCategories = async () => {
    try {
      // Call axios
      let result = await axios.get("/categories");
      // Get the result
      setCategories(result.data);
      setLoadingCategories(true);
    } catch (err) {
      // Safe for now, just console log the error...
      console.log("Error loading categories...");
    }
  };

  useEffect(() => {
    getCategories();
  });

  useEffect(() => {
    setUserLoggedIn(JSON.parse(User));
  }, [User]);

  const getMenuItem = () => {
    if (User) {
      switch (userLoggedIn.permissionRank) {
        case 1:
          return (
            <>
              <Dropdown.ItemText>
                {JSON.parse(User).permissionName}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText>
                <Link to="/register" className="link4">
                  Add User
                </Link>
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText>
                <Link to="/addcategory" className="link4">
                  Add Category
                </Link>
              </Dropdown.ItemText>
              <Dropdown.ItemText>
                <Link to="/addpermission" className="link4">
                  Add Permission
                </Link>
              </Dropdown.ItemText>
              <Dropdown.Divider />
            </>
          );
        case 25:
          return (
            <>
              <Dropdown.ItemText>
                {JSON.parse(User).permissionName}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText>
                <Link to="/addcourse" className="link4">
                  Add Course
                </Link>
              </Dropdown.ItemText>
              <Dropdown.ItemText>
                <Link to="/addoutline" className="link4">
                  Add Outline
                </Link>
              </Dropdown.ItemText>
              <Dropdown.Divider />
            </>
          );
        case 50:
          return (
            <>
              <Dropdown.ItemText>
                {JSON.parse(User).permissionName}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText>
                <Link to="/adddiscount" className="link4">
                  Add Discount
                </Link>
              </Dropdown.ItemText>
              <Dropdown.Divider />
            </>
          );
        case 100:
          return (
            <>
              <Dropdown.ItemText>
                {JSON.parse(User).permissionName}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText>
                <Link to="/profile" className="link4">
                  Profile
                </Link>
              </Dropdown.ItemText>
              <Dropdown.Divider />
            </>
          );
        default:
          break;
      }
    } else {
      return "";
    }
  };

  return (
    <Container className="pt-3 pb-3 searchbar">
      <div style={{ marginBottom: "5px" }}>
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
            Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {loadingCategories &&
              categories.map((result) => {
                return (
                  <Dropdown.ItemText key={result._id}>
                    <Link to={`/category/${result._id}`} className="link3">
                      {result.name}
                    </Link>
                  </Dropdown.ItemText>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
        &nbsp;
        <input
          className="search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for"
        />
        &nbsp;
        <Button variant="primary" size="sm" onClick={onSearch}>
          Search
        </Button>
      </div>
      <div>
        <Link to="/cart">
          <img
            src="https://img.icons8.com/material-outlined/100/000000/shopping-cart--v1.png"
            alt="cart"
            width="30"
            style={{ marginBottom: "5px" }}
          />
          {showCart()}
        </Link>
        &nbsp; &nbsp;
        {userLoggedIn ? (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                Hi{" "}
                <Link to="/" className="link">
                  {userLoggedIn.firstName}
                </Link>
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                {getMenuItem()}
                <Dropdown.ItemText
                  onClick={() => {
                    dispatch({ type: "CLEAR_CART" });
                    dispatch({ type: "LOGOUT" });
                    history.push("/");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="outline-primary"
                size="sm"
                style={{ marginBottom: "5px" }}
              >
                Login
              </Button>
            </Link>
            &nbsp;
            <Link to="/register">
              <Button
                variant="success"
                size="sm"
                style={{ marginBottom: "5px" }}
              >
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </Container>
  );
};

export default SearchBar;
