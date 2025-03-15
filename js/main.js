// get file json and load page SPA
let data = [];
let a = 1;
let cartNum = 0;
let numPage = 16;

$(document).ready(function () {
  $.getJSON("items.json", function (items) {
    data = items;
  });

  function loadHomePage() {
    $("#main").load("home.html", function () {
      $(".collapse").collapse("hide"); // Ẩn menu nếu có
      document.querySelectorAll(".popular-type").forEach((element) => {
        element.addEventListener("click", function (e) {
          e.preventDefault();
          const type = this.getAttribute("data-type");
          goProduct(type);
        });
      });
    });
  }
  loadHomePage();

  $("#product").click(function (e) {
    e.preventDefault();

    goProduct(e);
  });

  $("#home").click(function (e) {
    e.preventDefault();
    loadHomePage();
  });

  $("#home-logo").click(function (e) {
    e.preventDefault();
    loadHomePage();
  });

  $("#gallery").click(function (e) {
    e.preventDefault();
    $("#main").load("gallery.html", scrollToTop());
    $(".collapse").collapse("hide");
  });

  $("#blog").click(function (e) {
    e.preventDefault();
    $("#main").load("blog.html", () => {
      window.scrollTo(0, 0);
    });
    $(".collapse").collapse("hide");
  });

  $("#about").click(function (e) {
    e.preventDefault();
    $("#main").load("aboutus.html", scrollToTop());
    $(".collapse").collapse("hide");
  });

  $("#login").click(function (e) {
    e.preventDefault();
    $("#main").load("signin.html");
  });

  $("#register").click(function (e) {
    e.preventDefault();
    $("#main").load("signup.html");
  });

  $("#faq").click(function (e) {
    e.preventDefault();
    $("#main").load("faq.html");
    $(".collapse").collapse("hide");
  });

  $("#contact").click(function (e) {
    e.preventDefault();
    $("#main").load("contactus.html");
    $(".collapse").collapse("hide");
  });

  $(document).on("click", ".popup", function () {
    let id = $(this).data("id");

    let product = data.filter((ele) => ele.id == id);

    popupImage(product[0]);
    $("#popupImage").modal("show");
  });
});

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
const goProduct = (type) => {
  $("#main").load("product.html", () => {
    window.scrollTo(0, 0);
    show(type);
    const cart = JSON.parse(localStorage.getItem("cart"));
    const btn_count = document.getElementsByClassName("btn-count");
    if (cart.length > 0) {
      btn_count[0].classList.add("show");
      btn_count[0].innerText = cart.length;
    }

    console.log(cart.length);
  });

  $(".collapse").collapse("hide");
  $.getJSON("items.json", function () {
    showImage(data);
    popupImage(data);
  });
  window.scrollY = 0;
};

function loadBlog() {
  $("#main").load("blog.html");
}
function loadLogin() {
  $("#main").load("signin.html");
}
function loadFaq() {
  $("#main").load("faq.html");
}

// Product items

function showImage(data) {
  let length = data.length;
  let s = [];

  $.each(data, function (i, item) {
    s.push(`
              <div class="list-item ${item.brand}" data-brand="${item.brand}" >
                  <div class="list-item__img">
                  <div class="item-top">
                  <img height="260px" class="img-product" src="${
                    item.img
                  }" data-id="${item.id}">
                  <button id="add-cart" onclick="addCart(${
                    item.id - 1
                  })"><i class="fa-solid fa-cart-plus"></i>Add to cart</button>
                  </div>
                    </div>
                    <div >
                      <div class="item-header">
                        <p class="item-name">${item.name}</p>
                        <p class="item-brand">${item.brand}</p>
                      </div>
                      <div class="list-item__info">
                      <p class="item-info">${item.color}</p>
                      <p class="item-info">${item.price}</p>
                      </div>
                  </div>
                </div>
  `);
    $("#data-product").html(s.join(""));
  });
}

// Popup item in product

function popupImage(item) {
  let s = `
              <div class="popup-item">
                    <img width="480px" height="480px" src="${item.img}">
                      <div class="popup-item__info">
                        <div>
                          <p>Name:<span>${item.name}</span></p>
                          <p>Color:<span>${item.color}</span></p>
                          <p>Origin:<span>${item.Origin}</span></p>
                          <p>Wing:<span>${item.Wing}</span></p>
                          <p>Length:<span>${item.Length}</span></p>
                          <p>Warranty:<span>${item.Warranty}</span></p>
                          <button class="add-cart-popup" onclick="addCart(${item.id})"><i class="fa-solid fa-cart-plus"></i>Add to cart</button>
                    </div>
                        </div>
                      </div>
                    
                </div>
  `;
  $("#modal-item").html(s);
}

