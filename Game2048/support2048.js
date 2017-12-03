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
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
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
    return Math.random()>0.5?2:4;
}
//拿到一个0到3的数，用于随机坐标
function getRandomIndex() {
    return floor(Math.random()*4);
}
//判断某一格是否为0
function isEmpty(i,j) {
    if(board[i][j])
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
    document.getElementsByClassName("number-cell").remove();
    for(var i=0;i<4;++i)
        for (var j=0;j<4;j++){
            var theNumberCell=document.createElement('<div class="number-cell" id="number-cell-"+i+"-"+j+"></div>"');
            document.getElementById("grid-container").appendChild(theNumberCell)
            if(board[i][j]===0){
                theNumberCell.css('width','0');
                theNumberCell.css('heigth','0');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }
            else {
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
}
//进行移动时需要的函数

//判断是否能向左移动
function canMoveLeft(i,j) {
    if(board[i][j-1]===0||board[i][j-1]===board[i][j])
        return true;
    else
        return false;
}
//向左最多移动到
function canMoveLeftTo(i,j) {
    for(var k=j;k>=0;--k){
        if(canMoveLeft(i,k))
            continue;
        else if(k===0)
            return k;
        else
            return k;
    }
}