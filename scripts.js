const palavras = [
  "amor", "beleza", "coragem", "destino", "esperança", "felicidade", 
  "gratidão", "harmonia", "inspiração", "justiça", "liberdade", "magia", 
  "natureza", "orgulho", "paz", "qualidade", "respeito", "saúde", "tempo", 
  "união", "vida", "sabedoria", "alegria", "bondade", "cuidado", "desejo", 
  "energia", "fé", "glória", "honra", "igualdade", "jovem", "luz", "misericórdia", 
  "nobreza", "oportunidade", "poder", "querença", "reconhecimento", "sensibilidade", 
  "tolerância", "união", "valor", "vontade", "xale", "zelo", "aventura", "bravura", 
  "criatividade", "dignidade", "esperança", "futuro", "generosidade", "humildade", 
  "imaginação", "juventude", "lealdade", "maturidade", "nobreza", "oásis", "paixão", 
  "riqueza", "solidariedade", "tranquilidade", "união", "vitalidade", "xodó", 
  "zumbido", "abrigo", "bênção", "confiança", "destemor", "excelência", "firmeza", 
  "grandeza", "honestidade", "iluminação", "jornada", "leitura", "motivação", 
  "nitidez", "originalidade", "perseverança", "riqueza", "serenidade", "triunfo", 
  "união", "vitória", "xilofone", "zebra", "brilho", "coragem", "descoberta",
  "abacaxi", "amor", "arco", "banco", "bicicleta", "bola", "cachorro", "caderno", "café", "calor",
  "carro", "casa", "cima", "coração", "criança", "dente", "elefante", "escola", "fogo", "flor",
  "gato", "golfinho", "guerra", "internet", "jardim", "jogo", "leão", "livro", "lua", "mãe",
  "menino", "mesa", "mulher", "navio", "noite", "océano", "olho", "ônibus", "pato", "pedra",
  "piano", "porta", "praia", "rato", "rocha", "sapo", "sol", "tigre", "vaca", "vento"
];

// 5 minutos
const TIME = 1000*60*5;

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

// Função para clicar nos botões a cada X segundos
function cycleButtons(buttons) {
  let index = 0;

  setInterval(() => {
    if (index < buttons.length) {
      clickButtonWithBorder(buttons[index], index);
      index++;
    }
  }, TIME);
}

function addClick(btn, i, p) {
  btn.addEventListener("click", (e) => {
    let url = e.target.getAttribute("data-url");
    const p = selecionarEPegarTresPalavras(palavras);
    console.log(p, url)
    url = url.replace('teste:INDICE:', p);
    e.target.classList.add("buttonClick");
    window.open(url, "_blank");
  });
}

// Função para selecionar três palavras aleatórias sem repetições
function selecionarEPegarTresPalavras(palavras) {
  // Embaralha o array e seleciona os 3 primeiros elementos
  const palavrasAleatorias = [];
  
  while (palavrasAleatorias.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    if (!palavrasAleatorias.includes(palavras[indiceAleatorio])) {
      palavrasAleatorias.push(palavras[indiceAleatorio]);
    }
  }
  
  // Concatena as 3 palavras com um espaço
  return palavrasAleatorias.join(' ');
}