// filter item in product
function show(typeClick) {
  let brands = $(".brand:checked")
    .map(function () {
      return $(this).val();
    })
    .toArray()
    .toString();
  let categories = $(".category:checked")
    .map(function () {
      return $(this).val();
    })
    .toArray()
    .toString();
  let colors = $(".color:checked")
    .map(function () {
      return $(this).val();
    })
    .toArray()
    .toString();

  $(".type").each(function () {
    if (typeClick === $(this).val()) {
      $(this).prop("checked", true);
    }
  });

  let type = $(".type:checked")
    .map(function () {
      return $(this).val();
    })
    .toArray()
    .toString();

  let newData = null;

  if (brands.length == 0) {
    newData = data;
  } else {
    newData = data.filter((item) => brands.search(item.brand) >= 0);
  }

  if (categories.length > 0) {
    newData = data.filter((item) => categories.search(item.category) >= 0);
  }

  if (colors.length > 0) {
    newData = data.filter((item) => colors.search(item.color) >= 0);
  }

  if (type.length > 0) {
    newData = data.filter((item) => type.search(item.type) >= 0);
  }

  if ((type.length > 0) & (colors.length > 0)) {
    newData = data.filter((item) => type.search(item.type) >= 0);
    newData = newData.filter((item) => colors.search(item.color) >= 0);
  }

  if ((type.length > 0) & (colors.length > 0) & (brands.length > 0)) {
    newData = data.filter((item) => type.search(item.type) >= 0);
    newData = newData.filter((item) => colors.search(item.color) >= 0);
    newData = newData.filter((item) => brands.search(item.brand) >= 0);
  }

  if ((type.length > 0) & (brands.length > 0)) {
    newData = data.filter((item) => type.search(item.type) >= 0);
    newData = newData.filter((item) => brands.search(item.brand) >= 0);
  }

  showImage(newData);
}

// show and hidden filter
function showFilter() {
  document.querySelector(".filter-zoom").classList.toggle("show");
  document.querySelector(".filter-nav").classList.toggle("active-filter");
}

function openCart() {
  document.querySelector("#cart").classList.add("show-cart");
  fillItemToCart();
  var removeItemCartBtn = document.getElementsByClassName("cart-remove");

  for (var index = 0; index <= removeItemCartBtn.length; index++) {
    console.log(removeItemCartBtn[0]);
    var button = removeItemCartBtn[index];
    button?.addEventListener("click", removeCartItem);
  }
  updateCartTotal();
}

function closeCart() {
  document.querySelector("#cart").classList.remove("show-cart");
}

function fillItemToCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  var s = [];
  $.each(cart, function (i, item) {
    s.push(`
        <div class="cart-body">
          <span>${item.name}</span>
          <span class="cart-price">${item.price}</span>
          <div>
          <input class="cart-qty" style="width: 50px" type="number" value="${item.qty}">
          <button style="width:50px; padding:0; margin-bottom:5px" class="btn btn-danger cart-remove">X</button>
          </div>
          </div>
       `);
    $("#menuCart").html(s.join(" "));
  });
  return cart;
}

function addCart(id) {
  console.log(id);
  var item = data[id];
  var newEle = {
    id: id,
    name: item.name,
    price: item.price,
    qty: 1,
  };

  if (localStorage.getItem("cart") == null) {
    cart = [];
  } else {
    cart = fillItemToCart();
  }
  var find = false;

  cart.forEach((element) => {
    if (element.id == id) {
      element.qty++;

      find = true;
    }
  });

  if (!find) {
    cart.push(newEle);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("add cart succeeded !");
  updateCartTotal();
}

function removeCartItem(event, id) {
  var btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();

  let cart = JSON.parse(localStorage.getItem("cart"));

  let updateProducts = cart.filter((item) => item.id == id);
  console.log(updateProducts);
  localStorage.setItem("cart", JSON.stringify(updateProducts));
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementById("menuCart");
  var cartItems = cartItemContainer.getElementsByClassName("cart-body");
  cartItems.length += 1;
  var total = 0;
  for (let index = 0; index < cartItems.length; index++) {
    const cartItem = cartItems[index];
    var priceElement = cartItem.getElementsByClassName("cart-price")[0];
    var qtyElement = cartItem.getElementsByClassName("cart-qty")[0];

    var price = priceElement.innerText.replace("$", "");
    var qty = qtyElement.value;

    total = total + price * qty;
  }

  document.getElementsByClassName("cart-total")[0].innerText = "$" + total;
  document.getElementsByClassName("btn-count")[0].innerText = cartItems.length;
}

function signUp() {
  var mail = $("#email").val();
  var username = $("#username").val();
  var pass = $("#password").val();

  var user = {
    email: mail,
    username: username,
    password: pass,
  };
  var json = JSON.stringify(user);
  localStorage.setItem("username", json);
  let info = [];
  info.push(`
    successful your account
    name: ${username},
    email: ${mail},
    password: ${pass}
  `);

  var infos = info.join("\n");
  alert(infos);
  $("#main").load("signin.html");
}

function signIn(e) {
  var user = JSON.parse.localStorage.getItem("username");
  var data = JSON.parse(user);
  console.log(user);
}

let debounceTimer;
document.getElementById("search-item").addEventListener("input", function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const search = document.getElementById("item-list");

    const searchValue = this.value.trim().toLowerCase();

    if (searchValue === "") {
      search.classList.remove("show");
      return;
    }

    search.classList.add("show");

    const result = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    var s = [];
    if (result.length === 0) {
      s.push(`
        <div class="search-body">
          <span>No matching products</span>
        </div>
      `);
    } else {
      $.each(result, function (i, item) {
        s.push(`
          <div class="search-body">
            <span>${item.name}</span>
          </div>
        `);
      });
    }

    $("#item-list").html(s.join(" "));
  }, 300);
});

document
  .querySelector(".navbar-nav")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      event.preventDefault();

      document
        .querySelectorAll(".navbar-nav a")
        .forEach((link) => link.classList.remove("active"));

      event.target.classList.add("active");
    }
  });
