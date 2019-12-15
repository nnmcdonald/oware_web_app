import random

#alpha = float('-inf')
#beta = float('inf')
gameboard = [[3 for i in range(7)],[3 for i in range(7)]]
#gameboard = [
#    [2,4,2,0,0,5,7],
#    [3,3,2,0,0,2,6]
#]

def generateComputerMove(depth, game, alpha, beta):
    if depth < 8 and game[0][6] < 19 and game[1][6] < 19:
        childStateValues = [0]*6
        for i in range(6):
            player = 0
            # loops through South's cups on minimizing level
            if depth % 2 == 1:
                player = 1
            # Invalid move
            if game[player][i] == 0:
                childStateValues[i] = 0
            # creates a child state if the current move is possible
            else:
                # evaluates the child state
                childState = move(game, player, i)
                childStateValues[i] = generateComputerMove(depth+1, childState, alpha, beta)

                # Adds an extra value to the value returned by the evaluate() method if the child state is a winning
                # or losing state, only looks ahead 2 levels
                if depth < 3:
                    if childState[player][6] > 18:
                        childStateValues[i] += 1000
                    elif childState[(player+1)%2][6] > 18:
                        childStateValues[i] -= 1000

                # maximizing level, raises alpha
                if depth % 2 == 0:
                    if childStateValues[i] > alpha:
                        alpha = childStateValues[i]
                # minimizing level, lowers beta
                else:
                    if childStateValues[i] < beta:
                        beta = childStateValues[i]
                # If the alpha beta values cross then the rest of the childStateValues that haven't been
                # evaluated in this loop are set to 0 to prune them from the tree
                if alpha >= beta:
                    for j in range(i+1, 6):
                        childStateValues[j] = 0
                    break

        # return max of children or index of best move if this is the root node
        if depth % 2 == 0:
            max = float('-inf')
            maxAt = 0;
            for i in range(6):
                if childStateValues[i] != 0 and childStateValues[i] > max:
                    max = childStateValues[i]
                    maxAt = i
            if depth == 0:
                return maxAt
            else:
                return max
        # returns min of children
        else:
            min = float('inf')
            for i in range(6):
                if childStateValues[i] < min and childStateValues[i] != 0:
                    min = childStateValues[i]
            return min
    else:
        #leaf node
        return evaluate(game)

def evaluate(gamePosition):
    # I considered both players scores and how many seeds were on both sides of the board to evaluate board states
# The look ahead is set in the generateComputerMove() method and is currently 12
    score = gamePosition[0][6]
    oppScore = gamePosition[1][6]

    seedsSouth = 0;
    for i in range(6):
        seedsSouth += gamePosition[1][i]

    seedsNorth = 0
    for i in range(6):
        seedsNorth += gamePosition[0][i]

    weightedScoreValue = (1000 * score) - (300 * oppScore)
    weightedSeedCount = float(((40*seedsNorth) - (10*seedsSouth))/36)

    return float(weightedScoreValue + weightedSeedCount)

# creates and returns new array
def move(gameState, player, index):
    newState = [[gameState[0][i] for i in range(7)], [gameState[1][i] for i in range(7)]]
    stones = newState[player][index]
    newState[player][index] = 0
    currentPlayer = player
    index += 1
    while stones > 0:
        if index == 6 and player == currentPlayer:
            pass
        elif index >= 6:
            currentPlayer = (currentPlayer + 1) % 2
            index = 0
        newState[player][index] += 1
        index += 1
        stones -= 1
    return newState

for i in range(8):
    m = None
    if i%2 == 1:
        m = generateComputerMove(0, [gameboard[1],gameboard[0]], 0, float('inf'))
    else:
        m = generateComputerMove(0, gameboard, 0, float('inf'))
    gameboard = move(gameboard, i%2, m)
    print(m)
    print(gameboard)
