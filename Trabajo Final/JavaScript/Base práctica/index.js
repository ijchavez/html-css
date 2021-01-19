/**
* Variables de configuración del juego
*/

const opciones = {
	top_left: {
		id: "top_left"
	},
	top_right: {
		id: "top_right"
	},
	bottom_left: {
		id: "bottom_left"
	},
	bottom_right: {
		id: "bottom_right"
	},
};

const estadoJuego = {
	//los cree en base a la referencia final 
	intervalos: {
		inicio: 1000,
		paso: 500
	},
	segundosInicio: 3,
	interaciones: false,
	secuenciaJuego: [],
	secuenciaUsuario: [],
	nivelJuego: 0,
	nivelUsuario: 0,
	opciones,
};

/**
* Referencias del DOM
*/
const botonesDelJuego = document.querySelectorAll(".simon-button");
//Tomado de la referencia final
const activarElemento = (elementoDOM) => {
	elementoDOM.classList.add("active");
  }
  
  const mostrarElemento = (elementoDOM) => {
	elementoDOM.classList.add("show");
	elementoDOM.classList.remove("hide");
  }
  
  const desactivarElemento = (elementoDOM) => {
	elementoDOM.classList.remove("active");
  }
  
  const ocultarElemento = (elementoDOM) => {
	elementoDOM.classList.add("hide");
	elementoDOM.classList.remove("show");
  }
  
  const activarElementos = (elementos) => {
	elementos.forEach(activarElemento);
  };
  
  const desactivarElementos = (elementos) => {
	elementos.forEach(desactivarElemento);
  };
  
  const obtenerElementoDom = (id) => {
	return window.document.getElementById(id);
  };

  //Visto de la referencia
  
  const activarInteracciones = () => {
	const elementoApp = obtenerElementoDom("app");
	elementoApp.classList.remove("app-background-dark");
  
	const elementoTexto = obtenerElementoDom("turno_texto");
	mostrarElemento(elementoTexto);
	elementoTexto.textContent = "tu turno";
  
	
	estadoJuego.interaciones = true;
  };
  
  const desactivarInteracciones = () => {
	const elementoApp = obtenerElementoDom("app");
	elementoApp.classList.add("app-background-dark");
  
	const elementoTexto = obtenerElementoDom("turno_texto");
	ocultarElemento(elementoTexto);
  
	estadoJuego.interaciones = false;
  };

/**
 * Funciones de referencia
 */

/********************************************************** 
En base a lo siguiente:
<input id="nombre_jugador" class="modal-input" type="text" placeholder="Nombre" />
<button class="modal-button" onclick="accionModalInicio()">Comenzar juego</button>
tengo que crear el metodo accionModalInicio() para que se cargue el jugador y comenzar el 
juego una vez tocado el boton Comenzar Juego

************************************************************/
const accionModalInicio = () => {
	// Se obtiene el nombre del jugador
	const inputDom = obtenerElementoDom("nombre_jugador");
	const nombreJugador = inputDom.value;
  	//inicio el juego del div con la clase inicio_juego
	const elementoInicio = obtenerElementoDom("inicio_juego");
	
	//valido que el nombre no sea vacio 
	const acceder = nombreJugador;
	
	if(acceder !== ""){
	  //obtenido de la referencia
	  ocultarElemento(elementoInicio);
	  //fin obtenido de la referencia

	  // Se muestra el nombre en pantalla y se guarda en localstorage
	  const elementoNombre = obtenerElementoDom("nombre_usuario");
	  elementoNombre.textContent = nombreJugador;
	  window.localStorage.setItem("nombre", nombreJugador);
	  
	  inicializacion();
	}else{
		const MuestroPopUP = obtenerElementoDom("pop_up");
		//console.log(MuestroPopUP);
		return;
	}
  };

const accionModalFin = () => {
	// Se oculta el modal de final
	const elementoModalFinal = obtenerElementoDom("fin_juego");
	ocultarElemento(elementoModalFinal);
  
	// Se comienza el juego
	inicializacion();
};

const clickBoton = (id) => {
	/**
	 * Evento click de los botones del juego
	 * 1) Agregar el id que el usuario hizo click en la secuencia del usuario para validarla con 
	 * la secuencia del juego
	 * 2) Si el click es correcto, avanzar con el juego
	 * 3) Si el click es incorrecto, game over
	 * 4) Si el usuario hizo todos los clicks de la secuencia, avanzar al siguiente nivel
	 */
	//console.log('clickBoton');
	//apartir de lel metodo activarInteracciones hago:
	if (!estadoJuego.interaciones){
		return;
	}
	//agrego id usuario para luego comparar 1)
	estadoJuego.secuenciaUsuario.push(id);

	const secuenciaJuegoEstaEtapa = estadoJuego.secuenciaJuego[estadoJuego.nivelUsuario];
	const secuenciaUsuarioEstaEtapa = estadoJuego.secuenciaUsuario[estadoJuego.nivelUsuario];
	//comparo
	if(secuenciaJuegoEstaEtapa === secuenciaUsuarioEstaEtapa){
		estadoJuego.nivelUsuario = estadoJuego.nivelUsuario + 1;
		//console.log(estadoJuego.nivelUsuario);
		//console.log(estadoJuego.nivelUsuario);
	}else{//visto en la referencia
		const elementoJuego = obtenerElementoDom("juego");
		ocultarElemento(elementoJuego);

		desactivarInteracciones();

		const elementoModalFinal = obtenerElementoDom("fin_juego");
		mostrarElemento(elementoModalFinal);

		const puntajeDom = obtenerElementoDom("puntaje");
		puntajeDom.textContent = "tu puntaje es de " + estadoJuego.nivelJuego;
		
		return;

	}	
	//Si el usuario hizo todos los clicks de la secuencia, avanzar al siguiente nivel
	if (estadoJuego.nivelJuego === estadoJuego.nivelUsuario){
		desactivarInteracciones();
		estadoJuego.secuenciaUsuario = [];
		estadoJuego.nivelUsuario = 0;
		reproducirSecuencia();

	}
};

