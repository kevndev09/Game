    //Ponemos nuestros objetos y variables necesarios
    
    let Flechas = {
        arriba: 'ArrowUp',
        abajo: 'ArrowDown',
        derecha: 'ArrowRight',
        izquierda: 'ArrowLeft'
    }
    
    let Personaje = {
        direction: 's', x: 5, y: 200, w: 50, h: 50
    }

    let Fondo = {
        x: 0, y: 0, w: 1300, h: 600
    }

    let Comida = {
        draw: false, x: 0, y: 0, w: 20, h: 20
    }

    let sComer = new Audio('Multim/y2mate (mp3cut.net).mp3')

    let sPerdiste = new Audio('Multim/POL-misc-impact-08.wav')

    let Enemigos = new Array (3) 

    for (let i = 0; i < Enemigos.length; i++) {
        Enemigos[0] = { direction: 'd', x: 65, y: 0, w: 25, h: 25},
        Enemigos[1] = { direction: 'd', x: 650, y: 0, w: 25, h: 25},
        Enemigos[2] = { direction: 'd', x: 1255, y: 0, w: 25, h: 25}
 }

    let puntaje = 0
    let Hamburguesas = 0

    //Empezamos a armar un loop donde se ejecutaran cada una de nuestras funciones en determinado tiempo

    const CANVAS = document.querySelector('canvas')
    const ctx = CANVAS.getContext('2d')
    
    
function iniciar () {
    if (typeof gameLoop != 'undefined') {
        clearInterval(gameLoop)
    }
    gameLoop = setInterval(evaluar, 50)
    }

function evaluar() {
    crearFondo()
    algComida()
    moverPersonaje()
    moverEnemigos ()
    colisionObjetos () 
    colisionComida ()
    colisionEnemigos ()
    crearPersonaje()
    crearEnemigos ()
    crearComida()
    ponerHamburguesas ()
    ponerPuntaje()
}

function crearFondo () {
    ctx.save()
    ctx.fillStyle = 'rgb(126, 199, 228)'
    ctx.fillRect(Fondo.x, Fondo.y, Fondo.w, Fondo.h)
    ctx.restore()                                                                
    }

crearFondo()

function crearPersonaje () {
        let imagen = new Image(Personaje.w, Personaje.h)
        imagen.src = 'Multim/personaje.png'

        ctx.drawImage(imagen, Personaje.x, Personaje.y)
}

function crearEnemigos () {
    let imgEnemigos1 = new Image(Enemigos[0].w, Enemigos[0].h)
  imgEnemigos1.src = 'Multim/Enemigo1.png'

  ctx.drawImage(imgEnemigos1,Enemigos[0].x, Enemigos[0].y)

    let imgEnemigos2 = new Image(Enemigos[1].w, Enemigos[1].h)
  imgEnemigos2.src = 'Multim/Enemigo2.png'

  ctx.drawImage(imgEnemigos2,Enemigos[1].x, Enemigos[1].y)

    let imgEnemigos3 = new Image(Enemigos[2].w, Enemigos[2].h)
  imgEnemigos3.src = 'Multim/Enemigo3.png'

  ctx.drawImage(imgEnemigos3,Enemigos[2].x, Enemigos[2].y)
}

function crearComida () {
    if (Comida.draw) {              //true
       let imagen2 = new Image(Comida.w, Comida.h)
        imagen2.src = 'Multim/Comida.png'

        ctx.drawImage(imagen2, Comida.x, Comida.y)
    }
}    
 
function colisionObjetos () {
    if (Personaje.y <= -7) {
        Personaje.y = 150, Personaje.x = 150
        Personaje.direction = 's'
        puntaje = 0          //Colisionar arriba
    }
    if (Personaje.x <= -7 ) {
        Personaje.y = 150, Personaje.x = 150
        Personaje.direction = 's'
        puntaje = 0           //Colisionar izquierda
    }   
    if (Personaje.y + Personaje.h >= CANVAS.height -3) {
        Personaje.y = 150, Personaje.x = 150
        Personaje.direction = 's' 
        puntaje = 0               //Colisionar abajo
    }
    if (Personaje.x + Personaje.w >= CANVAS.width -3) {
        Personaje.y = 150, Personaje.x = 150
        Personaje.direction = 's'
        puntaje = 0                 //Colisionar derecha
    }

    //Hacer que nuestros enemigos no se salgan del fondo

     if (Enemigos[0].y <= -3, Enemigos[1].y <= -3, Enemigos[2].y <= -3) {
        Enemigos[0].direction = 'd'
    }  
    if (Enemigos[0].y + Enemigos[0].h >= CANVAS.height - 10) {
        Enemigos[0].direction = 't' 
    }
    
}

