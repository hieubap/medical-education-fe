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
  roles: {
    admin: {
      name: "Quản lý",
      value: "ADMIN",
      color: "danger"
    },
    teacher: {
      name: "Giảng viên",
      value: "TEACHER",
      color: "success"
    },
    student: {
      name: "Sinh viên",
      value: "STUDENT",
      color: "primary"
    },
  },
  api: {
    courses: "/courses",
    subjects: "/subjects",
    class: "/class",
    place: "/place",
    users: "/users",
    registerCourse: "/register",
    healthFacility: "/health-facility",
    schedule: "/schedule",
    result: "/result",
  },
  courseRegister: {
    status: {
      new: "Mới thêm",
      ok: "Thành công",
    },
  },
  courseStatus: {
    timeRegister: {
      id: 1,
      name: "Thời gian đăng ký",
      color: "primary",
    },
    studying: {
      id: 2,
      name: "Đang học",
      color: "success",
    },
    done: {
      id: 3,
      name: "Hoàn thành",
      color: "warning",
    },
  }
};
