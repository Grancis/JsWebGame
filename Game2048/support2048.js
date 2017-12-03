var getPosTop=function (i,j) {
    return 20+i*120;
}
function getPosLeft (i,j){
    return 20+j*120;
}
//初始化数字数组 0代表空位置
function initBoard(){
    for(var i=0;i<4;++i){
        for(var j=0;j<4;++j){
            var gridCell=document.getElementById("grid-cell-"+i+"-"+j);
            gridCell.style.top=getPosTop(i,j)+"px";
            gridCell.style.left=getPosLeft(i,j)+"px";

        }
    }
    for(var i=0;i<4;++i){
        board[i]=[];
        for(var j=0;j<4;++j){
            board[i][j]=0;
        }
    }
}
//拿到对应数字的背景色
function getNumberBackgroundColor(number) {
    switch (number){
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f2c16d";
            break;
        case 16:
            return "#ff7311";
            break;
        case 32:
            return "#ffa28c";
            break;
        case 64:
            return "#ff675d";
            break;
        case 128:
            return "#ff363a";
            break;
        case 256:
            return "#ff92e1";
            break;
        case 512:
            return "#ff5ea9";
            break;
        case 1024:
            return "#ff1e98";
            break;
        case 2048:
            return "#ff180e";
            break;
    }
}
//拿到数字的颜色，即前景色
function getNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}
//拿到一个2或者4
function getRandomNumber(){
    return Math.random()>0.5 ? 2:4;
}
//拿到一个0到3的数，用于随机坐标
//先封装一下坐标值
index={
    x:0,
    y:0
}
function getRandomIndex() {
    return Math.floor(Math.random()*4);
}
//判断某一格是否为0
function isEmpty(i,j) {
    if(board[i][j]===0)
        return true;
    else
        return false;
}
//判断board元素是不是全非零
function isFull(board) {
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
        {
            if(board[i][j]===0)
                return false;
        }
    return true;
}
//将一个新的数字放到board数组中
function bornNewNumber() {
    if(isFull(board))
        return false;
    var indexX;
    var indexY;
    var num=getRandomNumber();
    var flag=true;
    while (flag){
        var indexX=getRandomIndex();
        var indexY=getRandomIndex();
        if(isEmpty(indexX,indexY))
        { board[indexX][indexY]=num;
            flag=false;}
        else
            flag=true;
    }
    return true;
}
//更新数字显示，用number-cell来显示对应的board里的数字，若数字为零则不显示，即显示原来的grid-cell
//作为动画后的显示
function updateBoardView() {
    container=document.getElementById('grid-container');
    for(var i=0;i<16;++i)
        for (var j=0;j<4;++j){
     var number=document.getElementById("number-cell-"+i+"-"+j);
     if(number)
        number.parentNode.removeChild(number);
     else ;
    }
    for(var i=0;i<4;++i)
        for (var j=0;j<4;j++){
            var theNumberCell=document.createElement("div");
            theNumberCell.id="number-cell-"+i+"-"+j;
            theNumberCell.className="number-cell";
            container.appendChild(theNumberCell)
            if(board[i][j]===0){
                theNumberCell.style.width="0px";
                theNumberCell.style.height="0px";
                theNumberCell.style.top=getPosTop(i,j)+"px";
                theNumberCell.style.left=getPosLeft(i,j)+"px";
            }
            else {
                theNumberCell.style.width="100px";
                theNumberCell.style.height="100px";
                theNumberCell.style.top=getPosTop(i,j)+'px';
                theNumberCell.style.left=getPosLeft(i,j)+'px';
                theNumberCell.style.background=getNumberBackgroundColor(board[i][j]);
                theNumberCell.style.color=getNumberColor(board[i][j]);
                theNumberCell.innerHTML=board[i][j];
            }
        }
}
//进行移动时需要的函数

//判断是否能向左移动
function canMoveLeft(i,j) {
    if(j===0)
        return false;
    else if((board[i][j-1]==0)||(board[i][j-1]==board[i][j]))
        return true;
    else
        return false;
}
//向左最多移动到
function canMoveLeftTo(i,j) {
    for(var k=j;k>=0;--k){
        if(k===0)
            return k;
        else if(canMoveLeft(i,k))
            continue;
        else
            return k;
    }
}
//判断是否能向右移动
function canMoveRight(i,j) {
    if(j===3)
        return false;
    else if(board[i][j+1]===0||board[i][j+1]===board[i][j])
        return true;
    else
        return false
}
//向右最多能移动到
function canMoveRightTo(i,j) {
    for (var k=j;k<=3;++k){
        if(k===4)
            return k;
        else if(canMoveRight(i,k))
            continue;
        else
            return k;
    }
}
//判断能否想上移动
function  canMoveUp(i,j) {
    if(i===0)
        return false;
    else if(board[i-1][j]===board[i][j]||board[i-1][j]===0)
        return true;
    else
        return false;
}
//能向上移动到
function canMoveUpTo(i,j) {
    for(var k=i;k>=0;--k)
    {
        if(k===0)
            return k;
        else if(canMoveUp(k,j))
            continue;
        else
            return k;
    }
}
//判断能否向下移动
function canMoveDown(i,j) {
    if(i===3)
        return false;
    else if(board[i+1][j]===board[i][j]||board[i+1][j]===0)
        return true;
    else
        return false;
}
//向下能够移动到
function canMoveDownTo(i,j) {
    for(var k=i;k<=3;++k)
    {
        if(k===0)
            return k;
        else if(canMoveUp(k,j))
            continue;
        else
            return k;
    }
}
//向左移动，按下向左时更新board
function moveLeft() {
    for (var i=0;i<4;++i)
        for (var j=0;j<4;++j){
            if(canMoveLeft(i,j)){
                //可以移动到的任何位置的是相加 零相加还是本身
                var k=canMoveLeftTo(i,j);
                    var sum=board[i][k]+board[i][j];
                    board[i][k]=sum;
                    board[i][j]=0;
                    showMove(i,j,i,k);
            }
        }
}
//向右移动 更新board
function moveRight() {
    for (var i=0;i<4;++i)
        for (var j=2;j>=0;--j){
            if(canMoveRight(i,j)){
                var k=canMoveRightTo(i,j);
                var sum=board[i][k]+board[i][j];
                board[i][k]=sum;
                board[i][j]=0;
                showMove(i,j,i,k);
            }
        }
}
//向上移动 更新board
function moveUp() {
    for(i=1;i<4;++i)
        for(j=0;j<4;++j){
        if(canMoveUp(i,j)){
            var k=canMoveUpTo(i,j);
            var sum=board[i][j]+board[k][j];
            board[k][j]=sum;
            board[i][j]=0;
            showMove(i,j,k,j);
        }
        }
}
//向下移动 更新board
function moveDown() {
    for (var i=2;i>=0;--i)
        for(var j=0;j<4;++j){
        if (canMoveDown(i,j))
            var k=canMoveDownTo(i,j);
            var sum=board[i][j]+board[k][j];
            board[k][j]=sum;
            board[i][j]=0;
            showMove(i,j,k,j);
        }
}

//判断游戏是否结束
function  isGameOver() {
    var flag=false;
    for(var i=0;i<4;++i)
        for (var j=0;j<4;++j){
        if(canMoveUp(i,j)||canMoveDown(i,j)||canMoveRight(i,j)||canMoveLeft(i,j))
            return false;
        else
            flag=true;
        }
        return flag;
}
//游戏结束提示框
function gameOver() {
if(isGameOver())
    alert("Game Over！");
}
