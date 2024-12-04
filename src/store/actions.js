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
