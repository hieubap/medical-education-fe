const local = false;

let domain = "";
let domainApi = "";

if(!local){
    domain = "http://45.13.132.247:8082";
    domainApi = "http://45.13.132.247:8082";
}
else{
    domain = "http://localhost:8082";
    domainApi = "http://localhost:8082";
}

export const api_login = domainApi + "/users/login";
export const api_register = domainApi + "/users/register";
export const api_change_password = domainApi + "/users/change-password";
export const api_upload_image = domainApi + "/users/upload-avatar";
export const api_images = domainApi + "/images/"
export const api_change_info = domainApi + "/users/change-info"
export const api_approve_change_info = domainApi + "/users/admin-approve-change-info/"


export const api_course = domain + "/courses";
export const api_course_update = domain + "/courses/";
export const api_course_delete = domain + "/courses/";

export const api_course_register = domain + "/course-register";

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

export const url_class = domainApi + "/class?"
export const url_class_update = domainApi + "/class/"
export const url_class_delete = domainApi + "/class/"

export const url_course_register = domainApi + "/course-register"
export const url_register_course = domainApi + "/course-register/"

export const url_student = domainApi + "/users?role=STUDENT"

export const url_course_subject = domainApi + "/course-subject"

export const api_class = domainApi + "/class"
export const api_place = domainApi + "/place"
export const api_study_process = domainApi + "/study-process"
export const api_class_register = domainApi + "/class-register"

export const api_user = domainApi + "/users"

