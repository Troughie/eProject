// get file json and load page SPA
let data = [];
let a = 1;
let cartNum = 0;
let numPage = 16;

$(document).ready(function () {
  $("#main").load("home.html")


  $("#product").click(function (e) {
    e.preventDefault();

    $("#main").load("product.html");

    $('.collapse').collapse('hide');
    $.getJSON("items.json", function (items) {
      data = items;
      showImage(data)
      popupImage(data)
    });
    openCart();
  })

  $("#home").click(function (e) {
    e.preventDefault();
    $("#main").load("home.html");
    $('.collapse').collapse('hide');
  })

  $("#home-logo").click(function (e) {
    e.preventDefault();
    $("#main").load("home.html");
    $('.collapse').collapse('hide');
  })

  $("#gallery").click(function (e) {
    e.preventDefault();
    $("#main").load("gallery.html");
    $('.collapse').collapse('hide');
  })

  $("#blog").click(function (e) {
    e.preventDefault();
    $("#main").load("blog.html");
    $('.collapse').collapse('hide');
  })

  $("#about").click(function (e) {
    e.preventDefault();
    $("#main").load("aboutus.html");
    $('.collapse').collapse('hide');
  })

  $("#login").click(function (e) {
    e.preventDefault();
    $("#main").load("signin.html");
  })

  $("#register").click(function (e) {
    e.preventDefault();
    $("#main").load("signup.html");
  })

  $("#faq").click(function (e) {
    e.preventDefault();
    $("#main").load("faq.html");
    $('.collapse').collapse('hide');
  })

  $("#contact").click(function (e) {
    e.preventDefault();
    $("#main").load("contactus.html");
    $('.collapse').collapse('hide');
  })


  $(document).on("click", ".popup", function () {
    let id = $(this).data("id");

    let product = data.filter((ele) => ele.id == id);

    popupImage(product[0]);
    $("#popupImage").modal("show");
  })


})
function loadBlog() {
  $("#main").load("blog.html")
}
// function loadLogin() {
//   $("#main").load("signin.html")
// }



// Product items 

function showImage(data) {
  let length = data.length;
  let s = []

  $.each(data, function (i, item) {
    s.push(`
              <div class="list-item ${item.brand}" data-brand="${item.brand}" >
                  <div class="list-item__img">
                    <img height="260px" class="popup" src="${item.img}" data-id="${item.id}">
                    <button id="add-cart" onclick="addCart(${item.id})"><i class="fa-solid fa-cart-plus"></i>Add to cart</button>
                    </div>
                    <div class="list-item__info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-brand">${item.brand}</p>
                    <p class="item-info">${item.color}</p>
                    <p class="item-info">${item.price}</p>
                    </div>
                </div>
  `)
    $("#data-product").html(s.join(''))
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
                        </div>
                        <div>
                          <span>Your comment</span>
                          <textarea rows="4" cols="30" name="comment"></textarea>
                        </div>
                      </div>
                    
                </div>
  `;
  $("#modal-item").html(s)
}

// filter item in product
function show() {
  let brands = $(".brand:checked").map(function () { return $(this).val() }).toArray().toString();
  let categories = $(".category:checked").map(function () { return $(this).val() }).toArray().toString();
  let colors = $(".color:checked").map(function () { return $(this).val() }).toArray().toString();
  let type = $(".type:checked").map(function () { return $(this).val() }).toArray().toString();
  let newData = null;

  if (brands.length == 0) {
    newData = data;

  }
  else {
    newData = data.filter(item => brands.search(item.brand) >= 0);
  }

  if (categories.length > 0) {
    newData = data.filter(item => categories.search(item.category) >= 0);

  }

  if (colors.length > 0) {
    newData = data.filter(item => colors.search(item.color) >= 0);

  }

  if(type.length > 0) {
    newData = data.filter(item => type.search(item.type) >= 0);
  }

  showImage(newData);
}

// show and hidden filter
function showFilter() {
  a++
  if (a % 2 == 0) {
    document.querySelector(".filter-zoom").classList.add("show")
  }
  else {
    document.querySelector(".filter-zoom").classList.remove("show")
  }
}


function openCart() {
  document.querySelector("#cart").classList.add("show-cart")
  var removeItemCartBtn = document.getElementsByClassName('cart-remove')


  for (var index = 0; index <= removeItemCartBtn.length; index++) {
    var button = removeItemCartBtn[index];
    button.addEventListener('click', removeCartItem)
  }
  updateCartTotal();
}

function closeCart() {
  document.querySelector("#cart").classList.remove("show-cart")
}


function addCart(id) {

  var item = data[id]
  var newEle = {
    "id": id,
    "name": item.name,
    "price": item.price,
    "qty": 1
  }

  if (localStorage.getItem("cart") == null) {
    cart = [];
  }
  else {
      cart = JSON.parse(localStorage.getItem("cart"));
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
         `)
      $("#menuCart").html(s.join(" "))
    })
  }
  var find = false;
  cart.forEach(element => {
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
  var removeItemCartBtn = document.getElementsByClassName('cart-remove')


  for (var index = 0; index <= removeItemCartBtn.length; index++) {
    var button = removeItemCartBtn[index];
    button.addEventListener('click', removeCartItem)
  }
}



function removeCartItem(event, id) {
  var btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()


  let cart = JSON.parse(localStorage.getItem('cart'))

  let updateProducts = cart.filter(item => item.id == data[id])
  console.log(updateProducts);
  localStorage.setItem('cart', JSON.stringify(updateProducts))
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementById('menuCart')
  var cartItems = cartItemContainer.getElementsByClassName("cart-body")
  cartItems.length += 1
  var total = 0
  for (let index = 0; index < cartItems.length; index++) {
    const cartItem = cartItems[index];
    var priceElement = cartItem.getElementsByClassName("cart-price")[0]
    var qtyElement = cartItem.getElementsByClassName('cart-qty')[0]

    var price = priceElement.innerText.replace('$', '')
    var qty = qtyElement.value

    total = total + price * qty
  }

  document.getElementsByClassName('cart-total')[0].innerText = '$' + total
  document.getElementsByClassName('btn-count')[0].innerText = cartItems.length
}






function signUp() {
  var mail = $("#email").val()
  var username = $("#username").val()
  var pass = $("#password").val()



  var user = {
    email: mail,
    username: username,
    password: pass
  }
  var json = JSON.stringify(user)
  localStorage.setItem('username', json)
  let info = [];
  info.push(`
    successful your account
    name: ${username},
    email: ${mail},
    password: ${pass}
  `)

  var infos = info.join('\n')
  alert(infos)
  $("#main").load("signin.html")
}



function signIn(e) {
  $("#name").val()
  $("#password").val()
  var user = JSON.parse.localStorage.getItem('username')
  var data = JSON.parse(user)
  console.log(user);
}






