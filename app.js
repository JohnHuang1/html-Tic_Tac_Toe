var boardArr = new Array(3).fill(" ").map(()=> new Array(3).fill(" "));
var moves = 0;
var finished = false;
var currPiece = "O";

document.addEventListener("DOMContentLoaded", function(){
    var board = document.getElementById("board");
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            var box = document.createElement("div");
            box.id = "box" + row + col;
            box.classList.add("box");
            box.addEventListener("click", function(){
                boxClick(row, col);
            });
            box.appendChild(document.createTextNode(boardArr[row][col]));
            board.appendChild(box);
        }
    }
    switchPlayer();
});

function boxClick(row, col){
    if(finished) return;
    moves++;
    boardArr[row][col] = currPiece;
    document.getElementById("box" + row + col).innerHTML = currPiece;
    if(moves > 4 && checkWin(currPiece, row, col)){
        setMsg(`Player ${currPiece} Wins!`);
        finished = true;
        disableAllButtons();
    } else if(moves >= 9){
        setMsg("It's a tie!");
        finished = true;
        disableAllButtons();
    } else {
        switchPlayer();
        disableButton(row, col);
        setMsg(`row: ${row} | col ${col}`);
    }
}

function setMsg(msg){
    document.getElementById("msg").innerHTML = msg;
}

function disableButton(row, col){
    document.getElementById("box" + row + col).style.pointerEvents = 'none';
}
function disableAllButtons(){
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            document.getElementById("box" + row + col).style.pointerEvents = 'none';
        }
    }
}
function enableAllButtons(){
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            var box = document.getElementById("box" + row + col);
            box.style.pointerEvents = 'auto';
            box.innerHTML = " ";
        }
    }
}

function switchPlayer(){
    if(currPiece == "X"){
        currPiece = "O";
    } else {
        currPiece = "X";
    }
    document.getElementById("piece").innerHTML = `Player ${currPiece}'s turn`;
}

function checkWin(piece, row, col){
    if(checkEqual(getColumn(col), piece) || checkEqual(getRow(row), piece)) return true;
    if(Math.abs(row - col) !== 1){
        var diag1 = new Array();
        var diag2 = new Array();
        for(let i = 0; i < 3; i++){
            diag1.push(this.boardArr[i][i]);
            diag2.push(this.boardArr[2-i][i]);
        }
        return this.checkEqual(diag1, piece) || this.checkEqual(diag2, piece);
    }
    return false;
}

function clearBoard(){
    boardArr = new Array(3).fill(" ").map(()=> new Array(3).fill(" "));
    moves = 0;
    finished = false;
    setMsg(" ");
    switchPlayer();
    enableAllButtons();
}

function getColumn(num){
    var result = new Array();
    for(let i = 0; i < this.boardArr.length; i ++){
        result.push(this.boardArr[i][num])
      }
    return result;
}

function getRow(num){
    var result = new Array();
    for(let i = 0; i < this.boardArr[num].length; i ++){
        result.push(this.boardArr[num][i])
    }
    return result;
}

function checkEqual(arr, piece){
    return Array.from(arr).every(item => item === piece);
}