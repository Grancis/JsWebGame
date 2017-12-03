var board=[];
var score=0;
function newGame() {
    initBoard();
    bornNewNumber();
    bornNewNumber();
    bornNewNumber();
    bornNewNumber();
    bornNewNumber();
    bornNewNumber();
}
setTimeout("moveLeft()",1000);
setTimeout("updateBoardView()",1500);
setTimeout("updateBoardView()",2000);
setTimeout("updateBoardView()",2500);
// setTimeout("moveLeft()",1000);
// bornNewNumber();
// setTimeout("moveLeft()",1000);
// function keyDown() {
//     switch (window.event.keyCode){
//         //left
//         case 37:
//             moveLeft();
//             bornNewNumber();
//             updateBoardView();
//             if(isGameOver())
//                 gameOver();
//             break;
//             //up
//         case 38:
//             moveUp();
//             bornNewNumber();
//             updateBoardView();
//             if(isGameOver())
//                 gameOver();
//             break;
//         case 39: //right
//             moveRight();
//             bornNewNumber();
//             updateBoardView();
//             if(isGameOver())
//                 gameOver();
//             break;
//         case 40:    //down
//             moveDown();
//             bornNewNumber();
//             updateBoardView();
//             if(isGameOver())
//                 gameOver();
//     }
// }
//
window.onload=function () {
    newGame();
    updateBoardView();
}
// document.onkeyDown=keyDown();
