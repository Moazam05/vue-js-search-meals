export const cartItems = (state) => state.cart;

export const cartItemCount = (state) => {
  return state.cart.reduce((total, product) => total + product.quantity, 0);
};
