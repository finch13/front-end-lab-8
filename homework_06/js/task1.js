let http = {
  get: function (url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          var error = new Error(xhr.statusText);
          error.code = xhr.status;
          reject(error);
        }
      };
      xhr.onerror = () => {
        reject(new Error("Network Error"));
      };
      xhr.send();
    });
  },

  post: function (url, requestBody) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          var error = new Error(xhr.statusText);
          error.code = xhr.status;
          reject(error);
        }
      };
      xhr.onerror = () => {
        reject(new Error("Network Error"));
      };
      xhr.send(requestBody);
    });
  }
};
