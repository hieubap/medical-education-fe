let page_bill = 0;
let number_bill = 10;
let page_product = 0;
let number_menu = 10;
let page_order = 0;
let number_new_bill = 10;
let page_notification = 0;
let number_notification = 100;
let page_store = 0;
let number_store = 100;
let page_type_product = 0;
let number_type_product = 100;
let page_evaluate = 0;
let number_evaluate = 100;

var products;
var bills;
var orders;
var notifications;
var stores;
var typeProducts;
var evaluates;

let totalElements;

function getDaysOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function run() {
  chart();

  callApiProduct();
  callApiOrder();
  callApiBill();
  callApiNotification(0, 100);
  callApiStore(0, 100);
  callApiTypeProduct(0, 100);
  callApiEvaluate(0, 100);

  btnForm();
  addErrorHtml();
}

function chart() {
  var x = [];
  var y = [];
  var date_now = new Date();
  for (
    i = 1;
    i <= getDaysOfMonth(date_now.getFullYear(), date_now.getMonth() + 1);
    i++
  ) {
    x.push(i + "/" + (date_now.getMonth() + 1));
    y.push(0);
  }

  var chart = document.getElementById("chart").getContext("2d");
  Chart.defaults.global.defaultFontColor = "#000";
  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 12;
  console.log("chart");

  fetch(url_bill_dashboard, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text) {
        var data = JSON.parse(JSON.stringify(text)).data;
        console.log(data);

        for (i = 0; i < data.length; i++) y[data[i].day - 1] = data[i].soluong;
        console.log(y);

        var lineChart = new Chart(chart, {
          type: "bar",
          data: {
            labels: x,
            backgroundColor: "rgba(155,0,0,1)",
            datasets: [
              {
                fillColor: "rgba(155,0,0,1)",
                borderWidth: "10px",
                backgroundColor: "rgba(155,000,0,1)",
                strokeColor: "rgba(0,155,0,1)",
                data: y,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: "Số đơn trong tháng",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                fontColor: "#000",
              },
            },
            tooltips: {
              enabled: true,
            },
          },
        });
      });
    }
  });
}

function confirm(id) {
  loadRender(true);
  fetch(url_confirm + id, {
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    method: "put",
  }).then(function (response) {
    if (response.status === 200) {
      console.log("successful");
      showOrder();
      showBill();
    }
  });
}

function changeHidden(id, type) {
  var x =
    type == 0
      ? document.getElementById("bill_id_" + id)
      : document.getElementById("product_id_" + id);

  if (type == 0) {
    if (x.style.display === "none") {
      {
        document.getElementById("detail-bill-" + id).style.display =
          "inline-flex";
      }
    } else {
      document.getElementById("detail-bill-" + id).style.display = "none";
    }
  }
  if (x.style.display === "none") {
    {
      x.style.display = "block";
    }
  } else {
    x.style.display = "none";
  }
}

function changeTag(page, type) {
  switch (type) {
    case 1: { // ok
      page_product = page;
      showProducts();
      break;
    }
    case 2: { // ok
      page_order = page;
      showOrders();
      break;
    }
    case 3: { // ok
      page_bill = page;
      showBills();
      break;
    }
    case 4: { //ok
      page_notification = page;
      showNotifications();
      break;
    }
    case 5: {
      page_store = page;
      showStores();
      break;
    }
    case 6: {
      page_type_product = page;
      showTypeProducts();
      break;
    }
    case 7: {
      page_evaluate = page;
      showEvaluates();
      break;
    }
  }
}

