let gameStatus = [
  [3,3,3,3,3,3,0],
  [3,3,3,3,3,3,0]
];

function checkForWIn() {
  return false;
}

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
    move(0, moveIndex);
    if(checkForWIn()) {
      // You win!
    };
    let compMove = moveIndex + 1;
    move(1, compMove);
    if(checkForWIn()) {
      // Computer Wins
    };
    updateGameUI();
  });
};

function move(player ,index) {
  // modify game status
  let stones = gameStatus[player][index];
  gameStatus[player][index] = 0;
  let currentPlayer = player;
  index += 1;
  while(stones > 0) {
        if(index === 6 && player === currentPlayer) {
          // do nothing
        } else if(index >= 6) {
          currentPlayer = (currentPlayer + 1) % 2;
          index = 0;
        };
        gameStatus[currentPlayer][index] += 1
        index += 1
        stones -= 1
  };
};

let getComputerMove = function() {
  // generate computer move, return index
};

function initializeGame(playerTurn) {
  $("#PlayerChoice").toggleClass("hidden");
  if(playerTurn === 1) {
    let compMove = 5;
    move(1, compMove);
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
