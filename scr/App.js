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
    const selectedPrices = pricingData[selectedPlan];

    prices.forEach((priceContainer, index) => {
      const price = priceContainer.querySelector('.price');
      const period = priceContainer.querySelector('.period');

      // Caso o preço seja 0, mantemos a exibição "R$ 0" e o texto "/Mensal" ou "/Anual"
      if (selectedPrices[index] === 0) {
        price.textContent = "R$ 0";  // Mantém "R$ 0" no caso do preço ser zero
        period.textContent = selectedPlan === 'mensal' ? "/Mês" : "/Ano";  // Adiciona o período corretamente
      } else {
        const formattedPrice = formatPrice(selectedPrices[index]);
        const label = selectedPlan === 'mensal' ? '/Mês' : '/Ano'; // Adiciona "Mensal" ou "Anual"

        price.textContent = formattedPrice; // Atualiza o preço
        period.textContent = label; // Atualiza o período
      }
    });
  });
});

// Pré-seleciona o botão "Mensal" ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  // Encontrar o botão "Mensal" e adicionar a classe 'active' a ele
  const mensalButton = document.querySelector(".toggle-label[data-plan='mensal']");
  if (mensalButton) {
    mensalButton.classList.add("active");

    // Atualiza os preços para o plano mensal
    const selectedPrices = pricingData.mensal;
    prices.forEach((priceContainer, index) => {
      const price = priceContainer.querySelector('.price');
      const period = priceContainer.querySelector('.period');

      // Caso o preço seja 0, mantemos a exibição "R$ 0" e o texto "/Mensal"
      if (selectedPrices[index] === 0) {
        price.textContent = "R$ 0";
        period.textContent = "Mensal";
      } else {
        const formattedPrice = formatPrice(selectedPrices[index]);
        price.textContent = formattedPrice;
        period.textContent = "Mensal";
      }
    });
  }
});


const chatBox = document.getElementById("chat-box");
const buttonContainer = document.getElementById("button-container");