function showProducts() {
  var list = "<div>";

  for (
    i = page_product * number_menu;
    i < (page_product + 1) * number_menu && i < products.length;
    i++
  ) {
    var product = products[i];
    list += `<div class="list_product_order">
    <img src="images/food${((i + 1) % 19) + 1}.jpg" class="image">
    <div style="width:25%;float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>id</b>: ${
      product.id
    } </div>
    </div>
    <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>tên</b>: ${
      product.name
    } </div>
    <div style="float: top;font-size: 17px"><b>giá</b>: ${convertPrice(
      product.newPrice
    )} </div>
    </div>
    <div>
    <button class="btn btn-default btn-rm" onclick="deleteProduct(${
      product.id
    });" style="content:f2ed;margin-right:20px">
    <i class="fas fa-trash-alt"></i>
    </button>
    <button class="btn btn-default btn-ud" onclick="update(${product.id},1)" >
    <i class="fas fa-edit"></i>
    </button>
    <button class="btn btn-default btn-dt" onclick="changeHidden(${
      product.id
    },1)">
    <i class="fas fa-eye"></i>
    </button>
    </div></div>
    <div id="product_id_${product.id}" style="display: none">
    <div style="font-size: 17px"><div><table>
    <tr>
    <th>tiêu đề</th>
    <td>${product.title}</td>
    </tr>
    <tr>
    <th>tên</th>
    <td>${product.name}</td>
    </tr>
    <tr>
    <th>số sao</th>
    <td>${product.star}</td>
    </tr>
    <tr>
    <th>đánh giá</th>
    <td>${product.numberComment}</td>
    </tr>
    <tr>
    <th>đã bán</th>
    <td>${product.numberSell}</td>
    </tr>
    <tr>
    <th>số lượng</th>
    <td>${product.number}</td>
    </tr>
    <tr>
    <th>giá mới</th>
    <td>${convertPrice(product.newPrice)}</td>
    </tr>
    <tr>
    <th>giá cũ</th>
    <td>${convertPrice(product.oldPrice)}</td>
    </tr>
    <tr>
    <th>loại</th>
    <td>${product.typeStr}</td>
    </tr>
    <tr>
    <th>màu sắc</th>
    <td>${product.color}</td>
    </tr>
    <tr>
    <th>nhãn hiệu</th>
    <td>${product.tradeMark}</td>
    </tr>
    <tr>
    <th>xuất xứ</th>
    <td>${product.manufactureCountry}</td>
    </tr>
    <tr>
    <th>thể tích</th>
    <td>${product.volumn}</td>
    </tr>
    <tr>
    <th>khối lượng</th>
    <td>${product.mass}</td>
    </tr>
    <tr>
    <th>chi tiết</th>
    <td>${product.detail}</td>
    </tr>
    <tr>
    <th>nhà phân phối</th>
    <td>${product.distributor}</td>
    </tr>
    <tr>
    <th>ngày tạo</th>
    <td>${product.createdAt}</td>
    </tr>
    <tr>
    <th>ngày cập nhật</th>
    <td>${product.updatedAt}</td>
    </tr>
    </table></div></div></div>`;
  }

  var listType = "";
  for (i = 0; i < products.length; i++) {
    product = products[i];
    listType += `<option value="${product.id}">${product.name}</option>`;
  }
  for (let i of document.getElementsByClassName("select-product"))
    i.innerHTML = listType;

  list += "</div>";
  document.getElementById("list_product").innerHTML = list;
  document.getElementById("m2").innerHTML =
    'Sản Phẩm<span class="notice">' + totalElements + "</span>";
  loadRender(false);
}

