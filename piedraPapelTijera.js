// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

// Función para validar el nombre del usuario, accedo al valor introducido en el input
function validateUsername(){
  var nameInput =  document.getElementsByName("nombre")[0];
  var username = nameInput.value;

  // Evalúo la longitud del nombre
  if(username.length < 4){
    nameInput.classList.add("fondoRojo");

    // Evalúo si el primer carácter es un número
  } else if (isNaN(username[0]) == false){
    nameInput.classList.add("fondoRojo");

    // En el caso de que sea correcto deshabilito el input
  } else{
    nameInput.classList.remove("fondoRojo");
    nameInput.disabled = true;
    return true;
  }
  return false;
}

// Función para validar el número de partidas introducido, accedo al valor
function validateGames(){
  var gamesInput = document.getElementsByName("partidas")[0];
  var numOfGames = gamesInput.value;

  // Evalúo si el número es correcto
  if(numOfGames <= 0){
    gamesInput.classList.add("fondoRojo");

    // En el caso de que sea correcto deshabilito el input
  }else {
    gamesInput.classList.remove("fondoRojo");
    gamesInput.disabled = true;
    return true;
  }
  return false;
}

// Función que engloba las dos funciones que evalúan los inputs
function validateInputs() {
  validateUsername();
  validateGames();

  // Si las dos funciones evalúan los inputs como correctos, el valor del número de partidas totales lo veremos en la página del juego
  if (validateUsername() == true && validateGames() == true){
    var numOfGames = document.getElementsByName("partidas")[0].value;
    var gamesTotal = document.getElementById("total");
    gamesTotal.innerHTML = numOfGames;

    // A estas alturas también es cuando se activa el botón "Ya" para poder apretarlo y acceder a otras funciones
    var botonYa = document.getElementsByTagName("button")[1];
    botonYa.addEventListener ("click", pressYa);
  }
}

// Accedo al primer elemento button del html y lo activo para que valide los inputs al apretarlo 
var botonJugar = document.getElementsByTagName("button")[0];
botonJugar.addEventListener("click", validateInputs);

// Accedo al div que contiene las imágenes del jugador y a las imágenes
var playerDiv = document.getElementById("jugador");
var playerImage = playerDiv.getElementsByTagName("img");

// Recorro el array de posibilidades y añado la ruta de las imágenes
for (var i = 0; i < posibilidades.length ; i++) {
  playerImage[i].src = "img/" + posibilidades[i] + "Jugador.png";
}

// Las imágenes se podrán pulsar y cuando se haga, se llamará la función selected con un parámetro igual al índice 
playerImage[0].addEventListener("click", function () {selected (0);});
playerImage[1].addEventListener("click", function () {selected (1);});
playerImage[2].addEventListener("click", function () {selected (2);});

// Esta función añade y quita clases a las respectivas imágenes según si han sido seleccionadas o no
function selected(indexNumber){
  for (var i = 0; i < playerImage.length ; i++) {
    playerImage[i].classList.add("noSeleccionado");
    playerImage[i].classList.remove("seleccionado");
    if(i == indexNumber){
        playerImage[i].classList.add("seleccionado");
        playerImage[i].classList.remove("noSeleccionado");

        // Aquí se actualiza el valor de la elección del jugador que servirá para evaluar quien ha ganado
        playerChoice=indexNumber;
    }
}
}

// Variables que almacenarán el valor de la jugada del jugador y del ordenador para evaluar el resultado de la partida
var playerChoice = 0;
var computerChoice = null;

// La función que llamaremos pulsando en el boton "Ya", engloba tres funciones distintas 
function pressYa(){
    nowPlaying();
    computerPlays();
    gameResult(); 
  }

// El valor de la partida está a cero para empezar
var gameActual = 0;

// Esta función accede al valor del input del número de partidas y compara el numero de partida en curso con el número introducido
// Actualizará el valor de la partida en curso cada vez y lo pondrá en la página del juego
function nowPlaying (){
    gameActual ++;
    var maxGames = document.getElementsByName("partidas")[0].value;
    var nowPlaying = document.getElementById("actual");
    nowPlaying.innerHTML = gameActual;
    
    // Si el valor de la partida en curso llega a alcanzar el de las partidas que el usuario introdujo, el botón "Ya" dejará de funcionar
    if (gameActual == (maxGames)){
      var botonYa = document.getElementsByTagName("button")[1];
      botonYa.removeEventListener ("click", pressYa);
  }
}

