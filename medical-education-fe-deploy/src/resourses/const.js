module.exports = {
  action: {
    action_user_login: "ACTION_USER_LOGIN",
    action_user_logout: "ACTION_USER_LOGOUT",
    action_user_user_email: "ACTION_USER_USER_EMAIL",
  },
  role: {
    admin: "ROLE_ADMIN",
    teacher: "ROLE_TEACHER",
    student: "ROLE_STUDENT",
  },
  roles:{
    admin: "ADMIN",
    teacher: "TEACHER",
    student: "STUDENT",
  },
  api:{
    courses:'/courses',
    subjects:'/subjects',
    class:'/class',
    place:'/place',
    users:'/users',
    registerCourse:'/course-register',
    healthFacility:'/health-facility',
    schedule:'/schedule',
  },
  courseRegister:{
    status:{
      new:"Mới thêm",
      ok:"Thành công"
    }
  }
};
