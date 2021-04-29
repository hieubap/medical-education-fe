import clientUtils from "@utils/client-utils";
import constants from "@src/resourses/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  search(param) {
    const parameters =
      (param.page ? "?page=" + param.page : "?page=0") +
      (param.size ? "&size=" + param.size : "&size=10") +
      (param.name ? "&name=" + param.name : "") +
      (param.code ? "&code=" + param.code : "");

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.healthFacility + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  create(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.healthFacility, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  update(body,id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.healthFacility + "/" + id, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("delete", constants.api.healthFacility + "/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