const obtenerElementoAleatorio = () => {
	/**
	 * Función de calculo de id aleatorio
	 * 1) Calcular un elemento aleatorio para agregar a la secuencia
	 */
	const opcionesIds = Object.keys(estadoJuego.opciones);
	const idAleatorio = opcionesIds[Math.floor(Math.random() * opcionesIds.length)];
	
	return estadoJuego.opciones[idAleatorio];

	//console.log('obtenerElementoAleatorio');
};

const reproducirSecuencia = () => {
  	/**
	 * Función de reproducción de secuencia
	 * 1) Agregar un nuevo elemento aleatorio a la secuencia actual
	 * 2) Definir un intervalo y reproducir la secuencia existente
	 */
	  // Variable de pasos al comienzo de la secuencia sacado de la referencia
	  let paso = 0;
  
	  // Agregar un nuevo elemento aleatorio a la secuencia actual
  	  estadoJuego.secuenciaJuego.push(obtenerElementoAleatorio().id);
	  estadoJuego.nivelJuego = estadoJuego.nivelJuego + 1;
	
	  	// Se define un intervalo para mostrar y ocultar cada paso
	  const intervalo = setInterval(() => {
	  		//Sacado de la referencia	
			const pausaPaso = paso % 2 === 1;
      		//Sacado de la referencia	
 			const finReprodduccion = paso === (estadoJuego.secuenciaJuego.length * 2);
	
			if (pausaPaso) {
		  	// Se desactivan todos los botones del juego
		  	desactivarElementos(botonesDelJuego);
		  
		  	// Se incrementa un paso
		  	paso++;
			return;
		
			}
		
			if (finReprodduccion) {
		  	// Se elimina intervalo
		  	clearInterval(intervalo);
		  
		  	// Se desactivan todos los botones del juego
		  	desactivarElementos(botonesDelJuego);
		  
		  	// Se activan las interacciones del usuario
		  	activarInteracciones();
		  	return;

			}
	
			// Se obtiene la referencia del DOM del elemento del paso de la secuencia para encenderla
			const id = estadoJuego.secuenciaJuego[paso / 2];
			const referenciaDOM = obtenerElementoDom(id);
			activarElemento(referenciaDOM)
	  
			// Se incrementa un paso
			paso++;
		}, estadoJuego.intervalos.paso);
		//console.log('reproducirSecuencia');
};

const reseteoVariables = () =>{
	estadoJuego.secuenciaJuego = [];
	estadoJuego.secuenciaUsuario = [];
	estadoJuego.nivelJuego = 0;
	estadoJuego.nivelUsuario = 0;

}

const inicializacion = () => {
	/**
	 * Función de inicialización del juego 
	 * 1) Setear todas las variables por defecto para comenzar el juego
	 * 2) Quitar todos los modales y mostrar el juego
	 * 3) Mostrar y ejecutar un contador que de comienzo a la reproducción de la secuencia
	 */

	//Reset variables
	reseteoVariables();
	
	// Muestro el div con class = juego
	const juego = obtenerElementoDom("juego");
	mostrarElemento(juego);
	
	//Cuenta Regresiva igualada al elemento del array
	let segundosInicio = estadoJuego.segundosInicio;
	
	//obtengo el elemento para mostrarlo en div = "cuenta_regresiva"
	const elementoCuentaRegresiva = obtenerElementoDom("cuenta_regresiva");
	mostrarElemento(elementoCuentaRegresiva);
	
	//igualo lo que voy a mostrar a los segundos al iniciar.
	elementoCuentaRegresiva.textContent = segundosInicio
	//tuve que ver de la referencia los nombres de las funciones especificas
	// setInterval y clearInterval
	const cuentaRegresiva = setInterval(()=>{
		segundosInicio = segundosInicio -1;
		elementoCuentaRegresiva.textContent = segundosInicio;

		if (segundosInicio === 0){
			//llega a cero lo saco
			ocultarElemento(elementoCuentaRegresiva);

			//arrancan las secuencias de Simon
			reproducirSecuencia();

			clearInterval(cuentaRegresiva);
		}
		//esto despues de la llave lo tuve q sacar de la referencia porque no entendia como
		//hacerlo andar	se quedaba en 3
	},estadoJuego.intervalos.inicio);
	//console.log('inicializacion');
};

const nombreJugadorStorage = window.localStorage.getItem("nombre");
const elementoNombre = obtenerElementoDom("nombre_jugador");
elementoNombre.value = nombreJugadorStorage || "";
