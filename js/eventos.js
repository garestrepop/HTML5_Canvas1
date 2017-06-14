
function cargaContextoCanvas(idCanvas){
   var elemento = document.getElementById(idCanvas);
   if(elemento && elemento.getContext){
      var contexto = elemento.getContext('2d');
      if(contexto){
         return contexto;
      }
   }
   return FALSE;
}

window.onload = function(){
   //Recibimos el elemento canvas
   var contexto = cargaContextoCanvas('area_de_dibujo');
   if(contexto){
      //Si tengo el contexto 
      
      //cambio el color de relleno de los rectángulos
      /* contexto.fillStyle = '#cc0000';
      for (i=0;i<=100;i+=10){
         // fillRect(x,y,width,height) dibuja un rectángulo relleno de color
         contexto.fillRect(i,i,5,5);
      }
      //cambio el color de la línea de borde del rectángulo
      */
      contexto.strokeStyle = '#ff9933';
      //strokeRect(x,y,width,height) dibuja el borde de un rectángulo
   }
}


var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

//document.addEventListener(event, function, useCapture)
/*
event Required. A String that specifies the name of the event.
Note: Do not use the "on" prefix. For example, use "click" instead of "onclick".

function  Required. Specifies the function to run when the event occurs. 

useCapture  Optional. A Boolean value that specifies whether the event should be executed 
in the capturing or in the bubbling phase. 

Possible values:
true - The event handler is executed in the capturing phase
false- Default. The event handler is executed in the bubbling phase*/

document.addEventListener("keydown", dibujarTeclado);
//document.addEventListener("click",dibujarPuntoInicial);
document.addEventListener("mousedown",presionarMouse);  //cuando presionas click
document.addEventListener("mouseup",soltarMouse);       //cuando sueltas click
document.addEventListener("mousemove",dibujarMouse);    //cuando mueves el mouse

var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var estado = 0;
var x;
var y;



function dibujarPuntoInicial (evento) {  
  var colorcito = "#21610B";
  console.log(evento);
  document.getElementById("position").innerHTML = evento.pageX + " " + evento.pageY;
  x = evento.pageX;
  y = evento.pageY;
  dibujarLinea(colorcito, evento.pageX-1, evento.pageY-1, evento.pageX+1, evento.pageY+1, papel);
}


function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarTeclado(evento)
{
  var colorcito = "#FAA";
  var movimiento = 10;
  switch(evento.keyCode)
  {
    case teclas.UP:
      dibujarLinea(colorcito, x, y, x, y - movimiento, papel);
      y = y - movimiento;
    break;
    case teclas.DOWN:
      dibujarLinea(colorcito, x, y, x, y + movimiento, papel);
      y = y + movimiento;
    break;
    case teclas.LEFT:
      dibujarLinea(colorcito, x, y, x - movimiento, y, papel);
      x = x - movimiento;
    break;
    case teclas.RIGHT:
      dibujarLinea(colorcito, x, y, x + movimiento, y, papel);
      x = x + movimiento;
    break;
  }  
}

// Funcion para mousemove
function dibujarMouse(evento){
  var colorcito = "#FAA";
  if (estado == 1) {   // solo se dibujara si esta el click del mouse presionado
    dibujarLinea(colorcito, x, y, evento.layerX, evento.layerY, papel);
  }
  x = evento.layerX;
  y = evento.layerY;
}

// Funcion para mousedown
function presionarMouse(evento){
  estado = 1;         //click presionado  
  x = evento.layerX;
  y = evento.layerY;
}

// Funcion para mouseup
function soltarMouse(evento){
  estado = 0;         // click suelto
  x = evento.layerX;
  y = evento.layerY;
}