const domainApi = "http://localhost:8081";
const domain = "http://127.0.0.1:5500/";
const url_giohang = domain + "/giohang.html";
const url_management = domain + "/management.html";
const url_home = domain + "/index.html";

const url_login = domainApi + "/login";

const url_product = domainApi + "/product?";
const url_product_create = domainApi + "/product";
const url_product_update = domainApi + "/product/";

const url_menu = domainApi + "/product?name=";
const url_menu_delete = domainApi + "/product/";
const url_order = domainApi + "/bill";

const url_confirm = domainApi + "/bill/confirm/";
const url_cancel = domainApi + "/bill/cancel/";
const url_bill = domainApi + "/bill/get-bill";
const url_order_new = domainApi + "/bill/get-order";
const url_bill_delete = domainApi + "/bill/";
const url_bill_dashboard =
  domainApi + "/bill/dashboard?from=2021-01-01&to=2021-04-01";

const url_notification = domainApi + "/notification?ownerId=2";
const url_notification_read = domainApi + "/notification/read/";
const url_notification_delete = domainApi + "/notification/";
const url_notification_count_read = domainApi + "/notification/read/count";

const url_typeProduct = domainApi + "/typeProduct?";
const url_typeProduct_update = domainApi + "/typeProduct/";
const url_typeProduct_delete = domainApi + "/typeProduct/";

const url_store = domainApi + "/store?";
const url_store_update = domainApi + "/store/";
const url_store_delete = domainApi + "/store/";

const url_evaluate = domainApi + "/evaluate?";
const url_evaluate_update = domainApi + "/evaluate/";
const url_evaluate_delete = domainApi + "/evaluate/";

export function convertPrice(money) {
  return new Intl.NumberFormat("de-DE").format(money) + " đ";
}
export function withSuffix(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }