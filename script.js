// Variables globales
let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
let letrasVerde = Array(5).fill(null); // Inicializar con null para las letras verdes

// Función de inicialización
function init() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
    initializeProgressBar();
}

// Inicializa la barra de progreso con letras vacías
function initializeProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    for (let i = 0; i < 5; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.id = `letter-${i}`; // Asignamos un ID para actualizar más tarde
        progressBar.appendChild(span);
    }
}

// Función para leer el intento del usuario
function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

// Función para procesar el intento
function intentar() {
    const INTENTO = leerIntento();
    const LETTERS = document.querySelectorAll('.letter');

    if (INTENTO.length !== 5) {
        alert("Por favor, introduce una palabra de 5 letras.");
        return;
    }

    if (INTENTO === palabra) {
        terminar("<h1>¡GANASTE! 😀</h1>");
        return;
    }

    let letrasAmarillo = new Set();
    let letrasGris = [];

    for (let i = 0; i < 5; i++) {
        if (INTENTO[i] === palabra[i]) { // VERDE
            letrasVerde[i] = INTENTO[i];
        } else if (palabra.includes(INTENTO[i])) { // AMARILLO
            letrasAmarillo.add(INTENTO[i]);
        } else { // GRIS
            letrasGris.push(INTENTO[i]);
        }
    }

    // Actualizar la barra de progreso
    for (let i = 0; i < 5; i++) {
        const SPAN = LETTERS[i];
        if (letrasVerde[i]) {
            SPAN.innerHTML = letrasVerde[i];
            SPAN.className = 'letter green';
        } else if (letrasAmarillo.has(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.className = 'letter yellow';
        } else if (letrasGris.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.className = 'letter gray';
        }
    }

    intentos--;
    if (intentos === 0) {
        terminar("<h1>¡PERDISTE! 😖</h1>");
    }
}

// Función para terminar el juego y mostrar el mensaje
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

// Configuración inicial
window.addEventListener('load', init);
