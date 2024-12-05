export const cartItems = (state) => state.cart;

export const cartItemCount = (state) => {
  return state.cart.reduce((total, product) => total + product.quantity, 0);
};

export const users = (state) => state.users;

export const loginUser = (state) => state.loginUser;
