export const ADD_TO_CART = (state, product) => {
  const existingProduct = state.cart.find(
    (item) => item.idMeal === product.idMeal
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const REMOVE_FROM_CART = (state, productId) => {
  state.cart = state.cart.filter((item) => item.idMeal !== productId);

  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const INCREMENT_QUANTITY = (state, productId) => {
  const product = state.cart.find((item) => item.idMeal === productId);

  if (product) {
    product.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const DECREMENT_QUANTITY = (state, productId) => {
  const product = state.cart.find((item) => item.idMeal === productId);

  if (product && product.quantity > 1) {
    product.quantity -= 1;
  } else {
    state.cart = state.cart.filter((item) => item.idMeal !== productId);
  }

  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const ADD_USER = (state, user) => {
  const existingUser = state.users.find((item) => item.email === user.email);

  if (state.users.length === 0) {
    state.users.push(user);

    localStorage.setItem("users", JSON.stringify(state.users));
  } else if (!existingUser) {
    state.users.push(user);

    localStorage.setItem("users", JSON.stringify(state.users));
  } else {
    console.warn("User already exists.");
  }
};

export const LOGIN_USER = (state, user) => {
  state.loginUser = user;

  localStorage.setItem("loginUser", JSON.stringify(state.loginUser));
};

export const LOGOUT_USER = (state) => {
  state.loginUser = null;

  localStorage.setItem("loginUser", JSON.stringify(state.loginUser));
};
