const cart = [];

function addToCart( item ) {
  const findItem = cart.find(currentItem => item.id === currentItem.id);
  if( findItem ) {
    findItem.quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
}

function removeFromCart( item ) {
  const itemIndex = cart.findIndex(currentItem => item.id === currentItem.id);
  if( itemIndex ) {
    cart.splice(itemIndex, 1);
  }
}

function substractFromCart( itemId ) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  const item = cart[itemIndex];
  if( !item || !item.quantity ) return;
  if( item.quantity > 1 ) {
    item.quantity -= 1;
  } else {
    cart.splice(itemIndex, 1);
  }
}

function getCart() {
  return cart;
}

function getCartTotal() {
  return getCart().reduce(( acc, item ) => {
    return acc + (item.price * item.quantity)
  }, 0);
}

export default  {
  getCart,
  addToCart,
  substractFromCart,
  removeFromCart,
  getCartTotal,
}
