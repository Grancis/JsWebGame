function showNumber(i,j,num) {
    var numberCell=document.getElementById("number-cell-"+i+"-"+j);
    numberCell.innerHTML(num);
    numberCell.css('')

    numberCell.animation({
        background: getNumberBackgroundColor(num),
        color: getNumberColor(num),

    },50);
}