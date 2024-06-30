let deckId = '4yu6wyyvb2y2';
const cards = document.querySelectorAll('.card');
const buttonReset = document.querySelector('.button-reset')

// async function getData() {
//     const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AC,AH,AD";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }  
//       const json = await response.json();
//       deckId = json.deck_id;
//       console.log(json, deckId);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   getData();

async function onCardClick(el) {
    if(el.classList.contains('card--pickUp')) {
        return;
    }
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    const img = el.querySelector('.card__front').querySelector('img')
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }  
        const json = await response.json();
        const imageSrc = json.cards[0].image;
        img.setAttribute('src', `${imageSrc}`);
        if (el.classList.contains('card--pickDown')) {
                el.classList.remove('card--pickDown');
                el.classList.add('card--pickUp');
            }
        if (json.remaining === 0) {
        buttonReset.style.opacity = '1';
        }
    } catch (error) {
        console.error(error.message);
}
};

function onCardClose(i) {
    cards[i].classList.remove('card--pickUp');
    cards[i].classList.add('card--pickDown')
}

async function shuffleDeck() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }  
    } catch (error) {
    console.error(error.message);
    }
}


async function onButtonResetClick() {
    buttonReset.style.opacity = '0';
    setTimeout(onCardClose, 0, 0);
    setTimeout(onCardClose, 200, 1);
    setTimeout(onCardClose, 400, 2);
    setTimeout(onCardClose, 600, 3);
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/return/`;
    shuffleDeck();
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }  
    } catch (error) {
    console.error(error.message);
    }
}

cards.forEach((el) => {
    el.addEventListener('click', () => onCardClick(el))
})

buttonReset.addEventListener('click', onButtonResetClick)