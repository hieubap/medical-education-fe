import clientUtils from "@utils/client-utils";
import constants from "@src/resourses/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  search() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.result, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
