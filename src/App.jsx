import { useState, useEffect, useRef } from 'react';
import './App.css';

const BASE_URL =
  'https://www.bing.com/search?q=teste:INDICE:&aqs=edge..69i57.15241j0j1&pglt=675&FORM=ANCMS9&PC=EDGEDB';

const PALAVRAS = [
  'amor', 'beleza', 'coragem', 'destino', 'esperança', 'felicidade',
  'gratidão', 'harmonia', 'inspiração', 'justiça', 'liberdade', 'magia',
  'natureza', 'orgulho', 'paz', 'qualidade', 'respeito', 'saúde', 'tempo',
  'união', 'vida', 'sabedoria', 'alegria', 'bondade', 'cuidado', 'desejo',
  'energia', 'fé', 'glória', 'honra', 'igualdade', 'jovem', 'luz', 'misericórdia',
  'nobreza', 'oportunidade', 'poder', 'querença', 'reconhecimento', 'sensibilidade',
  'tolerância', 'valor', 'vontade', 'xale', 'zelo', 'aventura', 'bravura',
  'criatividade', 'dignidade', 'futuro', 'generosidade', 'humildade',
  'imaginação', 'juventude', 'lealdade', 'maturidade', 'oásis', 'paixão',
  'riqueza', 'solidariedade', 'tranquilidade', 'vitalidade', 'xodó',
  'zumbido', 'abrigo', 'bênção', 'confiança', 'destemor', 'excelência', 'firmeza',
  'grandeza', 'honestidade', 'iluminação', 'jornada', 'leitura', 'motivação',
  'nitidez', 'originalidade', 'perseverança', 'serenidade', 'triunfo',
  'vitória', 'xilofone', 'zebra', 'brilho', 'descoberta',
  'abacaxi', 'arco', 'banco', 'bicicleta', 'bola', 'cachorro', 'caderno', 'café', 'calor',
  'carro', 'casa', 'cima', 'coração', 'criança', 'dente', 'elefante', 'escola', 'fogo', 'flor',
  'gato', 'golfinho', 'guerra', 'internet', 'jardim', 'jogo', 'leão', 'livro', 'lua', 'mãe',
  'menino', 'mesa', 'mulher', 'navio', 'noite', 'océano', 'olho', 'ônibus', 'pato', 'pedra',
  'piano', 'porta', 'praia', 'rato', 'rocha', 'sapo', 'sol', 'tigre', 'vaca', 'vento',
];

// 5 minutes
const AUTO_CYCLE_TIME = 1000 * 60 * 5;

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  return `${year}${month}${day}${hour}`;
}

function pickThreeWords() {
  const picked = [];
  while (picked.length < 3) {
    const idx = Math.floor(Math.random() * PALAVRAS.length);
    if (!picked.includes(PALAVRAS[idx])) picked.push(PALAVRAS[idx]);
  }
  return picked.join(' ');
}

export default function App() {
  const hoje = getToday();
  const normalLabels = Array.from({ length: 36 }, (_, i) => `${hoje}n-${i}`);
  const mobileLabels = Array.from({ length: 21 }, (_, i) => `${hoje}p-${i}`);

  // Set of labels that have been manually or auto clicked (green border)
  const [clicked, setClicked] = useState(new Set());
  // Set of labels triggered by the auto-cycle (red border, overrides green)
  const [autoCycled, setAutoCycled] = useState(new Set());

  const autoIndexRef = useRef(0);

  function doClick(label) {
    const palavras = pickThreeWords();
    const url = BASE_URL.replace('teste:INDICE:', palavras);
    setClicked((prev) => new Set([...prev, label]));
    window.open(url, '_blank');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoIndexRef.current < normalLabels.length) {
        const label = normalLabels[autoIndexRef.current];
        // Red border for auto-cycled buttons (matches original inline style behaviour)
        setAutoCycled((prev) => new Set([...prev, label]));
        doClick(label);
        autoIndexRef.current += 1;
      }
    }, AUTO_CYCLE_TIME);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function btnClass(base, label) {
    const parts = [base];
    if (clicked.has(label)) parts.push('buttonClick');
    return parts.join(' ');
  }

  function btnStyle(label) {
    // Inline style overrides class, replicating original JS behaviour
    return autoCycled.has(label) ? { border: '2px solid red' } : undefined;
  }

  return (
    <div>
      <h1>Não esqueça de pressionar CTRL</h1>

      <div className="button-grid">
        {normalLabels.map((label, i) => (
          <span key={label}>
            <button
              type="button"
              className={btnClass('buttonNormal', label)}
              style={btnStyle(label)}
              onClick={() => doClick(label)}
            >
              {label}
            </button>
            {(i + 1) % 6 === 0 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
