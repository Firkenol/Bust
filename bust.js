const cardImageNames = ["./2_of_clubs.svg","./2_of_diamonds.svg","./2_of_hearts.svg","./2_of_spades.svg","./3_of_clubs.svg","./3_of_diamonds.svg","./3_of_hearts.svg","./3_of_spades.svg","./4_of_clubs.svg","./4_of_diamonds.svg","./4_of_hearts.svg","./4_of_spades.svg","./5_of_clubs.svg","./5_of_diamonds.svg","./5_of_hearts.svg","./5_of_spades.svg","./6_of_clubs.svg","./6_of_diamonds.svg","./6_of_hearts.svg","./6_of_spades.svg","./7_of_clubs.svg","./7_of_diamonds.svg",
                        "./7_of_hearts.svg","./7_of_spades.svg","./8_of_clubs.svg","./8_of_diamonds.svg","./8_of_hearts.svg","./8_of_spades.svg","./9_of_clubs.svg","./9_of_diamonds.svg","./9_of_hearts.svg","./9_of_spades.svg","./10_of_clubs.svg","./10_of_diamonds.svg","./10_of_hearts.svg","./10_of_spades.svg","./ace_of_clubs.svg","./ace_of_diamonds.svg","./ace_of_hearts.svg","./ace_of_spades.svg","./jack_of_clubs.svg","./jack_of_diamonds.svg","./jack_of_hearts.svg","./jack_of_spades.svg",
                        "./king_of_clubs.svg","./king_of_diamonds.svg","./king_of_hearts.svg","./king_of_spades.svg","./queen_of_clubs.svg","./queen_of_diamonds.svg","./queen_of_hearts.svg","./queen_of_spades.svg"];
