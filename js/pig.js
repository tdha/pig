/*----- constants -----*/
const SIDES = {
    1: '&#x2680;',
    2: '&#x2681;',
    3: '&#x2682;',
    4: '&#x2683;',
    5: '&#x2684;',
    6: '&#x2685;'
};

/*----- state variables -----*/
const state = {
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
    dice: document.getElementById('dice'),
    points: document.getElementById('points'),
    // it may not be worth caching these as they're only used once
    player1Roll: document.querySelector('.player1 button.roll'),
    player2Roll: document.querySelector('.player2 button.roll')
};


/*----- event listeners -----*/
// an object that caches our frequently used DOM nodes
// elements.player1Roll.addEventListener('click', player1Roll);
elements.player1Roll.addEventListener('click', function () {
    rollPair();
});
// elements.player1Roll.addEventListener('click', rollPair);
// not used because we want to do more things later

/*----- functions -----*/
const init = function () {
    state.player = 'player1';
    state.totalPoints.player1 = 0;
    state.totalPoints.player2 = 0;
    state.points = 0;
    state.rolls = [rollDie(), rollDie()];
    render(rollDie(), rollDie());
};

// a function is just a thing inside a variable
const render = function () {
    elements.dice.innerHTML = SIDES[state.rolls[0]] + ' ' + SIDES[state.rolls[1]];
    // document.getElementById('points').innerText = state.points;
    elements.points.innerHTML = state.points;
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
    render();
    // TODO: should we check for 'making bacon' here?
};

init();
// console.log(state);