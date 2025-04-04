// Animación de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efecto de aparición en las secciones con animaciones graduales
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const target = entry.target;
        target.classList.add('visible');
        
        // Animar elementos internos con retraso
        const elementsToAnimate = target.querySelectorAll('.skill-card, .project-card, .experience-card');
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, 150 * index);
        });
        
        observer.unobserve(target);
    });
}, observerOptions);

// Observar todas las secciones
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    appearOnScroll.observe(section);
});

// Efecto de hover mejorado para elementos interactivos
document.querySelectorAll('.skill-card, .project-card, .experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('hover-effect');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('hover-effect');
    });
});

// Animar el header después de cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar inmediatamente para evitar demoras
    const header = document.getElementById('main-header');
    if (header) {
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
        header.classList.add('loaded');
    }
    
    // Resto del código con un pequeño retraso para animaciones más suaves
    setTimeout(() => {
        // Animar hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) heroSection.classList.add('loaded');
        
        // Añadir clase para CSS a las imágenes después de cargar
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.onload = function() {
                this.classList.add('loaded');
            };
            
            // Si la imagen ya está cargada
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
        
        // Ejecutar ajuste de footer
        if (typeof adjustFooter === 'function') {
            adjustFooter();
        }
    }, 300);
});

// Modo oscuro/claro toggle (preparado para implementación futura)
function initializeDarkModeToggle() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Crear el botón de toggle
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.innerHTML = prefersDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    toggleButton.title = prefersDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    toggleButton.className = 'theme-toggle-btn';
    
    // Añadir el botón al DOM
    document.body.appendChild(toggleButton);
    
    // Funcionalidad del toggle (preparada para implementar cambio de modo)
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        this.title = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    });
}

// Función para ajustar el footer que reemplaza el script inline
function adjustFooter() {
    const header = document.getElementById('main-header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    if (!header || !main || !footer) return;
    
    // Obtener alturas
    const headerHeight = header.offsetHeight;
    const mainHeight = main.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Verificar si el contenido es menor que la altura de la ventana
    const totalContentHeight = headerHeight + mainHeight + footerHeight;
    
    if (totalContentHeight < windowHeight) {
        // Establecer el margen inferior del contenido principal para empujar el footer hacia abajo
        const extraSpace = windowHeight - totalContentHeight;
        main.style.marginBottom = `${extraSpace}px`;
    } else {
        main.style.marginBottom = '0';
    }
}

// Ejecución al cargar
window.addEventListener('load', function() {
    adjustFooter();
    
    // Uncomment to enable dark mode toggle in the future
    // initializeDarkModeToggle();
});

window.addEventListener('resize', adjustFooter);

// También ajustar cuando cambien las imágenes (pueden afectar las alturas)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', adjustFooter);
    });
    // Aplicar inmediatamente y luego nuevamente después de un retraso
    adjustFooter();
    setTimeout(adjustFooter, 500);
});

// Validación del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Gracias por tu mensaje, ' + name + '! Te responderemos pronto.');
        document.getElementById('contact-form').reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función de correor (mantenida de la versión anterior)
function mostrarCorreo(event) {
    event.preventDefault(); // Evita que se abra el cliente de correo de inmediato
    document.getElementById("correo-mostrado").textContent = "durannaviamiguel@gmail.com";
    setTimeout(() => {
        window.location.href = "mailto:durannaviamiguel@gmail.com"; // Después de mostrarlo, abre el cliente
    }, 1000);
}