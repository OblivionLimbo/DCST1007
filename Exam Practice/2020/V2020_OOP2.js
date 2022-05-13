class Piece {
    constructor(x, y, color) {
        // alphabet from a to h
        let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.x = x;
        this.y = y;
        this.position = alphabet[x] + (y+1)
        this.color = color;
    }
}

// Chess pieces 
class Pawn extends Piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.type = "pawn";
    }
}
class Rook extends Piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.type = "rook";
    }
}
class Knight extends Piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.type = "knight";
    }
}
class Bishop extends Piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.type = "bishop";
    }
}
class Queen extends Piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.type = "queen";
    }
}
class King extends Piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.type = "king";
    }
}

// create a chess board
let chessBoard = [];
for (let i = 0; i < 8; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 8; j++) {
        chessBoard[i][j] = null;
    }
}

// create chess pieces starting position
chessBoard[0][0] = new Rook(0, 0, "white");
chessBoard[0][1] = new Knight(1, 0, "white");
chessBoard[0][2] = new Bishop(2, 0, "white");
chessBoard[0][3] = new Queen(3, 0, "white");
chessBoard[0][4] = new King(4, 0, "white");
chessBoard[0][5] = new Bishop(5, 0, "white");
chessBoard[0][6] = new Knight(6, 0, "white");
chessBoard[0][7] = new Rook(7, 0, "white");
for (let i = 0; i < 8; i++) {
    chessBoard[1][i] = new Pawn(i, 1, "white");
}
chessBoard[7][0] = new Rook(0, 7, "black");
chessBoard[7][1] = new Knight(1, 7, "black");
chessBoard[7][2] = new Bishop(2, 7, "black");
chessBoard[7][3] = new Queen(3, 7, "black");
chessBoard[7][4] = new King(4, 7, "black");
chessBoard[7][5] = new Bishop(5, 7, "black");
chessBoard[7][6] = new Knight(6, 7, "black");
chessBoard[7][7] = new Rook(7, 7, "black");
for (let i = 0; i < 8; i++) {
    chessBoard[6][i] = new Pawn(i, 6, "black");
}

console.table(chessBoard)




