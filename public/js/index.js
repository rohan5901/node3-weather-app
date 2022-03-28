const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  const url = `/weather?address=${location}`;

  message1.textContent = "loading...";
  message2.textContent = "";
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.loc;
        message2.textContent = data.forecast;
      }
    });
  });
  search.value = "";
});
