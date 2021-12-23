// Import from react
import { useState, useEffect } from "react";

// Import from react
import axios from "axios";

// Import from react-router-dom
import { useParams } from "react-router-dom";

// Import from react-router
import Container from "react-bootstrap/Container";

// Component to show the footer
const SearchResult = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get slug from userParams
  const { id } = useParams();

  useEffect(() => {
    axios.post(`/search/${id}`).then((result) => {
      console.log(result.data);
      setResult(result.data);
      setLoading(true);
    });
  }, []);

  return (
    <Container className="mt-4 mb-4">
      <h2>
        Search result for..."<b>{id}</b>"
      </h2>
      {loading &&
        result.map((data) => {
          return <p>{data.name}</p>;
        })}
    </Container>
  );
};

export default SearchResult;
