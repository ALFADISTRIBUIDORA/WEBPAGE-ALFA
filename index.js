// Funcionalidad para menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (mainMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });

    // Carrusel
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000; // 5 segundos
    let slideInterval;
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    
    function nextSlide() {
      current = (current + 1) % totalSlides;
      showSlide(current);
    }
    
    function prevSlide() {
      current = (current - 1 + totalSlides) % totalSlides;
      showSlide(current);
    }
    
    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    function resetSlideInterval() {
      clearInterval(slideInterval);
      startSlideInterval();
    }
    
    // Eventos para botones
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetSlideInterval();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetSlideInterval();
    });
    
    // Iniciar carrusel automático
    startSlideInterval();
    
    // Actualizar año en el footer
    const yearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    if (yearSpan) {
      yearSpan.textContent = currentYear;
    }
    
    // Navegación activa
    document.addEventListener('DOMContentLoaded', function() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.menu li a');
      
      function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= (sectionTop - 150) && 
              pageYOffset < (sectionTop + sectionHeight - 150)) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      }
      
      window.addEventListener('scroll', updateActiveNav);
      updateActiveNav();
      
      // Suavizar scroll y mantener activo el item
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remover activo de todos los items
          navLinks.forEach(l => l.classList.remove('active'));
          
          // Añadir activo al item clickeado
          this.classList.add('active');
          
          // Scroll suave
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });
    });
    
    // Formulario de contacto
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
    
        fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            form.reset();
            mostrarMensaje('¡Gracias por contactarte! Te responderemos pronto.', 'green');
          } else {
            mostrarMensaje('Hubo un problema al enviar el formulario. Por favor, intentá nuevamente.', 'red');
          }
        })
        .catch(() => {
          mostrarMensaje('Hubo un error al enviar el formulario. Por favor, intentá nuevamente.', 'red');
        });
      });
    
      function mostrarMensaje(msg, color) {
        const prevMsg = form.querySelector('.form-message');
        if (prevMsg) prevMsg.remove();
    
        const mensaje = document.createElement('p');
        mensaje.className = 'form-message';
        mensaje.textContent = msg;
        mensaje.style.color = color;
        mensaje.style.marginTop = '10px';
        mensaje.style.textAlign = 'center';
    
        form.appendChild(mensaje);
    
        if (color === 'green') {
          setTimeout(() => {
            mensaje.remove();
          }, 5000);
        }
      }
    }