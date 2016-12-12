import './style.scss'
import storeService from './store.service'
import cartService from './cart.service';
import templates from './templates';
import $ from 'jquery';

toggleLoader(true);
const renderProducts = products => {
  const cartLength = cartService.getCart().length;
  generateProducts(products);
  generateCartItems(cartService.getCart());
  clickHandlers();
  toggleLoader(false);
  showEmptyCartMsg(cartLength);
  showCheckoutBtn(cartLength);
  showCart();
}
storeService.getProducts().then(renderProducts);

function generateProducts( products ) {
  const el = document.querySelector('.products');
  const fragment = document.createDocumentFragment();
  for( let product of products ) {
    const template = document.createElement('template');
    template.innerHTML = templates.product(product);
    fragment.appendChild(template.content);
  }
  el.appendChild(fragment);
}

function generateCartItems( items ) {
  const el = document.querySelector('.cart-items');
  const fragment = document.createDocumentFragment();
  while( el.firstChild ) {
    el.removeChild(el.firstChild);
  }
  for( let item of items ) {
    const template = document.createElement('template');
    template.innerHTML = templates.cartItem(item);
    fragment.appendChild(template.content);
  }
  el.appendChild(fragment);

}

function clickHandlers() {
  const addToCart = function() {
    let cartLength;
    const product = $(this).closest('[data-product]').data('product');
    cartService.addToCart({
      id   : product.id,
      title: product.title,
      price: product.price
    });
    cartLength = cartService.getCart().length;
    generateCartItems(cartService.getCart());
    renderCartTotal();
    showEmptyCartMsg(cartLength);
    showCheckoutBtn(cartLength);
  }

  const substractFromCart = function() {
    let cartLength;
    const product = $(this).closest('[data-product]').data('product');
    cartService.substractFromCart(product.id);
    cartLength = cartService.getCart().length;
    generateCartItems(cartService.getCart());
    renderCartTotal();
    showCart();
    showEmptyCartMsg(cartLength);
    showCheckoutBtn(cartLength);
  }

  const removeFromCart = function() {
    let cartLength;
    const product = $(this).closest('[data-product]').data('product');
    cartService.removeFromCart(product.id);
    cartLength = cartService.getCart().length;
    generateCartItems(cartService.getCart());
    renderCartTotal();
    showEmptyCartMsg(cartLength);
    showCheckoutBtn(cartLength);
  }

  $('[data-add]').on('click', addToCart);
  $('[data-substract]').on('click', substractFromCart);
  $('.cart').on('click', '[data-remove]', removeFromCart);
  $('.cart').on('click', '[data-add]', addToCart);
}

function renderCartTotal() {
  const $ele = $('[data-cart-total]');
  $ele.html(`<p class="title is-4">Total: ${cartService.getCartTotal()}$</p>`)
}

function showCart() {
  $('.cart').show();
}

function toggleLoader( show = false ) {
  const $ele = $('.loader');
  showElement($ele, show);
}

function showEmptyCartMsg( length ) {
  const $ele = $('[data-cart-status]');
  showElement($ele, !length);
}

function showCheckoutBtn( length ) {
  const $ele = $('[data-checkout-btn]');
  showElement($ele, length);
}

function showElement( el, condition ) {
  condition && el.show();
  !condition && el.hide();
}
