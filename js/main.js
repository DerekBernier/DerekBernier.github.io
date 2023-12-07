/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn = 'X';
let win;

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div'));


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);

/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    // Regarder si la case est occupé
    if (board[idx]) {
        return;
    }
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    Victoire();
    render();
};

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    win = null;
    partieJouer++;
    render();
};

// Moddifier contenu des variables de victoires
function Victoire() {
    if (win === 'X') {
        joueurX++;
    } else if (win === 'O') {
        joueurO++;
    }

    MettreAJourStats();
}

// Variable pour stockage local
let partieJouer = 0;
let joueurX = 0;
let joueurO = 0;

let statPartieJouer = document.getElementById('statPartieJouer');
let statWinX = document.getElementById('statWinX');
let statsWinO = document.getElementById('statWinO');

// Mettre a jour les statistiques des joueurs
function MettreAJourStats() {

    // Modifier le contenu pour afficher statistiqes
    statPartieJouer.textContent = partieJouer;
    statWinX.textContent = joueurX;
    statsWinO.textContent = joueurO;

    // Sauvegarde statistique dans le stockage local
    localStorage.setItem('partieJouer', partieJouer);
    localStorage.setItem('joueurX', joueurX);
    localStorage.setItem('joueurO', joueurO);
}

function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `Égalité` : win ? `${win} gagne la partie` : `C'est au tour des ${turn}`;

    // Mise à jour des statistiques après chaque render
    MettreAJourStats();
};

// Charger les statistiques depuis le stockage local au chargement de la page
function ChargerStatistiques() {
    statPartieJouer = document.getElementById('statPartieJouer');
    statWinX = document.getElementById('statWinX');
    statsWinO = document.getElementById('statWinO');

    partieJouer = parseInt(localStorage.getItem('partieJouer')) || 0;
    joueurX = parseInt(localStorage.getItem('joueurX')) || 0;
    joueurO = parseInt(localStorage.getItem('joueurO')) || 0;
}

ChargerStatistiques();
init();


