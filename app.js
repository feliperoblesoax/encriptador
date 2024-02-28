/**Funcion para copiar el resultado del texto encriptado/desencriptado
 * al clipboard de Windows, para poder hacer uso del contenido con las
 * teclas rapidas CTRL-V o pegar del menu contextual
  */

function copiar() {
    let texto = document.querySelector("#mensaje-desencriptado").textContent;//Seleccionamos el contenido del texto encriptado/desencriptado

    navigator.clipboard.writeText(texto) //Escribimos en el Clipboard el texto seleccionado
    .then(() => {
        console.log('Texto copiado al portapapeles') //mesaje de consola para avisar que si se escribio en el Clipboard

    })
    .catch(err => {
        console.error('Error al copiar al portapapeles:', err) ////mesaje de consola para avisar que ocurrio un error y no se pudo copiar
        console.log
    })
}

/*
Función que se encarga de validar que no se introduzcan
letras mayusculas o con acento antes de realizar cualquier
proceso
*/
function validar(event)
{
    let codigo;
    let bandera;
    let inputTexto = document.querySelector("#htmlTexto").value;
    
    //Recorremos la cadena que se ha introducido
    for (x=0; x<inputTexto.length; x++)
    {
        codigo = inputTexto.charCodeAt(x);//obtenemos el codigo unicode del caracter actual según el índice proporcionado por el ciclo for
        //Comparamos que el caracter se encuentre dentro del rango de los códigos de las 
        //letras minusculas y del código de la barra espaciadora (32)
        if (codigo >=97 && codigo <= 122 || codigo == 32)
        {
            bandera = 1;//Sí es minuscula activamos una bandera, pero continuamos en el bucle para recorrer toda la cadena de texto
        }
        else
        {
            bandera = 0;//Si es algo diferente a una minuscula o barra espaciadora apagamos la bandera y rompemos el bucle
            break;
        }
    }

    if (bandera)
    {
        encriptarTexto(inputTexto);//Si la bandera es 1 (verdadero) llamamos a la fucion de encriptarTexto
    }
    else//En caso contrario no podremos seguir
    {
        alert ("Lo siento, sólo se permiten letras minusculas y sin acentos, revisa tu texto a encriptar");
    }
}

/*
Esta función se encarga de encriptar el texto introducido
segun las reglas del reto
*/
function encriptarTexto(textoIntroducido) {
    let ocultarPersona;
    let ocultarMensaje1;
    let ocultarMensaje2;
    let monstrarBoton;
    let colocar;
    //textoIntroducido = document.getElementById('htmlTexto').value;
    
    let arregloTexto = textoIntroducido.split("");//convertirmos la cadena en una variable de tipo areglo (array)
    
    let longitudArreglo = arregloTexto.length; //Obtenemos la longitud del arreglo
    
    for (x=0; x<longitudArreglo; x++)//Recorremos el arreglo para ir cambiando cada letra por su respectivo valor según el reto
    {
        if (arregloTexto[x]=="a")
        {
            arregloTexto[x]="ai";
        }
        if (arregloTexto[x]=="e")
        {
            arregloTexto[x]="enter";
        }
        if (arregloTexto[x]=="i")
        {
            arregloTexto[x]="imes";
        }
        if (arregloTexto[x]=="o")
        {
            arregloTexto[x]="ober";
        }
        if (arregloTexto[x]=="u")
        {
            arregloTexto[x]="ufat";
        }
    }
    texto = arregloTexto.join("");//Volvemos la variable tipo arreglo a string nuevamente para mostrarla adecuadamente
    //console.log(texto);
    
    //Ocultamos los elementos de la caja donde se mostrará el resultado
    ocultarPersona = document.getElementById("persona").style.display = "none";
    ocultarMensaje1 = document.getElementById("ningun-mensaje").style.display = "none";
    ocultarMensaje2 = document.getElementById("mensaje-informativo").style.display = "none";
    monstrarBoton = document.getElementById("copiar").style.display = "block";
    
    //Seleccionamos el elemento que vamos a modificar por el resultado
    colocar = document.querySelector("#mensaje-desencriptado")
    
    //Sustituimos el contenido actual por el resultado
    colocar.innerHTML=texto;
}

/**
 * Esta función se encarga de pasar la cadena de texto a otra función que se va a encargar de
 * buscar caracter por caracter las conicidencias de valores a desencriptar, una vez terminada
 * la busqueda le regresan el texto obtenido.
 * Esta función se aplica para cada llave de encripción por separado.
 */

function desencriptarTexto() {
    textoIntroducido=document.querySelector("#htmlTexto").value;
    textoDes=buscarTexto(textoIntroducido,"ai");
    textoDes=buscarTexto(textoDes,"enter");
    textoDes=buscarTexto(textoDes,'imes');
    textoDes=buscarTexto(textoDes,"ober");
    textoDes=buscarTexto(textoDes,"ufat");

    //console.log(textoDes);

    //Seleccionamos el elemento que vamos a modificar por el resultado
    colocar = document.querySelector("#mensaje-desencriptado")

    //Sustituimos el contenido actual por el resultado
    colocar.innerHTML=textoDes;

}

/*
 * Esta función recibe como parámetro el texto encriptado y la llave de desencripción
 * Con esto realiza las búsquedas correspondientes y devuelve la cadena desencriptada
 */

function buscarTexto(texto, llave) {
    let inicio = texto.indexOf(llave); //Devuelve la posicion en donde encuentra una coincidencia con la llave de desencripción sino encuentra devuelve el valor -1
    let longitudLlave = llave.length; //Obteneos la longitud de la llave
    //console.log(inicio, longitudLlave);
    //console.log(llave);
    
    while(inicio >= 0)//Mientras encuentre una coincidencia con la llave
    {
        arreglo = texto.split(""); //Convierte la cadena de texto en un arreglo
        arreglo.splice(inicio+1,longitudLlave-1); //Elimina la llave de desencripcion, dejando sólo la letra inicial, por ejemplo en "imes", borra mes y deja únicamente la letra "i"
        texto = arreglo.join(""); //Convierte el arreglo en cadena de texto nuevamente, para poder mostrarla adecuandamente
        //console.log(texto);
        inicio = texto.indexOf(llave); //Volvemos devolver la posicion en donde encuentra una coincidencia con la llave de desencripción ya que si no se encuentra devuelve el valor -1 y rompe el ciclo while
        //console.log(inicio, longitudLlave);
    }
    return texto;
}

