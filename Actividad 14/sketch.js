let images = [];
let cartas = [];
let carta1= null;
let carta2 = null;
let activado = true;
let visible;
let segundos = 0;
let minutos = 0;
let xBotonR = 275;
let yBotonR = 50;
let xBotonS = 100;
let yBotonS = 50;
let aciertos = 0;

function preload() {
    let indicador = 1;
    for (let i = 0; i < 8; i++) {
        images[i] = loadImage('Carta' + indicador + '.png');
        indicador ++;
    }
  }

function setup() {
  createCanvas(375, 667);

  let xTemp = 65;
  let yTemp = 200;
  let tipos = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; shuffle(tipos, true);

  for (let index = 0; index < 16; index++) {
    cartas [index] = new Tarjeta (xTemp, yTemp, images, tipos [index]);
    xTemp += 80;
    if (xTemp >= 350) {
      xTemp = 65;
      yTemp += 80;}
    }
    visible = true;
    temporizador();
}

function draw() {
  background(0, 207, 195);
  cartas.forEach((carta) =>{
    carta.pintar();
  });
  validarSeleccionCarta();
  temporizador();
  
  fill(255);
  text("Aciertos: "+ String(aciertos),220, 600);
  
  //BOTON START PINTAR
	//Boton Start
  if (visible === true) {
		noStroke();
		fill(0, 147, 137);
		rect(xBotonS, yBotonS, 130,40);
		textSize(16);
		fill(255);
    text("START", 75, 55);}
    
  //BOTON RESET PINTAR
  //Boton Reset
  if (visible === false) {
		noStroke();
		fill(0, 147, 137);
		rect(xBotonR, yBotonR, 130,40);
		textSize(16);
		fill(255);
		text("RESET", 250, 55);}
}

  function validarSeleccionCarta() {
    if(carta1 !== null&& carta2 !== null){
      if(carta1.getTipo() === carta2.getTipo()){
        completadoSeleccionCarta();
        aciertos++;
      }else{
        resetSeleccionCarta();
      }
    }
}


function completadoSeleccionCarta() {
  activado = false;
  carta1.setMostrar(true);
  carta2.setMostrar(true);
  carta1.setCompletado(true);
  carta2.setCompletado(true);
  carta1 = null;
  carta2 = null;
  activado = true;
}

function resetSeleccionCarta() {
  activado = false;
  carta1.setMostrar(false);
  carta2.setMostrar(false);
  carta1.setCompletado(false);
  carta2.setCompletado(false);
  carta1 = null;
  carta2 = null;
  activado = true;

}

function temporizador() {
  
  if (frameCount % 60 == 0 && minutos >= 0) {
      segundos++;
  }
  if (segundos == 60) {
      minutos++;
      segundos = 0;
  }
  if (minutos < 0) {
    fill(255);
    textSize(23);
    text("0:00", 60, 65);
  } else if (segundos <= 9) {
    fill(255);
    textSize(23);
    text(minutos + ":0" + segundos, 60, 65);
  } else if (segundos > 9) {
    fill(255);
    textSize(23);
    text(minutos + ":" + segundos, 60, 65);
  }
}


function mousePressed() {
  if(activado){
  cartas.forEach((carta) => {
      if(carta.validar(mouseX,mouseY)) {
      if (carta1 === null) {
        carta1 = carta;
        carta.setMostrar(true);
        return true;
        }else if (carta2 === null && carta !== carta1){
          carta2 = carta;
          carta.setMostrar(true);
          return true;
      }
    }     
});
}

 //Cuando el mouse por el Boton Start
 if(mouseX > xBotonS && mouseX < xBotonS + 130 &&
  mouseY > yBotonS && mouseY < yBotonS + 40
  && visible === true) {
    visible = false;
    iniciarPartida = true;

    segundos = 0;
    minutos = 0;
  }

  //Cuando el mouse por el Boton Reset
  if(mouseX > xBotonR && mouseX < xBotonR + 130 &&
    mouseY > yBotonR && mouseY < yBotonR + 40
    && visible === false) {
    visible = true;

    segundos = 0;
    minutos = 0;

    aciertos = 0;

    let xTemp = 65;
     let yTemp = 200;
     let tipos = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; shuffle(tipos, true);
     for (let index = 0; index < 16; index++) {
          cartas [index] = new Tarjeta (xTemp, yTemp, images, tipos [index]);
           xTemp += 80;
           if (xTemp >= 350) {
             xTemp = 65;
             yTemp += 80;}
  }
}
}
                