// Word list

var chosenWords = ["dog" , "cat" , "fish" , "bird" , "snake"];

//For press key to play again
var gameFinished = False;

//Keeps the leeters the user has guessed
var guessedLetters = [];

//This is the word to match the current word
var wordToGuess = [];

//How many tries the guesser has left
var remainingGuesses = 0;

//Current word in the array will be an index
var currentWordIndex;

//How many wins
var wins = 0;

//Highest number guesser has
const maxTries = 10;

// Game sounds
var keySound = new Audio('./assets/sounds/typewriter-key.wav');
var winSound = new Audio('./assets/sounds/you-win.wav');
var loseSound = new Audio('./assets/sounds/you-lose.wav');


// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (chosenWords.length));

    // Clear out arrays
    guessedLetters = [];
    wordToGuess = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < chosenWords[currentWordIndex].length; i++) {
       wordToGuess.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("pressKeyToPlayAgain").style.cssText = "display: none";
    document.getElementById("youlose-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
// Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var wordToGuess = "";
    for (var i = 0; i <wordToGuess.length; i++) {
       wordToGuessText += wordToGuess[i];
}
    document.getElementById("currentWord").innerText = wordToGuessText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < chosenWords[currentWordIndex].length; i++) {
        if (choseWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;

    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            wordToGuess[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if (wordToGuess.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        winSound.play();
        gameFinished = true;
    }
};


// Checks for a loss
function checkLoss() {
    if (remainingGuesses <= 0) {
        loseSound.play();
        document.getElementById("youlose-image").style.cssText = "display: block";
        document.getElementById("pressKeyToPlayAgain").style.cssText = "display:block";
        gameFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

};


// Event listener
document.onkeydown = function (event) {
    // If we finished a game, dump one keystroke and reset.
    if (gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};