function showOrders() {
  var list = "<div>";
  for (
    i = page_order * number_new_bill;
    i < orders.length && i < (page_order + 1) * number_new_bill;
    i++
  ) {
    var arr = orders[i];
    var styleStatus = "#4CAF50";

    list +=
      `<div class="list_product_order">
        <div style="width:25%;float: left;margin-left: 20px">
        <div style="float: top;font-size: 17px">
            <b>id</b>: ${arr.id} 
            </div>
        </div>
        <div style="width:25%;float: left">
            <div style="float: top;"><b>người đặt</b>: ${arr.buyer.name} </div>
            <div style="float: top;"><b>thời gian</b>: ${arr.createdAt} </div>
        </div>
        <div style="width:25%;float: left">
            <div style="float: top;font-size: 17px"><b>tổng tiền</b>: ${convertPrice(
              arr.total + ""
            )} </div>
            <div style="float: top;font-size: 17px"><b>trạng thái</b>:<div style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color: ` +
      styleStatus +
      `"></div> ${arr.statusName} </div>
        </div>
        <div>
            <button class="btn btn-default btn-rm" onclick="cancelBill(${arr.id})" style="margin-right:20px">
                <i class="fas fa-window-close"></i>
            </button>
            <button class="btn btn-default btn-dt" onclick="changeHidden(${arr.id},0)">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-default btn-ck" onclick="confirm(${arr.id})">
                <i class="fas fa-check-circle"></i>
            </button>
        </div>
        </div>
        <div class="detail-bill" style="display: none" id="detail-bill-${arr.id}">
            <div class="column">
                <div>Thời gian: ${arr.createdAt}</div>
                <div>Người đặt: ${arr.nameBuyer}</div>
                <div>Số điện thoại: ${arr.phone}</div>
            </div>
            <div class="column">
                <div>Địa chỉ giao hàng: ${arr.address}</div>
                <div>Chú thích: ${arr.createdAt}</div>
            </div>
        </div>
        <div id="bill_id_${arr.id}" style="display: none">`;
    var hiddenDiv = '<div style="font-size: 17px">';
    hiddenDiv +=
      "<div><table>" +
      "<tr>" +
      "<th>stt</th>" +
      "<th>tên</th>" +
      "<th>số lượng</th>" +
      "<th>giá</th>" +
      "</tr>";
    for (j = 0; j < arr.foods.length; j++) {
      hiddenDiv +=
        "<tr>" +
        "<th>" +
        (j + 1) +
        "</th>" +
        "<td>" +
        arr.foods[j].food.name +
        "</td>" +
        "<td>" +
        arr.foods[j].number +
        "</td>" +
        "<td>" +
        convertPrice(arr.foods[j].price) +
        "</td>" +
        "</tr>";
    }
    hiddenDiv +=
      "<tr>" +
      "<th></th>" +
      "<th></th>" +
      "<th> tổng tiền: </th>" +
      "<th>" +
      convertPrice(arr.total) +
      "</th>" +
      "</tr></table></div></div>";
    list += hiddenDiv + "</div>";
  }
  list += "</div>";
  document.getElementById("list_order").innerHTML = list;
}

function showBills() {
  var list = "<div>";
  for (
    i = page_bill * number_bill;
    i < bills.length && i < (page_bill + 1) * number_bill;
    i++
  ) {
    var arr = bills[i];

    var styleStatus = "var(--yellow)";
    if (arr.status == 3) {
      styleStatus = "var(--blue)";
    }
    if (arr.status == 4) {
      styleStatus = "var(--red)";
    }

    list +=
      `<div class="list_product_order">
              <div style="width:25%;float: left;margin-left: 20px">
              <div style="float: top;font-size: 17px">
                <b>id</b>: ${arr.id} 
                </div>
              </div>
              <div style="width:25%;float: left">
                <div style="float: top;"><b>người đặt</b>: ${
                  arr.buyer.name
                } </div>
                <div style="float: top;"><b>thời gian</b>: ${
                  arr.createdAt
                } </div>
              </div>
              <div style="width:25%;float: left">
                <div style="float: top;font-size: 17px"><b>tổng tiền</b>: ${convertPrice(
                  arr.total + ""
                )} </div>
                <div style="float: top;font-size: 17px"><b>trạng thái</b>:<div style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color: ` +
      styleStatus +
      `"></div> ${arr.statusName} </div>
              </div>
              <div>
                <button class="btn btn-default btn-rm" onclick="deleteBill(${arr.id})" style="margin-right:20px">
                    <i class="fas fa-window-close"></i>
                </button>
                <button class="btn btn-default btn-dt" onclick="changeHidden(${arr.id},0)">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-default btn-ck" onclick="confirm(${arr.id})">
                    <i class="fas fa-check-circle"></i>
                </button>
              </div>
              </div>
              <div class="detail-bill" style="display: none" id="detail-bill-${arr.id}">
                <div class="column">
                    <div>Thời gian: ${arr.createdAt}</div>
                    <div>Người đặt: ${arr.nameBuyer}</div>
                    <div>Số điện thoại: ${arr.phone}</div>
                </div>
                <div class="column">
                    <div>Địa chỉ giao hàng: ${arr.address}</div>
                    <div>Chú thích: ${arr.createdAt}</div>
                </div>
            </div>
              <div id="bill_id_${arr.id}" style="display: none">`;
    var hiddenDiv = '<div style="font-size: 17px">';
    hiddenDiv +=
      "<div><table>" +
      "<tr>" +
      "<th>stt</th>" +
      "<th>tên</th>" +
      "<th>số lượng</th>" +
      "<th>giá</th>" +
      "</tr>";
    for (j = 0; j < arr.foods.length; j++) {
      hiddenDiv +=
        "<tr>" +
        "<th>" +
        (j + 1) +
        "</th>" +
        "<td>" +
        arr.foods[j].food.name +
        "</td>" +
        "<td>" +
        arr.foods[j].number +
        "</td>" +
        "<td>" +
        convertPrice(arr.foods[j].price) +
        "</td>" +
        "</tr>";
    }
    hiddenDiv +=
      "<tr>" +
      "<th></th>" +
      "<th></th>" +
      "<th> tổng tiền: </th>" +
      "<th>" +
      convertPrice(arr.total) +
      "</th>" +
      "</tr></table></div></div>";

    list += hiddenDiv + "</div>";
  }
  list += "</div>";
  document.getElementById("list_bill").innerHTML = list;
}