var indexOfSelectedCard;
var walkThroughStage;
var roundNum = 1;
var cardsOnTable = ["Player1Card1","Player2Card1","Player3Card1","DealerCard"];
var cardsNumsOnTable = [1,1,1,1];
var options = ["stand","stand","hit","fold"];
var cardStillInGame = [true, true, true, true];
var option;
var cardValue;
var card;
var timesHitPlayer1 = 0;
var timesHitPlayer2 = 0;
var timesHitPlayer3 = 0;
var opponentChoice;
var cardVal;
var player = 1;
var playerScores = [0,0,0,0];
var playerCardName;
var currentCardData = [];
var playerCards = [];
var opponent1Cards = [];
var opponent2Cards = [];
var dealerCard = [];
var playerCanHit = true;
function finishGame(){
    if(opponent1Cards.length == 4){
        newOpponent1Card1.src = opponent1Cards[1];
        newOpponent1Card2.src = opponent1Cards[2];
        newOpponent1Card3.src = opponent1Cards[3];
    }
    else if(opponent1Cards.length == 3){
        newOpponent1Card1.src = opponent1Cards[1];
        newOpponent1Card2.src = opponent1Cards[2];
    }
    else if(opponent1Cards.length == 2){
        newOpponent1Card1.src = opponent1Cards[1];
    }
    else{

    }
    if(opponent2Cards.length == 4){
        document.getElementById('newOpponent2Card1').src = opponent2Cards[1];
        document.getElementById('newOpponent2Card2').src = opponent2Cards[2];
        document.getElementById('newOpponent2Card3').src = opponent2Cards[3];
    }
    else if(opponent2Cards.length == 3){
        newOpponent2Card1.src = opponent2Cards[1];
        newOpponent2Card2.src = opponent2Cards[2];
    }
    else if(opponent2Cards.length == 2){
        newOpponent2Card1.src = opponent2Cards[1];
    }
    if(roundNum == 3){
        document.getElementById('cardimg3').src = dealerCard[0];
    }
    roundNum = 5;
    printWinner();
}
async function printWinner(){
    var max = 0;
    var indexOfMaxScores = [];
    for(var i = 0; i < 4; i++){
        if(cardStillInGame[i] == false){
            continue;
        }
        else{
        if(i < 3){
        if((playerScores[i] < 28) && (playerScores[i] < playerScores[3] * 2)){
            if(playerScores[i] > max){
                max = playerScores[i];
                if(indexOfMaxScores.length > 0){
                    indexOfMaxScores.length = 0;
                }
                else{
                    
                }
                indexOfMaxScores.push(i);
            }
            else if(playerScores[i] == max){
                indexOfMaxScores.push(i);
            }
            else{

            }
        }
        else if((playerScores[1] > playerScores[3]* 2) && (playerScores[i] < 28)){
            document.getElementById('instructionWindow').innerHTML = "Player " + (i+1) + " busts!";
            await sleep(2000);
        }
        else{

        }
        }
        else{
            if(playerScores[i] > max){
                max = playerScores[i];
                if(indexOfMaxScores.length > 0){
                    indexOfMaxScores.length = 0;
                }
                else{

                }
                indexOfMaxScores.push(i)
            }
            else if(playerScores[i] == max){
                indexOfMaxScores.push(i);
            }
            else{

            }
        }
    }
    if(indexOfMaxScores.length == 1){
        document.getElementById('instructionWindow').innerHTML = "Congratulations, the winner is Player " + (indexOfMaxScores[0] + 1) + "! Would you like to play again?";
    }   
    else if(indexOfMaxScores.length == 2){
        document.getElementById('instructionWindow').innerHTML = "Wow, it looks like it's a tie between Players " + (indexOfMaxScores[0] + 1) + " and " + (indexOfMaxScores[1] + 1) + "! Would you like to play again?";
    }
    else if(indexOfMaxScores.length == 3){
        document.getElementById('instructionWindow').innerHTML = "WHAT! It looks like it's a tie between Players " + (indexOfMaxScores[0] + 1) + ", " + (indexOfMaxScores[1] + 1) + ", and " + (indexOfMaxScores[2] + 1) + "! Would you like to play again?";
    }
    else if(indexOfMaxScores.length == 4){
        document.getElementById('instructionWindow').innerHTML = "How, it looks like it's a tie between Players " + (indexOfMaxScores[0] + 1) + ", " + (indexOfMaxScores[1] + 1) + ", " + (indexOfMaxScores[2] + 1) + ", and " + (indexOfMaxScores[3] + 1) + "! Would you like to play again?";
    }
}
}
async function realHit(){
    if(cardsNumsOnTable[0] == 3){
        currentCardData = drawCard();
        document.getElementById('realHitButton').style.display = "none";
        document.getElementById('realStandButton').style.display = "none";
        document.getElementById('realFoldButton').style.display = "none";
        playerCanHit = false;
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        newPlayerCard3.src  = currentCardData[1];
        playerScores[0] += currentCardData[0];
        cardsNumsOnTable[2] += 1;
        newPlayerCard3.style.position = "absolute";
        newPlayerCard3.style.width = "111px";
        newPlayerCard3.style.height = "161.5px";
        newPlayerCard3.style.zIndex = "6";
        newPlayerCard3.style.bottom = "35%";
        newPlayerCard3.style.right = "40%";
        newPlayerCard3.style.display = "inline-block";
        await sleep(1000);
    }
    if(cardsNumsOnTable[0] == 2){
        currentCardData = drawCard();
        document.getElementById('realHitButton').style.display = "none";
        document.getElementById('realStandButton').style.display = "none";
        document.getElementById('realFoldButton').style.display = "none";
        playerCanHit = false;
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        newPlayerCard2.src = currentCardData[1];
        playerScores[0] += currentCardData[0];
        cardsNumsOnTable[2] += 1;
        newPlayerCard2.style.display = "inline-block";
        newPlayerCard2.style.position = "absolute";
        newPlayerCard2.style.width = "111px";
        newPlayerCard2.style.height = "161.5px";
        newPlayerCard2.style.zIndex = "5";
        newPlayerCard2.style.bottom = "35%";
        newPlayerCard2.style.right = "42%";
        await sleep(1000);
        
    }
    if(cardsNumsOnTable[0] == 1){
        currentCardData = drawCard();
        document.getElementById('realHitButton').style.display = "none";
        document.getElementById('realStandButton').style.display = "none";
        document.getElementById('realFoldButton').style.display = "none";
        playerCanHit = false;
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        newPlayerCard1.src = currentCardData[1];
        playerScores[0] += currentCardData[0];
        cardsNumsOnTable[2] += 1;
        newPlayerCard1.style.position = "absolute";
        newPlayerCard1.style.width = "111px";
        newPlayerCard1.style.height = "161.5px";
        newPlayerCard1.style.zIndex = "3";
        newPlayerCard1.style.bottom = "35%";
        newPlayerCard1.style.right = "44%";
        newPlayerCard1.style.display = "inline-block";
        document.getElementById('cardimg2').style.right = "46%";
        await sleep(1000);
    }
    cardsNumsOnTable[0] += 1;
    if(playerScores[0] <= 28){
        document.getElementById('cardimg2').style.boxShadow = "none";
        document.getElementById('instructionWindow').innerHTML = "Congratulations, you have " + playerScores[0] + " points!";
        document.getElementById('realHitButton').style.display = "none";
        document.getElementById('realStandButton').style.display = "none";
        document.getElementById('realFoldButton').style.display = "none";
        await sleep(1000);
    }
    else{
        document.getElementById('cardimg2').style.boxShadow = "none";
        document.getElementById('instructionWindow').innerHTML = "Nooooo, you busted! Just see what happens and play again.";
        playerScores[0] = 0;
        cardsNumsOnTable[0] = 0;
        cardStillInGame[0] = false;
        document.getElementById('realHitButton').style.display = "none";
        document.getElementById('realStandButton').style.display = "none";
        document.getElementById('realFoldButton').style.display = "none";
        await sleep(1000);
    }
    evalGame();
}
async function evalGame(){
    document.getElementById('instructionWindow').style.display = "inline-block";
    if(cardStillInGame[1] == true){
        option = options[Math.floor(Math.random() * 3)];
    }
    else{
        option = "cardNotInGame";
        evalGameForPlayerThree();
    }
        if(option == "hit"){
            if(cardStillInGame[1] == true){
            if(timesHitPlayer2 == 2){
                currentCardData = drawCard();
                document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
                newOpponent1Card3.src = './back.png';
                opponent1Cards[3] = currentCardData[1];
                playerScores[1] += currentCardData[0];
                cardsNumsOnTable[2] += 1;
                timesHitPlayer2 = 3;
                newOpponent1Card3.style.position = "absolute";
                newOpponent1Card3.style.width = "111px";
                newOpponent1Card3.style.height = "161.5px";
                newOpponent1Card3.style.zIndex = "4";
                newOpponent1Card3.style.top = "19%";
                newOpponent1Card3.style.left = "35%";
                newOpponent1Card3.style.rotate = ('90deg');
                newOpponent1Card3.style.display = "inline-block";
                await sleep(3000);
            }
            else if(timesHitPlayer2 == 1){
                currentCardData = drawCard();
                document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
                newOpponent1Card2.src = './back.png';
                opponent1Cards[2] = currentCardData[1];
                playerScores[1] += currentCardData[0];
                cardsNumsOnTable[2] += 1;
                timesHitPlayer2 = 2
                newOpponent1Card2.style.position = "absolute";
                newOpponent1Card2.style.width = "111px";
                newOpponent1Card2.style.height = "161.5px";
                newOpponent1Card2.style.zIndex = "3";
                newOpponent1Card2.style.top = "21%";
                newOpponent1Card2.style.left = "35%";
                newOpponent1Card2.style.rotate = ('90deg');
                newOpponent1Card2.style.display = "inline-block";
                await sleep(3000);
            }
            else if(timesHitPlayer2 == 0){
                currentCardData = drawCard();
                document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
                newOpponent1Card1.src = './back.png';
                opponent1Cards[1] = currentCardData[1];
                playerScores[1] += currentCardData[0];
                cardsNumsOnTable[2] += 1;
                timesHitPlayer2 = 1;
                newOpponent1Card1.style.position = "absolute";
                newOpponent1Card1.style.width = "111px";
                newOpponent1Card1.style.height = "161.5px";
                newOpponent1Card1.style.zIndex = "2";
                newOpponent1Card1.style.top = "23%";
                newOpponent1Card1.style.left = "35%";
                newOpponent1Card1.style.rotate = ('90deg');
                newOpponent1Card1.style.display = "inline-block";
                await sleep(1000);
            }
            cardsNumsOnTable[1] += 1;
            if(playerScores[1] > 28){
                document.getElementById('instructionWindow').innerHTML = "Player 2 busts!";
                cardsNumsOnTable[1] = -1;
                cardStillInGame[1] = false;
                document.getElementById('cardimg4').style.boxShadow = "none";
                await sleep(1000);
                evalGameForPlayerThree();
            }
            else{
                document.getElementById('cardimg4').style.boxShadow = "none";
                await sleep(1000);
                evalGameForPlayerThree();
            }
        }
        }
            else if(option == "stand"){
                document.getElementById('cardimg2').style.boxShadow = "none";
                document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                await sleep(1000);
                document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
                await sleep(1000);
                evalGameForPlayerThree();
                }
            else if(option == "fold"){
                document.getElementById('cardimg2').style.boxShadow = "none";
                document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                await sleep(1000);
                document.getElementById('instructionWindow').innerHTML = "Player 2 folds!";
                cardsNumsOnTable[1] = 5;
                cardStillInGame[1] = false;
                await sleep(1000);
                evalGameForPlayerThree();
                }
                else{
                    document.getElementById('cardimg2').style.boxShadow = "none";
                    document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                    await sleep(500)
                    evalGameForPlayerThree();
                }
            
}
async function evalGameForPlayerThree(){
    if(cardStillInGame[2] == true){
        option = options[Math.floor(Math.random() * 3)];
    }
    else{
        option = "cardNotInGame";
        document.getElementById('realHitButton').style.display = "inline-block";
        document.getElementById('realStandButton').style.display = "inline-block";
        document.getElementById('realFoldButton').style.display = "inline-block";

    }
if(option == "hit"){
    playerCanHit = true;
    if(cardStillInGame[2] == true){
    if(timesHitPlayer3 < 1){
        currentCardData = drawCard();
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 hits!";
        document.getElementById('newOpponent2Card1').src = './back.png';
        opponent2Cards[1] = currentCardData[1];
        playerScores[2] += currentCardData[0];
        cardsNumsOnTable[2] = 2;
        timesHitPlayer3 = 1;
        document.getElementById('newOpponent2Card1').src = "./back.png";
        document.getElementById('newOpponent2Card1').style.position = "absolute";
        document.getElementById('newOpponent2Card1').style.width = "111px";
        document.getElementById('newOpponent2Card1').style.height = "161.5px";
        document.getElementById('newOpponent2Card1').style.zIndex = "3";
        document.getElementById('newOpponent2Card1').style.top = "15%";
        document.getElementById('newOpponent2Card1').style.right = "43%";
        document.getElementById('newOpponent2Card1').style.display = "inline-block";
        document.getElementById('cardimg1').style.right = "45%";
        await sleep(1000);
    }
    else if(timesHitPlayer3 == 1){
        currentCardData = drawCard();
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 hits!";
        document.getElementById('newOpponent2Card2').src = './back.png';
        opponent2Cards[2] = currentCardData[1];
        playerScores[2] += currentCardData[0];
        cardsNumsOnTable[2] = 3;
        timesHitPlayer3 = 2;
        document.getElementById('newOpponent2Card2').src = "./back.png";
        document.getElementById('newOpponent2Card2').style.position = "absolute";
        document.getElementById('newOpponent2Card2').style.width = "111px";
        document.getElementById('newOpponent2Card2').style.height = "161.5px";
        document.getElementById('newOpponent2Card2').style.zIndex = "4";
        document.getElementById('newOpponent2Card2').style.top = "15%";
        document.getElementById('cardimg1').style.right = "45%";
        document.getElementById('newOpponent2Card1').style.right = "43%";
        document.getElementById('newOpponent2Card2').style.right = "41%";
        document.getElementById('newOpponent2Card2').style.display = "inline-block";
        await sleep(1000);
    }
    else if(timesHitPlayer3 == 2){
        currentCardData = drawCard();
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 hits!";
        opponent2Cards[3] = currentCardData[1];
        playerScores[2] += currentCardData[0];
        cardsNumsOnTable[2] = 5;
        timesHitPlayer3 = 3;
        newOpponent2Card3.src = "./back.png";
        newOpponent2Card3.style.position = "absolute";
        newOpponent2Card3.style.width = "111px";
        newOpponent2Card3.style.height = "161.5px";
        newOpponent2Card3.style.zIndex = "5";
        newOpponent2Card3.style.top = "15%";
        document.getElementById('cardimg1').style.right = "47%";
        document.getElementById('newOpponent2Card1').style.right = "45%";
        document.getElementById('newOpponent2Card2').style.right = "43%";
        newOpponent2Card3.style.right = "41%";
        newOpponent2Card3.style.display = "inline-block";
        await sleep(1000);
    }
    if(playerScores[2] > 28){
        document.getElementById('cardimg1').style.boxShadow = "none"; 
        document.getElementById('instructionWindow').innerHTML = "Player 3 busts!";
        cardStillInGame[2] = false;
        cardsNumsOnTable[2] = 5;
        await sleep(1500);
    }
    else{
        document.getElementById('cardimg1').style.boxShadow = "none"; 
    }
}
}
else if(option == "stand"){
document.getElementById('cardimg4').style.boxShadow = "none";
document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
document.getElementById('instructionWindow').innerHTML = "Player 3 Stands!";
await sleep(1000);
}
else if(option == "fold"){
document.getElementById('cardimg4').style.boxShadow = "none";
document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
document.getElementById('instructionWindow').innerHTML = "Player 3 Folds!";
await sleep(1000);
}
else{

}
if(roundNum == 3){
finishGame();
}
else{
callEvalGame();
}
}
async function callEvalGame(){
    player = 1;
    roundNum += 1;
    if((cardStillInGame[0] != true)){
        document.getElementById('cardimg1').style.boxShadow = "none"; 
        evalGame();
        roundNum += 1;
    }
    else{
        await sleep(1000);
        document.getElementById('instructionWindow').innerHTML = "Choose one";
        document.getElementById('cardimg1').style.boxShadow = "none"; 
        document.getElementById('realHitButton').style.display = "inline-block";
        document.getElementById('realStandButton').style.display = "inline-block";
        document.getElementById('realFoldButton').style.display = "inline-block";
    }
}
async function realStand(){
    document.getElementById('cardimg1').style.boxShadow = "none";
    document.getElementById('instructionWindow').innerHTML = "Player 1 Stands!";
    document.getElementById('realHitButton').style.display = "none";
    document.getElementById('realStandButton').style.display = "none";
    document.getElementById('realFoldButton').style.display = "none";
    await sleep(1000);
    evalGame();
}
async function realFold(){
    document.getElementById('cardimg1').style.boxShadow = "none";
    document.getElementById('instructionWindow').innerHTML = "Player 1 Folds!";
    document.getElementById('realHitButton').style.display = "none";
    document.getElementById('realStandButton').style.display = "none";
    document.getElementById('realFoldButton').style.display = "none";
    await sleep(1000);
    evalGame();
}
function drawCard(){
    indexOfSelectedCard = Math.floor(Math.random() * (cardImageNames.length - 1));
    card = cardImageNames[indexOfSelectedCard];
    if(card == "./2_of_clubs.svg" || card == "./2_of_diamonds.svg" || card == "./2_of_hearts.svg" || card == "./2_of_spades.svg"){
        cardValue = 2;
    }
    else if(card == "./3_of_clubs.svg" || card == "./3_of_diamonds.svg" || card == "./3_of_hearts.svg" || card == "./3_of_spades.svg"){
        cardValue = 3;
    }
    else if(card == "./4_of_clubs.svg" || card == "./4_of_diamonds.svg" || card == "./4_of_hearts.svg" || card == "./4_of_spades.svg"){
        cardValue = 4;
    }
    else if(card == "./5_of_clubs.svg" || card == "./5_of_diamonds.svg" || card == "./5_of_hearts.svg" || card == "./5_of_spades.svg"){
        cardValue = 5;
    }
    else if(card == "./6_of_clubs.svg" || card == "./6_of_diamonds.svg" || card == "./6_of_hearts.svg" || card == "./6_of_spades.svg"){
        cardValue = 6;
    }
    else if(card == "./7_of_clubs.svg" || card == "./7_of_diamonds.svg" || card == "./7_of_hearts.svg" || card == "./7_of_spades.svg"){
        cardValue = 7;
    }
    else if(card == "./8_of_clubs.svg" || card == "./8_of_diamonds.svg" || card == "./8_of_hearts.svg" || card == "./8_of_spades.svg"){
        cardValue = 8;
    }
    else if(card == "./9_of_clubs.svg" || card == "./9_of_diamonds.svg" || card == "./9_of_hearts.svg" || card == "./9_of_spades.svg"){
        cardValue = 9;
    }
    else if(card == "./10_of_clubs.svg" || card == "./10_of_diamonds.svg" || card == "./10_of_hearts.svg" || card == "./10_of_spades.svg"){
        cardValue = 10;
    }
    else if(card == "./jack_of_clubs.svg" || card == "./jack_of_diamonds.svg" || card == "./jack_of_hearts.svg" || card == "./jack_of_spades.svg"){
        cardValue = 10;
    }
    else if(card == "./queen_of_clubs.svg" || card == "./queen_of_diamonds.svg" || card == "./queen_of_hearts.svg" || card == "./queen_of_spades.svg"){
        cardValue = 10;
    }
    else if(card == "./king_of_clubs.svg" || card == "./king_of_diamonds.svg" || card == "./king_of_hearts.svg" || card == "./king_of_spades.svg"){
        cardValue = 10;
    }
    else{
        cardValue = 14;
    }
    cardImageNames.splice(indexOfSelectedCard,1);
    return [cardValue, card];
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function loadGameScreen(){
    document.getElementById('playButton').style.display = "none";
    document.getElementById('learnButton').style.display = "none";
    roundNum = 1;
    cardsOnTable = ["Player1Card1","Player2Card1","Player3Card1","DealerCard"];
    cardsNumsOnTable = [1,1,1,1];
    options = ["stand","stand","hit","fold"];
    cardStillInGame = [true, true, true, true];
    timesHitPlayer1 = 0;
    timesHitPlayer2 = 0;
    timesHitPlayer3 = 0;
    player = 1;
    playerScores = [0,0,0,0];
    playerCardName;
    currentCardData = [];
    playerCards = [];
    opponent1Cards = [];
    opponent2Cards = [];
    dealerCard = [];
    playerCanHit = true;
    document.getElementById('instructionWindow').style.display = "inline-block";
    document.getElementById('instructionWindow').innerHTML = "Choose one";
    cardsNumsOnTable = [1,1,1,1];
    const newPlayerCard1 = new Image(111,161.5);
        newPlayerCard1.src = "back.png";
        newPlayerCard1.id = "newPlayerCard1";
        newPlayerCard1.style.display = "none";
        document.body.appendChild(newPlayerCard1);
        const newPlayerCard2 = new Image(111,161.5);
        newPlayerCard2.src = "back.png";
        newPlayerCard2.id = "newPlayerCard2";
        newPlayerCard2.style.display = "none";
        document.body.appendChild(newPlayerCard2);
        const newPlayerCard3 = new Image(111,161.5);
        newPlayerCard3.src = "back.png";
        newPlayerCard3.id = "newPlayerCard3";
        newPlayerCard3.style.display = "none";
        document.body.appendChild(newPlayerCard3);
        const newOpponent1Card1 = new Image(111,161.5);
        newOpponent1Card1.src = "back.png";
        newOpponent1Card1.id = "newOpponent1Card1";
        newOpponent1Card1.style.display = "none";
        document.body.appendChild(newOpponent1Card1);
        const newOpponent1Card2 = new Image(111,161.5);
        newOpponent1Card2.src = "back.png";
        newOpponent1Card2.id = "newOpponent1Card2";
        newOpponent1Card2.style.display = "none";
        document.body.appendChild(newOpponent1Card2);
        const newOpponent1Card3 = new Image(111,161.5);
        newOpponent1Card3.src = "back.png";
        newOpponent1Card3.id = "newOpponent1Card3";
        newOpponent1Card3.style.display = "none";
        document.body.appendChild(newOpponent1Card3);
        const newOpponent2Card1 = new Image(111,161.5);
        newOpponent2Card1.src = "back.png";
        newOpponent2Card1.id = "newOpponent2Card1";
        newOpponent2Card1.style.display = "none";
        document.body.appendChild(newOpponent2Card1);
        const newOpponent2Card2 = new Image(111,161.5);
        newOpponent2Card2.src = "back.png";
        newOpponent2Card2.id = "newOpponent2Card2";
        newOpponent2Card2.style.display = "none";
        document.body.appendChild(newOpponent2Card2);
        const newOpponent2Card3 = new Image(111,161.5);
        newOpponent2Card3.src = "back.png";
        newOpponent2Card3.id = "newOpponent2Card3";
        newOpponent2Card3.style.display = "none";
        document.body.appendChild(newOpponent2Card3);
        currentCardData = drawCard();
        document.getElementById('cardimg1').src = currentCardData[1];
        playerScores[2] += currentCardData[0];
        document.getElementById('cardimg1').style.display = "inline-block";
        opponent2Cards.push(currentCardData[1]);
        currentCardData = drawCard();
        document.getElementById('cardimg2').src = currentCardData[1];
        playerScores[0] += currentCardData[0];
        document.getElementById('cardimg2').style.display = "inline-block";
        playerCards.push(currentCardData[1]);
        currentCardData = drawCard();
        document.getElementById('cardimg3').src = "./back.png";
        playerScores[3] += currentCardData[0];
        document.getElementById('cardimg3').style.display = "inline-block";
        dealerCard.push(currentCardData[1]);
        currentCardData = drawCard();
        document.getElementById('cardimg4').src = currentCardData[1];
        playerScores[1] += currentCardData[0];
        document.getElementById('cardimg4').style.display = "inline-block";
        opponent1Cards.push(currentCardData[1]);
    document.getElementById('cardimg3').src = "back.png";
    document.getElementById('cardimg1').style.position = "absolute";
    document.getElementById('cardimg1').style.height = "161.5px";
    document.getElementById('cardimg1').style.width = "111px";
    document.getElementById('cardimg1').style.top = "15%";
    document.getElementById('cardimg1').style.right = "45%";
    document.getElementById('cardimg2').style.position = "absolute";
    document.getElementById('cardimg2').style.height = "161.5px";
    document.getElementById('cardimg2').style.width = "111px";
    document.getElementById('cardimg2').style.bottom = "35%";
    document.getElementById('cardimg2').style.right = "45%";
    document.getElementById('cardimg2').style.rotate = "180deg";
    document.getElementById('cardimg3').style.position = "absolute";
    document.getElementById('cardimg3').style.height = "161.5px";
    document.getElementById('cardimg3').style.width = "111px";
    document.getElementById('cardimg3').style.top = "25%";
    document.getElementById('cardimg3').style.right = "30%";
    document.getElementById('cardimg3').style.rotate = "90deg";
    document.getElementById('cardimg4').style.position = "absolute";
    document.getElementById('cardimg4').style.height = "161.5px";
    document.getElementById('cardimg4').style.width = "111px";
    document.getElementById('cardimg4').style.transform = "rotate(270deg)";
    document.getElementById('cardimg4').style.top = "25%";
    document.getElementById('cardimg4').style.left = "35%";
    document.getElementById('realHitButton').style.display = "inline-block";
    document.getElementById('realStandButton').style.display = "inline-block";
    document.getElementById('realFoldButton').style.display = "inline-block";
}
function loadLearnScreen(){
    const newPlayerCard1 = new Image(111,161.5);
    newPlayerCard1.src = "back.png";
    newPlayerCard1.id = "newPlayerCard1";
    newPlayerCard1.style.display = "none";
    document.body.appendChild(newPlayerCard1);
    const newPlayerCard2 = new Image(111,161.5);
    newPlayerCard2.src = "back.png";
    newPlayerCard2.id = "newPlayerCard2";
    newPlayerCard2.style.display = "none";
    document.body.appendChild(newPlayerCard2);
    const newPlayerCard3 = new Image(111,161.5);
    newPlayerCard3.src = "back.png";
    newPlayerCard3.id = "newPlayerCard3";
    newPlayerCard3.style.display = "none";
    document.body.appendChild(newPlayerCard3);
    const newOpponent1Card1 = new Image(111,161.5);
    newOpponent1Card1.src = "back.png";
    newOpponent1Card1.id = "newOpponent1Card1";
    newOpponent1Card1.style.display = "none";
    document.body.appendChild(newOpponent1Card1);
    const newOpponent1Card2 = new Image(111,161.5);
    newOpponent1Card2.src = "back.png";
    newOpponent1Card2.id = "newOpponent1Card2";
    newOpponent1Card2.style.display = "none";
    document.body.appendChild(newOpponent1Card2);
    const newOpponent1Card3 = new Image(111,161.5);
    newOpponent1Card3.src = "back.png";
    newOpponent1Card3.id = "newOpponent1Card3";
    newOpponent1Card3.style.display = "none";
    document.body.appendChild(newOpponent1Card3);
    const newOpponent2Card1 = new Image(111,161.5);
    newOpponent2Card1.src = "back.png";
    newOpponent2Card1.id = "newOpponent2Card1";
    newOpponent2Card1.style.display = "none";
    document.body.appendChild(newOpponent2Card1);
    const newOpponent2Card2 = new Image(111,161.5);
    newOpponent2Card2.src = "back.png";
    newOpponent2Card2.id = "newOpponent2Card2";
    newOpponent2Card2.style.display = "none";
    document.body.appendChild(newOpponent2Card2);
    const newOpponent2Card3 = new Image(111,161.5);
    newOpponent2Card3.src = "back.png";
    newOpponent2Card3.id = "newOpponent2Card3";
    newOpponent2Card3.style.display = "none";
    document.body.appendChild(newOpponent2Card3);
    document.getElementById('nextButton').style.top = "91%";
    document.getElementById('nextButton').style.right = "28%";
    cardsOnTable = ["Player1Card1","Player2Card1","Player3Card1","DealerCard"];
    document.getElementById('playButton').style.display = "none";
    document.getElementById('learnButton').style.display = "none";
    walkThroughStage = 1;
    document.getElementById('instructionWindow').innerHTML = "Our game starts with three shown cards, the players, and one hidden card, the dealer.<br>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
    document.getElementById('instructionWindow').style.display = "inline-block";
    for (let i = 1; i < 5; i++) {
    document.getElementById("cardimg"+i).style.display = "inline-block";
    }
    document.getElementById('cardimg1').style.position = "absolute";
    document.getElementById('cardimg1').src = "./ace_of_spades.svg";
    document.getElementById('cardimg1').style.height = "161.5px";
    document.getElementById('cardimg1').style.width = "111px";
    document.getElementById('cardimg1').style.top = "15%";
    document.getElementById('cardimg1').style.right = "45%";
    document.getElementById('cardimg2').style.position = "absolute";
    document.getElementById('cardimg2').src = "./2_of_clubs.svg";
    document.getElementById('cardimg2').style.height = "161.5px";
    document.getElementById('cardimg2').style.width = "111px";
    document.getElementById('cardimg2').style.bottom = "35%";
    document.getElementById('cardimg2').style.right = "45%";
    document.getElementById('cardimg2').style.rotate = "180deg";
    document.getElementById('cardimg3').style.position = "absolute";
    document.getElementById('cardimg3').src = "back.png";
    document.getElementById('cardimg3').style.height = "161.5px";
    document.getElementById('cardimg3').style.width = "111px";
    document.getElementById('cardimg3').style.top = "25%";
    document.getElementById('cardimg3').style.right = "30%";
    document.getElementById('cardimg3').style.rotate = "90deg";
    document.getElementById('cardimg4').style.position = "absolute";
    document.getElementById('cardimg4').src = "./9_of_diamonds.svg";
    document.getElementById('cardimg4').style.height = "161.5px";
    document.getElementById('cardimg4').style.width = "111px";
    document.getElementById('cardimg4').style.transform = "rotate(270deg)";
    document.getElementById('cardimg4').style.top = "25%";
    document.getElementById('cardimg4').style.left = "35%";
    document.getElementById('nextButton').style.display = "inline-block";
    document.getElementById('nextButton').style.position = "absolute";
}
function nextButton(){
    if(walkThroughStage == 1){
        walkThroughStage=2;
        document.getElementById('instructionWindow').innerHTML = "Now remember, you can see your opponents' first cards, but after that, you're in the dark. The goal of this game is to<br> have the highest card total without going over double the dealer's card value. If you do, you'll bust!(get it?)";
        document.getElementById('nextButton').style.right = "330px";
        document.getElementById('nextButton').style.bottom = "55px";
        document.getElementById('nextButton').style.width = "53.73px";
        document.getElementById('nextButton').style.height = "23.6px";
    }
    else if(walkThroughStage == 2){
        document.getElementById('instructionWindow').innerHTML = "In this game, Jacks, Queens, and Kings are 10 points and Aces are 14 points, so keep that in mind as you continue. <br>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Also, each game has a limit of 3 rounds before the dealer shows their card.";
        document.getElementById('nextButton').style.right = "335px";
        document.getElementById('nextButton').style.bottom = "50px";
        document.getElementById('nextButton').style.width = "53.73px";
        document.getElementById('nextButton').style.height = "23.6px";
        walkThroughStage = 3;
    }
    else if(walkThroughStage == 3){
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Now, it's your turn, as you are left of the dealer, do you choose to hit (get one more card), stand (keep the cards they have), or fold (quit the round and<br> show their cards). You can make one action every turn, so choose wisely. Once you hit, you can see the cards that you hit but everybody else can’t.<br> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Also, if you go above 28 points, you immediately bust because you were going to anyways.";
        document.getElementById('nextButton').style.display = "none";
        document.getElementById('hitButton').style.display = "inline-block";
        document.getElementById('standButton').style.display = "inline-block";  
        document.getElementById('foldButton').style.display = "inline-block";
    }
}
async function hit(){
if(walkThroughStage > 0){
    if(cardsOnTable.includes("Player1Card2") && !cardsOnTable.includes("Player1Card3")){
        if(roundNum==3){
            cardsOnTable.push("Player1Card3");
            document.getElementById('hitButton').style.display = "none";
            document.getElementById('standButton').style.display = "none";
            document.getElementById('foldButton').style.display = "none";
            document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
            newPlayerCard2.src = "8_of_clubs.svg";
            newPlayerCard2.style.display = "inline-block";
            newPlayerCard2.style.position = "absolute";
            newPlayerCard2.style.width = "111px";
            newPlayerCard2.style.height = "161.5px";
            newPlayerCard2.style.zIndex = "5";
            newPlayerCard2.style.bottom = "35%";
            newPlayerCard2.style.right = "42%";
            document.getElementById('instructionWindow').innerHTML = "Ooh, close you have 24 points and now it's the other players' turns.";
            await sleep(3000);
            document.getElementById('cardimg2').style.boxShadow = "none";   
            document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
            cardsOnTable.push("Player2Card2");
            newOpponent2Card1.src = "./back.png";
            newOpponent2Card1.style.position = "absolute";
            newOpponent2Card1.style.width = "111px";
            newOpponent2Card1.style.height = "161.5px";
            newOpponent2Card1.style.zIndex = "2";
            newOpponent2Card1.style.top = "23%";
            newOpponent2Card1.style.left = "35%";
            newOpponent2Card1.style.rotate = ('90deg');
            newOpponent2Card1.style.display = "inline-block";
            document.getElementById('newOpponent2Card2').style.display = "none";
            document.getElementById('newOpponent2Card3').style.display = "none";
            document.getElementById('newOpponent1Card1').style.display = "none";
            document.getElementById('newOpponent1Card2').style.display = "none";
            document.getElementById('newOpponent1Card3').style.display = "none";
            await sleep(3000);
            document.getElementById('cardimg4').style.boxShadow = "none"; 
            document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
            walkThroughStage+=1;
            document.getElementById('hitButton').style.display = "inline-block";
            document.getElementById('standButton').style.display = "inline-block";
            document.getElementById('foldButton').style.display = "inline-block";
            await sleep(1000);
            document.getElementById('cardimg1').style.boxShadow = "none";
            newOpponent1Card1.src = "./ace_of_clubs.svg";
            newOpponent2Card1.src = "./5_of_spades.svg";
            document.getElementById('cardimg3').src = "./7_of_hearts.svg";
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 3 busts! Player 2 wins!";
            await sleep(4000);
            document.getElementById('cardimg1').style.boxShadow = "none";
            document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";

        }
        else{
        cardsOnTable.push("Player1Card3");
        document.getElementById('hitButton').style.display = "none";
        document.getElementById('standButton').style.display = "none";
        document.getElementById('foldButton').style.display = "none";
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        newPlayerCard2.src = "8_of_clubs.svg";
        newPlayerCard2.style.display = "inline-block";
        newPlayerCard2.style.position = "absolute";
        newPlayerCard2.style.width = "111px";
        newPlayerCard2.style.height = "161.5px";
        newPlayerCard2.style.zIndex = "5";
        newPlayerCard2.style.bottom = "35%";
        newPlayerCard2.style.right = "42%";
        document.getElementById('instructionWindow').innerHTML = "Ooh, close you have 24 points and now it's the other players' turns.";
        await sleep(3000);
        document.getElementById('cardimg2').style.boxShadow = "none";   
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
        cardsOnTable.push("Player2Card2");
        newOpponent2Card1.src = "./back.png";
        newOpponent2Card1.style.position = "absolute";
        newOpponent2Card1.style.width = "111px";
        newOpponent2Card1.style.height = "161.5px";
        newOpponent2Card1.style.zIndex = "2";
        newOpponent2Card1.style.top = "23%";
        newOpponent2Card1.style.left = "35%";
        newOpponent2Card1.style.rotate = ('90deg');
        newOpponent2Card1.style.display = "inline-block";
        await sleep(3000);
        document.getElementById('cardimg4').style.boxShadow = "none"; 
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
        walkThroughStage+=1;
        document.getElementById('hitButton').style.display = "inline-block";
        document.getElementById('standButton').style.display = "inline-block";
        document.getElementById('foldButton').style.display = "inline-block";
        await sleep(1000);
        document.getElementById('cardimg1').style.boxShadow = "none";
        document.getElementById('instructionWindow').innerHTML = "Now it's your turn, what move do you wanna do?";
        }
    }
    else if(cardsOnTable.includes("Player1Card3")){
    cardsOnTable.push("Player1Card4");
    document.getElementById('hitButton').style.display = "none";
    document.getElementById('standButton').style.display = "none";
    document.getElementById('foldButton').style.display = "none";
    document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
    newPlayerCard3.src = "./5_of_hearts.svg";
    newPlayerCard3.style.position = "absolute";
    newPlayerCard3.style.width = "111px";
    newPlayerCard3.style.height = "161.5px";
    newPlayerCard3.style.zIndex = "6";
    newPlayerCard3.style.bottom = "35%";
    newPlayerCard3.style.right = "40%";
    newPlayerCard3.style.display = "inline-block";
    document.getElementById('instructionWindow').innerHTML = "No! You busted because you went over 28 points, the maximum points possible! Now you'll see what the other players do.";
    await sleep(2000);
    document.getElementById('cardimg2').style.boxShadow = "none";   
    document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
    document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
    await sleep(2000);
    document.getElementById('cardimg4').style.boxShadow = "none";
    document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
    document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
    await sleep(2000);
    newOpponent1Card1.src = "./ace_of_clubs.svg";
    newOpponent2Card1.src = "./5_of_spades.svg";
    document.getElementById('cardimg3').src = "./7_of_hearts.svg";
    await sleep(2000);
    document.getElementById('instructionWindow').innerHTML = "Player 3 busts! Player 2 wins!";
    await sleep(4000);
    document.getElementById('cardimg1').style.boxShadow = "none";
    document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";
    }
    else{
    cardsOnTable.push("Player1Card2");
    document.getElementById('hitButton').style.display = "none";
    document.getElementById('standButton').style.display = "none";
    document.getElementById('foldButton').style.display = "none";
    newPlayerCard1.src = "./ace_of_hearts.svg";
    newPlayerCard1.style.position = "absolute";
    newPlayerCard1.style.width = "111px";
    newPlayerCard1.style.height = "161.5px";
    newPlayerCard1.style.zIndex = "3";
    newPlayerCard1.style.bottom = "35%";
    newPlayerCard1.style.right = "44%";
    newPlayerCard1.style.display = "inline-block";
    document.getElementById('cardimg2').style.right = "46%";
    document.getElementById('instructionWindow').innerHTML = "Good, now you have 16 points and it is the other players' turns.";
    await sleep(1000);
    document.getElementById('cardimg2').style.boxShadow = "none";   
    document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
    document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
    await sleep(1000);
    document.getElementById('cardimg4').style.boxShadow = "none";
    document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
    document.getElementById('instructionWindow').innerHTML = "Player 3 hits!";
    cardsOnTable.push("Player3Card2");
    newOpponent1Card1.src = "./back.png";
    newOpponent1Card1.style.position = "absolute";
    newOpponent1Card1.style.width = "111px";
    newOpponent1Card1.style.height = "161.5px";
    newOpponent1Card1.style.zIndex = "3";
    newOpponent1Card1.style.top = "15%";
    newOpponent1Card1.style.right = "46%";
    newOpponent1Card1.style.display = "inline-block";
    document.getElementById('cardimg1').style.right = "45%";
    walkThroughStage+=1;
    document.getElementById('hitButton').style.display = "inline-block";
    document.getElementById('standButton').style.display = "inline-block";
    document.getElementById('foldButton').style.display = "inline-block";
    await sleep(500);
    document.getElementById('cardimg1').style.boxShadow = "none";
    document.getElementById('instructionWindow').innerHTML = "Now it's your turn, what move do you wanna do?";
}
roundNum+=1;
}
/*How to initialize a new player card
    eval('const' + 'newPlayerCard' + hitNum + '=' + 'document.createElement("img")' + ';');
*/
}
async function stand(){
if(walkThroughStage > 0){
    if(roundNum == 3){
    if(newOpponent2Card1.style.display == "inline-block"){
        if(newOpponent1Card1.style.display == "inline-block"){
            document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('hitButton').style.display = "none";
            document.getElementById('standButton').style.display = "none";
            document.getElementById('foldButton').style.display = "none";
            document.getElementById('cardimg2').style.boxShadow = "none";
            document.getElementById('instructionWindow').innerHTML = "You stand!";
            await sleep(1000);     
            document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
            await sleep(1000);
            document.getElementById('cardimg4').style.boxShadow = "none";
            document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
            await sleep(1000);
            document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
            document.getElementById('cardimg1').style.boxShadow = "none";
            newOpponent1Card1.src = "./ace_of_clubs.svg";
            newOpponent2Card1.src = "./5_of_spades.svg";
            document.getElementById('cardimg3').src = "./7_of_hearts.svg";
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "You bust!";
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 3 busts! Player 2 wins!";
            await sleep(2000);
            document.getElementById('cardimg1').style.boxShadow = "none";
            document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";
        }
    }
        else{
            if(cardsOnTable.includes("newPlayerCard1")){
                newOpponent1Card1.src = "./ace_of_clubs.svg";
                newOpponent2Card1.src = "./5_of_spades.svg";
                document.getElementById('cardimg3').src = "./7_of_hearts.svg";
                await sleep(2000);
                document.getElementById('instructionWindow').innerHTML = "You bust!";
                await sleep(2000);
                document.getElementById('instructionWindow').innerHTML = "Player 3 busts!";
                await sleep(2000);
                document.getElementById('instructionWindow').innerHTML = "Player 2 wins!";  
                await sleep(2000);
                document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";
            }
            else{
                document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
                document.getElementById('hitButton').style.display = "none";
                document.getElementById('standButton').style.display = "none";
                document.getElementById('foldButton').style.display = "none";
                document.getElementById('cardimg2').style.boxShadow = "none";
                document.getElementById('instructionWindow').innerHTML = "You stand!";
                await sleep(1000);     
                document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
                document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
                await sleep(1000);
                document.getElementById('cardimg4').style.boxShadow = "none";
                document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
                await sleep(1000);
                document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
                document.getElementById('cardimg1').style.boxShadow = "none";
                await sleep(1000);
                newOpponent1Card1.src = "./ace_of_clubs.svg";
                newOpponent2Card1.src = "./5_of_spades.svg";
                document.getElementById('cardimg3').src = "./7_of_hearts.svg";
                await sleep(2000);
                document.getElementById('instructionWindow').innerHTML = "Player 2 wins!"; 
                document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game or go through another tutorial?";
                document.getElementById('learnButton').style.display = "inline-block";
                document.getElementById('learnButton').style.right = "50%";
                document.getElementById('learnButton').style.top = "65%";
                document.getElementById('playButton').style.display = "inline-block";
                document.getElementById('playButton').style.right = "36%";
                document.getElementById('playButton').style.top = "65%";
            }
    }
    }
    else{
    document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
    document.getElementById('hitButton').style.display = "none";
    document.getElementById('standButton').style.display = "none";
    document.getElementById('foldButton').style.display = "none";
    document.getElementById('cardimg2').style.boxShadow = "none";
    document.getElementById('instructionWindow').innerHTML = "You stand!";
    await sleep(1000);     
    document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
    document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
    await sleep(1000);
    document.getElementById('cardimg4').style.boxShadow = "none";
    document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
    await sleep(1000);
    document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
    await sleep(1000);
    document.getElementById('cardimg1').style.boxShadow = "none";
    document.getElementById('hitButton').style.display = "inline-block";
    document.getElementById('standButton').style.display = "inline-block";
    document.getElementById('foldButton').style.display = "inline-block";
    document.getElementById('instructionWindow').innerHTML = "Now it's your turn, what move do you wanna do?";
    }
}
roundNum+=1;
}


async function fold(){
if(walkThroughStage > 0){
    roundNum+=1;
    if(cardsOnTable.includes("Player1Card3")){
        document.getElementById('hitButton').style.display = "none";
        document.getElementById('standButton').style.display = "none";
        document.getElementById('foldButton').style.display = "none";
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "You fold!";
        await sleep(3000);
        document.getElementById('cardimg2').style.boxShadow = "none";   
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
        await sleep(3000);
        document.getElementById('cardimg4').style.boxShadow = "none"; 
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
        await sleep(1000);
        document.getElementById('cardimg1').style.boxShadow = "none";
        newOpponent1Card1.src = "./ace_of_clubs.svg";
        newOpponent2Card1.src = "./5_of_spades.svg";
        document.getElementById('cardimg3').src = "./7_of_hearts.svg";
        await sleep(2000);
        document.getElementById('instructionWindow').innerHTML = "Player 3 busts!"; 
        await sleep(2000);
        document.getElementById('instructionWindow').innerHTML = "Player 2 wins!";  
        await sleep(2000);
        document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";

    }
    else if(cardsOnTable.includes("Player1Card2")){
        document.getElementById('hitButton').style.display = "none";
        document.getElementById('standButton').style.display = "none";
        document.getElementById('foldButton').style.display = "none";
        document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "You fold!";
        await sleep(3000);
        document.getElementById('cardimg2').style.boxShadow = "none";   
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
        cardsOnTable.push("Player2Card2");
        newOpponent2Card1.src = "./back.png";
        newOpponent2Card1.style.position = "absolute";
        newOpponent2Card1.style.width = "111px";
        newOpponent2Card1.style.height = "161.5px";
        newOpponent2Card1.style.zIndex = "2";
        newOpponent2Card1.style.top = "23%";
        newOpponent2Card1.style.left = "35%";
        newOpponent2Card1.style.rotate = ('90deg');
        newOpponent2Card1.style.display = "inline-block";
        await sleep(3000);
        document.getElementById('cardimg4').style.boxShadow = "none"; 
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
        walkThroughStage+=1;
        await sleep(1000);
        document.getElementById('cardimg1').style.boxShadow = "none";
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
        await sleep(1000);
        document.getElementById('cardimg4').style.boxShadow = "none";
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
        document.getElementById('cardimg1').style.boxShadow = "none";

        if(roundNum ==3){
            newOpponent1Card1.src = "./ace_of_clubs.svg";
            newOpponent2Card1.src = "./5_of_spades.svg";
            document.getElementById('cardimg3').src = "./7_of_hearts.svg";
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 3 busts!"; 
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 2 wins!";  
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";
        }
    }
    else{
        if(roundNum == 1){
        newOpponent1Card1.src = "./ace_of_clubs.svg";
        document.getElementById('hitButton').style.display = "none";
        document.getElementById('standButton').style.display = "none";
        document.getElementById('foldButton').style.display = "none";
        document.getElementById('cardimg2').style.boxShadow = "none";
        document.getElementById('instructionWindow').innerHTML = "You fold!";
        await sleep(1000);   
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
        await sleep(1000);
        document.getElementById('cardimg4').style.boxShadow = "none";
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 hits!";
        newOpponent1Card1.src = "./back.png";
        newOpponent1Card1.style.position = "absolute";
        newOpponent1Card1.style.width = "111px";
        newOpponent1Card1.style.height = "161.5px";
        newOpponent1Card1.style.zIndex = "3";
        newOpponent1Card1.style.top = "15%";
        newOpponent1Card1.style.right = "46%";
        newOpponent1Card1.style.display = "inline-block";
        document.getElementById('cardimg1').style.right = "45%";
        document.getElementById('hitButton').style.display = "none";
        document.getElementById('standButton').style.display = "none";
        document.getElementById('foldButton').style.display = "none";
        await sleep(3000);
        document.getElementById('cardimg1').style.boxShadow = "none";   
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
        cardsOnTable.push("Player2Card2");
        newOpponent2Card1.src = "./back.png";
        newOpponent2Card1.style.position = "absolute";
        newOpponent2Card1.style.width = "111px";
        newOpponent2Card1.style.height = "161.5px";
        newOpponent2Card1.style.zIndex = "2";
        newOpponent2Card1.style.top = "23%";
        newOpponent2Card1.style.left = "35%";
        newOpponent2Card1.style.rotate = ('90deg');
        newOpponent2Card1.style.display = "inline-block";
        await sleep(3000);
        document.getElementById('cardimg4').style.boxShadow = "none"; 
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
        await sleep(1000);
        document.getElementById('cardimg1').style.boxShadow = "none";
        document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 2 stands!";
        await sleep(1000);
        document.getElementById('cardimg4').style.boxShadow = "none";
        document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
        document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
        document.getElementById('cardimg1').style.boxShadow = "none";
        newOpponent1Card1.src = "./ace_of_clubs.svg";
        newOpponent2Card1.src = "./5_of_spades.svg";
        document.getElementById('cardimg3').src = "./7_of_hearts.svg";
        await sleep(2000);
        document.getElementById('instructionWindow').innerHTML = "Player 3 busts!"; 
        await sleep(2000);
        document.getElementById('instructionWindow').innerHTML = "Player 2 wins!";  
        await sleep(2000);
        document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";
        }
        else if(roundNum == 2){
            document.getElementById('hitButton').style.display = "none";
            document.getElementById('standButton').style.display = "none";
            document.getElementById('foldButton').style.display = "none";
            document.getElementById('cardimg2').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('instructionWindow').innerHTML = "You fold!";
            await sleep(3000);
            document.getElementById('cardimg2').style.boxShadow = "none";   
            document.getElementById('cardimg4').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('instructionWindow').innerHTML = "Player 2 hits!";
            cardsOnTable.push("Player2Card2");
            newOpponent2Card1.src = "./back.png";
            newOpponent2Card1.style.position = "absolute";
            newOpponent2Card1.style.width = "111px";
            newOpponent2Card1.style.height = "161.5px";
            newOpponent2Card1.style.zIndex = "2";
            newOpponent2Card1.style.top = "23%";
            newOpponent2Card1.style.left = "35%";
            newOpponent2Card1.style.rotate = ('90deg');
            newOpponent2Card1.style.display = "inline-block";
            await sleep(3000);
            document.getElementById('cardimg4').style.boxShadow = "none"; 
            document.getElementById('cardimg1').style.boxShadow = "-1px -1px 16px red";
            document.getElementById('instructionWindow').innerHTML = "Player 3 stands!";
            await sleep(1000);
            document.getElementById('cardimg1').style.boxShadow = "none";
            newOpponent1Card1.src = "./ace_of_clubs.svg";
            newOpponent2Card1.src = "./5_of_spades.svg";
            document.getElementById('cardimg3').src = "./7_of_hearts.svg";
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 3 busts!"; 
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 2 wins!";  
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";

        }
        else{
            newOpponent1Card1.src = "./ace_of_clubs.svg";
            newOpponent2Card1.src = "./5_of_spades.svg";
            document.getElementById('cardimg3').src = "./7_of_hearts.svg";
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Player 3 wins!";  
            await sleep(2000);
            document.getElementById('instructionWindow').innerHTML = "Now that you know the rules, do you want to play a real game?";
        }
    }
}
}