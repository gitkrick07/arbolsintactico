//funciones para dibujar


function drawRec(x, y, lx, ly, op) {
    ctx.beginPath();
    ctx.rect(x, y, lx, ly);
    ctx.fillStyle = "rgb(4, 121, 255)";
    ctx.fillRect(x, y, lx, ly);

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(op, x + 35, y + 30);

    ctx.stroke();
}

function drawCircle(cX, cY, r, op) {
    ctx.beginPath();
    ctx.arc(cX + 50, cY + 50, r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(4, 121, 255)";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(op, cX + 45, cY + 55);
    ctx.stroke();

}





function drawLine(i, f, ii, ff) {
    ctx.beginPath();
    ctx.moveTo(i + 50, f + 80);
    //  ctx.lineTo(ii, f);
    ctx.lineTo(ii + 50, ff + 50);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

}


function drawLine2(i, f, ii, ff) {
    ctx.beginPath();
    ctx.moveTo(i + 50, f + 80);
    //  ctx.lineTo(ii, f);
    ctx.lineTo(ii + 50, ff);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

}

function drawLine3(i, f, ii, ff) {
    ctx.beginPath();
    ctx.moveTo(i + 50, f + 50);
    //  ctx.lineTo(ii, f);
    ctx.lineTo(ii + 20, ff + 50);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

}

module.exports = {
    drawRec,
    drawCircle,
    drawLine,
    drawLine2,
    drawLine3

};