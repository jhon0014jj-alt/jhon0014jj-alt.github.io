const imagenes = document.querySelectorAll(".slides img");

let centro = 0;

function actualizarSlider(){

  imagenes.forEach(img=>{
    img.classList.remove("activo","lado");
  });

  let izquierda = centro - 1;
  let derecha = centro + 1;

  if(izquierda < 0){
    izquierda = imagenes.length - 1;
  }

  if(derecha >= imagenes.length){
    derecha = 0;
  }

  imagenes[izquierda].classList.add("lado");

  imagenes[centro].classList.add("activo");

  imagenes[derecha].classList.add("lado");
}

actualizarSlider();

setInterval(()=>{

  centro++;

  if(centro >= imagenes.length){
    centro = 0;
  }

  actualizarSlider();

},1500);

function jugar(usuario){

  let opciones = ["piedra","papel","tijera"];
  let pc = opciones[Math.floor(Math.random()*3)];

  document.getElementById("jugadorCaja").innerHTML =
    `<video autoplay loop muted playsinline width="120">
      <source src="img/${usuario}.mp4" type="video/mp4">
    </video>`;

  document.getElementById("pcCaja").innerHTML =
    `<video autoplay loop muted playsinline width="120">
      <source src="img/${pc}.mp4" type="video/mp4">
    </video>`;

  let resultado = "";

  if(usuario == pc){
    resultado = "Empate";
  }

  else if(
    (usuario == "piedra" && pc == "tijera") ||
    (usuario == "papel" && pc == "piedra") ||
    (usuario == "tijera" && pc == "papel")
  ){
    resultado = "Ganaste";
  }

  else{
    resultado = "Perdiste";
  }

  setTimeout(() => {
    mostrarPopup(resultado, pc);
  }, 2000);
}

function mostrarPopup(resultado, pc){

  let popup = document.getElementById("popup");

  let mensaje = document.getElementById("mensajePopup");

  let imagen = document.getElementById("imagenResultado");

  let sonido = document.getElementById("sonidoResultado");

  mensaje.innerHTML =
    resultado + "<br>La PC eligió " + pc;

  if(resultado == "Ganaste"){
    imagen.src = "img/ganaste.gif"
        sonido.src = "img/ganador.mp4";
        sonido.currentTime = 0;
        sonido.volume = 0.4;
        sonido.play();;
  }

  else if(resultado == "Perdiste"){
    imagen.src = "img/perdedor.gif"
        sonido.src = "img/perdedor.mp4";
        sonido.currentTime = 0;
        sonido.volume = 0.4;
        sonido.play();;
  }

  else{
    imagen.src = "img/Empate.gif"
        sonido.src = "img/empate.mp4";
        sonido.currentTime = 0;
        sonido.volume = 0.4;
        sonido.play();;
  }

  popup.style.display = "block";
}

function cerrarPopup(){
  document.getElementById("popup").style.display = "none";

  let sonido = document.getElementById("sonidoResultado");
  sonido.pause();
  sonido.currentTime = 0;
}

window.onload = function () {

  document.querySelectorAll("video").forEach(video => {
    video.play().catch(() => {});
  });

};