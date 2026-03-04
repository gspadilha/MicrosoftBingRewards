import { BASE_URL, PALAVRAS } from "../constants";

export function pickThreeWords() {
  const picked = new Set();
  while (picked.size < 3) {
    picked.add(PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]);
  }
  return Array.from(picked).join(" ");
}

export function buildSearchUrl() {
  const palavras = pickThreeWords();
  return BASE_URL.replace("teste:INDICE:", palavras);
}
