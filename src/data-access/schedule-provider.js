import clientUtils from "@utils/client-utils";
import constants from "@src/resourses/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    search(param) {
        const parameters =
            (param.page ? "?page=" + param.page : "?page=0") +
            (param.size ? "&size=" + param.size : "&size=10") +
            (param.courseId ? "&courseId=" + param.courseId : "");

        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.schedule + parameters, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    getSchedule() {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.schedule + "/get", {})
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
                .requestApi("post", constants.api.schedule, body)
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
                .requestApi("put", constants.api.schedule + "/" + id, body)
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
                .requestApi("delete", constants.api.schedule + "/" + id, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};