function showNotifications() {
  var list = "<div>";
  for (
    i = page_notification * number_notification;
    i < notifications.length &&
    i < (page_notification + 1) * number_notification;
    i++
  ) {
    var product = notifications[i];
    var isReadStyle = "";

    if (product.isRead == 1) {
      isReadStyle = 'style="font-weight: bold;"';
    }
    list +=
      `<div id="list-noti-${product.id}" class="list_product_order"` +
      isReadStyle +
      ` onclick="put(${product.id},4)">
        <div style="width:25%;float: left;margin-left: 20px"><div style="float: top;font-size: 17px">id: ${product.id} </div>
        </div>
        <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"> ${product.content} </div>
        <div style="float: top;font-size: 17px"> ${product.createdAt} </div>
        </div>
        <div><button class="btn btn-default btn-rm" onclick="deleteApi(${product.id},4);" style="content:f2ed;margin-right:20px">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div></div>
        </div>`;
  }
  list += "</div>";
  document.getElementById("list_notification").innerHTML = list;
}

function showStores() {
  var list = "<div>";
  for (
    i = page_store * number_store;
    i < stores.length && (page_store + 1) * number_store;
    i++
  ) {
    var o = stores[i];
    list += `<div class="list_product_order">
    <div style="width:25%;float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>id</b>: ${o.id} </div>
    </div>
    <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>nội dung</b>: ${o.name} </div>
    <div style="float: top;font-size: 17px"><b>thời gian</b>: ${o.createdAt} </div>
    </div>
    <div><button class="btn btn-default btn-rm" onclick="deleteNotification(${o.id});" style="content:f2ed;margin-right :20px">
    <i class="fas fa-trash-alt"></i>
    </button>
    <button class="btn btn-default btn-ud" onclick="update(${o.id},4)">
    <i class="fas fa-edit"></i>
    </button>
    <button class="btn btn-default btn-dt" onclick="changeHidden(${o.id},1)">
    <i class="fas fa-eye"></i>
    </button>
    </div></div>
    </div>`;
  }
  list += "</div>";
  document.getElementById("list_store").innerHTML = list;
  loadRender(false);
}

function showTypeProducts() {
  var listType = "";
  var list = "<div>";
  for (
    i = page_type_product * number_type_product;
    i < typeProducts.length &&
    i < (page_type_product + 1) * number_type_product;
    i++
  ) {
    var o = typeProducts[i];
    list += `<div class="list_product_order">
        <div style="width:25%;float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>id</b>: ${o.id} </div>
        </div>
        <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>nội dung</b>: ${o.name} </div>
        <div style="float: top;font-size: 17px"><b>thời gian</b>: ${o.createdAt} </div>
        </div>
        <div><button class="btn btn-default btn-rm" onclick="deleteNotification(${o.id});" style="content:f2ed;margin-right: 20px">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn btn-default btn-ud" onclick="update(${o.id})">
        <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-default btn-dt" onclick="changeHidden(${o.id},1)">
        <i class="fas fa-eye"></i>
        </button>
        </div></div>
        </div>`;
    listType += `<option value="${o.id}">${o.name}</option>`;
  }
  list += "</div>";
  for (let i of document.getElementsByClassName("select-type-product"))
    i.innerHTML = listType;
  document.getElementById("list_typeProduct").innerHTML = list;
}

