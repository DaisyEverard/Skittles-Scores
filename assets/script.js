// global constants
const submitBtns = $('.submit-btn');
const playerCols = $('.player-col'); 
const nameDivs = $('.player-name');

// add data to local storage (overwrites previous)
const setLocalScores = () => {
    let personArray = [];

    playerCols.each((index, playerCol) => {
        let playerObj = {}
        // add name
       let name = playerCol.querySelector('.player-name').value;
        playerObj.name = name;  
        // add scores
        let score1 = playerCol.querySelector('.player-turn-1').value;  
        let score2 = playerCol.querySelector('.player-turn-2').value;
        let score3 = playerCol.querySelector('.player-turn-3').value;
        let score4 = playerCol.querySelector('.player-turn-4').value;
        let score5 = playerCol.querySelector('.player-turn-5').value;
        let score6 = playerCol.querySelector('.player-turn-6').value;
        playerObj.score1 = score1;
        playerObj.score2 = score2;
        playerObj.score3 = score3;
        playerObj.score4 = score4;
        playerObj.score5 = score5;
        playerObj.score6 = score6;

        personArray.push(playerObj); 
    });

    localStorage.setItem('playerData', JSON.stringify(personArray)); 
    console.log(personArray); 
}

// retrieve local data to add to page
getLocalScores = () => {
    let personArray = JSON.parse(localStorage.getItem('playerData')); 
    if (personArray) {
    personArray.forEach((person, index) => {
        let playerCol = playerCols[index]; 
        playerCol.querySelector('.player-name').value = person.name;
        playerCol.querySelector('.player-turn-1').value = person.score1;
        playerCol.querySelector('.player-turn-2').value = person.score2;
        playerCol.querySelector('.player-turn-3').value = person.score3;
        playerCol.querySelector('.player-turn-4').value = person.score4;
        playerCol.querySelector('.player-turn-5').value = person.score5;
        playerCol.querySelector('.player-turn-6').value = person.score6;
    });
    }; 
}; 
getLocalScores(); 

// submit button click listener
submitBtns.on('click', () => {
   setLocalScores();
   getLocalScores(); 
}
)