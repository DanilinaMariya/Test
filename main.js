let deckId;
const cards = document.querySelectorAll('.card');
const buttonReset = document.querySelector('.button-reset')

let URL = {
    deck: "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AC,AH,AD",
}

const api = async (url) => {
    try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }  
            const data = await response.json();
            return data;

        } catch (error) {
            console.error(error.message);
        }
}

async function getData() {
    const data = await api(URL.deck);
    deckId = data.deck_id;
    URL = {
        card: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
        shuffleDesk: `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`,
        returnCard:`https://deckofcardsapi.com/api/deck/${deckId}/return/`,
    }
};

getData();

async function onCardClick(el) {
    if(el.classList.contains('card--pickUp')) {
        return;
    }
    const img = el.querySelector('.card__front').querySelector('img')
    const data = await api(URL.card);
    const imageSrc = data.cards[0].image;
    img.setAttribute('src', `${imageSrc}`);
    if (el.classList.contains('card--pickDown')) {
            el.classList.remove('card--pickDown');
            el.classList.add('card--pickUp');
        }
    if (data.remaining === 0) {
    buttonReset.style.opacity = '1';
    }
};

function onCardClose(i) {
    cards[i].classList.remove('card--pickUp');
    cards[i].classList.add('card--pickDown')
}

async function shuffleDeck() {
    api(URL.shuffleDesk)
}


async function onButtonResetClick() {
    const data = await api(URL.returnCard);
    if (data.success) {
        buttonReset.style.opacity = '0';
        setTimeout(onCardClose, 0, 0);
        setTimeout(onCardClose, 200, 1);
        setTimeout(onCardClose, 400, 2);
        setTimeout(onCardClose, 600, 3);
    
        shuffleDeck();
    }

}

cards.forEach((el) => {
    el.addEventListener('click', () => onCardClick(el))
})

buttonReset.addEventListener('click', onButtonResetClick)