🖼️ Editor de Imágenes con Álgebra Matricial
👨‍💻 Información del Estudiante

Nombre: Enrique Zavala Martinez
Grupo: 1C
Fecha: 17/11/2025
Carrera: TSU en Desarrollo e Innovación de Software


📋 Descripción del Proyecto
Implementación de un editor de imágenes en Node.js usando álgebra matricial. El proyecto convierte imágenes PNG en matrices de píxeles para aplicar transformaciones matemáticas y filtros de imagen.
🎯 Objetivos Alcanzados

✅ Cargar y convertir imágenes PNG a matrices de píxeles
✅ Aplicar operaciones básicas (brillo, colores, escala de grises)
✅ Realizar transformaciones geométricas (volteos, rotaciones)
✅ Implementar filtros avanzados (sepia, mezcla, detección de bordes)
✅ Entender operaciones matriciales aplicadas a imágenes


📊 Progreso de Ejercicios
Sección 1: Fundamentos (20 pts)

 1.1 imagenAMatriz - Cargar PNG y convertir a matriz (5 pts) ✅
 1.2 matrizAImagen - Convertir matriz a PNG (5 pts) ✅
 1.3 obtenerCanal - Extraer canal R/G/B (5 pts) ✅
 1.4 obtenerDimensionesImagen - Obtener dimensiones (5 pts) ✅

Puntos obtenidos: 20/20
Sección 2: Operaciones Básicas (25 pts)

 2.1 ajustarBrillo - Multiplicación escalar (8 pts) ✅
 2.2 invertirColores - Inversión de colores (8 pts) ✅
 2.3 convertirEscalaGrises - Promedio ponderado (9 pts) ✅

Puntos obtenidos: 25/25
Sección 3: Transformaciones Geométricas (30 pts)

 3.1 voltearHorizontal - Espejo horizontal (10 pts) ✅
 3.2 voltearVertical - Volteo vertical (10 pts) ✅
 3.3 rotar90Grados - Rotación 90° (10 pts) ✅

Puntos obtenidos: 30/30
Sección 4: Filtros Avanzados (25 pts)

 4.1 mezclarImagenes - Combinación lineal (8 pts) ✅
 4.2 aplicarSepia - Transformación matricial (9 pts) ✅
 4.3 detectarBordes - Detección simplificada (8 pts) ✅

Puntos obtenidos: 25/25

📈 Calificación Final
┌────────────────────────────────────────┐
│  REPORTE DE CALIFICACIÓN               │
├────────────────────────────────────────┤
│  Puntos obtenidos: 100/100             │
│  Porcentaje: 100%                      │
│  🎓 Calificación: A - Excelente        │
└────────────────────────────────────────┘
📁 Estructura del Proyecto

editor-imagenes-matricial/
│
├── src/
│   ├── ejercicios.js           # ⭐ Soluciones principales
│   ├── utilidades.js           # Funciones auxiliares
│   ├── matriz.js               # Operaciones matriciales
│   └── ejercicios.test.js      # Tests automatizados
│
├── imagenes/
│   └── entrada/                # Imágenes de prueba
│
├── generar-imagenes-prueba.js  # Script generador de imágenes
├── package.json
├── README.md
│
└── .github/
    └── workflows/
        └── test.yml
        
💡 Aprendizajes Clave
Lo que más me costó

Ejercicio 3.3 (Rotar 90°): Entender la fórmula resultado[j][alto - 1 - i] = original[i][j] requirió visualizar bien la transformación.
Ejercicio 4.3 (Detectar Bordes): Llenar toda la matriz incluyendo los bordes sin dejar huecos fue el reto.

Lo que más me gustó

Sección 2: Ver cómo simples operaciones matemáticas transforman imágenes completamente.

Técnicas Aplicadas

Lectura y escritura de archivos PNG con pngjs
Manipulación de buffers y datos binarios
Operaciones matriciales avanzadas
Bucles anidados para procesamiento de píxeles
Validación y manejo de errores
📝 Commits Realizados
Seccion 1 Fundamentos de conversion entre imagenes y matrices completa
Seccion 2 Operaciones basicas de algecra matricial a pixeles compelta :) 
Seccion 3 Transformaciones geometricas donde aplico opereciones matrices completo 
Seccion 4 Filtros avanzados completa jeje :)
📧 Contacto

GitHub: @kiki-bot-sudp

<div align="center">
⭐ Proyecto completado con éxito ⭐
Hecho con 💙 por Enrique Zavala Martinez - 2025
</div>
