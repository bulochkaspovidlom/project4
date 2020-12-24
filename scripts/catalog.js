class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.quantity = 1;
  }
  add(arr) {
    this.index = arr.length + 1;
    this.img_primary = `img/product${this.index}.png`;
    this.img_alt = `product${this.index}`;
    arr.push(this);
  }
}
const cart = [];

const goods = [];
new Product('Shirt', 150).add(goods);
new Product('Socks', 50).add(goods);
new Product('Jacket', 350).add(goods);
new Product('Shoes', 250).add(goods);
new Product('Shirt', 450).add(goods);
new Product('Socks', 15).add(goods);
new Product('Jacket', 35).add(goods);
new Product('Shoes', 3500).add(goods);

const renderGoodsItem = ({
  title,
  price,
  index,
  img_primary,
  img_alt
}) => {
  return `
  <div class="product">
    <div class="product__hover">
      <div class="product__hover__wrapper">
        <button class="product__hover__button__cart" data-index=${index} onclick="addToCart(this)">
          <div class="product-cart"><img src="img/product_cart.png" alt="product-cart"></div>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
    <img src=${img_primary} class="product-img-top" alt=${img_alt}>
    <div class="product-body">
      <h5 class="product-title">${title}</h5>
      <p class="product-price">
        <span>Price:</span>
        <span>$${price}</span>
      </p>
    </div>
  </div>
  `;
};

const renderGoodsList = list => {
  document.getElementById('goods-list').innerHTML = list.map(renderGoodsItem).join('');
}

const getGoodsItem = (list, attr) => list.filter(item => item.index == attr)[0];

const totalSumItems = cart => cart.reduce((acc, item) => acc + item.price, 0)

const addToCart = elem => {
  cart.push(getGoodsItem(goods, elem.getAttribute('data-index')));

  let checkout = document.getElementById('checkout');
  let tooltip = document.getElementById('cart-tooltip');
  let total = document.getElementById('cart-total');
  let sum = document.getElementById('cart-sum');

  if (tooltip && sum) {
    tooltip.innerHTML = cart.length;
    sum.innerHTML = `Total sum of your items is: ${totalSumItems(cart)}`;
  } else {

    sum = document.createElement('span');
    sum.id = 'cart-sum';
    sum.innerHTML = `Total sum of your items is: ${totalSumItems(cart)}`;
    total.append(sum);

    tooltip = document.createElement('span');
    tooltip.innerHTML = cart.length;
    tooltip.classList.add('badge', 'bg-secondary');
    tooltip.id = 'cart-tooltip';
    checkout.append(tooltip);
  }
}
renderGoodsList(goods);