// Esta función accede a la imagen correspondiente a la elección del ordenador, 
//elige una imagen cuyo índice sea el mismo que un número al azar de las posibles opciones

function computerPlays(){
  var computerDiv = document.getElementById("maquina");
  var computerImage = computerDiv.getElementsByTagName("img");
  var randomChoice = Math.floor(Math.random() * posibilidades.length);

  // Le añade la ruta correcta para poder visualizar la imagen 
  computerImage[0].src = "img/" + posibilidades[randomChoice] + "Ordenador.png";

  // Actualiza el valor de la elección del ordenador que servirá para evaluar quien ha ganado
  computerChoice = randomChoice;
  }
  
// Esta función sirve para evaluar quien ha ganado la partida
function gameResult(){
      // Si el índice correspondiente a la elección del jugador es 1 mas que el del ordenador 
      // o el jugador ha elegido el primer elemento del array y el ordenador el último, gana el jugador
      if(computerChoice == (playerChoice-1) || (playerChoice == 0 && computerChoice == posibilidades.length-1)){
        playerWins();

      // Se evalúan los mismos casos que en las líneas anteriores, solo que cambian los roles, entonces gana el ordenador
      } else if (playerChoice == (computerChoice-1) || (computerChoice == 0 && playerChoice== posibilidades.length-1)){
        computerWins();

      // En los demás casos, es un empate
      } else {
        draw();
      }
    }

// Funcion que escribe en la lista de resultados cuando es empate
function draw(){
    var resultsList = document.getElementById("historial");
    var resultsLine = document.createElement("li");
    resultsLine.appendChild(document.createTextNode("Empate"));
    resultsList.appendChild(resultsLine);
}

// Funcion que escribe en la lista de resultados cuando gana el jugador
function playerWins(){
    var resultsList = document.getElementById("historial");
    var resultsLine = document.createElement("li");
    resultsLine.appendChild(document.createTextNode("Gana " + document.getElementsByName("nombre")[0].value));
    resultsList.appendChild(resultsLine);
}

// Función que escribe en la lista de resultados cuando gana el ordenador
function computerWins(){
    var resultsList = document.getElementById("historial");
    var resultsLine = document.createElement("li");
    resultsLine.appendChild(document.createTextNode("Gana la maquina"));
    resultsList.appendChild(resultsLine);
}
  
// Accedo al tercer botón, este elemento podrá ser pulsado y llamará la función que reseteará el juego
var botonReset = document.getElementsByTagName("button")[2];
botonReset.addEventListener("click", gameReset);

// Función que resetea el juego
function gameReset(){

  // El historial añade una nueva línea
  var resultsList = document.getElementById("historial");
  var resultsLine = document.createElement("li");
  resultsLine.appendChild(document.createTextNode("Nueva partida"));
  resultsList.appendChild(resultsLine);

  // Los inputs se vuelven a activar
  document.getElementsByName("nombre")[0].disabled = false;
  document.getElementsByName("partidas")[0].disabled = false;

  // El número de juegos se pone a cero tanto en la página del juego como internamente en la variable
  document.getElementsByName("partidas")[0].value=0;
  document.getElementById("actual").innerHTML = "0";
  document.getElementById("total").innerHTML = "0";
  gameActual = 0;

  // Accedo a la foto de la jugada del ordenador y pongo la imagen por defecto
  var computerDiv = document.getElementById("maquina");
  var computerImage = computerDiv.getElementsByTagName("img");
  computerImage[0].src = "img/defecto.png";

  // El botón "Ya" se deshabilita
  var botonYa = document.getElementsByTagName("button")[1];
  botonYa.removeEventListener ("click", pressYa);
  
  // Se vuelven a restaurar las clases seleccionado y noSeleccionado como al principio del juego
  selected(0);
}


