/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

var init = function() {
    gamePlaying = true;    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 is 1st player, 1 is 2nd player
    reset(false);

    document.querySelector(`#name-0`).textContent = "Player 1";
    document.querySelector(`#name-1`).textContent = "Player 2";
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
   
};
init();
document.querySelector(".dice").style.display = 'none'; // hide the dice

function nextPlayer(){
    // round score is lost, go to next player
    roundScore = 0;                
    //TODO change background to indicate change of player
    //document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');  //remove/add is replaced by toggle
    activePlayer = (activePlayer === 0) ? 1 : 0;
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
   
    reset(true);
    // should it wait for half a second before hiding dice?        
    document.querySelector(".dice").style.display = 'none'; // hide the dice  
}

function reset(currentOnly){
    if (!currentOnly){
        document.getElementById(`score-0`).textContent = '0';
        document.getElementById(`score-1`).textContent = '0';
    }
    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';
}

document.querySelector(".btn-roll").addEventListener("click", function() { // annonymous function
    if (gamePlaying) {
        // 1. Generate Random number
        var dice = Math.round(Math.random() * 5) + 1; //Math.floor(Math.random()*6) + 1

        // 2. Display the result
        var diceDom = document.querySelector(".dice");
        diceDom.style.display = 'block';  // show the dice
        diceDom.src = `dice-${dice}.png`;  // change image of dice (alternative: diceDom.setAttribute("src", `dice-${dice}.png`);)
        document.querySelector(`#current-${activePlayer}`).innerHTML = '<em>' + dice +'</em>';
        var scoreDom = document.getElementById(`current-${activePlayer}`);
        // 3. Update the round score IF the rolled number was not a 1    
        if (dice !== 1){
            // add dice to score        
            roundScore += dice;
            
        } else {
            nextPlayer();
        }
        scoreDom.textContent = roundScore;
    }                
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying){
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;    

        // Update UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            // declare winner
            document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            // stop the game
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener('click', init);