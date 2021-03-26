const domain = "http://localhost:8082"
const domainApi = "http://localhost:8082"

export const token = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE2MDIxOTQ5LCJleHAiOjE2MTcyMTAwMDB9.F1WZAJc7dX_Gl46SslFlTCvmYW8iw_LF9aeiH9W2vsWCag8-kb75lfrUnhPdAX5z";

export const api_course = domain + "/courses";
export const api_course_update = domain + "/courses/";
export const api_course_delete = domain + "/courses/";

export const api_subject = domain + "/subjects";
export const api_subject_update = domain + "/subjects/";
export const api_subject_delete = domain + "/subjects/";


export const url_confirm = domainApi + "/bill/confirm/";
export const url_cancel = domainApi + "/bill/cancel/";
export const url_bill = domainApi + "/bill/get-bill";
export const url_order_new = domainApi + "/bill/get-order";
export const url_bill_delete = domainApi + "/bill/";
export const url_bill_dashboard = domainApi + "/bill/dashboard?from=2021-01-01&to=2021-04-01";

export const url_notification = domainApi + "/notification?ownerId=2"
export const url_notification_read = domainApi + "/notification/read/"
export const url_notification_delete = domainApi + "/notification/"
export const url_notification_count_read = domainApi + "/notification/read/count"