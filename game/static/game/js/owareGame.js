let gameStatus = [
  [1,0,3,3,0,8,0],
  [3,3,3,3,3,3,0],
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
    console.log(gameStatus);
    let compMove = getComputerMove();
    console.log(compMove);
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
