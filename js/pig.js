/*----- constants -----*/
const SIDES = {
    1: '<span class="bacon">&#x2680;</span>',
    2: '&#x2681;',
    3: '&#x2682;',
    4: '&#x2683;',
    5: '&#x2684;',
    6: '&#x2685;'
};

/*----- state variables -----*/
const state = {
    winner: false,
    player: '',
    totalPoints: {
        player1: 0,
        player2: 0
    },
    points: 0,
    rolls: []
};

/*----- cached elements  -----*/
const elements = {
    status: document.getElementById('status'),
    dice: document.getElementById('dice'),
    points: document.getElementById('points'),
    // it may not be worth caching these as they're only used once
    player1TotalPoints: document.querySelector('.player1 .totalPoints'),
    player2TotalPoints: document.querySelector('.player2 .totalPoints'),
    player1Section: document.querySelector('.player1'),
    player2Section: document.querySelector('.player2'),
    player1Roll: document.querySelector('.player1 button.roll'),
    player2Roll: document.querySelector('.player2 button.roll'),
    player1Hold: document.querySelector('.player1 button.hold'),
    player2Hold: document.querySelector('.player2 button.hold')
};


/*----- event listeners -----*/
// an object that caches our frequently used DOM nodes
// elements.player1Roll.addEventListener('click', player1Roll);
elements.player1Roll.addEventListener('click', function () {
    // exit function early if not our turn
    if (state.winner || state.player !== 'player1') return;
    rollPair();
});
// duplicate for player2
elements.player2Roll.addEventListener('click', function () {
    if (state.winner || state.player !== 'player2') return;
    rollPair();
});
// elements.player1Roll.addEventListener('click', rollPair);
// not used because we want to do more things later

elements.player1Hold.addEventListener('click', function() {
    if (state.winner || state.player !== 'player1') return;
    hold('player1');
})
elements.player2Hold.addEventListener('click', function() {
    if (state.winner || state.player !== 'player2') return;
    hold('player2');
})

/*----- functions -----*/
const init = function () {
    state.winner = false;
    state.player = 'player1';
    state.totalPoints.player1 = 0;
    state.totalPoints.player2 = 0;
    state.points = 0;
    state.rolls = [rollDie(), rollDie()];
    render();
};

// a function is just a thing inside a variable
const render = function () {
    if (state.winner) {
        elements.status.innerText = state.winner + ' wins!';
        // TODO: hide this message 'again maybe?'
    }
    elements.dice.innerHTML = SIDES[state.rolls[0]] + ' ' + SIDES[state.rolls[1]];
    // document.getElementById('points').innerText = state.points;
    elements.points.innerHTML = state.points;
    elements.player1TotalPoints.innerText = state.totalPoints.player1;
    elements.player2TotalPoints.innerText = state.totalPoints.player2;
    if (state.player === 'player1') {
        elements.player1Section.classList.add('currentPlayer');
        elements.player2Section.classList.remove('currentPlayer');
    } else {
        elements.player2Section.classList.add('currentPlayer');
        elements.player1Section.classList.remove('currentPlayer');
    }
};

const switchPlayer = function() {
    if (state.player === 'player1') {
        state.player = 'player2';
    } else {
        state.player = 'player1';
    }
};

const detectBacon = function () {
    const currentPlayer = state.player;
    // if both dice are 1
    if (state.rolls[0] === 1 && state.rolls[1] === 1) {
        state.totalPoints[currentPlayer] = 0;
        state.points = 0;
        switchPlayer();   
    } else if (state.rolls[0] === 1 || state.rolls[1] === 1) {
        state.points = 0;
        switchPlayer();
        // reset the players points to 0
        // switch players
    // else if either dice is 1
        // no points for this turn
        // switch players
    }
};

const checkForWinner = function () {
    const currentPlayer = state.player;
    if (state.totalPoints[currentPlayer] + state.points >= 100) {
        // player 1 wins
        // save the winner in state
        // render should show the winner
        hold(currentPlayer);
        state.winner = currentPlayer;
        switchPlayer();
    }
};

const rollDie = function() {
    // random number between 1 and 6
    // round up and multiply by 6
    // return that
    return Math.ceil( Math.random() * 6);
    // console.log(rollDie);
};

const rollPair = function () {
    // const die1 = rollDie();
    // const die2 = rollDie();
    // state.rolls = [die1, die2];
    // can replace with (below)
    state.rolls = [rollDie(), rollDie()]; // the actual dice rolls, ready to render
    state.points = state.points + (state.rolls[0] + state.rolls[1]);
    // console.log(state);
    detectBacon();
    checkForWinner();
    render();
    // TODO: should we check for 'making bacon' here?
};

const hold = function (currentPlayer) {
    // in [ ] without quotes means look at that variable
    // state.totalPoints[currentPlayer] = state.totalPoints[currentPlayer] + state.points;
    // reducing the (above) code
    state.totalPoints[currentPlayer] += state.points;
    state.points = 0;
    switchPlayer();
    // TODO: switch players
    render();
}

init();
// console.log(state);