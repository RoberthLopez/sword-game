class Espada {
    constructor (nombre, ventaja, img) {
        this.nombre = nombre;
        this.ventaja = ventaja;
        this.img = img;
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
let mensajes = document.getElementById("mensajes")
let espadaImg = document.getElementById("espada")
let espadaEnemigaImg = document.getElementById("espada__enemiga")
let espadaElegida;
let ganaste = document.getElementById("ganaste")
let perdiste = document.getElementById("perdiste")
let espadaAElegir = document.querySelectorAll(".espada__imagen--2")
let vecesGanadas = document.getElementById("vecesGanadas")
let vecesPerdidas = document.getElementById("vecesPerdidas")



// Crear espada de usuario
let comenzarJuego = document.getElementById("comenzarJuego")
let selectEspada = document.getElementById("elegir__espada")

// Historial ganadas y perdidas

let storageGanadas = parseInt(localStorage.getItem("cantidadGanada"));
let storagePerdidas = parseInt(localStorage.getItem("cantidadPerdida"));

if (localStorage.getItem("cantidadGanada")) {
    vecesGanadas.innerText = localStorage.getItem("cantidadGanada")
    localStorage.setItem("cantidadGanada", storageGanadas++)
}
if (localStorage.getItem("cantidadPerdida")) {
    vecesPerdidas.innerText = localStorage.getItem("cantidadPerdida")
    localStorage.setItem("cantidadPerdida", storagePerdidas++)
}

const contador = () => {


    let newStorageGanadas = ganadas + storageGanadas;
    let newStoragePerdidas = perdidas + storagePerdidas;

    localStorage.setItem("cantidadGanada", newStorageGanadas)
    localStorage.setItem("cantidadPerdida", newStoragePerdidas)

    vecesGanadas.innerText = localStorage.getItem("cantidadGanada");
    vecesPerdidas.innerText = localStorage.getItem("cantidadPerdida");

}

// funcion para obtener nombre de la espada elegida
const obtener = (e) => {
    espadaElegida = e.target.getAttribute("id")
    elegirEspada(espadaElegida)
}  
 

//
// Cree 2 objetos para la misma cosa porque cuando aletoriamente salia el mismo objeto para usuario y enemigo se hacian exactamente el mismo daño
// Tipos de espada Usuario
const espadaFuego = new Espada ("fuego", "planta", "espada-fuego.png");
const espadaAgua = new Espada("agua", "fuego", "espada-agua.png");
const espadaPlanta = new Espada ("planta", "agua", "espada-planta.png");

// Tipos de espada Enemigo
const espadaFuegoEnemigo = new Espada ("fuego", "planta", "espada-fuego-enemigo.png");
const espadaAguaEnemigo = new Espada("agua", "fuego", "espada-agua-enemigo.png");
const espadaPlantaEnemigo = new Espada ("planta", "agua", "espada-planta-enemigo.png");

// Generador de enemigo Random
const generarEnemigo = () => {
    let espadaRandom = Math.floor(Math.random() * 3)
    if (espadaRandom == 0) {
        espadaEnemigaImg.innerHTML = `<img class="espada__imagen" src="assets/images/${espadaFuegoEnemigo.img}" alt="">`;
        return espadaFuegoEnemigo;

    }
    else if (espadaRandom == 1) {
        espadaEnemigaImg.innerHTML = `<img class="espada__imagen" src="assets/images/${espadaAguaEnemigo.img}" alt="">`;
        return espadaAguaEnemigo;

    }
    else {
        espadaEnemigaImg.innerHTML = `<img class="espada__imagen" src="assets/images/${espadaPlantaEnemigo.img}" alt="">`;
        return espadaPlantaEnemigo;
    }
}

// let elegirEspada;

let espadaEnemiga = generarEnemigo();
let espadaUsuario;

//Historial de daño
let combatLog;




const empezarJuego = () => {
    vidaUsuario = 100;
    vidaEnemiga = 100;
    espadaImg.innerHTML = "";
    espadaElegida = "";
    perdiste.style.visibility = "hidden";
    ganaste.style.visibility = "hidden";
    combatLog = [];
    espadaUsuario = "";
    espadaEnemiga = generarEnemigo();
    comenzarJuego.style.display = "none";
    selectEspada.style.visibility = "visible";
    espadaAElegir.forEach((e) => {
        e.addEventListener("click", obtener)
    });
}

function elegirEspada (espadaElegida) {
    selectEspada.style.visibility = "hidden";
    console.log(espadaElegida)

    switch (espadaElegida) {
        case "fuego":
            vidaUsuarioId.innerText = 100;
            vidaEnemigoId.innerText = 100;
            vidaUsuarioId.style.visibility = "visible";
            vidaEnemigoId.style.visibility = "visible";
            espadaImg.innerHTML = `<img class="espada__imagen" src="assets/images/${espadaFuego.img}" alt="">`;
            espadaImg.style.visibility = "visible";
            espadaEnemigaImg.style.visibility = "visible";
            espadaUsuario = espadaFuego;
            peleaIntervalo = setInterval(pelea, 1000);
            break;
        case "agua":
            vidaUsuarioId.innerText = 100;
            vidaEnemigoId.innerText = 100;
            vidaUsuarioId.style.visibility = "visible";
            vidaEnemigoId.style.visibility = "visible";
            espadaImg.innerHTML = `<img class="espada__imagen" src="assets/images/${espadaAgua.img}" alt="">`;
            espadaImg.style.visibility = "visible";
            espadaEnemigaImg.style.visibility = "visible";
            espadaUsuario = espadaAgua;
            peleaIntervalo = setInterval(pelea, 1000);
            break;
        case "planta":
            vidaUsuarioId.innerText = 100;
            vidaEnemigoId.innerText = 100;
            vidaUsuarioId.style.visibility = "visible";
            vidaEnemigoId.style.visibility = "visible";
            espadaImg.innerHTML = `<img class="espada__imagen" src="assets/images/${espadaPlanta.img}" alt="">`;
            espadaImg.style.visibility = "visible";
            espadaEnemigaImg.style.visibility = "visible";
            espadaUsuario = espadaPlanta;
            peleaIntervalo = setInterval(pelea, 1000);
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
    else if (espadaUsuario.ventaja != espadaEnemiga.nombre){
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
    else if (espadaUsuario.ventaja != espadaEnemiga.nombre) {
        return espadaEnemiga.daño();
    }
}

//Funcion para volver a jugar


const volverAJugar = () => {
    btnJugar.addEventListener("click", () => {
        vidaUsuarioId.style.visibility = "hidden";
        vidaEnemigoId.style.visibility = "hidden";
        espadaImg.innerHTML = ""
        menuJugar.style.visibility = "hidden";
        selectEspada.style.visibility = "visible";

        empezarJuego()
    })

    btnSalir.addEventListener("click", dejarDeJugar)
}

// Funcion para dejar de jugar

const dejarDeJugar = () => {

}
                        
// Ganador

const ganaUsuario = () => {
    menuJugar.style.visibility = "visible"
    volverAJugar()
    return localStorage.setItem("cantidadGanada", storageGanadas++),
    vecesGanadas.innerText = localStorage.getItem("cantidadGanada");
         
}
const ganaEnemigo = () => {
    menuJugar.style.visibility = "visible"
    volverAJugar()
    return localStorage.setItem("cantidadPerdida", storagePerdidas++),
    vecesPerdidas.innerText = localStorage.getItem("cantidadPerdida");


}

//Pelea de las espadas

const pelea = () => {
    
    vidaUsuario = vidaUsuario -= calcularDañoEnemigo();
    vidaEnemiga = vidaEnemiga -= calcularDañoUsuario();
    vidaUsuarioId.innerText = vidaUsuario;
    vidaEnemigoId.innerText = vidaEnemiga;

    if (vidaUsuario <= 0) {
        
        espadaEnemigaImg.style.visibility = "hidden";
        espadaImg.style.visibility = "hidden";
        perdiste.style.visibility = "visible"
        ganaEnemigo();
        clearInterval(peleaIntervalo);
    }
    else if (vidaEnemiga <= 0) {
        
        espadaEnemigaImg.style.visibility = "hidden";
        espadaImg.style.visibility = "hidden";
        ganaste.style.visibility = "visible";
        ganaUsuario();
        clearInterval(peleaIntervalo);
    }
}

comenzarJuego.addEventListener("click", empezarJuego)