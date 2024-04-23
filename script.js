const openBtn = document.getElementById('openButton');
const closeBtn = document.getElementById('closeButton');
const floatingWindow = document.getElementById('floatingWindow');
const content = document.querySelector('.content');
const talkBtn = document.getElementById('talkButton'); // Adicionando o botão de fala

function falar(texto) {
  const texto_falar = new SpeechSynthesisUtterance(texto);
  texto_falar.rate = 1;
  texto_falar.volume = 1;
  texto_falar.pitch = 1;
  window.speechSynthesis.speak(texto_falar);
}

function meCumprimentar() {
  const dia = new Date();
  const hora = dia.getHours();

  if (hora >= 0 && hora < 12) {
    falar("Bom dia Chefe...");
  } else if (hora >= 12 && hora < 17) {
    falar("Boa tarde Chefe, como posso ajudá-lo?");
  } else {
    falar("Boa noite Chefe, como posso ajudá-lo?");
  }
}

openBtn.addEventListener('click', () => {
  floatingWindow.style.display = 'block';
  falar("Inicializando JARVIS...");
  meCumprimentar();
});

closeBtn.addEventListener('click', () => {
  floatingWindow.style.display = 'none';
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR'; // Definir idioma para português brasileiro
recognition.maxAlternatives = 1; // Obter apenas a melhor alternativa

recognition.onresult = (event) => {
  const indiceAtual = event.resultIndex;
  const transcrição = event.results[indiceAtual][0].transcript;
  const confidence = event.results[indiceAtual][0].confidence;

  if (confidence >= 0.6) {
    content.textContent = transcrição;
    capturarComando(transcrição.toLowerCase());
  } else {
    content.textContent = "Não entendi, por favor, repita com clareza.";
  }
};

const capturarComando = (mensagem) => {
  if (mensagem.includes('olá') || mensagem.includes('Oi')) {
    falar("Olá, Bom dia Senhor, como posso ajudar você hoje?");
  } else if (mensagem.includes("abrir google")) {
    window.open("https://google.com", "_blank");
    falar("Abrindo o Google...");
  } else if (mensagem.includes("abrir asana")) {
    window.open("https://asana.com/pt", "_blank");
    falar("Abrindo o Asana...");
  } else if (mensagem.includes("abrir gmail")) {
    window.open("https://gmail.com/", "_blank");
    falar("Abrindo o Gmail...");
  } else if (mensagem.includes("abrir youtube")) {
    window.open("https://youtube.com", "_blank");
    falar("Abrindo o Youtube...");
  } else if (mensagem.includes("mesa projetos")) {
    window.open("https://sei.sistemas.ro.gov.br/sip/login.php?sigla_orgao_sistema=ABC&sigla_sistema=SEI", "_blank");
    falar("Abrindo o SEI...");
  } else if (mensagem.includes('o que é') || mensagem.includes('quem é') || mensagem.includes('o que são')) {
    window.open(`https://www.google.com/search?q=${mensagem.replace(" ", "+")}`, "_blank");
    const textoFinal = "Isso é o que eu encontrei na internet sobre " + mensagem;
    falar(textoFinal);
  } else if (mensagem.includes('wikipedia')) {
    window.open(`https://pt.wikipedia.org/wiki/${mensagem.replace("wikipedia", "").trim()}`, "_blank");
    const textoFinal = "Isso é o que eu encontrei na Wikipedia sobre " + mensagem;
    falar(textoFinal);
  } else if (mensagem.includes('horário')) {
    const horaAtual = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    const textoFinal = "A hora atual é " + horaAtual;
    falar(textoFinal);
  } else if (mensagem.includes('data')) {
    const dataAtual = new Date().toLocaleString(undefined, { day: "numeric", month: "numeric", year: "numeric" });
    const textoFinal = "A data de hoje é " + dataAtual;
    falar(textoFinal);
  } else if (mensagem.includes('calculadora')) {
    window.open('Calculator:///');
    const textoFinal = "Abrindo a Calculadora";
    falar(textoFinal);
  } else {
    window.open(`https://www.google.com/search?q=${mensagem.replace(" ", "+")}`, "_blank");
    const textoFinal = "Eu encontrei algumas informações sobre " + mensagem + " no Google";
    falar(textoFinal);
  }
};

// Adicionando evento de clique para o botão de fala
talkBtn.addEventListener('click', () => {
  content.textContent = "Ouvindo...";
  recognition.start();
});
