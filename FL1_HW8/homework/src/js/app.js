/*global questions*/
let arr = Array.from(questions);
let currentRound = Math.floor(Math.random() * arr.length);
let totalPrize = 0;
let roundPrize = 100;
let gameDiv = document.getElementById('hide');

function startGame () {
    totalPrize = 0;
    roundPrize = 100;
    gameDiv.style.display = 'block';
    document.getElementById('skipQ').disabled = false;
    document.getElementById('skipQ').style.display = 'block';
    document.getElementById('gameResult').style.display = 'none';
    document.getElementById('total').innerHTML = totalPrize;
    document.getElementById('roundPrize').innerHTML = roundPrize;
    
    document.getElementById('question').innerHTML = arr[currentRound].question;
    document.getElementById('pick-card0').innerHTML = arr[currentRound].content[0];
    document.getElementById('pick-card1').innerHTML = arr[currentRound].content[1];
    document.getElementById('pick-card2').innerHTML = arr[currentRound].content[2];
    document.getElementById('pick-card3').innerHTML = arr[currentRound].content[3];
}

document.getElementById('skipQ').onclick = function() {
    arr.splice(currentRound, 1);
    document.getElementById('question').innerHTML = arr[currentRound].question;
    document.getElementById('pick-card0').innerHTML = arr[currentRound].content[0];
    document.getElementById('pick-card1').innerHTML = arr[currentRound].content[1];
    document.getElementById('pick-card2').innerHTML = arr[currentRound].content[2];
    document.getElementById('pick-card3').innerHTML = arr[currentRound].content[3];
    document.getElementById('skipQ').disabled = true;
}

function pick(clicked) {
    console.log(this.id);
    let cardArr = ['pick-card0','pick-card1','pick-card2','pick-card3'];
    let correctNum = arr[currentRound].correct;
    let correctCard = cardArr[correctNum];
    
    if (clicked === correctCard) {
        arr.splice(currentRound, 1);
        totalPrize += roundPrize;
        roundPrize += roundPrize;
        document.getElementById('question').innerHTML = arr[currentRound].question;
        document.getElementById('pick-card0').innerHTML = arr[currentRound].content[0];
        document.getElementById('pick-card1').innerHTML = arr[currentRound].content[1];
        document.getElementById('pick-card2').innerHTML = arr[currentRound].content[2];
        document.getElementById('pick-card3').innerHTML = arr[currentRound].content[3];
        document.getElementById('total').innerHTML = totalPrize;
        document.getElementById('roundPrize').innerHTML = roundPrize;
    } else if (totalPrize >= 1000000) {
        gameDiv.style.display = 'none';
        document.getElementById('gameResult').style.display = 'block';
        document.getElementById('gameResultText').innerHTML = 'Congratulations! You won: 1000000';
    } else {
        gameDiv.style.display = 'none';
        document.getElementById('gameResult').style.display = 'block';
        document.getElementById('gameResultText').innerHTML = 'Game over. Your prize is: ' + totalPrize;
        document.getElementById('skipQ').disabled = true;
    }
}
