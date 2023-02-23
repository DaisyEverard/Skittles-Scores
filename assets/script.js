// global constants
const submitBtns = $('.submit-btn');
const playerCols = $('.player-col'); 
const nameDivs = $('.player-name');

// store team names
const setNamesFunc = () => {
    const redName = $('input.red-name').val();
    const blueName = $('input.blue-name').val(); 
    localStorage.setItem('redName', JSON.stringify(redName));
    localStorage.setItem('blueName', JSON.stringify(blueName));
}

// get local names and add to page
const getNamesFunc = () => {
  let redName = localStorage.getItem('redName'); 
  let blueName = localStorage.getItem('blueName');

  if (redName && redName != 'undefined') {
    redName = JSON.parse(redName); 
    console.log($('input.red-name').val())
    $('input.red-name').val(redName)
    $('h4.red-name').text(redName)
  }
  if (blueName && blueName != 'undefined') {
    blueName = JSON.parse(blueName);
    $('input.blue-name').val(blueName)
    $('h4.blue-name').text(blueName)
  }
}
// call get names in load
getNamesFunc(); 

// add score data to local storage (overwrites previous)
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
    // no data on first load
    if (personArray) {
    // make player total accesible outside loop
    const playerTotalArray = [];
    // adds each turn's scores 
    personArray.forEach((person, index) => {
        let playerCol = playerCols[index]; 
        
        playerCol.querySelector('.player-name').value = person.name;
        playerCol.querySelector('.player-turn-1').value = person.score1;
        playerCol.querySelector('.player-turn-2').value = person.score2;
        playerCol.querySelector('.player-turn-3').value = person.score3;
        playerCol.querySelector('.player-turn-4').value = person.score4;
        playerCol.querySelector('.player-turn-5').value = person.score5;
        playerCol.querySelector('.player-turn-6').value = person.score6;

        // caculate player total, Nan if undefined added
        let playerTotal = 0; 
        if (person.score1) {
            playerTotal += parseInt(person.score1)
        }
        if (person.score2) {
            playerTotal += parseInt(person.score2)
        }
        if (person.score3) {
            playerTotal += parseInt(person.score3)
        }
        if (person.score4) {
            playerTotal += parseInt(person.score4)
        }
        if (person.score5) {
            playerTotal += parseInt(person.score5)
        }
        if (person.score6) {
            playerTotal += parseInt(person.score6)
        }
        playerTotalArray.push(playerTotal); 
    });

    // add player totals to page
    playerTotalArray.forEach((total, index) => {
        let playerCol = playerCols[index];
        playerCol.querySelector('.player-total').textContent = total; 
    })

    // caclulate run totals
    const runTotalArray = [
        {red: playerTotalArray[0] + playerTotalArray[1] + playerTotalArray[2],
        blue: playerTotalArray[3] + playerTotalArray[4] + playerTotalArray[5]},
        {red: playerTotalArray[6] + playerTotalArray[7] + playerTotalArray[8],
        blue: playerTotalArray[9] + playerTotalArray[10] + playerTotalArray[11]}, 
        {red: playerTotalArray[12] + playerTotalArray[13] + playerTotalArray[14], 
        blue: playerTotalArray[15] + playerTotalArray[16] + playerTotalArray[17]}]

        // calculate/print run scores
        $('.red-run-1').text(`Run 1: ${runTotalArray[0].red}`); 
        $('.red-run-2').text(`Run 2: ${runTotalArray[1].red}`); 
        $('.red-run-3').text(`Run 3: ${runTotalArray[2].red}`); 
        $('.blue-run-1').text(`Run 1: ${runTotalArray[0].blue}`); 
        $('.blue-run-2').text(`Run 2: ${runTotalArray[1].blue}`); 
        $('.blue-run-3').text(`Run 3: ${runTotalArray[2].blue}`); 

        // calculate/print run points
    runTotalArray.forEach((run, index) => {
        if (run.red > run.blue) {
            document.querySelector(`#run${index + 1} .red-score`).textContent = 2; 
            document.querySelector(`#run${index + 1} .blue-score`).textContent = 0; 
        } else if (run.blue > run.red) {
            document.querySelector(`#run${index + 1} .red-score`).textContent = 0; 
            document.querySelector(`#run${index + 1} .blue-score`).textContent = 2;
        } else {
            document.querySelector(`#run${index + 1} .red-score`).textContent = 1; 
            document.querySelector(`#run${index + 1} .blue-score`).textContent = 1;
        }

    }); 

    // calculate total team score
    const redOverall = runTotalArray[0].red + runTotalArray[1].red + runTotalArray[2].red;
    const blueOverall = runTotalArray[0].blue + runTotalArray[1].blue + runTotalArray[2].blue; 

    // calculate total team points
    let redPoints = parseInt(document.querySelector('#run1 .red-score').textContent) + 
    parseInt(document.querySelector('#run2 .red-score').textContent) + 
    parseInt(document.querySelector('#run3 .red-score').textContent);  

    let bluePoints = parseInt(document.querySelector('#run1 .blue-score').textContent) + 
    parseInt(document.querySelector('#run2 .blue-score').textContent) + 
    parseInt(document.querySelector('#run3 .blue-score').textContent); 
    
    // add bonus for overall score
    if (redOverall > blueOverall) {
        redPoints += 4; 
    } else if (blueOverall > redOverall) {
        bluePoints += 4; 
    } else {
        redPoints += 2;
        bluePoints += 2; 
    }

    // print total scores to top display
    document.querySelector('.jumbotron .red-score').textContent = redPoints; 
    document.querySelector('.jumbotron .blue-score').textContent = bluePoints; 
    }; 
}; 
getLocalScores(); 

// submit button click listener
submitBtns.on('click', () => {
   setLocalScores();
   getLocalScores(); 
   setNamesFunc();
   getNamesFunc(); 
}
)

// clear button click listener 
const clearBtn = $('.btn-danger')
clearBtn.on('click', () => {
    localStorage.removeItem('playerData');
    getLocalScores(); 
    $('input:not(.red-name, .blue-name)').val(''); 
    $('.red-score').text(''); 
    $('.blue-score').text('');
    $('h3').text('');
})