'use strict';

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});
    
function iniciarApp(){
    crearGaleria('practimart', 8, );
    crearGaleria('how2', 9, 'Director de arte Jr');
    crearGaleria('casa vargas', 10, 'Lider de diseño e imagen');
    agregarEventosDeFiltro();
}

//Funcion para active
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

//Galeria para portafolio
function crearGaleria(categoria, cantidad, puesto) {
    const galeria = document.querySelector(`.galeria-imagenes`);
    
    for(let i = 1; i <= cantidad; i++){
        const imagen = document.createElement('li');
        imagen.classList.add('project-item');
        imagen.classList.add('active');
        imagen.dataset.filterItem ='';
        imagen.dataset.category = categoria.toLowerCase();
        imagen.innerHTML = `
            <a class="project-box" href="#">
                <figure class="project-img">
                    <div class="project-item-icon-box">
                        <ion-icon name="eye-outline" role="img" class="md hydrated" aria-label="eye outline"></ion-icon>
                    </div>
                    <img loading="lazy" class="img-thumb" src="img/thumb-${categoria}/${i}.png" alt="imagen galeria">
                </figure>
                <h3 class="project-title">${categoria}</h3>
            </a>
        `;
        
        imagen.onclick = function() {
            mostrarImagen(categoria, i);
        };

        galeria.appendChild(imagen);
    }

    // Redefinir filterItems después de crear las imágenes
    agregarEventosDeFiltro();
}

function mostrarImagen(categoria, id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <img loading="lazy" class="img-grande" src="img/grande-${categoria}/${id}.png" alt="imagen galeria">
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };

    //Boton para cerrar el Modal
    const cerrarModal = document.createElement ('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');

    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };

    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

function agregarEventosDeFiltro() {
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-select-value]");
    const filterBtn = document.querySelectorAll("[data-filter-btn]");
    
    select.addEventListener("click", function () { 
        elementToggleFunc(this); 
    });
    
    // add event in all select items
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    }
    
    // filter variables
    const filterItems = document.querySelectorAll("[data-filter-item]");
    
    const filterFunc = function (selectedValue) {
      for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
          filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
          filterItems[i].classList.add("active");
        } else {
          filterItems[i].classList.remove("active");
        }
      }
    }
    
    // add event in all filter button items for large screen
    let lastClickedBtn = filterBtn[0];
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
}

const BoxInfo = document.querySelector("[data-boxinfo]");
const BtnInfoMore = document.querySelector("[data-btninfo]");

BtnInfoMore.addEventListener("click", function () { 
    elementToggleFunc(BoxInfo); 
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }
    });
}
