const domainApi = 'http://localhost:8081';
const domain = 'http://127.0.0.1:5500/'
const url_giohang = domain + '/giohang.html';
const url_management = domain + '/management.html';
const url_home = domain + '/index.html';

const url_login = domainApi + '/login';

const url_product = domainApi + '/product?';
const url_product_create = domainApi + '/product';
const url_product_update = domainApi + '/product/';

const url_menu = domainApi + '/product?name=';
const url_menu_delete = domainApi + '/product/';
const url_order = domainApi + "/bill";

const url_confirm = domainApi + "/bill/confirm/";
const url_cancel = domainApi + "/bill/cancel/";
const url_bill = domainApi + "/bill/get-bill";
const url_order_new = domainApi + "/bill/get-order";
const url_bill_delete = domainApi + "/bill/";
const url_bill_dashboard = domainApi + "/bill/dashboard?from=2021-01-01&to=2021-04-01";

const url_notification = domainApi + "/notification?ownerId=2"
const url_notification_read = domainApi + "/notification/read/"
const url_notification_delete = domainApi + "/notification/"
const url_notification_count_read = domainApi + "/notification/read/count"


const url_typeProduct = domainApi + "/typeProduct?"
const url_typeProduct_update = domainApi + "/typeProduct/"
const url_typeProduct_delete = domainApi + "/typeProduct/"

const url_store = domainApi + "/store?"
const url_store_update = domainApi + "/store/"
const url_store_delete = domainApi + "/store/"

const url_evaluate = domainApi + "/evaluate?"
const url_evaluate_update = domainApi + "/evaluate/"
const url_evaluate_delete = domainApi + "/evaluate/"

window.onload = function load() {
    handleForms();
    run();
    common();
    callApi();
    after();
    login();
}

function after() {}

function common() {
    document.getElementById('search_input').addEventListener('keypress', function(e) {
        if (event.keyCode === 13) {
            runSearch();
        }
    })
    document.getElementById('search_btn').addEventListener('click', function(e) {
        runSearch();
    })
}

function runSearch() {
    var isSearch = true;
    var name = document.getElementById('search_input').value;
    location.replace('index.html?isSearch=' + isSearch + '&name=' + name);
}

function run() {}

function callApi() {}

export function convertPrice(money) {
    var price = money + 'đ';
    var len = price.length;
    if (len < 5)
        return price;
    if (len < 8)
        return price.substring(0, len - 4) + "." + price.substring(len - 4);
    if (len < 11)
        return price.substring(0, len - 7) + "." + price.substring(len - 7, len - 4) + "." + price.substring(len - 4);
    if (len < 14)
        return price.substring(0, len - 10) + "." + price.substring(0, len - 7) + "." + price.substring(len - 7, len - 3) + "." + price.substring(len - 4);
}

export function convertDaBan(number) {
    var price = number + '';
    var len = price.length;
    if (len < 4)
        return price + 'k';
    if (len < 7)
        return price.substring(0, len - 3) + "." + price.substring(len - 3, len - 2) + 'k';
    if (len < 11)
        return price.substring(0, len - 7) + "." + price.substring(len - 7, len - 6) + 'k';
    if (len < 14)
        return price.substring(0, len - 10) + "." + price.substring(0, len - 7) + "k";
}

function showSelect(listSelect, pageProducts) {
    var html_ = '';
    for (i = 0; i < listSelect.length; i++)
        for (j = 0; j < pageProducts.length; j++) {
            var pageProduct = pageProducts[j];
            if (listSelect[i].id == pageProduct.id) {
                html_ += `
      <li title="${pageProduct.title}" class="header__cart-item">
      <div class="header__cart-img-wrapper">
      <img src="${pageProduct.img}" class="header__cart-img">
      </div>
      <div class="header__cart-item-info">
      <div class="header__cart-item-head">
      <div class="header__cart-item-name">${pageProduct.name}</div>
      <div class="header__cart-item-price-wrap">
      <span class="header__cart-item-price">${convertPrice(pageProduct.newPrice)}</span>
      <span class="header__cart-item-multiply">x</span>
      <span class="header__cart-item-qnt">${listSelect[i].s}</span>
      </div>												
      </div>
      <div class="header__cart-item-body">
      <span class="header__cart-item-description">
      Phân loại: Hàng Quốc tế
      </span>
      <span class="header__cart-item-remove" onclick="removeSelect(${pageProduct.id},${listSelect})">Xóa</span>
      </div>
      </div></li>`;
            }
        }
    document.getElementById('list_select').innerHTML = html_;
    document.getElementById('number_select').innerHTML = listSelect.length;
    console.log('render select of common');
}

function renderProducts(pageProducts) {
    let productEls = ''; // save page products
    for (i = 0; i < pageProducts.length; i++) {
        pageProduct = pageProducts[i];
        productEls +=
            `<div class="col l-2-4 m-4 c-6">
          <a href="product-info.html?id=${pageProduct.id}" class="home-product-item">
              <img src="${pageProduct.img}" class="home-product-item__img">
              <div class="home-product-item__name"> ${pageProduct.name} </div>
              <div class="home-product-item__price">
                  <span class="home-product-item__price-old"> ${convertPrice(pageProduct.oldPrice)} </span>
                  <span class="home-product-item__price-current"> ${convertPrice(pageProduct.newPrice)} </span>
              </div>
              <div class="home-product-item__action">
                  <span class="home-product-item__like home-product-item__like--liked">
                      <i class="home-product-item__like-icon-empty far fa-heart"></i>
                      <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                  </span>
                  <div class="home-product-item__rating">
                      <i class="home-product-item__star--gold fas fa-star"></i>
                      <i class="home-product-item__star--gold fas fa-star"></i>
                      <i class="home-product-item__star--gold fas fa-star"></i>
                      <i class="home-product-item__star--gold fas fa-star"></i>
                      <i class="fas fa-star"></i>
                  </div>
                  <span class="home-product-item__sold"> ${pageProduct.numberSell + ' đã bán'} </span>
              </div>
              <div class="home-product-item__origin">
                  <span class="home-product-item__brand"> NEW </span>
                  <span class="home-product-item__origin-name"> ${pageProduct.manufactureCountry} </span>
              </div>
              <div class="product-favourite">
                  <i class="fas fa-check"></i>
                  <span> Yêu thích </span>
              </div>
              <div class="product-sale-off">
                  <span class="product-sale-off__percent"> ${pageProduct.per}% </span>
                  <span class="product-sale-off__label"> GIẢM </span>
              </div>
              
          </a>
      </div>`;
        if ((i + 1) % 5 == 0 && i < 15) {
            var str = '.suggestion' + parseInt(i / 5 + 1) + ' .row'
            document.querySelector(str).innerHTML = productEls;
            productEls = '';
        }
    }
}

function removeSelect(id, listSelect) {
    for (i = 0; i < listSelect.length; i++) {
        if (listSelect[i].id == id) {
            var a1 = listSelect.slice(0, i);
            var a2 = listSelect.slice(i + 1, listSelect.length);
            listSelect = a1.concat(a2);
            showSelect();
            keepData();
        }
    }
}

function keepData() {
    localStorage.setItem("list_select_keep", JSON.stringify(listSelect));
}

function loadProducts() {
    var name = ''; //document.getElementById('search_input').value;
    fetch(url_product + '&' + name, {
        method: 'get'
    }).then(function(response) {
        if (response.status === 200) {
            response.json().then(function(text) {
                pageProducts = JSON.parse(JSON.stringify(text)).data;
                console.log(pageProducts);
                // window.location.replace('index.html')
            })
        }
    })
}
