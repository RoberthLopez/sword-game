class Espada {
    constructor (nombre, vida, ventaja) {
        this.nombre = nombre;
        this.vida = vida;
        this.ventaja = ventaja;
        this.daño = () => {
            return Math.floor(Math.random() * 16)
        };
    }
}
let peleaIntervalo;
let vidaUsuarioId = document.getElementById("vida")
let vidaEnemigoId = document.getElementById("vidaEnemigo")
let vidaUsuario;
let vidaEnemiga;
let menuJugar = document.getElementById("menu__jugar")
let btnJugar = document.getElementById("btn__jugar")
let btnSalir = document.getElementById("btn__salir")
let btnCombatlog = document.getElementById("btn__combatlog")

// Cree 2 objetos para la misma cosa porque cuando aletoriamente salia el mismo objeto para usuario y enemigo se hacian exactamente el mismo daño
// Tipos de espada Usuario
const espadaFuego = new Espada ("fuego", 100, "planta");
const espadaAgua = new Espada("agua", 100,"fuego");
const espadaPlanta = new Espada ("planta", 100, "agua");

// Tipos de espada Enemigo
const espadaFuegoEnemigo = new Espada ("fuego", 100, "planta");
const espadaAguaEnemigo = new Espada("agua", 100,"fuego");
const espadaPlantaEnemigo = new Espada ("planta", 100, "agua");

// Generador de enemigo Random
const generarEnemigo = () => {
    let espadaRandom = Math.floor(Math.random() * 3)
    if (espadaRandom == 0) {
        return espadaFuegoEnemigo;
    }
    else if (espadaRandom == 1) {
        return espadaAguaEnemigo;
    }
    else {
        return espadaPlantaEnemigo;
    }
}

// let elegirEspada;

let espadaEnemiga = generarEnemigo();
let espadaUsuario;

//Historial de daño
let combatLog;

// Historial ganadas y perdidas
let ganadas = 0;
let perdidas = 0;

// Crear espada de usuario
let comenzarJuego = document.getElementById("comenzarJuego")
let selectEspada = document.getElementById("elegir__espada")

const empezarJuego = () => {
    combatLog = [];
    espadaUsuario = "";
    espadaEnemiga = generarEnemigo();
    vidaUsuario = 100;
    vidaEnemiga = 100;
    comenzarJuego.style.display = "none";
    selectEspada.style.display = "block";
    selectEspada.onchange = elegirEspada;
    peleaIntervalo = setInterval(pelea, 1000);   
}

function elegirEspada () {
    let espadaElegida = selectEspada.value;
    selectEspada.style.display = "none";
    console.log(selectEspada.value)

    switch (espadaElegida) {
        case "fuego": 
            espadaUsuario = espadaFuego;
            pelea ();
            break;
        case "agua":
            espadaUsuario = espadaAgua;
            pelea();
            break;
        case "planta":
            espadaUsuario = espadaPlanta;
            pelea();
            break;
        default:
            alert("Elige entre fuego, agua o planta");
            crearEspadaUsuario();
            break;

    }
}


// Calcular el daño segun la ventaja del usuario
const calcularDañoUsuario = () => {
    if (espadaUsuario.ventaja == espadaEnemiga.nombre) {
        return Math.round(espadaUsuario.daño() * 1.2);
    }
    else if (espadaEnemiga.ventaja == espadaUsuario.nombre) {
        return Math.round(espadaUsuario.daño() * 0.9);
    }
    else {
        return espadaUsuario.daño();
    }
}

//Calcular daño segun ventaja enemiga
const calcularDañoEnemigo = () => {
    if (espadaEnemiga.ventaja == espadaUsuario.nombre) {
        return Math.round(espadaEnemiga.daño() * 1.2);
    }
    else if (espadaUsuario.ventaja == espadaEnemiga.nombre) {
        return Math.round(espadaEnemiga.daño() * 0.9);
    }
    else {
        return espadaEnemiga.daño();
    }
}

//Funcion para volver a jugar

const volverAJugar = () => {
    let preguntaJugar = prompt(` Has ganado ${ganadas} veces y perdido ${perdidas} veces.\n¿Quieres volver a jugar? \nIngresa 1 para volver a jugar. \nIngresa 2 para salir.`)
    switch (preguntaJugar) {
        case "1":
            empezarJuego();
            break;
        case "2":
            break;
        default:
            alert("Ingresa 1 ó 2");
            volverAJugar();
            break;
    }
}

//  const calcularVida = () => {
//     while (espadaUsuario.vida >= 0 && espadaEnemiga.vida >= 0) {
//         let vidaUsuario = espadaUsuario.vida -= calcularDañoEnemigo();
//         let vidaEnemiga = espadaEnemiga.vida -= calcularDañoUsuario();
//         vidaUsuarioId.innerText = vidaUsuario;
//         vidaEnemigoId.innerText = vidaEnemiga;
//         combatLog.push(`Recibes ${calcularDañoEnemigo()} de daño y haces ${calcularDañoUsuario()} de daño. Tienes ${vidaUsuario} puntos de vida y tu enemigo ${vidaEnemiga}`);   
//     }
                           

//Pelea de las espadas
const ganaUsuario = () => {
    return alert("Felicidades Has Ganado la Batalla!"),
    ganadas++,
    console.log(espadaEnemiga.nombre + " Enemigo"),
    console.log(espadaUsuario.nombre + " Usuario"),
    alert(combatLog.join("\n")),
    volverAJugar();         
}
const ganaEnemigo = () => {
    return alert("Has luchado con honor pero has perdido la batalla"),
    perdidas++,
    console.log(espadaEnemiga.nombre + " Enemigo"),
    console.log(espadaUsuario.nombre + " Usuario"),
    alert(combatLog.join("\n")),
    volverAJugar();
}


const pelea = () => {
    generarEnemigo()
    
    vidaUsuario = espadaUsuario.vida -= calcularDañoEnemigo();
    vidaEnemiga = espadaEnemiga.vida -= calcularDañoUsuario();
    vidaUsuarioId.innerText = vidaUsuario;
    vidaEnemigoId.innerText = vidaEnemiga;

    if (vidaUsuario <= 0) {
        clearInterval(peleaIntervalo);
        ganaEnemigo();
    }
    else if (vidaEnemiga <= 0) {
        clearInterval(peleaIntervalo);
        ganaUsuario();
    }
    // combatLog.push(`Recibes ${calcularDañoEnemigo()} de daño y haces ${calcularDañoUsuario()} de daño. Tienes ${vidaUsuario} puntos de vida y tu enemigo ${vidaEnemiga}`);
}

comenzarJuego.addEventListener("click", empezarJuego)