// Dados de conversas para cada nicho
const chatScripts = {
  "Negócio": [
    { user: "Cliente", text: "Olá, estou interessado em saber mais sobre os seus serviços." },
    { bot: "Bot", text: "Olá! Que bom que entrou em contato. Quais serviços específicos você gostaria de saber mais? Podemos ajudar com consultoria de gestão de negócios, otimização de processos, e soluções personalizadas para sua empresa." },
    { user: "Cliente", text: "Estou interessado em saber mais sobre a consultoria." },
    { bot: "Bot", text: "Perfeito! Nossa consultoria oferece soluções personalizadas para melhorar a gestão de negócios, otimizar processos e alcançar objetivos específicos. Para entender melhor suas necessidades, podemos agendar uma reunião. Qual seria o melhor dia e horário para você?" },
    { user: "Cliente", text: "Eu posso na segunda-feira à tarde." },
    { bot: "Bot", text: "Ótimo! Vamos agendar para segunda-feira às 15h. Durante nossa reunião, vamos discutir como podemos ajudar a alcançar seus objetivos. Confirma a presença?" },
    { user: "Cliente", text: "Sim, confirmo." },
    { bot: "Bot", text: "Excelente! Sua reunião está agendada para segunda-feira às 15h. O encontro será realizado em [Endereço ou local da reunião]. Fico à disposição caso precise de algo mais!" },
    { user: "Cliente", text: "Obrigado, até lá!" },
    { bot: "Bot", text: "De nada! Até segunda-feira!" },
  ],


  "E-commerce": [
    { user: "Cliente", text: "Olá, estou procurando por tênis esportivos." },
    { bot: "Bot", text: "Olá! Temos uma variedade de tênis esportivos. Você tem alguma marca ou tipo específico em mente?" },
    { user: "Cliente", text: "Eu quero um da Nike." },
    { bot: "Bot", text: "Temos diversos modelos da Nike. Prefere tênis para corrida, treino ou casual?" },
    { user: "Cliente", text: "Para corrida." },
    { bot: "Bot", text: "Ótimo! Temos o Nike Air Zoom Pegasus e o Nike React Infinity Run, ambos ideais para corrida. Qual desses te interessa?" },
    { user: "Cliente", text: "O Air Zoom Pegasus." },
    { bot: "Bot", text: "Excelente escolha! O Nike Air Zoom Pegasus está disponível nas cores preta, branca e azul. Qual delas você prefere?" },
    { user: "Cliente", text: "Preto." },
    { bot: "Bot", text: "O Nike Air Zoom Pegasus preto está disponível no tamanho 42. Podemos seguir com esse tamanho?" },
    { user: "Cliente", text: "Sim, tamanho 42." },
    { bot: "Bot", text: "Perfeito! O Nike Air Zoom Pegasus preto, tamanho 42, está disponível por R$ 499,00. Você pode conferir e comprar diretamente no link abaixo:" },
    { bot: "Bot", text: "[Comprar Nike Air Zoom Pegasus](#)" },
  ],



  "Delivery": [
    { user: "Cliente", text: "Olá, o que vocês têm de especial?" },
    { bot: "Bot", text: "Olá! Temos o Astro Burger com cheddar, bacon e molho especial. Também temos opções vegetarianas, como o Veggie Deluxe. Gostou de algum?" },
    { user: "Cliente", text: "O Astro Burger parece bom! Quais são os acompanhamentos?" },
    { bot: "Bot", text: "Você pode escolher entre batatas fritas, onion rings ou salada. E bebidas: refrigerante, suco ou milkshake." },
    { user: "Cliente", text: "Vou querer o Astro Burger com batatas fritas e milkshake de morango." },
    { bot: "Bot", text: "Perfeito! Seu pedido é R$ 35,00. Como deseja pagar?" },
    { user: "Cliente", text: "Cartão de crédito." },
    { bot: "Bot", text: " Ótimo! Seu pedido está em preparo. Receberá uma notificação quando estiver pronto." },
  ],


  "Loja": [
    { user: "Cliente", text: "Olá, estou interessado em alguns produtos." },
    { bot: "Bot", text: "Olá! Que bom que entrou em contato. Quais produtos você está procurando? Temos uma variedade de tênis esportivos, roupas, acessórios, eletrônicos, entre outros." },
    { user: "Cliente", text: "Estou procurando por tênis de corrida." },
    { bot: "Bot", text: "Temos ótimas opções de tênis de corrida! Você tem alguma marca ou modelo específico em mente?" },
    { user: "Cliente", text: "Gostaria de ver opções da Nike." },
    { bot: "Bot", text: "Perfeito! Temos alguns modelos da Nike para corrida, como o Nike Air Zoom Pegasus e o Nike React Infinity Run. Você pode conferir todos os detalhes e fazer a compra diretamente no nosso site." },
    { user: "Cliente", text: "Qual o horário de funcionamento da loja?" },
    { bot: "Bot", text: "Estamos abertos de segunda a sábado, das 9h às 18h. Se precisar de mais alguma coisa, estarei por aqui!" },
    { user: "Cliente", text: "Obrigado!" },
    { bot: "Bot", text: "De nada! Fique à vontade para voltar a qualquer momento." },
  ],



  "Consultório": [
    { user: "Cliente", text: "Olá, gostaria de marcar uma consulta." },
    { bot: "Bot", text: "Olá! Claro, posso te ajudar com isso. Qual especialidade você precisa?" },
    { user: "Cliente", text: "Preciso de uma consulta com o cardiologista." },
    { bot: "Bot", text: "Perfeito! Temos disponibilidade para o cardiologista na próxima quinta-feira às 14h e na sexta-feira às 10h. Qual desses horários funciona melhor para você?" },
    { user: "Cliente", text: "Quinta-feira às 14h está bom." },
    { bot: "Bot", text: "Excelente escolha! Sua consulta com o cardiologista está agendada para quinta-feira às 14h. O consultório fica localizado em [Endereço do Consultório]. Confirma a presença?" },
    { user: "Cliente", text: "Sim, confirmo." },
    { bot: "Bot", text: "Ótimo! Sua consulta está confirmada. Estamos ansiosos para te receber. Se precisar de mais alguma coisa, estou à disposição." },
    { user: "Cliente", text: "Obrigado!" },
    { bot: "Bot", text: "De nada! Até quinta-feira!" },
  ],



  "Imobiliária": [
    { user: "Cliente", text: "Olá, estou procurando um apartamento para alugar." },
    { bot: "Bot", text: "Olá! Que ótimo que você nos procurou. Você tem alguma região ou tipo de apartamento em mente?" },
    { user: "Cliente", text: "Estou procurando algo no centro da cidade, com dois quartos." },
    { bot: "Bot", text: "Perfeito! Temos algumas opções de apartamentos de dois quartos no centro. Para entender melhor suas preferências e oferecer as melhores opções, podemos agendar uma reunião presencial. Qual seria o melhor horário para você?" },
    { user: "Cliente", text: "Eu posso na terça-feira à tarde." },
    { bot: "Bot", text: "Excelente! Vamos agendar para terça-feira às 15h. Durante a reunião, vou mostrar as melhores opções disponíveis e tirar todas as suas dúvidas. Confirmo sua presença?" },
    { user: "Cliente", text: "Sim, confirmo." },
    { bot: "Bot", text: "Ótimo! Seu encontro está agendado para terça-feira às 15h. O endereço é [Endereço da Imobiliária]. Estamos ansiosos para te receber e ajudar a encontrar o apartamento ideal!" },
    { user: "Cliente", text: "Obrigado, até lá!" },
    { bot: "Bot", text: "De nada! Até logo e tenha um ótimo dia!" },
  ],


};

// Função para carregar o chat de um nicho
function loadChat(nicho) {
  chatBox.style.opacity = 0; // Inicia o efeito fade-out
  setTimeout(() => {
    chatBox.innerHTML = ""; // Limpa o chat anterior
    const script = chatScripts[nicho];

    script.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.className = `chat-message ${message.bot ? "agent" : "client"}`;
      messageDiv.innerHTML = `
        <img src="imagens/foto-${message.bot ? "g" : "d"}.png" alt="${message.bot ? "Bot" : "Cliente"}" class="message-icon">
        <div class="message-text">${message.text}</div>
      `;
      chatBox.appendChild(messageDiv);
    });
    chatBox.style.opacity = 1; // Aplica o fade-in
  }, 300); // Tempo para o efeito de transição
}

// Criação dos botões dinamicamente
function createButtons() {
  Object.keys(chatScripts).forEach((nicho) => {
    const button = document.createElement("button");
    button.textContent = nicho;
    button.addEventListener("click", () => {
      loadChat(nicho);
    });
    buttonContainer.appendChild(button);
  });
}

window.onload = () => {
  loadChat("Negócio");
  createButtons();
};

// Selecione o ícone de menu e os links de navegação
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Adicione o evento de clique no ícone de menu
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');  // Alterna a visibilidade dos links
  navToggle.classList.toggle('active'); // Altera o estilo do ícone
});
