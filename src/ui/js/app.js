var canvas = document.querySelector('#lienzo');
var ctx = canvas.getContext("2d");
const fx = document.getElementById('fx');


const { drawCircle, drawRec, drawLine, drawLine2, drawLine3 } = require('../js/draw');
const { Stack } = require('../js/stack');


///------------------------
const nuevo = document.getElementById('nuevo');
const resolver = document.getElementById('resolver');
const container = document.querySelector(".container");





//coordenadas del tablero para dibujo.
const coordX = [25, 125, 225, 325, 425, 525, 625, 725, 825, 925, 1025];
const coordY = [25, 125, 225, 325, 425, 525, 625];

const longRecX = [80, 40];
const longRecY = [40, 20];
const radioCircle = [10, 20, 30];

var mainToken;

var bRaiz = 1;



var xSL = 0;
var ySL = 1;
var xSR = 0;
var ySR = 1;


var xNL = 0;
var yNL = 0;
var xNR = 1;
var yNR = 0;



const rgex = {
    validation: /^[\d-+/*()]+$/,
    operator: /^[\+| \* | \/|\-]{1}$/,
    separator: /\(|\)/,
    operator1: /\+| \* | \/| \-/,
    number: /\d/,
    sumRest: /^[\+|\-/]{1}$/,

}



const stackRaiz = new Stack();
const stackLeft = new Stack();
const stackRight = new Stack();
const stackSubRaizL = new Stack();
const stackSubRaizR = new Stack();





fx.addEventListener('input', function() {
    var error = true;
    try {
        //Si sólo tiene números y signos + - * / ( )
        if (rgex.validation.test(fx.value)) {
            // Evaluar el resultado
            //resultado.innerText = eval(fx.value);
            // fx.classList.remove('danger');
            mainToken = fx.value.split(rgex.separator);
            document.getElementById('console').innerHTML = mainToken;
            error = false;
        } else {
            //  fx.classList.remove('succes');
            //  fx.classList.add('danger');
        }

    } catch (err) {}
    if (error) // Si no se pudo calcular
        console.log("no es operacion")

});



function stacks(tok) {
    var stringsToken = tok;
    console.log(stringsToken);

    for (let index = 1; index < stringsToken.length - 1; index++) {
        if (rgex.sumRest.test(stringsToken[index]) && bRaiz === 1) {
            stackRaiz.push(stringsToken[index]);
            bRaiz = 0;
            // console.log(raiz);
        }

        if (bRaiz === 1) {
            if (rgex.operator.test(stringsToken[index])) {
                stackSubRaizL.push(stringsToken[index]);
                xSL = xSL + 2;
                ySL = ySL + 1;
            } else {
                stackLeft.push(stringsToken[index]);
                xNL = xNL + 3;
                yNL = yNL + 2;
            }

            // stackLeft.print();
        } else {
            if (rgex.operator.test(stringsToken[index])) {
                stackSubRaizR.push(stringsToken[index]); //guarda tambien la raiz
                xSR = xSR + 2;
                ySR = ySR + 1;
            } else {
                stackRight.push(stringsToken[index]);
                // stackRight.print();
                xNR = xNR + 3;
                yNR = yNR + 2;

            }

        }




    }

    //console.log(xSL);
    // console.log(ySL);
    //console.log(xSR);
    //console.log(ySR);
    //console.log(xNL);
    //console.log(yNL)
    //console.log(xNR);
    //console.log(yNR);
    //stackRaiz.print();
    stackLeft.print();
    stackRight.print();
    stackSubRaizL.print();
    stackSubRaizR.print();



    //   console.log("asignado a las pilas");

}

function drawTree() {
    var rX;
    var rY;

    var dxSL = xSL;
    var dySL = ySL;
    var dxSR = xSR;
    var dySR = ySR;
    var dxNL = xNL;
    var dyNL = yNL;
    var dxNR = xNR;
    var dyNR = yNR;

    var lStackLeft = stackLeft.size();
    var lStackRight = stackRight.size();
    var lStackSubLeft = stackSubRaizL.size();
    var lStackSubRight = stackSubRaizR.size();
    var r = stackRaiz.pop();
    console.log(stackSubRaizL.print());

    switch (lStackLeft) {
        case 1:
            drawCircle(coordX[3], coordY[0], radioCircle[2], r);
            rX = 3;
            rY = 0;
            break;
        case 2:
            drawCircle(coordX[6], coordY[0], radioCircle[2], r);
            rX = 6;
            rY = 0;
            break;
        case 3:
            drawCircle(coordX[9], coordY[0], radioCircle[2], r);
            rX = 9;
            rY = 0;
            break;
    }

    for (let l = 0; l < lStackLeft; l++) {

        let nodoL = stackLeft.pop();
        nodoLN = nodoL.split(/\-|\+|\*|\//);
        console.log(nodoLN);

        console.log(nodoL);

        for (let dL = 0; dL < nodoL.length; dL++) {

            if (rgex.number.test(nodoL[dL])) {

                drawRec(coordX[rX - dxNL], coordY[rY + dyNL], longRecX[0], longRecY[0], nodoL[dL]);
                dxNL = dxNL - 1;


            } else {
                drawLine(coordX[rX], coordY[rY], coordX[rX - dxNL], coordY[(rY + dyNL) - 1]);
                drawLine2(coordX[rX - dxNL], coordY[(rY + dyNL) - 1], coordX[rX - (dxNL + 1)], coordY[rY + dyNL]);
                drawLine2(coordX[rX - dxNL], coordY[(rY + dyNL) - 1], coordX[rX - (dxNL - 1)], coordY[rY + dyNL]);
                drawCircle(coordX[rX - dxNL], coordY[(rY + dyNL) - 1], radioCircle[2], nodoL[dL]);

                dxNL = dxNL - 1;

            }

        }
        dyNL = dyNL - 2;
        dxNL = dxNL - 1;
    }
    ////suboperator
    if (lStackSubLeft === 0) {

        console.log("no tiene sub operadores");
    } else {
        for (let sL = 0; sL < lStackSubLeft.length; sL++) {
            let subRL = stackSubRaizL.pop();
            console.log(subRL);

            drawCircle(coordX[(rX + 1)], coordY[rY + 2], radioCircle[2], subRL[sL]);
            // dxSL = dxSL - 3;
            // dySL = dySL - 2;
        }
        console.log("dibujando...!")

    }


    for (let dR = 0; dR < lStackRight; dR++) {
        var ir = 2;

        let nodoR = stackRight.pop();
        for (let drR = 0; drR < nodoR.length; drR++) {

            if (rgex.number.test(nodoR[drR])) {

                drawRec(coordX[rX + dxNR], coordY[rY + dyNR], longRecX[0], longRecY[0], nodoR[drR + ir]);

                dxNR = dxNR - 1;
                ir = -2;

            } else if (dR == 0) {
                drawLine(coordX[rX], coordY[rY], coordX[(rX + 3)], coordY[(rY + 1)]);
                drawLine2(coordX[rX + dxNR], coordY[(rY + dyNR) - 1], coordX[rX + (dxNR + 1)], coordY[rY + (dyNR)]);
                drawLine2(coordX[rX + dxNR], coordY[(rY + dyNR) - 1], coordX[rX + (dxNR - 1)], coordY[rY + (dyNR)]);
                drawCircle(coordX[rX + dxNR], coordY[(rY + dyNR) - 1], radioCircle[2], nodoR[drR]);
                dxNR = dxNR - 1;

            } else {
                drawLine3(coordX[rX + 4], coordY[rY + 1], coordX[((rX + dxNR) + 4)], coordY[((rY + dyNR) + 1)]);
                drawLine3(coordX[(rX + dxNR)], coordY[((rY + dyNR) - 1)], coordX[(rX + dxNR) + 2], coordY[((rY + dyNR) - 1)]);
                drawLine2(coordX[rX + dxNR], coordY[(rY + dyNR) - 1], coordX[rX + (dxNR + 1)], coordY[rY + (dyNR)]);
                drawLine2(coordX[rX + dxNR], coordY[(rY + dyNR) - 1], coordX[rX + (dxNR - 1)], coordY[rY + (dyNR)]);
                drawCircle(coordX[rX + dxNR], coordY[(rY + dyNR) - 1], radioCircle[2], nodoR[drR]);
                dxNR = dxNR - 1;

            }

        }


        dxNR = dxNR - 1;
        dyNR = dyNR - 2;
    }
    console.log("fin de dibujo derecho");
    console.log(lStackSubRight);

    if (lStackSubRight === 0) {
        console.log("no tiene sub operadores");

    } else {
        for (let s = 0; s < lStackSubRight - 1; s++) {
            let subR = stackSubRaizR.pop();
            console.log(subR);

            drawCircle(coordX[rX + dxSR], coordY[rY + (dySR - 2)], radioCircle[2], subR[s]);

            dxSR = dxSR - 3;
            dySR = dySR - 2;
        }


    }

}

function oneTree() {
    var rXs = 6;
    var rYs = 0;


    var dxNL = xNL;
    var dyNL = yNL;
    var lStackLeft = stackLeft.size();
    for (let l = 0; l < lStackLeft; l++) {

        let nodoL = stackLeft.pop();
        nodoLN = nodoL.split(/\-|\+|\*|\//);
        console.log(nodoLN);

        console.log(nodoL);

        for (let dL = 0; dL < nodoL.length; dL++) {

            if (rgex.number.test(nodoL[dL])) {

                drawRec(coordX[rXs - dxNL], coordY[rYs + dyNL], longRecX[0], longRecY[0], nodoL[dL]);
                dxNL = dxNL - 1;


            } else {
                //  drawLine(coordX[rXs], coordY[rYs], coordX[rXs - dxNL], coordY[(rYs + dyNL) - 1]);
                drawLine2(coordX[rXs - dxNL], coordY[(rYs + dyNL) - 1], coordX[rXs - (dxNL + 1)], coordY[rYs + dyNL]);
                drawLine2(coordX[rXs - dxNL], coordY[(rYs + dyNL) - 1], coordX[rXs - (dxNL - 1)], coordY[rYs + dyNL]);
                drawCircle(coordX[rXs - dxNL], coordY[(rYs + dyNL) - 1], radioCircle[2], nodoL[dL]);

                dxNL = dxNL - 1;

            }

        }
        dyNL = dyNL - 2;
        dxNL = dxNL - 1;
    }
}

nuevo.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bRaiz = 1;
    xSL = 0;
    ySL = 1;
    xSR = 0;
    ySR = 1;


    xNL = 0;
    yNL = 0;
    xNR = 1;
    yNR = 0;



    stackLeft.pop();
    stackRight.pop();
    stackSubRaizL.pop();
    stackSubRaizR.pop();

    container.classList.remove("sign-up-mode");
})



resolver.addEventListener('click', function() {


    stacks(mainToken);
    if (bRaiz === 1) {
        oneTree();
    } else {
        drawTree();

    }
    container.classList.add("sign-up-mode");
});




/*
    //funciones para dibujar
    function drawRec(x, y, lx, ly) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "royalblue";
        ctx.rect(x, y, lx, ly);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, lx, ly);

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.font = "bold 20px sans-serif";
        ctx.strokeText("N", x + 35, y + 20);

        ctx.stroke();
    }

    function drawCircle(cX, cY, r) {
        ctx.beginPath();
        ctx.arc(cX + 50, cY + 50, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "royalblue";
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.font = "bold 20px sans-serif";
        ctx.strokeText("S", cX + 45, cY + 55);
        ctx.strokeText("12", 470, 40);
        ctx.stroke();

    }
    function drawLine(i, f, ii, ff, sx, sy) {
        ctx.beginPath();
        ctx.moveTo(i + sx, f + (sy / 2));
        ctx.lineTo(ii + (sx / 2), f + (sy / 2));
        ctx.lineTo(ii + (sx / 2), ff + sy);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "royalblue";
        ctx.stroke();

    }

    
*/