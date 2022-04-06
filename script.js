let fromLang = document.querySelector("#from");
let toLang = document.querySelector("#to");
let fromInput = document.querySelector(".from__input");
let toInput = document.querySelector(".to__input");
let changer = document.querySelector(".changer");
let btn = document.querySelector(".run__btn");
let langs = [];
let langsArr = [];
btn.addEventListener("click", function () {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", fromInput.value);
  encodedParams.append("target", toLang.value);
  encodedParams.append("source", fromLang.value);

  const option = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      "X-RapidAPI-Key": "97416f0647mshd2f9e4b4dce799cp1d2ebbjsn740c380f4aef",
    },
    body: encodedParams,
  };

  fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    option
  )
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".to__input").value =
        response.data.translations[0].translatedText;
      console.log(response.data.translations[0].translatedText);
    })
    .catch((err) => console.error(err));
  /**data:
translations: Array(1)
0: {translatedText: 'hello'}
length: 1 */
});
const options = {
  method: "GET",
  headers: {
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    "X-RapidAPI-Key": "97416f0647mshd2f9e4b4dce799cp1d2ebbjsn740c380f4aef",
  },
};

fetch(
  "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
  options
)
  .then((response) => response.json())
  .then((response) => {
    langs = response.data.languages;
    langs.forEach((element) => {
      let optin = `<option value="${element.language}">${element.language}</option>`;
      fromLang.insertAdjacentHTML("beforeend", optin);
      toLang.insertAdjacentHTML("beforeend", optin);
    });
  })
  .catch((err) => console.error(err));
