window.addEventListener("load", () => {
  const buttons2 = document.querySelectorAll(".buttonNormal, .buttonMobile");

  for (var btn of buttons2) {
    addClick(btn);
  }

  // Seleciona todos os botões na página
  const buttons = document.querySelectorAll(".buttonNormal");

  // Chama a função para começar a "clicar" nos botões a cada 15 segundos
  cycleButtons(buttons);
});

// Função para adicionar o border e clicar no botão
function clickButtonWithBorder(button, index) {
  // Adiciona o border ao botão
  button.style.border = "2px solid red";

  // Simula o clique no botão
  button.click();
}

// Função para clicar nos botões a cada 15 segundos
function cycleButtons(buttons) {
  let index = 0;

  // Intervalo de 15 segundos (15000 milissegundos)
  setInterval(() => {
    if (index < buttons.length) {
      clickButtonWithBorder(buttons[index], index);
      index++;
    }
  }, 15000);
}

function allowClick() {
  document.body.classList.remove("newCall");
  document.body.classList.add("waitCall");
  setTimeout(() => {
    document.body.classList.remove("waitCall");
    document.body.classList.add("newCall");
  }, 15000);
}

function addClick(btn) {
  btn.addEventListener("click", (e) => {
    // allowClick();
    const url = e.target.getAttribute("data-url");
    e.target.classList.add("buttonClick");
    window.open(url, "_blank");
  });
}
