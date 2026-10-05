const texto = document.querySelectorAll(".section_p");

document.addEventListener("scroll", function(){
    texto.forEach(paragraph =>{
        if(isInView(paragraph)){
            paragraph.classList.add("section_p--visible");
        }
    });
});

function isInView(element){
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < 
    (window.innerHeight - 150 || document.documentElement.clientHeight - 150);
}

//Pruebas

const ventana = document.getElementById('ventana');
const btnMenu = document.getElementById('btn-menu');
const audio = document.getElementById('reproductor');
const opciones = document.querySelectorAll('.opcion');
const estado = document.getElementById('estado');



// Abrir / cerrar ventana
const alternar = () => {
  ventana.classList.toggle('abierta');
  btnMenu.classList.toggle('activo', ventana.classList.contains('abierta'));
};

btnMenu.addEventListener('click', alternar);


// Elegir música desde los iconos
opciones.forEach(btn => {
    btn.addEventListener('click', () => {
        audio.src = btn.dataset.src;
        audio.play();
        opciones.forEach(o => o.classList.remove('sonando'));
        btn.classList.add('sonando');
        estado.textContent = '▶ Sonando: ' + btn.dataset.nombre;
    });
});
 
// Controles
document.getElementById('btn-pausa').addEventListener('click', () => {
    if (!audio.src) return;
    if (audio.paused) { audio.play(); estado.textContent = '▶ Sonando'; }
    else { audio.pause(); estado.textContent = '⏸ En pausa'; }
});
  
function cerrar() {
  ventana.classList.remove('abierta');
  btnMenu.classList.remove('activo');
}
btnMenu.addEventListener('click', alternar);
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
 

document.getElementById('btn-parar').addEventListener('click', () => {
    audio.pause(); audio.currentTime = 0;
    opciones.forEach(o => o.classList.remove('sonando'));
    estado.textContent = 'Eligue un disco';
});

document.getElementById('volumen').addEventListener('input', e => audio.volume = e.target.value);
audio.volume = 0.5;

/* Formulario*/

const formSug = document.getElementById('form-sugerencias');
const resultado = document.getElementById('resultado');

formSug.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultado.textContent = 'Enviando...';
    try {
    const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(formSug)
    });
    const datos = await resp.json();
    if (datos.success) {
        resultado.textContent = '¡Gracias por tu sugerencia!';
        formSug.reset();
    } else {
        resultado.textContent = 'Error: ' + datos.message;
    }
    } catch (err) {
    resultado.textContent = 'No se pudo enviar. Intenta de nuevo.';
    }
});