function showEvaluates() {
  var list = "<div>";
  for (
    i = page_evaluate * number_evaluate;
    i < evaluates.length && i < (page_evaluate + 1) * number_evaluate;
    i++
  ) {
    var o = evaluates[i];
    list += `<div class="list_product_order">
        <div style="width:25%;float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>id</b>: ${o.id} </div>
        </div>
        <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>nội dung</b>: ${o.content} </div>
        <div style="float: top;font-size: 17px"><b>thời gian</b>: ${o.createdAt} </div>
        </div>
        <div><button class="btn btn-default btn-rm" onclick="deleteNotification(${o.id});" style="content:f2ed;margin-right:20px">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn btn-default btn-ud" onclick="update(${o.id})">
        <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-default btn-dt" onclick="changeHidden(${o.id},1)">
        <i class="fas fa-eye"></i>
        </button>
        </div></div>
        </div>`;
  }
  list += "</div>";
  document.getElementById("list_evaluate").innerHTML = list;
}

function showAllProduct() {
  number_menu = 1000;
  showProducts();
  document.getElementById("paginationId").innerHTML = "";
}

function loadRender(status) {
  if (status) document.getElementById("loader").style.display = "block";
  else document.getElementById("loader").style.display = "none";
}

function callApiProduct(page, size) {
  const urlFetch = url_menu + "&page=" + 0 + "&size=" + 200;
  console.log(urlFetch);

  fetch(urlFetch, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      addHandleForm();
      response.json().then(function (text) {
        var body = JSON.parse(JSON.stringify(text));
        products = body.data;
        totalElements = body.totalElements;

        let list = "";
        for (i = 0; i < products.length / number_menu; i++) {
          list += `<li><a href="#" onclick="changeTag(${i},1)">${
            i + 1
          }</a></li>`;
        }
        document.getElementById("pageTag1").innerHTML = list;
        showProducts();
      });
    }
  });
}

function callApiOrder() {
  fetch(url_order_new, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      console.log("successful");
      response.json().then(function (text) {
        var body = JSON.parse(JSON.stringify(text));
        orders = body.data;
        let listTag = "";
        for (i = 0; i < orders.length / number_new_bill; i++) {
          listTag += `<li><a href="#" onclick="changeTag(${i},2)">${
            i + 1
          }</a></li>`;
        }
        showOrders();
        document.getElementById("pageTag2").innerHTML = listTag;
        document.getElementById("m8").innerHTML =
          'Đơn mới <span class="notice">' + body.totalElements + "</span>";
        loadRender(false);
      });
    }
  });
}

function callApiBill() {
  fetch(url_bill, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      console.log("successful");
      response.json().then(function (text) {
        var body = JSON.parse(JSON.stringify(text));
        bills = body.data;

        let list = "";
        for (i = 0; i < bills.length / number_bill; i++) {
          list += `<li><a href="#" onclick="changeTag(${i},3)">${
            i + 1
          }</a></li>`;
        }
        document.getElementById("pageTag3").innerHTML = list;

        showBills();
        document.getElementById("m3").innerHTML =
          'Hóa đơn <span class="notice">' + body.totalElements + "</span>";
        loadRender(false);
      });
    }
  });
}

function callApiNotification(page, size) {
  const urlFetch = url_notification + "&page=" + 0 + "&size=" + 100000;
  fetch(urlFetch, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      addHandleForm();
      response.json().then(function (text) {
        notifications = JSON.parse(JSON.stringify(text)).data;
        let list = "";
        for (i = 0; i < notifications.length / number_notification; i++) {
          list += `<li><a href="#" onclick="changeTag(${i},4)">${
            i + 1
          }</a></li>`;
        }
        document.getElementById("pageTag4").innerHTML = list;
        showNotifications();
      });
    }
  });
  countNotification();
}

function countNotification() {
  fetch(url_notification_count_read, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text) {
        document.getElementById("m4").innerHTML =
          'Thông báo <span class="notice">' +
          JSON.parse(JSON.stringify(text)).data +
          "</span>";
      });
    }
  });
}

function callApiStore(page, size) {
  const urlFetch = url_store + "&page=" + page + "&size=" + size;
  console.log(urlFetch);
  fetch(urlFetch, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      addHandleForm();
      response.json().then(function (text) {
        stores = JSON.parse(JSON.stringify(text));
        document.getElementById("m5").innerHTML =
          'Cửa hàng<span class="notice">' + stores.totalElements + "</span>";
        stores = stores.data;

        showStores();
        let list = "";
        for (i = 0; i < stores.length / number_store; i++) {
          list += `<li><a href="#" onclick="changeTag(${i},5)">${
            i + 1
          }</a></li>`;
        }
        document.getElementById("pageTag5").innerHTML = list;
      });
    }
  });
}

