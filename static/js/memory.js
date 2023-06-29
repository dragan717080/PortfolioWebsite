const gridElements = document.getElementsByClassName('grid_element');
const pictures = ['Chuckie', 'CourageTheDog', 'CuteWitchyGirl', 'Ghostface', 'JasonVoorhees', 'PikachuHorror', 'Pumpkin', 'spongebob_character'];
const newGameInscrip = document.getElementById('new_game');
var firstIndexes = [];
var pairings = {};
var grid = [];

function getPairings() {
    newGameInscrip.innerText = '';
    for (let i = 0; i < 8; i++) {
        gridElements[i].style.backgroundColor = 'lightgray';
        gridElements[i].style.border = '2px solid black';
        firstIndexes.push(i);
    }

    for (let i = 8; i < 16; i++) {
        do {
            var chosenIndex = Math.floor(Math.random() * firstIndexes.length)
        } while (Object.keys(pairings).includes((chosenIndex).toString()) === true);
        var pairing = firstIndexes[chosenIndex];
        pairings[chosenIndex] = i;
        gridElements[i].style.backgroundColor = 'lightgray';
        gridElements[i].style.border = '2px solid black';
    }

    let pictureDict = {}
    for (let i = 0; i < 8; i++) {
        do {
            var chosenIndex = Math.floor(Math.random() * firstIndexes.length)
        } while (Object.keys(pictureDict).includes((chosenIndex).toString()) === true);
        grid.push({'pairing': pairings[i], 'picture': pictures[chosenIndex]});
        pictureDict[chosenIndex] = i;
    }

    const swapKeysAndValues = (obj) => Object.fromEntries(Object.entries(pairings).map(a => a.reverse()))
    for (const [k, v] of Object.entries(swapKeysAndValues(pairings))) pairings[k] = v;

    for (let i = 8; i < 16; i++) grid.push({'pairing': parseInt(pairings[i]), 'picture': grid[pairings[i]]['picture']});
}

getPairings();

function startGame() {
    var previousImage = -1;
    var lastAttemptWasGood = false;
    var correctElements = 0;

    for (let i = 0; i < gridElements.length; i++) {
        gridElements[i].addEventListener('click', event => {
            var concurrentImage = i;
            //change the styling of the current element
            gridElements[i].style.backgroundImage = `url('../static/images/characters/${grid[i]['picture']}.jpg')`;
            gridElements[i].style.backgroundRepeat = 'no-repeat';
            gridElements[i].style.backgroundPosition = 'center';
            gridElements[i].style.backgroundSize = 'contain';
            //it's not start element
            if (previousImage != -1) {
                //change if the elements match
                if (grid[previousImage]['pairing'] === i) {
                    lastAttemptWasGood = true;
                    gridElements[i].style.pointerEvents = 'none';
                    gridElements[previousImage].style.pointerEvents = 'none';
                    correctElements++;
                    //win condition is met
                    if (correctElements === 8) newGame();
                }
                else {
                    if (!lastAttemptWasGood) {
                        gridElements[previousImage].style.backgroundImage = 'none';
                     }
                    lastAttemptWasGood = false;
                }
            }
            previousImage = i;
        })
    }
}

startGame();

async function newGame() {
    for (let i = 0; i < gridElements.length; i++) {
        gridElements[i].style.backgroundImage = 'none';
        gridElements[i].style.pointerEvents = 'auto';
        gridElements[i].style.backgroundColor = '';
        gridElements[i].style.border = 'none';
    }
    const inscripMessages = [
        'Congratulations!',
        'Most people are so ungrateful to be alive...',
        'But not you...',
        'Not anymore...',
        'Still, there will be many more games',
        "Let's see if you have what it takes to survive"
    ];

    newGameInscrip.style.display = 'block';
    newGameInscrip.innerText = 'Congratulations!';
    for (let i = 0; i < inscripMessages.length; i++) {
        newGameInscrip.innerText = inscripMessages[i];
        const toWait = i < (inscripMessages.length - 1) ? 1360 : 1760;
        await wait(toWait);
    }
    firstIndexes = [];
    pairings = {};
    grid = [];
    getPairings();
    startGame();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
