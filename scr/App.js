// app.js

// Placeholder script in case of future functionality.
// Example: Toggle visibility of nav-links for mobile responsiveness.

document.addEventListener('DOMContentLoaded', () => {
  console.log('Navbar script loaded successfully.');
});

const phrases = ["no seu Negócio", "no seu E-commerce", "no seu Delivery", "na sua Loja", "no seu Consultório", "na sua Imobiliária",];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
  const currentPhrase = phrases[currentPhraseIndex];

  if (isDeleting) {
    // Apagar texto
    currentCharIndex--;
    typewriterElement.textContent = currentPhrase.slice(0, currentCharIndex);
  } else {
    // Escrever texto
    currentCharIndex++;
    typewriterElement.textContent = currentPhrase.slice(0, currentCharIndex);
  }

  // Alterar a velocidade de digitação e apagamento
  const typingSpeed = isDeleting ? 50 : 100;

  // Quando uma palavra está totalmente escrita ou apagada
  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // Pausa antes de começar a apagar
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Ir para a próxima frase
    setTimeout(typeEffect, 500); // Pausa antes de começar a digitar
  } else {
    setTimeout(typeEffect, typingSpeed);
  }
}

// Iniciar o efeito
typeEffect();

const features = document.querySelectorAll('.feature');

features.forEach((feature) => {
  feature.addEventListener('mousemove', (e) => {
    const rect = feature.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Ajusta a rotação no eixo X
    const rotateY = ((x - centerX) / centerX) * 10; // Ajusta a rotação no eixo Y

    feature.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  feature.addEventListener('mouseleave', () => {
    feature.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
});

const line = document.querySelector('.line');
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  // Atualiza a altura da linha
  const maxLineHeight = document.querySelector('.timeline-container').offsetHeight;
  const lineHeight = Math.min(maxLineHeight, scrollPosition);
  line.style.height = `${lineHeight}px`;

  // Ativa os pontos ao atingir os cards
  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top + window.scrollY;
    const point = card.querySelector('.point');

    if (scrollPosition > cardTop) {
      point.style.background = '#0027ae';
    } else {
      point.style.background = '#2f63fb';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Animação simples ao carregar a página
  const servicesSection = document.getElementById('services');
  servicesSection.classList.add('fade-in');

  // Estilo de animação
  const styles = document.createElement('style');
  styles.innerHTML = `
      .fade-in {
          opacity: 0;
          animation: fadeIn 2s forwards;
      }
      @keyframes fadeIn {
          to {
              opacity: 1;
          }
      }
  `;
  document.head.appendChild(styles);

  // Adicionando um efeito de hover nas colunas de serviços
  const serviceColumns = document.querySelectorAll('.col-md-4');
  serviceColumns.forEach(col => {
    col.addEventListener('mouseenter', function () {
      col.style.transform = 'scale(1.05)';
      col.style.transition = 'transform 0.3s ease-in-out';
    });
    col.addEventListener('mouseleave', function () {
      col.style.transform = 'scale(1)';
    });
  });
});



// Pegue os elementos necessários
const toggleLabels = document.querySelectorAll(".toggle-label");
const prices = document.querySelectorAll(".card-price");

// Defina os preços para cada plano (mensal e anual)
const pricingData = {
  mensal: [0, 159, 499],  // Preços para planos "Mensal" [Starter, Professional, Premium]
  anual: [0, 1609, 5489], // Preços para planos "Anual" [Starter, Professional, Premium]
};

// Função para formatar valores com "R$" e sem casas decimais
const formatPrice = (value) => {
  return `R$ ${Math.floor(value)}`; // Remove as casas decimais
};

// Função para atualizar os preços com base no plano selecionado
const updatePrices = (plan) => {
  const selectedPrices = pricingData[plan];

  prices.forEach((priceContainer, index) => {
    const price = priceContainer.querySelector('.price');
    const period = priceContainer.querySelector('.period');

    if (selectedPrices[index] === 0) {
      price.textContent = "R$ 0";
      period.textContent = plan === 'mensal' ? "/Mês" : "/Ano";
    } else {
      const formattedPrice = formatPrice(selectedPrices[index]);
      price.textContent = formattedPrice;
      period.textContent = plan === 'mensal' ? "/Mês" : "/Ano";
    }
  });
};

// Adicione um evento de clique aos botões de alternância
toggleLabels.forEach((label) => {
  label.addEventListener("click", () => {
    // Remova a classe 'active' de todos os botões
    toggleLabels.forEach((l) => l.classList.remove("active"));
    // Adicione a classe 'active' ao botão clicado
    label.classList.add("active");

    // Verifique qual plano foi selecionado (mensal ou anual)
    const selectedPlan = label.textContent.trim().toLowerCase(); // Agora usamos o texto do botão

    // Atualize os preços de acordo com o plano selecionado
    updatePrices(selectedPlan);
  });
});

// Pré-seleciona o botão "Mensal" ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  // Encontrar o botão "Mensal" e adicionar a classe 'active' a ele
  const mensalButton = document.querySelector(".toggle-label[data-plan='mensal']");
  if (mensalButton) {
    mensalButton.classList.add("active");

    // Atualiza os preços para o plano mensal
    updatePrices('mensal');
  }
});


const chatBox = document.getElementById("chat-box");
const buttonContainer = document.getElementById("button-container");

document.addEventListener("DOMContentLoaded", function() {
  // Selecione todas as perguntas
  const questions = document.querySelectorAll(".faq-item .question");

  // Adicione um ouvinte de evento de clique a cada pergunta
  questions.forEach(function(question) {
      // Encontre a resposta correspondente pela classe 'answer'
      const answer = question.nextElementSibling;

      // Inicialmente, as respostas devem estar ocultas
      answer.classList.remove("show"); // Certifique-se de que a resposta começa oculta

      question.addEventListener("click", function() {
          // Alterna a exibição da resposta
          if (answer.classList.contains("show")) {
              answer.classList.remove("show"); // Remove a classe 'show' para esconder a resposta
          } else {
              answer.classList.add("show"); // Adiciona a classe 'show' para exibir a resposta com animação
          }
          // Não é necessário manipular 'display' diretamente, a classe 'show' já gerencia isso
      });
  });
});



// Selecione o ícone de menu e os links de navegação
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Adicione o evento de clique no ícone de menu
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');  // Alterna a visibilidade dos links
  navToggle.classList.toggle('active'); // Altera o estilo do ícone
});


