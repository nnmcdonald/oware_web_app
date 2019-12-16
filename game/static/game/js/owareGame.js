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
    let compMove = getComputerMove();
    move(1, compMove);
    if(checkForWIn()) {
      // Computer Wins
    };
  });
};

function move(player ,index) {
  // modify game status
};

function getComputerMove() {
  gameStatus = [
    [3,3,3,3,3,3,0],
    [3,3,3,0,4,4,1]
  ];
  return 0;
};

function initializeGame(playerTurn) {
  $("#PlayerChoice").toggleClass("hidden");
  if(playerTurn === 1) {
    let compMove = getComputerMove();
    move(compMove);
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
