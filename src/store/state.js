export default {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  users: JSON.parse(localStorage.getItem("users")) || [],
  loginUser: JSON.parse(localStorage.getItem("loginUser")) || null,
};
