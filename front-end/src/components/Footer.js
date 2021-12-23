// Import from react-router-dom
import { Link } from "react-router-dom";

// Import from react-router
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Component to show the footer
const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="pt-5 pb-5">
          <Col>
            <p>
              <Link to="/business" className="link">
                LMS Business
              </Link>
              <br />
              <Link to="/teach" className="link">
                Teach on LMS
              </Link>
              <br />
              <Link to="/app" className="link">
                Get the app
              </Link>
              <br />
              <Link to="/aboutus" className="link">
                About us
              </Link>
              <br />
              <Link to="/contactus" className="link">
                Contact us
              </Link>
            </p>
          </Col>
          <Col>
            <p>
              <Link to="/careers" className="link">
                Careers
              </Link>
              <br />
              <Link to="/blog" className="link">
                Blog
              </Link>
              <br />
              <Link to="/help" className="link">
                Help and Support
              </Link>
              <br />
              <Link to="/affiliate" className="link">
                Affiliate
              </Link>
              <br />
              <Link to="/investors" className="link">
                Investors
              </Link>
            </p>
          </Col>
          <Col>
            <p>
              <Link to="/terms" className="link">
                Terms
              </Link>
              <br />
              <Link to="/privacy" className="link">
                Privacy policy
              </Link>
              <br />
              <Link to="/sitemap" className="link">
                Sitemap
              </Link>
              <br />
              <Link to="/accessibility" className="link">
                Accessibility statement
              </Link>
            </p>
          </Col>
        </Row>
        <Row className="pb-5">
          <Col>
            <Link to="/">
              <img src="./lms.png" alt="logo" width="50" />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