function callApiTypeProduct(page, size) {
  const urlFetch = url_typeProduct + "&page=" + page + "&size=" + size;
  fetch(urlFetch, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      addHandleForm();
      response.json().then(function (text) {
        typeProducts = JSON.parse(JSON.stringify(text));
        document.getElementById("m6").innerHTML =
          'Loại sản phẩm<span class="notice">' +
          typeProducts.totalElements +
          "</span>";
        typeProducts = typeProducts.data;

        let list = "";
        for (i = 0; i < typeProducts.length / number_type_product; i++) {
          list += `<li><a href="#" onclick="changeTag(${i},6)">${
            i + 1
          }</a></li>`;
        }
        document.getElementById("pageTag6").innerHTML = list;

        showTypeProducts();
      });
    }
  });
}

function callApiEvaluate(page, size) {
  const urlFetch = url_evaluate + "&page=" + page + "&size=" + size;
  fetch(urlFetch, {
    method: "get",
  }).then(function (response) {
    if (response.status === 200) {
      addHandleForm();
      response.json().then(function (text) {
        evaluates = JSON.parse(JSON.stringify(text));
        document.getElementById("m7").innerHTML =
          'Đánh giá<span class="notice">' + evaluates.totalElements + "</span>";
        evaluates = evaluates.data;

        showEvaluates();

        let list = "";
        for (i = 0; i < evaluates.length / number_evaluate; i++) {
          list += `<li><a href="#" onclick="changeTag(${i},7)">${
            i + 1
          }</a></li>`;
        }
        document.getElementById("pageTag7").innerHTML = list;
      });
    }
  });
}

function cancelBill(id) {
  loadRender(true);
  fetch(url_cancel + id, {
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    method: "put",
  }).then(function (response) {
    if (response.status === 200) {
      showBill();
      showOrder();
      console.log("cancel ok");
    }
  });
}
/**
 * 1 product
 * 2 new bill
 * 3 bill
 * 4 notification
 * 5 store
 * 6 type product
 * 7 evaluate
 */
let isUpdate = true;

function put(id, type) {
  if (!isUpdate) return;

  let fetApi;
  let f;
  switch (type) {
    case 1: {
      break;
    }
    case 2: {
      break;
    }
    case 3: {
      break;
    }
    case 4: {
      fetApi = url_notification_read;
      document.getElementById("list-noti-" + id).style = "";
      f = countNotification();
      break;
    }
    case 5: {
      break;
    }
    case 6: {
      break;
    }
    case 7: {
      break;
    }
  }

  console.log(fetApi + id);
  fetch(fetApi + id, {
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    method: "PUT",
  }).then(function (response) {
    console.log(response.text);
    if (response.status === 200) {
      f;
      console.log("put ok");
    }
  });
}

function deleteApi(id, type) {
  isUpdate = false;
  let fetApi;
  let f;
  switch (type) {
    case 1: {
      break;
    }
    case 2: {
      break;
    }
    case 3: {
      break;
    }
    case 4: {
      fetApi = url_notification_delete;
      document.getElementById("list-noti-" + id).style.display = "none";
      showListNotification();
      break;
    }
    case 5: {
      break;
    }
    case 6: {
      break;
    }
    case 7: {
      break;
    }
  }

  console.log(fetApi + id);
  fetch(fetApi + id, {
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    method: "delete",
  }).then(function (response) {
    console.log(response.text);
    if (response.status === 200) {
      f;
      console.log("delete ok");
    }
  });
}

function deleteProduct(id) {
  const urlFetch = url_menu_delete + id;
  loadRender(true);

  fetch(urlFetch, {
    method: "delete",
  }).then(function (response) {
    if (response.status === 200) {
      addHandleForm();
      response.json().then(function (text) {
        showProducts();
        console.log(products);
      });
    }
  });
}

function deleteProduct(id) {
  fetch(url_menu_delete + id, {
    method: "delete",
  }).then(function (response) {
    if (response.status === 200) {
      showListMenu();
    }
  });
}

function deleteBill(id) {
  fetch(url_bill_delete + id, {
    method: "delete",
  }).then(function (response) {
    if (response.status === 200) {
      showBills();
    }
  });
}

function addHandleForm() {}

