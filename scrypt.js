"use scrict"

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: 
// nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati 
// - abbiamo calpestato una bomba 
// - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// Only the brave!!!
// Superbonus 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// Superbonus 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

// FUNZIONE CHE GENERA NUMERI RANDOM
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    }
    const bombNumber = 16;
    const bombs = [];
    let max_attempt;
    let attempts = 0;

//FUNZIONE CHE FA SCEGLIERE IL LIVELLO ALL'UTENTE
function setLevel(event) {
    const level = document.getElementById("level").value;
    console.log("livello selezionato: ", level);
    let numSquare;
    switch (level) {
        case "1":
        default:
        numSquare = 100;
        break;
        case "2":
        numSquare = 81;
        break;
        case "3":
        numSquare = 49;
        break;
    }
    let squareforSide = Math.sqrt(numSquare);
    console.log("celle per lato: ", squareforSide);
    generateBomb(numSquare);
    generaGriglia(numSquare, squareforSide);
}

//FUNZIONE CHE GENERA LE BOMBE
function generateBomb(numSquare) {
    max_attempt = numSquare - bombNumber;
    bombs.length = 0; // riazzera l'array delle bombe ogni volta che si sceglie la difficoltà
    while (bombs.length < bombNumber) {
        let numberBomb = getRandomInt(1, numSquare);
        if (!bombs.includes(numberBomb)) {
        bombs.push(numberBomb);
        }
    }
    console.log(bombs);
    }

// FUNZIONE CHE GENERA LA GRIGLIA
function generaGriglia(numSquare, squareforSide) {
    console.log("numero di celle totali: ", numSquare);
    const grid = document.getElementById("grid");

    grid.innerHTML = "";

    let row = document.createElement("div");
    row.classList = ("class"); 
    row.classList = ("gridrow");

    for (let i = 1; i <= numSquare; i++) {
        const square = generaCella(i, squareforSide);
        row.append(square);
    }
    grid.append(row);
}

// FUNZIONE CHE GENERA I QUADRATI
function generaCella(numSquare, squareforSide) {
    let square = document.createElement("div");
    square.setAttribute("class", "box");
    square.style.width = `calc(100% / ${squareforSide})`;
    square.style.height = `calc(100% / ${squareforSide})`;
    square.classList.add("pointer");
    square.innerHTML = `<span>${numSquare}</span>`;
    square.addEventListener("click", coloraCella);
    return square;
}

// FUNZIONE CHE COLORA LE CELLE AL CLICK
function coloraCella() {
    // console.log(this.innerText);
    let num = parseInt(this.innerText);
    // console.log(attempts, max_attempt);
    attempts++;

    // CASO IN CUI L'UTENTE VINCE
if(attempts == max_attempt){
    alert("Complimenti, hai vinto! Non hai clickato su nessuna bomba!");
    setTimeout(() => {
        location.reload();
    }, 2000);
    }
    

    if (bombs.includes(num)) {
    this.style.backgroundColor = "red";
    this.innerHTML = `<img src="img/bomb.png">`;
    gameOver();
    } else {
    this.style.backgroundColor = "green";
    this.style.color = "white";
    }   
    this.classList.remove("pointer");
    this.removeEventListener("click", coloraCella);
}

// FUNZIONE CHE GESTISCE LA FINE DEL GIOCO
function gameOver() {
    alert("Hai totalizzato un punteggio di : " + parseInt(attempts - 1));
    let caselleRestanti = document.getElementsByClassName("box");

    for (let i = 0; i < caselleRestanti.length; i++) {
    let rimuoviEvento = caselleRestanti[i];
    rimuoviEvento.classList.remove("pointer");
    rimuoviEvento.removeEventListener("click", coloraCella);
    for (let n = 0; n < bombs.length; n++) {
        if (bombs[n] == rimuoviEvento.innerText) {
        // console.log(bombs[n], rimuoviEvento.innerText);
        rimuoviEvento.style.backgroundColor = "red";
        rimuoviEvento.innerHTML = `<img src="img/mine.png">`;
        }
    }
}
setTimeout(() => {
    location.reload();
    }, 2000);
}

document.getElementById("play").addEventListener("click", setLevel);
