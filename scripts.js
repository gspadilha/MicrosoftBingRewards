window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".buttonNormal, .buttonMobile");

  for (var btn of buttons) {
    addClick(btn);
  }
});

function addClick(btn) {
  btn.addEventListener("click", (e) => {
    const url = e.target.getAttribute("data-url");
    e.target.classList.add("buttonClick");
    window.open(url, "_blank");
  });
}
