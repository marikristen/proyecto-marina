let operacion="+" ; //operacion "+", "-", "*"
let tema = "perros";
let num1 = 0;
let num2 = 0;
let resultado = 0;
/*elementos del DOM*/
const paginaPrincipal = document.querySelector("#PaginaPrincipal");
const paginaEjercicio = document.querySelector("#PaginaEjercicio");
const paginaTeorica = document.querySelector("#PaginaTeorica");

const pregunta = document.querySelector("#pregunta");
const contImagenes = document.querySelector("#imagenes");
const inputRespuesta = document.querySelector("#respuesta");
const mensaje = document.querySelector("#mensaje");
const botonVerificar = document.querySelector("button[onclick='verificar()']");

console.log("DOM cargado correctamente");

//Las Imagenesdisponible

const imagenes = {
    perros:[
        "imagenes/img1.png", "imagenes/img2.png", "imagenes/img3.png",
        "imagenes/img4.png", "imagenes/img5.png", "imagenes/img6.png",
        "imagenes/img7.png"
    ],
     hadas:[ 
        "imagenes/imag1.png", "imagenes/imag2.png", "imagenes/imag3.png",
        "imagenes/imag4.png", "imagenes/imag5.png", "imagenes/imag6.png",
        "imagenes/imag7.png"
    ],
    cars:[
        "imagenes/car1.png", "imagenes/car2.png", "imagenes/car3.png",
        "imagenes/car4.png", "imagenes/car5.png", "imagenes/car6.png",
        "imagenes/car7.png"
       
    ],
    triste:[ "imagenes/triste.png"],
       
    feliz:[ "imagenes/feliz.png"]
    
}
// cambiar paginas
function mostrarPagina(pagina){
    paginaPrincipal.style.display = "none";
    paginaEjercicio.style.display = "none";
    paginaTeorica.style.display = "none";
    
    pagina.style.display = "block";
}
//Entrar a las operaciones
function entrar(op){
    operacion = op;
    console.log("Operacion elegida:", operacion);
    mostrarPagina(paginaEjercicio);
    nuevoEjercicio();
}
function volver(){
    console.log("volviendo al inicio");
    mostrarPagina(paginaPrincipal);
}

// Elegir Temas
function setTema(t){
    tema = t;
    console.log("Tema seleccionado:", tema);
    mostrarImagenes();
}

function bloquearTemas(estado){
    const botonesTema = document.querySelectorAll("button[onclick^='setTema']");
    botonesTema.forEach(btn => btn.disabled = estado);
}

// Ingreso a un nuevo Ejercicio
function nuevoEjercicio(){
    console.log("Nuevo ejercicio");

    inputRespuesta.value = "";
    inputRespuesta.disabled = false;
    botonVerificar.disabled = false;
    mensaje.innerHTML = "";

    bloquearTemas(false);
    num1 =Math.floor(Math.random() * 7) + 1;
    num2 =Math.floor(Math.random() * 7) + 1;
  if(operacion === "/"){
    num2 = Math.floor(Math.random() * 6) + 1;
  }
  calcularResultado();

  pregunta.textContent =`${num1} ${operacion} ${num2} = ?`;

  console.log("numeros:", num1, num2);
  console.log("Resultado correcto:", resultado);
  mostrarImagenes();
}
//Calculo de los resultados
function calcularResultado(){
    switch(operacion){
        case "+": resultado = num1 + num2; break;
        case "-": resultado = num1 - num2; break;
        case "*": resultado = num1 * num2; break;
        case "/": resultado = Number((num1 / num2).toFixed(2)); break;
    }
}
//Aqui estamos mostrando las imagenes
function mostrarImagenes(){
    contImagenes.innerHTML = "";
    const lista = imagenes[tema];

    for (let i=0; i<num1; i++ ){
        contImagenes.appendChild(crearImagen(lista[i % lista.length]));
    }

   const op = document.createElement("div");
   op.textContent = operacion;
   op.style.fontSize = "40px";
   op.style.margin = "0 10px";
   contImagenes.appendChild(op);

    for (let i=0; i<num2; i++ ){
         contImagenes.appendChild(crearImagen(lista[i % lista.length]));
    }
}
function crearImagen(src){
    const img = document.createElement("img");
    img.src = src;
    img.className = "figura";
    return img;
}

// verificar las respuestas
function verificar(){
    const respuestaUsuario = Number(inputRespuesta.value);
    console.log("Respuesta del usuario:", respuestaUsuario);

    inputRespuesta.disabled = true;
    botonVerificar.disabled = true;
    bloquearTemas(true);

    if(respuestaUsuario === resultado){
        mensaje.className = "correcto mensaje-flex";
        mensaje.innerHTML = `<img src="${imagenes.feliz[0]}">
         <span>¡Correcto!</span>`
    }
    else{
        mensaje.className = "incorrecto mensaje-flex";
        mensaje.innerHTML = `<img src="${imagenes.triste[0]}">
        <span>¡Intentalo otra Vez!</span>`
    }
}
//parte teorica
function mostrarTeoria(figura){
    console.log("Figura elegida", figura);

    const teorias = {
        circulo: {
            titulo: "CIRCULO",
            texto:"El circulo es una figura redonda que no tiene lados ni vertices todos su puntos estan ala misma distancia",
            clase:"circulo"
        },
         cuadrado: {
            titulo: "CUADRADO",
            texto:"El cuadrado tiene 4 lados iguales y 4 angulos rectos ",
            clase:"cuadrado"
        },
         triangulo: {
            titulo: "TRIANGULO",
            texto:"El triangulo tiene tres lados y tres vertices, pueden tener diferectes formas",
            clase:"triangulo"
        },
         rectangulo: {
            titulo: "RECTANGULO",
            texto:"El rectangulo tiene  4 lados y 4 angulos rectos sus lados opuestos son iguales",
            clase:"rectangulo"
        }
    };
mostrarPagina(paginaTeorica);
document.querySelector("#tituloFigura").textContent = teorias[figura].titulo;
document.querySelector("#textoTeoria").textContent = teorias[figura].texto;
const figuraDiv = document.querySelector("#figuraTeoria");
figuraDiv.className = "figura-geo " + teorias[figura].clase;
}




