import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((el) => el.book === item.book);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.book === existItem.book ? item : el
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((el) => el.book !== action.payload),
      };
    default:
      return state;
  }
};