function colisionComida () {
    if (Comida.draw && 
        Personaje.x + Personaje.w > Comida.x &&
         Personaje.x < Comida.x + Comida.w && 
         Personaje.y < Comida.y + Comida.h && 
         Personaje.y + Personaje.h > Comida.y) {
             
        sComer.play()   
        Comida.draw = false
        puntaje = puntaje + 5
        Hamburguesas ++
    }
}

function colisionEnemigos () {
     for (let i = 0; i < Enemigos.length; i++) {
if (
        Personaje.x + Personaje.w > Enemigos[i].x &&
         Personaje.x < Enemigos[i].x + Enemigos[i].w && 
         Personaje.y < Enemigos[i].y + Enemigos[i].h && 
         Personaje.y + Personaje.h > Enemigos[i].y) {

        sPerdiste.play()
        Personaje.x = 150, Personaje.y = 150
        Personaje.direction = 's'
        puntaje = 0
        Hamburguesas = 0

    }
 }
}

document.addEventListener('keydown', (x) => {
    switch (x.key) {
        case Flechas.arriba:
            Personaje.direction = 't'
            break;
        case Flechas.abajo:
            Personaje.direction = 'd'
            break;
        case Flechas.izquierda:
            Personaje.direction = 'l'
            break;
        case Flechas.derecha:
            Personaje.direction = 'r'
            break;
    
        default:
            break;
    }
})

function moverPersonaje () {
    switch (Personaje.direction) {
        case 't':
            Personaje.y -= 13
            break;
        case 'd':
            Personaje.y += 13
            break;
        case 'l':
            Personaje.x -= 13
            break;
        case 'r':
            Personaje.x += 13
            break;
    
        default:
            Personaje.x = Personaje.x
            Personaje.y = Personaje.y
            break;
    }
}

function moverEnemigos () {
        switch (Enemigos[0].direction) {
        case 't':
            Enemigos[0].y -= 23, Enemigos[1].y -= 23, Enemigos[2].y -= 23
            break;
            case 'd':
            Enemigos[0].y += 23, Enemigos[1].y += 23, Enemigos[2].y += 23
            break;
    }
    if (puntaje > 10) {
                switch (Enemigos[0].direction) {
        case 't':
            Enemigos[0].y -= 25, Enemigos[1].y -= 25, Enemigos[2].y -= 25
            break;
            case 'd':
            Enemigos[0].y += 25, Enemigos[1].y += 25, Enemigos[2].y += 25
            break;
    }
    }
}

function algComida () {
    if (!Comida.draw && Math.floor((Math.random()*50) +1) < 4) {
        Comida.x = Math.floor(Math.random()*(CANVAS.width - Comida.w + 20))              //Para hacer que aparezca aleatoriamente por todo el mapa
        Comida.y = Math.floor(Math.random()*(CANVAS.height - Comida.h + 20))         
        Comida.draw = true
    }
}

function ponerPuntaje () {
    let Text = 'Puntaje: ' + puntaje 
    ctx.fillStyle = '#ee6c4d'
    ctx.font = '20px Arial'
    ctx.fillText(Text,1120, 550)

    if (puntaje > 10) {
        switch (Personaje.direction) {
            case 't':
            Personaje.y -= 11
            break;
        case 'd':
            Personaje.y += 11
            break;
        case 'l':
            Personaje.x -= 11
            break;
        case 'r':
            Personaje.x += 11
            break;
    
        default:
            Personaje.x = Personaje.x
            Personaje.y = Personaje.y
            break;
        }
        let mensaje = 'TENGO HAMBREE!!'
        ctx.font = '20px Arial'
        ctx.fillText(mensaje, 800, 23)
    }
}

function ponerHamburguesas () {
    let Text2 = ' Hamburguesas comidas: ' + Hamburguesas
    ctx.fillStyle = '#ee6c4d'
    ctx.font = '20px Arial'
    ctx.fillText(Text2,200, 23)
}

iniciar() //Invocamos al loop ( set interval )