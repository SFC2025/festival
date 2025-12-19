# FestivalGuadalupe

Sitio web estático del **Festival Folklórico de Guadalupe – “Un canto solidario”**.  
Proyecto de modernización visual y estructural de la web del festival, respetando su identidad histórica pero llevándola a un código actual, limpio y adaptable a distintos dispositivos.

---

## 🎯 Propósito del proyecto

- Presentar el festival con una **imagen clara, prolija y actual**.
- Ordenar la información en secciones: *inicio, novedades, ediciones anteriores, peñas y contacto*.
- Facilitar el mantenimiento futuro (nuevas ediciones, comunicados y noticias).
- Servir como **base reutilizable** para próximas iteraciones o migraciones a CMS.

---

## 🧩 Stack y decisiones de diseño

- **HTML5 semántico**  
  Estructuras claras para secciones principales (`header`, `main`, `section`, `article`, `footer`) y mejor base para SEO y accesibilidad.

- **CSS3 (archivo único `style.css`)**  
  - Sistema sencillo de **secciones** y **tarjetas (`card`)** reutilizables.  
  - Diseño **responsive** pensado para móviles primero.  
  - Paleta basada en tonos sobrios y legibles para el entorno de la Basílica.

- **JavaScript vanilla (`script.js`)**
  - Menú hamburguesa en dispositivos móviles.
  - Modo oscuro / claro.
  - Comportamientos suaves: scroll, apertura/cierre del menú, etc.

- **Google Fonts**
  - `Marcellus` → títulos y encabezados.
  - `Cormorant Garamond` → textos destacados / estilísticos.

---

## 📁 Estructura general

```txt
/
├─ index.html                 # Inicio del sitio: hero, fechas clave y resumen del festival
├─ novedades.html             # Listado de noticias y comunicados
├─ ver-mas-1.html             # Detalle de noticia 1
├─ ver-mas-2.html
├─ ...
├─ ver-mas-10.html            # Entrega de pañales y alimentos – 36° Edición – 2024
│
├─ penias.html                # Información de peñas y eventos relacionados
├─ ediciones-anteriores.html  # Histórico de ediciones previas
├─ quienes-somos.html         # Presentación de la comisión organizadora
├─ contacto.html              # Datos de contacto y canales de comunicación
│
├─ style.css                  # Hoja de estilos principal
├─ script.js                  # Comportamientos de navegación y modo oscuro
│
├─ imagenes/                  # Logotipos, fotos del festival, banners y material gráfico
│   ├─ Logotipo.png
│   ├─ Hero1.png
│   ├─ ...
│
└─ img/
    └─ favicon.png            # Ícono del sitio
```