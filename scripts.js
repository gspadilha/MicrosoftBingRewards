window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".buttonNormal, .buttonMobile");

  for (var btn of buttons) {
    addClick(btn);
  }
});

function allowClick() {
	document.body.classList.remove("newCall");
	document.body.classList.add("waitCall");
	setTimeout(() => {
		document.body.classList.remove("waitCall");
		document.body.classList.add("newCall");
	}, 15000)
}

function addClick(btn) {
  btn.addEventListener("click", (e) => {
	allowClick();
	const url = e.target.getAttribute("data-url");
    e.target.classList.add("buttonClick");
    window.open(url, "_blank");
  });
}
