# CarpaLovers - Sitio Web Completo

## Descripción del Proyecto

CarpaLovers es un sitio web completo dedicado al camping y aventuras al aire libre. El proyecto incluye múltiples páginas con diseño responsive, funcionalidades interactivas y una experiencia de usuario moderna y atractiva.

## Estructura del Proyecto

```
Carpalovers/
├── index.html              # Página de inicio
├── tips.html               # Página de tips de acampe
├── tip-detalle.html         # Página de detalle de tip individual
├── galeria.html            # Galería de fotos
├── blog.html               # Blog principal
├── tienda.html             # Tienda (enlaces afiliados)
├── sobre-nosotros.html     # Sobre nosotros
├── contacto.html           # Formulario de contacto
├── busqueda.html           # Página de resultados de búsqueda
├── css/
│   ├── styles.css          # Estilos principales
│   ├── tips.css            # Estilos específicos para tips
│   ├── tip-detalle.css     # Estilos para detalle de tip
│   ├── galeria.css         # Estilos para galería
│   ├── blog.css            # Estilos para blog
│   ├── tienda.css          # Estilos para tienda
│   ├── sobre-nosotros.css  # Estilos para sobre nosotros
│   └── contacto.css        # Estilos para contacto
├── js/
│   └── main.js             # JavaScript principal
├── images/
│   ├── logo-carpalovers.png
│   ├── hero-camping.jpg
│   ├── tips/               # Imágenes para tips
│   ├── gallery/            # Imágenes para galería
│   ├── blog/               # Imágenes para blog
│   └── products/           # Imágenes para productos
└── README.md
```

## Características Implementadas

### ✅ Completadas

1. **Página de Inicio (index.html)**
   - Hero section con video/imagen de fondo
   - Sección de tips recientes
   - Sección de comunidad con redes sociales
   - Preview de "Sobre Nosotros"
   - Header y footer responsivos

2. **Página de Tips (tips.html)**
   - Sistema de filtros por categorías
   - Cuadrícula responsiva de tips
   - Modal para visualización de videos
   - Opciones de ordenamiento
   - Paginación y carga progresiva

3. **Página de Detalle de Tip (tip-detalle.html)**
   - Contenido completo del tip
   - Video integrado (YouTube/Vimeo)
   - Guía paso a paso
   - Botones de compartir en redes sociales
   - Tips relacionados
   - Sidebar con información adicional

4. **Página de Galería (galeria.html)**
   - Cuadrícula masonry responsiva
   - Lightbox para visualización completa
   - Filtros por categorías
   - Navegación entre imágenes
   - Información de ubicación

5. **CSS Responsivo**
   - Variables CSS para consistencia
   - Mobile-first approach
   - Breakpoints para tablet y móvil
   - Animaciones y transiciones suaves

6. **JavaScript Funcional**
   - Navegación móvil responsive
   - Sistema de búsqueda
   - Filtros dinámicos
   - Lightbox interactivo
   - Formularios validados

### 🚧 Por Completar

Las siguientes páginas necesitan ser creadas siguiendo los mismos patrones:

1. **Blog (blog.html + blog.css)**
2. **Tienda (tienda.html + tienda.css)**
3. **Sobre Nosotros (sobre-nosotros.html + sobre-nosotros.css)**
4. **Contacto (contacto.html + contacto.css)**
5. **Búsqueda (busqueda.html)**

## Paleta de Colores

- **Verde Bosque Oscuro**: `#2d5016` (Primario)
- **Verde Medio**: `#4a7c59` (Primario Claro)
- **Marrón Tierra**: `#8b4513` (Secundario)
- **Naranja Fogata**: `#ff6b35` (Acento)
- **Amarillo Sol**: `#ffd23f` (Acento Amarillo)
- **Azul Cielo**: `#4a90b8` (Azul)

## Tipografía

- **Títulos**: Merriweather (serif)
- **Cuerpo**: Montserrat (sans-serif)

## Funcionalidades JavaScript

### Navegación
- Menú hamburguesa responsivo
- Búsqueda desplegable
- Smooth scrolling
- Active states

### Interacciones
- Filtros dinámicos
- Lightbox para galería
- Modales para tips
- Animaciones al scroll
- Validación de formularios

### Optimizaciones
- Lazy loading de imágenes
- Debounce/throttle para performance
- Intersection Observer para animaciones

## Instalación y Uso

1. **Clonar/Descargar** el proyecto
2. **Abrir** `index.html` en un navegador web
3. **Configurar** un servidor local para desarrollo:
   ```bash
   # Usando Live Server (VS Code)
   # O usando Python
   python -m http.server 8000
   
   # O usando Node.js
   npx serve .
   ```

## Imágenes Requeridas

### Crear las siguientes carpetas y agregar imágenes:

```
images/
├── logo-carpalovers.png          # Logo principal
├── hero-camping.jpg              # Hero background
├── about-team.jpg                # Foto del equipo
├── author-carpalovers.jpg        # Avatar del autor
├── tips/                         # Miniaturas de tips
│   ├── armado-carpa.jpg
│   ├── fogata-segura.jpg
│   ├── mochila-equipaje.jpg
│   ├── cocina-campamento.jpg
│   ├── nudos-camping.jpg
│   ├── primeros-auxilios.jpg
│   ├── camping-ninos.jpg
│   ├── trekking-montaña.jpg
│   ├── elegir-carpa.jpg
│   ├── cuidado-carpa.jpg
│   ├── campamento-lluvia.jpg
│   └── setup-campamento.jpg
├── gallery/                      # Fotos para galería
│   ├── camping-montaña-1.jpg
│   ├── camping-playa-1.jpg
│   ├── trekking-bosque-1.jpg
│   ├── atardecer-montaña-1.jpg
│   ├── campamento-nocturno-1.jpg
│   ├── atardecer-playa-1.jpg
│   ├── escalada-1.jpg
│   ├── camping-bosque-1.jpg
│   ├── kayak-lago-1.jpg
│   ├── fogata-noche-1.jpg
│   ├── surf-amanecer-1.jpg
│   └── puente-colgante-1.jpg
└── products/                     # Productos para tienda
    ├── carpa-1.jpg
    ├── mochila-1.jpg
    ├── saco-dormir-1.jpg
    └── etc...
```

## Personalización

### Colores
Modificar las variables CSS en `css/styles.css`:
```css
:root {
  --color-primary: #2d5016;
  --color-accent: #ff6b35;
  /* ... más variables */
}
```

### Contenido
- Actualizar textos en archivos HTML
- Cambiar enlaces de redes sociales
- Agregar/quitar categorías de filtros
- Modificar información de contacto

### Funcionalidades
- Integrar con CMS (WordPress, Contentful, etc.)
- Agregar backend para formularios
- Implementar sistema de comentarios
- Conectar con Analytics

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript (Vanilla)** - Interactividad
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografía

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas versiones)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluciones**: 320px - 1920px+

## SEO y Accesibilidad

- Meta tags optimizados
- Alt texts en imágenes
- Estructura de headings apropiada
- ARIA labels donde necesario
- Contraste de colores accesible
- Navegación por teclado

## Próximos Pasos

1. Completar páginas faltantes
2. Optimizar imágenes
3. Configurar servidor de producción
4. Implementar sistema de backend
5. Agregar más funcionalidades interactivas
6. Testing cross-browser
7. Optimización de performance
8. Setup de CI/CD

## Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature
3. Commits descriptivos
4. Pull request con descripción

## Licencia

Este proyecto es de uso libre para fines educativos y personales.

---

**CarpaLovers** - Tu guía para la aventura al aire libre 🏕️🌲
