/*let gameStatus = [
  [0,2,0,0,0,1,16],
  [0,0,0,0,0,1,16],
];*/
// gameStatus[0] corresponds to the human player,
// gameStatus[1] corresponds to the computer player
let gameStatus = [
  [3,3,3,3,3,3,0],
  [3,3,3,3,3,3,0],
];

function checkForWIn() {
  // Human player has won majority of stones
  if(gameStatus[0][6] >= 19) {
    return 0;
    // Computer player has won majority of stones
  } else if(gameStatus[1][6] >= 19) {
    return 1;
    // Check if player's still have stones to play
  } else {
    let playerStones = 0;
    let computerStones = 0;
    for(let i = 0; i < 6; i++){
      playerStones += gameStatus[0][i];
      computerStones += gameStatus[1][i];
      // Both players still have stones, game continues
      if(playerStones > 0 && computerStones > 0) {
        return null;
      }
    }
    // One player must have run out of stones
    if(playerStones === 0) {
      // Human has run out of stones, so the computer gets all remaining
      // stones added to the goal cup
      for(let i = 0; i < 6; i++) {
        gameStatus[1][6] += gameStatus[1][i];
      }
    } else {
      // Computer has run out of stones, so the human player gets all remaining
      // stones added to the goal cup
      for(let i = 0; i < 6; i++) {
        gameStatus[0][6] += gameStatus[0][i];
      }
    }
    // tie game
    if(gameStatus[0][6] === gameStatus[1][6]) {
      return -1;
    }
    return (gameStatus[0][6] > gameStatus[1][6]) ? 0 : 1;
  }
};

function declareWinner(winner) {
  let announceWin = $("#WinnerAnnouncement");
  announceWin.toggleClass("hidden");
  $("#HumanCups").addClass("disabled");
  $("MoveAnnouncement").toggleClass("hidden");
  if(winner === 0) {
    announceWin.html("Congratulations You Win!");
  } else if(winner === -1) {
    announceWin.html("No winner, it's a tie!");
  } else {
    announceWin.html("Sorry, You've Lost");
  }
};

function updateGameUI() {
  let playerCups = "";
  let computerCups = "";
  for(let i = 0; i < 7; i++) {
    playerCups += '<button class="button" id="' + i + '">' + gameStatus[0][i] + '</button>'
  };
  for(let i = 6; i > -1; i--) {
    computerCups += '<button class="button" id="' + i + '">' + gameStatus[1][i] + '</button>'
  };

  $("#ComputerCups").html(computerCups);
  $("#HumanCups").html(playerCups);
  $("#HumanCups #6").addClass("disabled");

  $("#HumanCups .button").click(function() {
    let moveIndex = parseInt($(this).attr("id"));
    let stones = gameStatus[0][moveIndex];
    move(0, moveIndex);
    $("#MoveAnnouncement #HumanMove").html("You chose cup: " + (moveIndex + 1) + ", " + stones + " stone(s) dispersed");
    let winner = checkForWIn();
    if(winner != null) {
      declareWinner(winner);
    } else {
      console.log(gameStatus);
      let compMove = getComputerMove();
      console.log(compMove);
      stones = gameStatus[1][compMove];
      move(1, compMove);
      $("#MoveAnnouncement #ComputerMove").html("Computer chose cup: " + (compMove + 1) + ", " + stones + " stone(s) dispersed");
      winner = checkForWIn();
      if(winner != null) {
        declareWinner(winner);
      }
    }
    updateGameUI();
  });
};

function move(player ,index) {
  // modify game status
  let stones = gameStatus[player][index];
  gameStatus[player][index] = 0;
  let currentPlayer = player;
  index += 1;

  function checkForCapture() {
    if(player === currentPlayer && stones === 1 && gameStatus[currentPlayer][index] === 0) {
        let captured = gameStatus[(currentPlayer + 1) % 2][5-index];
        gameStatus[(currentPlayer + 1) % 2][5-index] = 0;
        gameStatus[player][6] += captured;
    };
  };

  while(stones > 0) {
      if(player === currentPlayer && index === 6) {
          // do nothing
      } else if(index >= 6) {
        currentPlayer = (currentPlayer + 1) % 2;
        index = 0;
        checkForCapture();
      } else {
        checkForCapture();
      };

      gameStatus[currentPlayer][index] += 1
      index += 1
      stones -= 1
  };
};

function getComputerMove() {
  // generate computer move, return index
  let compMove;
  let currentState = {};
  for(let i = 0; i < 7; i++) {
    currentState['0' + i] = gameStatus[0][i]
  };
  for(let i = 0; i < 7; i++) {
    currentState['1' + i] = gameStatus[1][i]
  };
  $.ajax({
    async:false,
    type: "POST",
    data: currentState,
    url: "/computerMove/",
    success: function(data){
      compMove = data['moveIndex'];
      console.log(typeof compMove);
   }
 });

  return compMove;
};

function initializeGame(playerTurn) {
  $("#PlayerChoice").toggleClass("hidden");
  if(playerTurn === 1) {
    let compMove = getComputerMove();
    let stones = gameStatus[1][compMove];
    move(1, compMove);
    $("#MoveAnnouncement #ComputerMove").html("Computer chose cup: " + (compMove + 1) + ", " + stones + " stone(s) dispersed");
  }
  updateGameUI();
  $("#ComputerCups").toggleClass("hidden");
  $("#HumanCups").toggleClass("hidden");
};

$("#PlayerChoice .button").click(function() {
  if($(this).attr("id") === "first") {
    initializeGame(0);
  } else {
    initializeGame(1);
  }
});
