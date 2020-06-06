/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, finalScore, prevRoll;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        console.info('roll button clicked');
        const diceNum = 2; // number of dices
        var dice = [0, 0];        
        for (var i = 0; i < diceNum; i++){
            // 1. Random number        
            dice[i] = Math.floor(Math.random() * 6) + 1;            

            //2. Display the result
            var diceDOM = document.querySelector(`#dice-${i + 1}`);
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice[i] + '.png';
            console.log(`currRoll: ${dice[i]}, prevRoll: ${prevRoll[i]}`);
        }
                
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice[0] === 1 || dice[1] === 1) {
            //Next player
            nextPlayer();            
        } else if ((dice[0] == 6 && prevRoll[0] == 6) || (dice[1] == 6 && prevRoll[1] == 6)) {  // double 6
            // lose entire score
            console.log(`Double 6, Player ${activePlayer} reset to 0`);
            scores[activePlayer] = 0;
            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();            
        } else {
            //Add score            
            roundScore += dice[0] + dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            console.info (`${dice[0] + dice[1]} added to score`);
        }
        prevRoll[0] = dice[0];
        prevRoll[1] = dice[1];
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            var diceDomItem = document.querySelectorAll('.dice');
            diceDomItem.forEach(function(item) {        
                item.style.display = 'none';
            });
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            console.info (`Player ${activePlayer} won.`);
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    var diceDomItem = document.querySelectorAll('.dice');
    diceDomItem.forEach(function(item) {        
        item.style.display = 'none';
    });
    prevRoll = [0, 0];
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;    
    finalScore = 100; // default final score
    prevRoll = [0, 0];
    
    var diceDomItem = document.querySelectorAll('.dice');
    diceDomItem.forEach(function(item) {        
        item.style.display = 'none';
    });

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    readFinalScore();    
}

/*  Reads the final score from text field, attempts to parse it
 *  If it is a number, then set the new final score
*/
function readFinalScore() {
    var finalScoreInput = document.querySelector('.final-score').value;        
    var parsedFinalScoreInput = parseInt(finalScoreInput, 10);
    if (!isNaN(parsedFinalScoreInput)){
        finalScore = parsedFinalScoreInput;        
        console.info (`Final score set to ${finalScore}`);        
    } else {
        console.info (`Final score input (${finalScoreInput}) is invalid. Final score is: ${finalScore}`);
    }
}

document.querySelector('.final-score').addEventListener('input', readFinalScore);

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;



/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
