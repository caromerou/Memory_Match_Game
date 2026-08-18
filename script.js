// Vocabulario y frases solicitadas configuradas en parejas
const rawPairs = [
    { es: "Cojín", en: "Cushion" },
    { es: "Nevera", en: "Fridge" },
    { es: "Tener", en: "To have" },
    { es: "Querer", en: "To want" },
    { es: "Gustar", en: "To like" },
    { es: "No gustar", en: "Dislike / Don't like" },
    { es: "Aguacate", en: "Avocado" },
    { es: "No me gusta el pollo blanco", en: "I don't like white chicken" },
    { es: "Me gusta el pollo amarillo", en: "I like yellow chicken" },
    { es: "Me llamo Collin", en: "My name is Collin" },
    { es: "Soy ingeniero", en: "I am an engineer" },
    { es: "Me gusta tu país", en: "I like your country" },
    { es: "Quiero ir al baño", en: "I want to go to the bathroom" },
    { es: "¿Dónde encuentro el cajero?", en: "Where can I find the ATM?" },
    { es: "¿Puedo pagar con tarjeta de crédito?", en: "Can I pay with a credit card?" },
    { es: "Maleta", en: "Suitcase / Bag" },
    { es: "Documento de identificación", en: "ID document" },
    { es: "Celular", en: "Cell phone / Mobile" },
    { es: "Quedar", en: "To stay / To meet" }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let tries = 0;
let lockBoard = false;

function startGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    tries = 0;
    lockBoard = false;
    
    document.getElementById('tries').innerText = tries;
    document.getElementById('matches').innerText = matchedPairs;
    document.getElementById('total-pairs').innerText = rawPairs.length;

    // Duplicar elementos separando Español e Inglés para crear las fichas del juego de memoria
    cards = [];
    rawPairs.forEach((pair, index) => {
        cards.push({ id: index, text: pair.es, pairId: index });
        cards.push({ id: index, text: pair.en, pairId: index });
    });

    // Mezclar aleatoriamente las tarjetas (Shuffle)
    cards.sort(() => Math.random() - 0.5);

    // Renderizar tarjetas en el HTML
    cards.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.pairId = item.pairId;
        card.cardIndex = index + 1; // Guardamos su número de tarjeta
        card.innerText = card.cardIndex; // Muestra el número en lugar de "?"
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    const clickedCard = this;
    const index = clickedCard.dataset.index;

    // Evitar hacer clic en la misma tarjeta o en una ya descubierta
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

    // Mostrar el texto de la tarjeta
    clickedCard.classList.add('flipped');
    clickedCard.innerText = cards[index].text;
    flippedCards.push({ card: clickedCard, pairId: clickedCard.dataset.pairId, index: index });

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    tries++;
    document.getElementById('tries').innerText = tries;
    lockBoard = true;

    const [first, second] = flippedCards;

    if (first.pairId === second.pairId && first.index !== second.index) {
        // ¡Coincidencia!
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').innerText = matchedPairs;

        resetTurn();

        if (matchedPairs === rawPairs.length) {
            setTimeout(() => {
                alert(`¡Felicitaciones! Has completado el juego de memoria en ${tries} intentos.`);
            }, 300);
        }
    } else {
        // No coinciden, se tapan de nuevo mostrando su número correspondiente tras un breve retraso
        setTimeout(() => {
            first.card.classList.remove('flipped');
            first.card.innerText = first.card.cardIndex;
            second.card.classList.remove('flipped');
            second.card.innerText = second.card.cardIndex;
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}

// Iniciar al cargar la página
window.onload = startGame;
