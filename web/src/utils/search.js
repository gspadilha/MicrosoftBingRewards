import { BASE_URL, PALAVRAS } from "../constants";

export function pickThreeWords() {
  const picked = [];
  while (picked.length < 3) {
    const idx = Math.floor(Math.random() * PALAVRAS.length);
    if (!picked.includes(PALAVRAS[idx])) picked.push(PALAVRAS[idx]);
  }
  return picked.join(" ");
}

export function buildSearchUrl() {
  const palavras = pickThreeWords();
  return BASE_URL.replace("teste:INDICE:", palavras);
}
