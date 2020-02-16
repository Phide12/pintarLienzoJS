document.addEventListener('DOMContentLoaded', cargarLienzo);
var lienzo = document.getElementById('lienzo');
var lienzoCtx = lienzo.getContext('2d');
var coordenadas = document.getElementById('coordenadas');
var colorActual = 'rgb(0,0,0)';
var pintarActivo = false;


function cargarLienzo() {
  lienzo.width = window.innerWidth - (window.innerWidth * 0.15);
  lienzo.height = window.innerHeight - 32;
  lienzo.addEventListener('mousemove', comprobarTrazo);
  lienzo.addEventListener('mouseout', limpiarCoordenadas);
  cargarSelectorColores();
}

function comprobarTrazo(evento) {
  posX = evento.clientX - lienzo.offsetLeft;
  posY = evento.clientY - lienzo.offsetTop;
  coordenadas.innerHTML = 'canvas:(' + posX + ',' + posY + ')';
  if (evento.buttons == 0 && pintarActivo) {
    lienzoCtx.closePath();
      pintarActivo = false;
  } else if (evento.buttons == 1) {
    if (!pintarActivo) {
      pintarActivo = true;
      lienzoCtx.beginPath();
      lienzoCtx.moveTo(posX, posY);
    }
    lienzoCtx.strokeStyle = colorActual;
    lienzoCtx.lineTo(posX, posY);
    lienzoCtx.stroke();
  }
}

function limpiarCoordenadas() {
  coordenadas.innerHTML = '';
}

function cargarSelectorColores() {
  document.addEventListener('keyup', selectorColores);
  document.addEventListener('mouseup', selectorColores);
  selectorColores();
}

function selectorColores() {
  let rojo = document.getElementById('valor_rojo').value;
  let verde = document.getElementById('valor_verde').value;
  let azul = document.getElementById('valor_azul').value;
  document.getElementById('rojo').style.backgroundColor = 'rgb(' + rojo + ',0,0)';
  document.getElementById('verde').style.backgroundColor = 'rgb(0,' + verde + ',0)';
  document.getElementById('azul').style.backgroundColor = 'rgb(0,0,' + azul + ')';
  colorActual = 'rgb(' + rojo + ',' + verde + ',' + azul + ')';
  document.getElementById('color_actual').style.backgroundColor = colorActual; 
}
