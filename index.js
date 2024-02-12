class Knight {
  constructor(x, y, prev = null) {
    this.x = x;
    this.y = y;
    this.prev = prev;
  }

  possibleMoves(x, y) {
    let moves = [];
    moves.push([x + 2, y + 1]);
    moves.push([x + 2, y - 1]);
    moves.push([x - 2, y + 1]);
    moves.push([x - 2, y - 1]);
    moves.push([x + 1, y + 2]);
    moves.push([x + 1, y - 2]);
    moves.push([x - 1, y + 2]);
    moves.push([x - 1, y - 2]);

    let validMoves = moves.filter((move) => {
      return move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8;
    });
    return validMoves;
  }

  knightMoves(position, target) {
    if (target[0] < 0 || target[0] >= 8 || target[1] < 0 || target[1] >= 8) {
      return "Target position is outside of the board boundaries.";
    }
    let queue = [];
    let visited = new Set(); //To track all already visited locations, stops maximum callstack error.
    let path = [];
    // Create a new node/knight with the current position and add it to queue.
    queue.push(new Knight(position[0], position[1]));
    visited.add(position.toString());

    while (queue.length > 0) {
      //Take the first item from the queue and calcuate the possible moves from this location
      let current = queue.shift();
      let validMoves = this.possibleMoves(current.x, current.y);

      for (let move of validMoves) {
        if (move[0] === target[0] && move[1] === target[1]) {
          //Construct a path by following the previous node pointers
          let node = new Knight(target[0], target[1], current);
          while (node) {
            path.push([node.x, node.y]);
            node = node.prev;
          }
          return `You made it in ${
            path.length - 1
          } moves! Here's your path:\n ${path.reverse().join(" -> ")}`;
        }
        // If the node hasnt been visited before, push it to the queue and add it to the visited nodes.
        if (!visited.has(move.toString())) {
          queue.push(new Knight(move[0], move[1], current));
          visited.add(move.toString());
        }
      }
    }
    return `Your Knight seems to be off the board! Both the X and Y coords need to be < 8 \nx: ${position[0]} y: ${position[1]}`; // This condiiton will only be met if incorrect coords are given
  }
}

let knight1 = new Knight(3, 3);

console.log(knight1.knightMoves([3, 3], [4, 7]));
