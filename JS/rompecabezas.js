//si ya se ocuparon los id para css
//entonces voy a ocupar las class para js

var piezas = document.getElementsByClassName('movil');

//tenemos que definir el tamaño de las piezas

var tamWidth = [134, 192, 134, 163, 134, 163, 134, 192, 134];
var tamHeight = [163, 134, 163, 134, 192, 134, 163, 134, 163];

for(var i = 0; i < piezas.length; i++){
    piezas[i].setAttribute("width", tamWidth[i]);
    piezas[i].setAttribute("height", tamHeight[i]);
    piezas[i].setAttribute("x", Math.floor((Math.random()*10)+1));
    piezas[i].setAttribute("y", Math.floor((Math.random()*409)+1));
    piezas[i].setAttribute("onmousedown", "seleccionarElemento(evt)");
}

var elementoSeleccionado = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt){
    elementoSeleccionado = reordenar(evt);
    //la posicion del navegador referente a la pieza
    currentX = evt.clientX;
    currentY = evt.clientY;

    //enviar la pos del elemento

    alert(currentX);
    alert(currentY);

    currentPosX = parseFloat(elementoSeleccionado.getAttribute("x"));
    currentPosY = parseFloat(elementoSeleccionado.getAttribute("y"));

    //moverlo
    elementoSeleccionado.setAttribute("onmousemove", "moverElemento(evt)");
}

function moverElemento(evt){
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;

    //asignar dichas coordenadas
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;

    elementoSeleccionado.setAttribute("x", currentPosX);
    elementoSeleccionado.setAttribute("y", currentPosY);
    //donde lo voy a soltar
    currentX = evt.clientX;
    currentY = evt.clientY;

    elementoSeleccionado.setAttribute("onmouseout", "deseleccionarElemento(evt)");
    elementoSeleccionado.setAttribute("onmouseup", "deseleccionarElemento(evt)");
    //funcion para jalarlo
    iman();

}

function deseleccionarElemento(evt){
    testing();
    if(elementoSeleccionado != 0){
        elementoSeleccionado.removeAttribute("onmousemove");
        elementoSeleccionado.removeAttribute("onmouseout");
        elementoSeleccionado.removeAttribute("onmouseup");
        elementoSeleccionado = 0;
    }
}


var entorno = document.getElementById('entorno');

function reordenar(evt){
    var padre = evt.target.parentNode;
    //alert('padre'+padre);
    var clone = padre.cloneNode(true);
    //alert('clone'+clone);
    var id = padre.getAttribute("id");

    entorno.removeChild(document.getElementById(id));
    entorno.appendChild(clone);
    //alert('entorno'+entorno);
    return entorno.lastChild.firstChild;
    
}

//necesito saber cual es la posicion correcta

var origX = [200, 304, 466, 200, 333, 437, 200, 304, 466];
var origY = [100, 100, 100, 233, 204, 233, 237, 366, 337];

function iman(){
    for(var i = 0; i < piezas.length; i++){
        if(Math.abs(currentPosX - origX[i])<15 && Math.abs(currentPosY - origY[i])<15){
            elementoSeleccionado.setAttribute("x", origX[i]);
            elementoSeleccionado.setAttribute("y", origY[i]);
        }
    }
}

function testing(){
    //si la pieza esta en su lugar 
    var bien_ubicada = 0;
    var padres = document.getElementsByClassName('padre');

    for(var i = 0; i < piezas.length; i++){
        var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
        var posy = parseFloat(padres[i].firstChild.getAttribute("y"));

        ide = padres[i].getAttribute("id");

        if(origX[ide] == posx && origY[ide] == posy){
            bien_ubicada = bien_ubicada +1;
        }
    }

    if(bien_ubicada == 9 ){

        //ya gane wiiiiiiii
        alert("Gane");
    }
}
