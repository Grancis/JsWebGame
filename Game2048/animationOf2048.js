function showMove(fromX,fromY,toX,toY) {
    var numberCell=document.getElementById("number-cell-"+fromX+"-"+fromY);
    numberCell.style.left=getPosLeft(toX,toY)+"px";
    numberCell.style.top=getPosTop(toX,toY)+"px";
}