function btnForm() {
  let inpEls = document.getElementsByClassName("create_input");

  document
    .getElementById("create_btn2")
    .addEventListener("click", function (e) {
      submitC = true;
      for (let inpEl of inpEls) {
        if (!inpEl.value) {
          let childEl = inpEl.parentElement.childNodes[5];
          childEl.style.display = "block";
          inpEl.style = "border-color:red";
          submitC = false;
        } else {
          inpEl.style = "color: black; font-size: 0.95rem";
          inpEl.style = `border-color: black`;
          let childEl = inpEl.parentElement.childNodes[5];
          childEl.style.display = "none";
        }
      }
      if (submitC) callApiCreate();
    });
  document.getElementById("cancel_btn").addEventListener("click", function (e) {
    let inpEls = document.getElementsByClassName("create_input");
    for (let inpEl of inpEls) {
      inpEl.value = "";
      inpEl.style = "border-color: black;color: black; font-size: 1.1rem";
      let childEl = inpEl.parentElement.childNodes[5];
      childEl.style.display = "none";
    }
  });
  for (let i of document.getElementsByClassName("back-btn"))
    i.addEventListener("click", function (e) {
      let modalLayer = document.querySelector(".modal");
      modalLayer.style.display = "none";
    });
  document
    .getElementById("ud-store-btn")
    .addEventListener("click", function (e) {
      callAPIUpdateStore();
      let modalLayer = document.querySelector(".modal");
      modalLayer.style.display = "none";
    });
  document
    .getElementById("update-cancel_btn")
    .addEventListener("click", function (e) {
      update(idProductU, 1);
    });
  document.getElementById("update-btn").addEventListener("click", function (e) {
    submitU = true;
    callApiUpdate();
  });
}

var idProductU = -1;
var submitU = false;
var submitC = false;

function addErrorHtml() {
  let formEl = document.querySelector("#create-product-form");
  let formU = document.querySelector("#update-product-form");
  let inpEls = document.getElementsByClassName("create_input");
  console.log("input length = " + inpEls.length);

  formEl.onsubmit = (e) => {
    e.preventDefault();
  };
  formU.onsubmit = (e) => {
    e.preventDefault();
  };

  console.log("add error span to all input");
  for (let inpEl of inpEls) {
    let childEl = inpEl.parentElement.appendChild(
      document.createElement("span")
    );
    childEl.setAttribute("class", "error_span");
    childEl.innerText = "Vui lòng nhập trường này";
    childEl.setAttribute(
      "style",
      "display:none;margin-bottom:-18px;color:red;text-align:right;padding-right:20%"
    );
  }
}

function getById(id, type) {
  switch (type) {
    case 1: {
      for (i = 0; i < products.length; i++)
        if (products[i].id == id) return products[i];
    }
    case 4: {
      for (i = 0; i < stores.length; i++)
        if (stores[i].id == id) return stores[i];
    }
  }
}

function setById(id, type, value) {
  switch (type) {
    case 1: {
      for (i = 0; i < products.length; i++)
        if (products[i].id == id) products[i] = value;
    }
    case 4: {
      for (i = 0; i < stores.length; i++)
        if (stores[i].id == id) stores[i] = value;
    }
  }
}

function update(id, type) {
  if (id == -1) return;

  switch (type) {
    case 1: {
      idProductU = id;
      console.log("update");
      let product = getById(id, 1);
      changeForms("update-product-form");
      let inpEls = document.getElementsByClassName("update_input");

      inpEls[0].value = product.title;
      inpEls[1].value = product.name;
      inpEls[2].value = product.oldPrice;
      inpEls[3].value = product.newPrice;
      inpEls[4].value = product.img;
      inpEls[5].value = product.number;
      inpEls[6].value = product.detail;
      inpEls[7].value = product.type;
      inpEls[8].value = product.color;
      inpEls[9].value = product.tradeMark;
      inpEls[10].value = product.manufactureCountry;
      inpEls[11].value = product.distributor;
      inpEls[12].value = product.volumn;
      inpEls[13].value = product.mass;
      break;
    }
    case 4: {
      idProductU = id;
      let product = getById(id, 4);
      changeForms("ud-store-form");
      let inpEls = document.getElementsByClassName("ud-store-input");

      inpEls[0].value = product.name;
      inpEls[1].value = product.address;
      inpEls[2].value = product.email;
      inpEls[3].value = product.phone;
      inpEls[4].value = product.timeStart;
      inpEls[5].value = product.timeEnd;
      inpEls[6].value = product.owner.name;
      inpEls[7].value = product.createdAt;
      break;
    }
  }
}

