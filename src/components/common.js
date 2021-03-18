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