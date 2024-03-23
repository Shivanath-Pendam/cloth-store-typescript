import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";


const addCartItem = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
) => {
    // Find if cartitems contains productsToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id);

    //  if Found increment quantity

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    // return new array with modified cartItems / new Cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
): CartItem[] => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // check if quqntity is equal to 1 if it is remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}

const clearCartItem = (
    cartItems: CartItem[],
    cartItemsToRemove: CartItem
): CartItem[] => cartItems.filter(cartItem => cartItem.id !== cartItemsToRemove.id);


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher(
    (boolean: boolean): SetIsCartOpen =>
        createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems =>
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);


export const addItemsToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], cartToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], cartToRemove: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartToRemove);
    return setCartItems(newCartItems);
}