
import { useDispatch, useSelector } from 'react-redux';
import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount
} from './cart-icon.styles';

import {
  selectIsCartOpen,
  selectCartCount
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';


const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toogleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;