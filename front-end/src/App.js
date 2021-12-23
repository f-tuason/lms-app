// Import from react-router-dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import from own components
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import NotFinished from "./components/NotFinished";
import SearchBar from "./components/SearchBar";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AddCategory from "./components/AddCategory";
import AddCourse from "./components/AddCourse";
import AddPermission from "./components/AddPermission";
import AddOutline from "./components/AddOutline";
import AddDiscount from "./components/AddDiscount";
import Profile from "./components/Profile";
import Course from "./components/Course";
import SearchResult from "./components/SearchResult";
import Category from "./components/Category";
import Cart from "./components/Cart";
import PaidCourse from "./components/PaidCourse";

// LMS application (main component)
const App = () => {
  return (
    <Router>
      <MenuBar />
      <SearchBar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/addcategory">
          <AddCategory />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/search/:id">
          <SearchResult />
        </Route>
        <Route path="/category/:id">
          <Category />
        </Route>
        <Route path="/course/:id">
          <Course />
        </Route>
        <Route path="/paidcourse/:id">
          <PaidCourse />
        </Route>
        <Route path="/addcourse">
          <AddCourse />
        </Route>
        <Route path="/addpermission">
          <AddPermission />
        </Route>
        <Route path="/addoutline">
          <AddOutline />
        </Route>
        <Route path="/adddiscount">
          <AddDiscount />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/business">
          <NotFinished />
        </Route>
        <Route path="/teach">
          <NotFinished />
        </Route>
        <Route path="/app">
          <NotFinished />
        </Route>
        <Route path="/aboutus">
          <NotFinished />
        </Route>
        <Route path="/contactus">
          <NotFinished />
        </Route>
        <Route path="/careers">
          <NotFinished />
        </Route>
        <Route path="/blog">
          <NotFinished />
        </Route>
        <Route path="/help">
          <NotFinished />
        </Route>
        <Route path="/affiliate">
          <NotFinished />
        </Route>
        <Route path="/investors">
          <NotFinished />
        </Route>
        <Route path="/terms">
          <NotFinished />
        </Route>
        <Route path="/privacy">
          <NotFinished />
        </Route>
        <Route path="/sitemap">
          <NotFinished />
        </Route>
        <Route path="/accessibility">
          <NotFinished />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
