import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CartDropDownCaontainer,
  EmptyCardMessage,
  CartItems
} from './cart-dropdown.styles';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }


  return (
    <CartDropDownCaontainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))) :
          (
            <EmptyCardMessage>Your Cart is Empty</EmptyCardMessage>
          )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT </Button>
    </CartDropDownCaontainer>
  )
}

export default CartDropDown;
