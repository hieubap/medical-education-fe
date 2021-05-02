import clientUtils from "@utils/client-utils";
import constants from "@src/resourses/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  search(param) {
    const parameters =
      (param.page ? "?page=" + param.page : "?page=0") +
      (param.size ? "&size=" + param.size : "&size=10") +
      (param.name ? "&name=" + param.name : "") +
      (param.nameFacility ? "&nameFacility=" + param.nameFacility : "") +
      (param.nameCreator ? "&nameCreator=" + param.nameCreator : "") +
      (param.priceFrom ? "&priceFrom=" + param.priceFrom : "") +
      (param.priceTo ? "&priceTo=" + param.priceTo : "");

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.courses + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  detail(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.courses + "/" + id, {})
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
        .requestApi("post", constants.api.courses, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  update(body, id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.courses + "/" + id, body)
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
        .requestApi("delete", constants.api.courses + "/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
