const initialState = {
  // start of initial state
  loggedInUser: localStorage.getItem("User")
    ? localStorage.getItem("User")
    : null,
  cart: [],
  // end of initial state
};

const reducer = (state = initialState, action) => {
  /*
      action {
        type: ALWAYS CAPITALIZED, NO SPACE,
        payload:,
      }
    */

  switch (action.type) {
    // reducer functions
    case "LOGOUT":
      localStorage.removeItem("User");
      return { ...state, loggedInUser: null };
    case "SET_LOGGEDIN_USER":
      localStorage.setItem("User", JSON.stringify(action.payload));
      return { ...state, loggedInUser: JSON.stringify(action.payload) };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem._id !== action.payload),
      };
    case "ADD_CART_ITEM":
      if (state.cart.find((cartItem) => cartItem._id === action.payload._id)) {
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              quantity: 1,
            },
          ],
        };
      }
      return state;
    default:
      return state;
  }
  // end of reducer function
};

export default reducer;
