let ipTabelDetails = function (onjectIP) {
  return `<div class="table-wrap">
    <table class="table">
        <tbody>
            <tr class="ip-striped">
                <td class="key">IP Address</td>
                <td class="ipval">${onjectIP.ip}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">City</td>
                <td class="ipval">${onjectIP.city}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Country</td>
                <td class="ipval">${onjectIP.country_name}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Latitude / Longitude</td>
                <td class="ipval">${onjectIP.latitude}, ${onjectIP.longitude}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Time Zone</td>
                <td class="ipval">${onjectIP.timezone} (${onjectIP.utc_offset})</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Calling Code</td>
                <td class="ipval">${onjectIP.country_calling_code}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Currency</td>
                <td class="ipval">${onjectIP.currency}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Languages</td>
                <td class="ipval">${onjectIP.languages}</td>
            </tr>
            <tr class="ip-striped">
                <td class="key">Org</td>
                <td class="ipval">${onjectIP.org}</td>
            </tr>
        </tbody>
    </table>    
    <div class="lds-dual-ring"></div>
    <div class="response-of-validation"></div>
    <button type="button" id="validate-response" class="btn-track">Validate response</button>
  </div>`;
};

let formField = document.querySelector(".form__field"),
  ipTabel = document.querySelector(".details-wrap"),
  trackIP = document.querySelector(".btn-track"),
  ipInfo = {};

trackIP.addEventListener("click", e => {
  let urlIP = `https://ipapi.co/${formField.value}/json/`;

  http.get(urlIP).then(
    resultGET => {
      let jsonParseGet = JSON.parse(resultGET);

      if (jsonParseGet.error) {
        ipTabel.innerHTML = jsonParseGet.reason;
        return;
      }
      Object.assign(ipInfo, jsonParseGet);
      ipTabel.innerHTML = ipTabelDetails(ipInfo);


      let validateResponse = document.getElementById("validate-response");
      validateResponse.addEventListener("click", function () {
        let loadingGif = document.querySelector(".lds-dual-ring");
        let responseValid = document.querySelector(".response-of-validation");
        loadingGif.style.display = "inline-block";

        http.post("https://shrouded-garden-94580.herokuapp.com", resultGET).then(
          resultPOST => {
            loadingGif.style.display = "none";
            responseValid.innerHTML = resultPOST;
          },
          errorPOST => {
            loadingGif.style.display = "none";
            responseValid.classList.add("error");
            responseValid.innerHTML = errorPOST;
          }
        );
      });
    },

    errorGET => {
      ipTabel.innerHTML = errorGET;
    }
  );
});
