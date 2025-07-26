// ===== VARIABLES GLOBALES =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchClose = document.getElementById('search-close');
const currentYearElement = document.getElementById('current-year');

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====
function initializeApp() {
    setupMobileNavigation();
    setupSearchFunctionality();
    setupSmoothScrolling();
    setupAnimations();
    setupCurrentYear();
    setupTipCards();
    setupLazyLoading();
    
    // Inicializar lightbox si existe
    if (typeof initializeLightbox === 'function') {
        initializeLightbox();
    }

    // Inicializar formulario de contacto si existe
    if (typeof initializeContactForm === 'function') {
        initializeContactForm();
    }
}

// ===== NAVEGACIÓN MÓVIL =====
function setupMobileNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

// ===== FUNCIONALIDAD DE BÚSQUEDA =====
function setupSearchFunctionality() {
    if (searchBtn && searchBar && searchClose) {
        searchBtn.addEventListener('click', toggleSearchBar);
        searchClose.addEventListener('click', closeSearchBar);
        
        // Cerrar búsqueda con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchBar.classList.contains('active')) {
                closeSearchBar();
            }
        });
        
        // Búsqueda en tiempo real
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
        }
        
        // Botón de búsqueda
        const searchSubmit = document.querySelector('.search-submit');
        if (searchSubmit) {
            searchSubmit.addEventListener('click', function() {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    performSearch(searchInput.value);
                }
            });
        }
    }
}

function toggleSearchBar() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 300);
        }
    }
}

function closeSearchBar() {
    searchBar.classList.remove('active');
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    if (query.length > 2) {
        // Aquí se podría implementar búsqueda en tiempo real
        console.log('Buscando:', query);
    }
}

function performSearch(query) {
    if (query.trim()) {
        // Redirigir a página de resultados o filtrar contenido
        window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
    }
}

// ===== DESPLAZAMIENTO SUAVE =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (validateContactForm()) {
            submitContactForm();
        }
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.parentNode.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validar formulario de contacto
function validateContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validar campo individual
function validateField(field) {
    const formGroup = field.parentNode;
    const value = field.value.trim();
    let isValid = true;

    // Remover clase de error previa
    formGroup.classList.remove('error');

    // Validar campo requerido
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }

    // Validar email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }

    // Aplicar clase de error si es necesario
    if (!isValid) {
        formGroup.classList.add('error');
    }

    return isValid;
}

// Enviar formulario de contacto
function submitContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.innerHTML;

    // Mostrar estado de carga
    form.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    // Simular envío del formulario
    setTimeout(() => {
        // Remover estado de carga
        form.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Mostrar mensaje de éxito
        showFormMessage('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
        
        // Limpiar formulario
        form.reset();
        
        // Remover clases de error
        const errorGroups = form.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => group.classList.remove('error'));
        
    }, 2000);
}

// Mostrar mensaje del formulario
function showFormMessage(message, type) {
    const form = document.getElementById('contact-form');
    const existingMessage = form.querySelector('.form-success, .form-error');
    
    // Remover mensaje existente
    if (existingMessage) {
        existingMessage.remove();
    }

    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-${type}`;
    messageDiv.textContent = message;
    
    // Insertar mensaje al inicio del formulario
    form.insertBefore(messageDiv, form.firstChild);

    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// ===== ANIMACIONES =====
function setupAnimations() {
    // Intersection Observer para animaciones al entrar en vista
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.tip-card, .social-card, .section-title');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Efecto parallax suave en el hero
    window.addEventListener('scroll', handleParallax);
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-img');
    
    if (hero && heroImg && scrolled < hero.offsetHeight) {
        const rate = scrolled * -0.5;
        heroImg.style.transform = `translateY(${rate}px)`;
    }
}

// ===== AÑO ACTUAL =====
function setupCurrentYear() {
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// ===== TARJETAS DE TIPS =====
function setupTipCards() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Aquí se implementaría la navegación a la página de detalle
            const tipTitle = this.querySelector('.tip-title').textContent;
            console.log('Navegando a tip:', tipTitle);
            
            // Por ahora, solo un efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // En una implementación real, redirigir a:
            // window.location.href = `tip-detalle.html?id=${tipId}`;
        });
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== CARGA PEREZOSA DE IMÁGENES =====
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== UTILIDADES =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
// Throttle del scroll para mejor rendimiento
const throttledParallax = throttle(handleParallax, 16);
window.removeEventListener('scroll', handleParallax);
window.addEventListener('scroll', throttledParallax);

// ===== FUNCIONES ESPECÍFICAS PARA OTRAS PÁGINAS =====

// Función para la página de tips
function initializeTipsPage() {
    setupFilters();
    setupPagination();
    setupTipModal();
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tipItems = document.querySelectorAll('.tip-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar elementos
            tipItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
}

function setupPagination() {
    // Implementación de paginación para tips
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            loadPage(page);
        });
    });
}

function loadPage(page) {
    // Simular carga de página
    console.log('Cargando página:', page);
    
    // Aquí se implementaría la lógica de carga real
    // fetch(`/api/tips?page=${page}`)
    //     .then(response => response.json())
    //     .then(data => updateTipsGrid(data));
}

function setupTipModal() {
    const modal = document.getElementById('tip-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.modal-close');
    
    if (modal && closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Cerrar modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}

// Función para abrir modal de tip
function openTipModal(tipData) {
    const modal = document.getElementById('tip-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalVideo = document.querySelector('.modal-video');
    const modalDescription = document.querySelector('.modal-description');
    
    if (modal && modalTitle && modalDescription) {
        modalTitle.textContent = tipData.title;
        modalDescription.textContent = tipData.description;
        
        if (modalVideo && tipData.videoUrl) {
            modalVideo.src = tipData.videoUrl;
        }
        
        modal.classList.add('active');
    }
}

// ===== FUNCIONES PARA GALERÍA =====
function initializeGallery() {
    setupLightbox();
    setupImageGrid();
}

function setupLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(img.src, img.alt);
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        }
    });
    
    function openLightbox(src, alt) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightbox.classList.add('active');
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }
    
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        
        const currentImg = galleryImages[currentImageIndex];
        openLightbox(currentImg.src, currentImg.alt);
    }
}

function setupImageGrid() {
    // Implementar Masonry layout si es necesario
    const grid = document.querySelector('.gallery-grid');
    if (grid && window.Masonry) {
        new Masonry(grid, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-sizer',
            percentPosition: true
        });
    }
}

// ===== FUNCIONES PARA FORMULARIO DE CONTACTO =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        setupFormValidation();
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validar datos
    if (validateContactForm(data)) {
        // Simular envío
        showFormMessage('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
        e.target.reset();
    }
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Por favor, ingresa un email válido');
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('El asunto debe tener al menos 3 caracteres');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    if (form) {
        // Remover mensaje anterior si existe
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        form.insertBefore(messageDiv, form.firstChild);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let error = '';
    
    switch(field.name) {
        case 'name':
            if (value.length < 2) error = 'Mínimo 2 caracteres';
            break;
        case 'email':
            if (!isValidEmail(value)) error = 'Email inválido';
            break;
        case 'subject':
            if (value.length < 3) error = 'Mínimo 3 caracteres';
            break;
        case 'message':
            if (value.length < 10) error = 'Mínimo 10 caracteres';
            break;
    }
    
    showFieldError(field, error);
}

function showFieldError(field, error) {
    clearFieldError(field);
    
    if (error) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = error;
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.CarpaLovers = {
    initializeTipsPage,
    initializeGallery,
    initializeContactForm,
    openTipModal
};
