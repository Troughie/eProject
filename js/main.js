// get file json and load page SPA
let data = [];
let a = 1;

var database = [];
$.getJSON("items.json")
    .done(function (result) {
        database = result;
    })
    .fail(function () {
        alert("Get data that bai ");
    });


$(document).ready(function () {
  $("#main").load("home.html")
  
  $("#product").click(function (e) {
    e.preventDefault();
    $("#main").load("product.html");
    $('.collapse').collapse('hide');
  })

  $("#home").click(function (e) {
    e.preventDefault();
    $("#main").load("home.html");
    $('.collapse').collapse('hide');
  })

  // $("#home-logo").click(function (e) {
  //   e.preventDefault();
  //   $("#main").load("home.html");
  //   $('.collapse').collapse('hide');
  // })

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
    $('.collapse').collapse('hide');
  })
  
  $("#register").click(function (e) {
    e.preventDefault();
    $("#main").load("signup.html");
    $('.collapse').collapse('hide');
  })

  // $("#readmore").click(function (e) {
  //   e.preventDefault();
  //   $("#main").load("blog.html")
  // });

  $("#product").click(function () {
    $.getJSON("items.json", function (items) {
      data = items;
      showImage(data)
      popupImage(data)
    });
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
function loadLogin() {
  $("#main").load("signin.html")
}



// Product items 

function showImage(data) {
  let s = []

  $.each(data, function (i, item) {
    s.push(`
              <div class="list-item ${item.brand}" data-brand="${item.brand}" >
                  <div class="list-item__img">
                    <img class="popup" src="${item.img}" data-id="${item.id}">
                    <p>${item.name}</p><br>
                    </div>
                    <div class="list-item__info">
                    <p>${item.brand}</p>
                    <p>${item.color}</p>
                    <p>${item.category}</p>
                    </div>
                    
                    <div class="list-item__icon">
                    <div class="list-item__star">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    </div>
                    <button id="add-cart" onclick="addCart()"><i class="fa-solid fa-circle-plus"></i></button>
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
              <img src="${item.img}">
                    <div class="popup-item__info">
                    <p>${item.name}</p><br>
                    <p>${item.price}</p>
                    <p>${item.description}</p>
                    </div>
                    
                    <div class="popup-item__icon">
                    <div class="popup-item__star">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    </div>
                    <i class="fa-solid fa-circle-plus"></i>
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


let cart = 0
function addCart() {
  cart++
  alert('add cart successful')
  $("#cart-num").text(cart)
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
  localStorage.setItem(username, json)
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
  e.preventDefault()
  $("#name").val()
  $("#password").val()
  var user = localStorage.getItem(username)
  var data = JSON.parse(user)
  console.log(user);
}






