/****************************/
/*********PIG GAME***********/
/****************************/
var playerScores, roundScore, activePlayer, diceImg, gameState;
var rollBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var refreshBtn = document.querySelector('.btn-refresh');
var newBtn = document.querySelector('.btn-new');
var firstPlayerPanel = document.querySelector('.player-0-panel');
var secondPlayerPanel = document.querySelector('.player-1-panel');
init();

rollBtn.addEventListener('click', function() {
  if(gameState){
    //get the random number between 1 & 6
    var dice = Math.floor(Math.random() * 6) + 1 ;
    diceImg.classList.remove('hidden');
    console.log('roll')
    diceImg.src = 'assets/images/dice-' + dice + '.png';
      if(dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }
      else changePlayer();
  }
});

holdBtn.addEventListener('click', function() {
  if(gameState){
    console.log('hold')
    playersScores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = playersScores[activePlayer];

    if(playersScores[activePlayer] >= 100) {
      var playerPanel = document.querySelector('.player-' + activePlayer + '-panel');
      roundScore = 0;
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      playerPanel.classList.remove('active');
      playerPanel.classList.add('winner');
      diceImg.classList.add('hidden');
      rollBtn.classList.add('hidden');
      holdBtn.classList.add('hidden');
      refreshBtn.classList.add('hidden');
      newBtn.classList.remove('hidden');
      gameState = false;
    }
    else changePlayer();
  }
});

document.querySelector('.btn-instructions').addEventListener('click', toggleRulesBlock);
document.querySelector('.btn-back').addEventListener('click', toggleRulesBlock);
refreshBtn.addEventListener('click', function() {
  init();
  firstPlayerPanel.classList.add('active');
});
newBtn.addEventListener('click', function() {
  init();
  showButtons();
});
document.querySelector('.btn-start').addEventListener('click', function() {
  document.querySelector('.intro-block').style.display = 'none';
});

function changePlayer() {
  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  firstPlayerPanel.classList.toggle('active');
  secondPlayerPanel.classList.toggle('active');
  diceImg.classList.add('hidden');
}

function toggleRulesBlock() {
  document.querySelector('.rules-block').classList.toggle('hidden');
}
function showButtons() {
  rollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
  refreshBtn.classList.remove('hidden');
  newBtn.classList.add('hidden');
  firstPlayerPanel.classList.add('active');
}
function init() {
  playersScores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameState = true;
  diceImg = document.querySelector('.dice');
  diceImg.classList.add('hidden');
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  firstPlayerPanel.classList.remove('winner');
  secondPlayerPanel.classList.remove('winner');
  firstPlayerPanel.classList.remove('active');
  secondPlayerPanel.classList.remove('active');
}
