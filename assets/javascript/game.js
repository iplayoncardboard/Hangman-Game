
const imagePath = "./assets/images/";
const soundPath = "./assets/sounds/";
let remainingGuesses = 13;
let numberOfWins = 0;
let wordArray=[];
let guessArray=[];
let playerArray=[];
var selectedWord;

var wordBlanks = document.getElementById("currentWord");
var showWins = document.getElementById("wins");
var showRemainingGuesses = document.getElementById("remainingGuesses");
var showGuessedLetters = document.getElementById("guessedLetters");
var imageUrl = document.getElementById("gameImage");

var audio = new Audio('./assets/sounds/beholder.mp3');


let wordList = [
    {
        word: "Xanathar",
        imageUrl: "xanathar.jpg",
        soundUrl: "xanathar.mp3"
    },
    {
        word: "Beholder",
        imageUrl: "beholder.jpg",
        soundUrl: "beholder.mp3"
    },
    {
        word: "Mordenkainen",
        imageUrl: "mordenkainen.jpeg",
        soundUrl: "mordenkainen.mp3"
    },
    {
        word:"StrahdvonZarovich",
        imageUrl: "strahd.jpg",
        soundUrl: "strahd.mp3"
    },
    {
        word:"Asmodeus",
        imageUrl: "asmodeus.jpg",
        soundUrl: "asmodeus.mp3"
    },
    {
        word:"Fireball",
        imageUrl: "fireball.jpg",
        soundUrl: "fireball.mp3"
    },
    {
        word:"Wulfgar",
        imageUrl: "wulfgar.png",
        soundUrl: "wulfgar.mp3"
    }

];



setInitialGameState();
//start game
document.onkeyup =  function(event){
    audio.play();
      //Select a word object from the list
        selectedWord = getRandomWordObject(wordList, wordList.length);
    
      // console.log(selectedWord);
      createWordArray(selectedWord.word);
  
      //display the blank spaces
      populateBlanks(selectedWord.word);

    //user guess
    document.onkeyup = function(event){
        //check that the key is an upper or lowercase letter
        if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 97 && event.keyCode <= 122){
            // console.log(event.key);

            // make key lowercase and set to a var
            var keyStroke = event.key.toLowerCase();
           
            //check to see if key has already been pressed
            if(!guessArray.includes(keyStroke)){
                
                //Check to see if the key's letter is in the array
                if(wordArray.includes(keyStroke)){
                    //add letter to guessedArray and update UI
                    //decrement guesses by 1 and update UI
                    processsGuess(keyStroke);
                    // Update the user array and UI
                    correctGuess(keyStroke);
                    //check for game end condition
                    checkEndGame();
                }

                else{
                    ////add letter to guessedArray and update UI
                    //decrement score by 1 and update UI
                    processsGuess(keyStroke);
                    checkEndGame();
                }

            }

        }
    }
}


//set game state
function setInitialGameState(){
    showWins.textContent = numberOfWins;
    showRemainingGuesses.textContent = remainingGuesses;
}


function getRandomWordObject(array, length){


    var temp = array[Math.floor( Math.random() * Math.floor(length))];

    // console.log("Function is outputting= " + temp);
    return temp;
}

//Creates word array
function createWordArray(word){
    //empty word array
    wordArray=[];
    //convert word to lowercase
    word = word.toLowerCase();
    //create word array
    for(i=0; i < word.length; i++){

        //get the ith letter of the word and push it to the word array
        wordArray.push(word.charAt(i));
        
    }
    console.log("word length: " + word.length);
    console.log("Word Array: "+ wordArray);
}

//fills player array with blanks and updates UI
function populateBlanks(word){
    var blanks= "";
    playerArray=[];
    for(i=0; i<word.length; i++){
        playerArray.push("_");
    }
    updateCurrentWordUI();
}

function updateCurrentWordUI(){
    var str =""
    //iterate through the array and add each letter to a string
    for (i=0; i< playerArray.length; i++)
    {
        str = str + playerArray[i] + " ";
    }
    //output string to UI
    wordBlanks.textContent = str;
}


function processsGuess(letter){
    //add letter to guessedArray and update UI
    guessArray.push(letter);
    showGuessedLetters.textContent = guessArray.toString();
    remainingGuesses--;
    showRemainingGuesses.textContent=remainingGuesses;
}

function correctGuess(letter){
    //check word array for location of correct letter and update player array to reflect. 
    console.log(letter);
    
   for(i=0; i<wordArray.length; i++){
    //    console.log(wordArray[i]);
       if(letter===wordArray[i]){
           playerArray[i] = letter;
       }
   }
 
    updateCurrentWordUI();
    console.log(playerArray);
}

function checkEndGame(){
    //check for win 
    if(!playerArray.includes("_")){
        console.log("You Win")
        numberOfWins++;
        showWins.textContent=numberOfWins;
        imageUrl.attributes.src.nodeValue = imagePath + selectedWord.imageUrl;
        audio.src= soundPath+selectedWord.soundUrl;
        audio.play();
        startNewGame();
    }

    //check for loss
    else if(remainingGuesses===0){
        console.log("End Game");
        startNewGame();
    }
}

function startNewGame(){
    //reset remaining guesses
    remainingGuesses= 13;
    showRemainingGuesses.textContent = remainingGuesses;

    //reset player array
    playerArray=[]
    guessArray=[];
    showGuessedLetters.textContent=guessArray;

    //get a new word
    selectedWord = getRandomWordObject(wordList, wordList.length);
    console.log("new selected word: " + selectedWord.word);

    //create word array
    createWordArray(selectedWord.word);

    //wipe player array and display the blank spaces
    populateBlanks(selectedWord.word);

}