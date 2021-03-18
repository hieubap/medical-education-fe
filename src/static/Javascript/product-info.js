var listSelect= localStorage.getItem("list_select_keep")==null?[]:JSON.parse(localStorage.getItem("list_select_keep"));

var pageProducts;

function callApi(){
    fetch(url_product,{
        method: 'get'
    }).then(function (response){
        if (response.status === 200)
        {
            response.json().then(function (text){
                pageProducts = JSON.parse(JSON.stringify(text)).data;
                console.log(pageProducts);
                renderProducts(pageProducts);
                showSelect(listSelect,pageProducts);
                console.log('done load');
            })
        }
    })

    var url_get_info = url_product+'&id='+new URLSearchParams(window.location.search).get('id');
    console.log(url_get_info);
    fetch(url_get_info,{
        method: 'get'
    }).then(function (response){
        if (response.status === 200)
        {
            response.json().then(function (text){
                var data_info = JSON.parse(JSON.stringify(text)).data[0];
                showInfor(data_info);
                addButtonAction();
            })
        }
    })
}

function addButtonAction(){
    document.getElementById('btn_themhang').addEventListener('click',function (e){
        var param = new URLSearchParams(window.location.search).get('id');
        themhang(param);
        console.log('đã thêm ' + param);
    })

    document.getElementById('mua_ngay').addEventListener('click',function (e){
        var param = new URLSearchParams(window.location.search).get('id');
        themhang(param);
        console.log('mua ngay');
        location.replace(url_giohang)
    })
    document.getElementById('xem_gio_hang').addEventListener('click',function (e){
        location.replace(url_giohang);
    });
    // document.getElementById('search_input').addEventListener('keypress',function (e){
    //     if (event.keyCode === 13) {fetProducts();}
    //   })
    // document.getElementById('search_btn').addEventListener('click',function (e){
    //         fetProducts();
    //   })
}

// function showSelect(){
//     var html_ = '';
//     for(i=0;i<listSelect.length;i++)
//     for(j = 0;j<pageProducts.length;j++){
//         var pageProduct = pageProducts[j];
//         if(listSelect[i].id == pageProduct.id) {
//         html_ += `
//         <li title="${pageProduct.title}" class="header__cart-item">
//         <div class="header__cart-img-wrapper">
//         <img src="${pageProduct.img}" class="header__cart-img">
//         </div>
//         <div class="header__cart-item-info">
//         <div class="header__cart-item-head">
//         <div class="header__cart-item-name">${pageProduct.name}</div>
//         <div class="header__cart-item-price-wrap">
//         <span class="header__cart-item-price">${convertPrice(pageProduct.newPrice)}</span>
//         <span class="header__cart-item-multiply">x</span>
//         <span class="header__cart-item-qnt">${listSelect[i].s}</span>
//         </div>												
//         </div>
//         <div class="header__cart-item-body">
//         <span class="header__cart-item-description">
//         Phân loại: Hàng Quốc tế
//         </span>
//         <span class="header__cart-item-remove" onclick="removeSelect(${pageProduct.id})">Xóa</span>
//         </div>
//         </div></li>`;
//         }
//     }
//     document.getElementById('list_select').innerHTML = html_;
//     document.getElementById('number_select').innerHTML = listSelect.length;
// }

function themhang(id){
    window.alert('đã thêm vào giỏ hàng')
    for(j=0;j<listSelect.length;j++)
    {   
        if(listSelect[j].id == id)
        {
            return console.log('đã thêm vào giỏ hàng')
        }

    };

    var str = '{"id":'+id+',"s":1}';
    console.log(str);
    listSelect.push(JSON.parse(str));
    showSelect(listSelect,pageProducts);
    keepData(listSelect);
}

function removeSelect(id){
    for(i=0;i<listSelect.length;i++)
    {
        if(listSelect[i].id == id){
            var a1 = listSelect.slice(0,i);
            var a2 = listSelect.slice(i+1,listSelect.length);
            listSelect = a1.concat(a2);
            showSelect(listSelect,pageProducts);
            keepData();
        }
    }
}

function showInfor(body){
    var html_ = `<div class="item_information content" id="item_info_2">
    <div>
        <div class="head_str">${body.title}</div>
        <div class="head_str">${body.name}</div>
        <div>
            <div style="margin-top:17px;float: left;">
                <span style="padding-left:20px;white-space:pre-wrap;font-size: 18px;"> ${body.star} </span>
            </div>
            <div class="home-product-item__rating" style="float: left;margin-top: 13px;">
                <i class="home-product-item__star--gold fas fa-star icon_star" ></i>
                <i class="home-product-item__star--gold fas fa-star icon_star" ></i>
                <i class="home-product-item__star--gold fas fa-star icon_star" ></i>
                <i class="home-product-item__star--gold fas fa-star icon_star" ></i>
                <i class="home-product-item__star--gold fas fa-star icon_star" ></i>
                </div>
            <div style="margin-top:17px;float: left;">
                <span style="white-space:pre-wrap;font-size: 18px;"> | ${body.numberComment} đánh giá | ${convertDaBan(body.numberSell)} đã bán</span>
            </div>
            <div style="clear:both;"></div>
        </div>
    </div>
    <div id="id_3">
    <div class="price_old">${convertPrice(body.oldPrice)}</div>    
    <div class="price_new">${convertPrice(body.newPrice)}</div>    
    </div>
    <div class="type_">
        phân loại
    </div>
    <div class="type_">
        số lượng: ${body.number}
    </div>
    <div class="type_">
        màu sắc
    </div>
    <div class="type_">
        <button class="btn_order btn_green" id="btn_themhang">thêm vào giỏ hàng</button>
        <button class="btn_order btn_green" id="mua_ngay">mua ngay</button>
    </div>
</div>`;
document.getElementById('id_1').innerHTML = html_;
document.getElementById('id_2').innerHTML = `<img src="${body.img}" style="width: 100%;"></img>`;
}

