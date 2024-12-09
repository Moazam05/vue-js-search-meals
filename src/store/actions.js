export const addToCart = ({ commit }, product) => {
  commit("ADD_TO_CART", product);
};

export const removeFromCart = ({ commit }, productId) => {
  commit("REMOVE_FROM_CART", productId);
};

export const incrementQuantity = ({ commit }, productId) => {
  commit("INCREMENT_QUANTITY", productId);
};

export const decrementQuantity = ({ commit }, productId) => {
  commit("DECREMENT_QUANTITY", productId);
};

export const addUser = ({ commit }, user) => {
  commit("ADD_USER", user);
};

export const loginUser = ({ commit }, user) => {
  commit("LOGIN_USER", user);
};

export const logoutUser = ({ commit }) => {
  commit("LOGOUT_USER");
};
