// React v17 does not need import React

// Import from react-dom
import ReactDOM from "react-dom";

// Import from index.css
import "./index.css";

// Import App from list of components
import App from "./App";

// Import from react-redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
