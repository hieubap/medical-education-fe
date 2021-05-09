
const UrlServer = () => {
  // const userApp = useSelector(state => state.userApp);
  const localhost = false;
  return localhost ? "http://localhost:8082" : "http://45.13.132.247:8082";
};

UrlServer();

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  auth:"",
  requestApi(methodType, url, body) {
    return new Promise((resolve, reject) => {
      var dataBody = "";
      if (!body) body = {};
      dataBody = JSON.stringify(body);
      this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.auth,
        },
        dataBody
      )
        .then((s) => {
          s.json()
            .then((val) => {
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            window.location.href = "/dang-nhap";
          }
          reject(e);
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            window.location.href = "/dang-nhap";
          }
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };

      if (methodType.toLowerCase() !== "get") {
        fetchParam.body = body;
      }
      return fetch(UrlServer() + url, fetchParam)
        .then((json) => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
