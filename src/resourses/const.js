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
      color: "danger",
    },
    teacher: {
      name: "Giảng viên",
      value: "TEACHER",
      color: "success",
    },
    student: {
      name: "Sinh viên",
      value: "STUDENT",
      color: "primary",
    },
  },
  api: {
    courses: "/courses",
    subjects: "/subjects",
    class: "/class",
    place: "/place",
    users: "/users",
    approveTeacher: "/users/admin-approve-teacher/",
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
      value: 1,
    },
    studying: {
      id: 2,
      name: "Đang học",
      color: "success",
      value: 2,
    },
    done: {
      id: 3,
      name: "Hoàn thành",
      color: "warning",
      value: 3,
    },
  },
  kip: {
    kip1: {
      name: "07:00 - 09:00",
      value: 1,
    },
    kip2: {
      name: "09:00 - 11:00",
      value: 2,
    },
    kip3: {
      name: "12:00 - 15:00",
      value: 3,
    },
    kip4: {
      name: "15:00 - 17:00",
      value: 4,
    },
  },
  gender: {
    nam: {
      name: "Nam",
      value: 0,
    },
    nu: {
      name: "Nữ",
      value: 1,
    },
  },
};
