// Animación de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efecto de aparición en las secciones
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
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



function mostrarCorreo(event) {
    event.preventDefault(); // Evita que se abra el cliente de correo de inmediato
    document.getElementById("correo-mostrado").textContent = "durannaviamiguel@gmail.com";
    setTimeout(() => {
        window.location.href = "mailto:durannaviamiguel@gmail.com"; // Después de mostrarlo, abre el cliente
    }, 1000);
}