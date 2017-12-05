var board=[];
var score=0;
function newGame() {
    initBoard();
    bornNewNumber();
    bornNewNumber();
}
function keyDown(e) {
    var e=e?e:window.event;
    var currentKey=e.keyCode||e.charCode||e.which;
    switch (currentKey){
        //left
        case 37:
            if(moveLeft()){
                bornNewNumber();
                setTimeout("updateBoardView()",500);
                if(isGameOver())
                    gameOver();
            }
            break;
            //up
        case 38:
            if(true){
                moveUp();
                bornNewNumber();
                setTimeout("updateBoardView()",100);
                if(isGameOver())
                    gameOver();
            }
            break;
        case 39: //right
            if(true){
                moveRight();
                bornNewNumber();
                setTimeout("updateBoardView()",100);
                if(isGameOver())
                    gameOver();
            }
            break;
        case 40:    //down
            if(true){
                moveDown();
                bornNewNumber();
                setTimeout("updateBoardView()",100);
                if(isGameOver())
                    gameOver();
            }
            break;
}
}

window.onload=function () {
    newGame();
    updateBoardView();
}
document.onkeydown=function (e) {
    keyDown();
}