function callApiUpdate() {
  loadRender(true);
  let inpEls = document.getElementsByClassName("update_input");
  let oldP = getProductById(idProductU, 1);
  var updateP = `{
    "id": ${idProductU},
    "title": "${inpEls[0].value}",
    "name": "${inpEls[1].value}",
    "star": ${oldP.star},
    "numberComment": ${oldP.numberComment},
    "numberSell": ${oldP.numberSell},
    "number": ${inpEls[5].value},
    "oldPrice": ${inpEls[2].value},
    "newPrice": ${inpEls[3].value},
    "type": "${inpEls[7].value}",
    "color": "${inpEls[8].value}",
    "tradeMark": "${inpEls[9].value}",
    "manufactureCountry": "${inpEls[10].value}",
    "volume": "${inpEls[12].value}",
    "mass": "${inpEls[13].value}",
    "detail": "${inpEls[6].value}",
    "img": "${inpEls[4].value}",
    "distributor": "${inpEls[11].value}",
    "createdDate": "${oldP.createdDate}"
}`;
  fetch(url_product_update + idProductU, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    body: updateP,
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text) {
        var data = JSON.parse(JSON.stringify(text)).data;
        showListMenu(page_product, number_menu);
        let modalLayer = document.querySelector(".modal");
        modalLayer.style.display = "none";
      });
    }
  });
}

function callAPIUpdateStore() {
  loadRender(true);
  let inpEls = document.getElementsByClassName("ud-store-input");
  let oldP = getById(idProductU, 4);
  var updateP = `{
            "name": "${inpEls[0].value}",
            "address": "${inpEls[1].value}",
            "email": "${inpEls[2].value}",
            "phone": "${inpEls[3].value}",
            "timeStart": "${inpEls[4].value}",
            "timeEnd": "${inpEls[5].value}",
            "ownerId": ${oldP.ownerId}}`;
  fetch(url_store_update + idProductU, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    body: updateP,
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text) {
        setById(idProductU, 4, JSON.parse(JSON.stringify(text)).data);
        showStores();
        let modalLayer = document.querySelector(".modal");
        modalLayer.style.display = "none";
      });
    }
  });
}

function callApiCreate() {
  loadRender(true);
  let inpEls = document.getElementsByClassName("create_input");
  var createP = `{
  "title": "${inpEls[0].value}",
  "name": "${inpEls[1].value}",
  "star": 0,
  "numberComment": 0,
  "numberSell": 0,
  "number": ${inpEls[5].value},
  "oldPrice": ${inpEls[2].value},
  "newPrice": ${inpEls[3].value},
  "type": "${inpEls[7].value}",
  "color": "${inpEls[8].value}",
  "tradeMark": "${inpEls[9].value}",
  "manufactureCountry": "${inpEls[10].value}",
  "volume": "${inpEls[12].value}",
  "mass": "${inpEls[13].value}",
  "detail": "${inpEls[6].value}",
  "img": "${inpEls[4].value}",
  "distributor": "${inpEls[11].value}"
}`;
  fetch(url_product_create, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE0ODU2ODgxLCJleHAiOjE2MTYwMDA0MDB9.wVq1WwAO7v9NAxfylit_pGv69Jz_zqXNJTAgbfUFqo-aLAKVzOfJbro3PX8jXpxW",
    },
    body: createP,
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text) {
        var data = JSON.parse(JSON.stringify(text)).data;
        console.log(data);
        showListMenu();
        let modalLayer = document.querySelector(".modal");
        modalLayer.style.display = "none";
      });
    }
  });
}

function openScreen(screen) {
  var i;
  var x = document.getElementsByClassName("screen");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(screen).style.display = "block";
  console.log("logloglog");
}

function handleForms() {}

function login() {}

function changeForms(showForm) {
  let formHidden = document.getElementsByClassName("fm");
  for (let f of formHidden) {
    f.style.display = "none";
  }

  document.querySelector(".modal").style.display = "flex";
  document.getElementById(showForm).style.display = "block";
}

function notificationNew() {
  document
    .getElementById("notification-new")
    .addEventListener("click", function (e) {
      this.style.display = "none";
    });
}
