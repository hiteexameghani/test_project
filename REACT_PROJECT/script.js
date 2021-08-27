var btnOpen = document.querySelector(".btn-open");
var btnClose = document.querySelector(".btn-close");

btnOpen.addEventListener("click", openMenu);

function openMenu() {
  //document.getElementById('main').style.marginLeft='255px';
  document.getElementById("side-menu").style.width = "255px";
}

btnClose.addEventListener("click", closeMenu);
function closeMenu() {
  //document.getElementById('main').style.marginLeft='0';
  document.getElementById("side-menu").style.width = "0";
}
//---------------------------------------------------------------------------------------

let cart1 = document.getElementById("cart-1");
let cart2 = document.getElementById("cart-2");
let cart3 = document.getElementById("cart-3");
let cart4 = document.getElementById("cart-4");
let cart5 = document.getElementById("cart-5");
let cart6 = document.getElementById("cart-6");
let cart7 = document.getElementById("cart-7");

let carts = [cart1, cart2, cart3, cart4, cart5, cart6, cart7];

let products = [
  {
    name: "iPhone 12 64GB Green",
    tag: "./images/img1.jpg",
    price: 849,
    inCart: 0,
  },
  {
    name: "Motorola Moto G Power 2021",
    tag: "./images/img2.jpg",
    price: 295,
    inCart: 0,
  },
  {
    name: "Samsung galaxy Z Fold2 5G",
    tag: "img3.jpg",
    price: 4950,
    inCart: 0,
  },
  {
    name: "Macbook Air",
    tag: "img4.jpg",
    price: 1619,
    inCart: 0,
  },
  {
    name: "Alianware x15",
    tag: "img5.jpg",
    price: 1800,
    inCart: 0,
  },
  {
    name: "Dell Inspiration 15 2-in-1 Laptop",
    tag: "img6.jpg",
    price: 900,
    inCart: 0,
  },
  {
    name: "Apple Watch Series 6",
    tag: "img7.jpg",
    price: 550,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  if (carts[i]) {
    carts[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    });
  }
}

function onLoadCartNumbers() {
  let productNum = localStorage.getItem("cartNumbers");

  if (productNum) {
    document.querySelector(".navbar span").textContent = productNum;
  }
}

function cartNumbers(product) {
  let productNum = localStorage.getItem("cartNumbers");

  productNum = parseInt(productNum);

  if (productNum) {
    localStorage.setItem("cartNumbers", productNum + 1);
    document.querySelector(".navbar span").textContent = productNum + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".navbar span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("My cartItems are:", cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  //console.log("The product price is:" , product.price);
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cartCost is:", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".cart-content-wrapper");
  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">
          <i class="fa fa-times-circle"></i>
          <img src="${item.tag}" alt="product" width="200px">
          <span>${item.name}/span>
        </div>
        `
    });
  }
}

onLoadCartNumbers();
displayCart();
