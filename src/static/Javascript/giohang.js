var listSelect= localStorage.getItem("list_select_keep")==null?[]:JSON.parse(localStorage.getItem("list_select_keep"));

var pageProducts;
var modal;
var span;

function run(){
    fetProducts();
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
}

function keepData(){
    localStorage.setItem("list_select_keep",JSON.stringify(listSelect));
}

function showSelect(){
    var html_ = '';
    var sum = 0;
    if(listSelect == null) listSelect = [];
    
    for(i=0;i<listSelect.length;i++)
    for(j = 0;j<pageProducts.length;j++){
        var pageProduct = pageProducts[j];
        if(listSelect[i].id == pageProduct.id) {
        html_ += `
        <li title="title" class="header__cart-item1">
        <div class="header__cart-img-wrapper">
        <img src="${pageProduct.img}" class="header__cart-img">
        </div>
        <div class="header__cart-item-info">
        <div class="list_select_body">
            <div class="list_info">
                <span class="list_select_ten">
                    ${pageProduct.name}
                    </span>
                <span class="list_select_phanloai">
                    Phân loại: Hàng Quốc tế
                    </span>
            </div>
        <span class="list_gia">${convertPrice(pageProduct.newPrice)} </span>
        <span class="list_select_sub" onclick="addSoLuong(${pageProduct.id},-1)">_</span>
        <span class="list_soluong">${listSelect[i].s}</span>
        <span class="list_select_add" onclick="addSoLuong(${pageProduct.id},1)">+</span>
        <span class="list_tien">${convertPrice(pageProduct.newPrice*listSelect[i].s)}</span>
        <span class="list_select_remove" onclick="removeSelect(1)">Xóa</span>
        </div>
        </div>
		</li>`;
        sum += pageProduct.newPrice*listSelect[i].s;
        }
    }
    document.getElementById('bill_id').innerHTML = html_;

    html_ = `<span style="color: tomato;font-size: 20px;"
     id="tongtien2">${convertPrice(sum)}</span>`;
    document.getElementById('tongtien2').innerHTML = html_;
}

function addSoLuong(id,value){
    for(i=0;i<listSelect.length;i++){
        if(listSelect[i].id == id){
            if(listSelect[i].s == 0 & value == -1)
            return;
            listSelect[i].s+=value;
            showSelect();
            keepData();
            return;
        }
    }
    showSelect();
}

function removeSelect(id){
    var a1 = listSelect.slice(0,id);
    var a2 = listSelect.slice(id+1,listSelect.length);
    listSelect = a1.concat(a2);
    keepData();
    showSelect();
}

// var pageProducts;
function fetProducts(){
    fetch(url_product,{
        method: 'get'
    }).then(function (response){
        if (response.status === 200)
        {
            response.json().then(function (text){
                pageProducts = JSON.parse(JSON.stringify(text)).data;
                console.log(pageProducts);
                renderProducts(pageProducts);
                showSelect();
            })
        }
    })
}

function clickthemhang(id){
    listSelect.push(id);
    showSelect();
}


function book(){
    console.log(listSelect);
    var body = '{"listFoodsOrder":{';
    for (i=0;i<listSelect.length-1;i++){
      body += '"'+listSelect[i].id+'":'+listSelect[i].s+',';
    }
    body += '"'+listSelect[listSelect.length-1].id+'":'+listSelect[listSelect.length-1].s+'},';
    body += '"userId":1'
        + '}';
    console.log(JSON.parse(JSON.stringify(body)));
  
    fetch(url_order,{
      method: 'post',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.parse(JSON.stringify(body))
    }).then(function (response) {
      if (response.status === 200) {
          modal.style.display = "block";
          localStorage.removeItem('list_select_keep')
          listSelect = null;
          showSelect();
      }
    });
  }