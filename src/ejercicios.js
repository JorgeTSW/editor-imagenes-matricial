// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ============================================
// Nombre del estudiante: David Morles Guerrero
// Fecha: 17/11/2025
// Grupo: 1-A

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Importar funciones auxiliares (puedes usarlas)
const {
  crearMatrizVacia,
  validarMatriz,
  obtenerDimensiones,
  limitarValorColor,
  crearPixel,
  copiarMatriz,
  asegurarDirectorio
} = require('./utilidades');

// Importar operaciones matriciales (puedes usarlas)
const {
  sumarMatrices,
  restarMatrices,
  multiplicarPorEscalar,
  multiplicarMatrices,
  transponerMatriz
} = require('./matriz');

// ============================================
// SECCIÓN 1: FUNDAMENTOS (20 puntos)
// Conversión entre imágenes y matrices
// ============================================

/**
 * Ejercicio 1.1: Cargar imagen PNG y convertir a matriz de píxeles (5 puntos)
 * 
 * Una imagen es una matriz donde cada elemento es un pixel con valores RGBA.
 * Debes leer el archivo PNG y crear una matriz donde:
 * - Cada fila representa una fila de píxeles de la imagen
 * - Cada elemento es un objeto: {r: 0-255, g: 0-255, b: 0-255, a: 0-255}
 * 
 * @param {string} rutaImagen - Ruta del archivo PNG
 * @returns {Array<Array<Object>>} - Matriz de píxeles
 * 
 * Pistas:
 * - Usa PNG.sync.read() para leer la imagen
 * - png.width y png.height te dan las dimensiones
 * - png.data es un Buffer con formato [R,G,B,A, R,G,B,A, ...]
 * - El índice en el buffer para el pixel (x,y) es: idx = (width * y + x) * 4
 * 
 * @example
 * const matriz = imagenAMatriz('imagenes/entrada/test_pequeña.png');
 * // matriz[0][0] = {r: 0, g: 0, b: 128, a: 255}
 */
function imagenAMatriz(rutaImagen) {
  // 1. Leer el archivo PNG desde la ruta
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);

  // 2. Crear la matriz vacía
  const matriz = [];

  // 3. Recorrer cada fila
  for (let y = 0; y < png.height; y++) {
    const fila = [];

    // 4. Recorrer cada columna
    for (let x = 0; x < png.width; x++) {
      // 5. Calcular índice en el buffer
      const idx = (png.width * y + x) * 4;

      // 6. Crear pixel en formato objeto
      const pixel = {
        r: png.data[idx],
        g: png.data[idx + 1],
        b: png.data[idx + 2],
        a: png.data[idx + 3]
      };

      fila.push(pixel);
    }

    matriz.push(fila);
  }

  // 7. Retornar matriz final
  return matriz;
}


function matrizAImagen(matriz, rutaSalida) {
  // 1. Validar matriz de píxeles
  validarMatriz(matriz);

  // 2. Obtener dimensiones
  const dims = obtenerDimensiones(matriz);
  const { filas, columnas } = dims;

  // 3. Crear nueva imagen PNG
  const png = new PNG({
    width: columnas,
    height: filas
  });

  // 4. Llenar png.data con los valores RGBA de cada pixel
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const idx = (columnas * y + x) << 2; // index * 4
      const pixel = matriz[y][x];

      png.data[idx]     = limitarValorColor(pixel.r);
      png.data[idx + 1] = limitarValorColor(pixel.g);
      png.data[idx + 2] = limitarValorColor(pixel.b);
      png.data[idx + 3] = limitarValorColor(pixel.a);
    }
  }

  // 5. Asegurar que exista el directorio de salida
  const dir = path.dirname(rutaSalida);
  asegurarDirectorio(dir);

  // 6. Guardar el archivo PNG
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(rutaSalida, buffer);
}

function obtenerCanal(matriz, canal) {
  // 1. Validar canal
  if (!['r', 'g', 'b'].includes(canal)) {
    throw new Error("El canal debe ser 'r', 'g' o 'b'");
  }

  // 2. Crear copia de la matriz original
  const resultado = copiarMatriz(matriz);

  // 3. Convertir cada pixel usando solo ese canal
  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const valor = matriz[i][j][canal];

      resultado[i][j] = {
        r: valor,
        g: valor,
        b: valor,
        a: matriz[i][j].a
      };
    }
  }

  return resultado;
}


function obtenerDimensionesImagen(rutaImagen) {
  // Leer el archivo PNG
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);

  // Obtener dimensiones
  const ancho = png.width;
  const alto = png.height;

  return {
    ancho,
    alto,
    totalPixeles: ancho * alto
  };
}


// ============================================
// SECCIÓN 2: OPERACIONES BÁSICAS (25 puntos)
// Aplicar álgebra matricial a píxeles
// ============================================

/**
 * Ejercicio 2.1: Ajustar brillo (8 puntos)
 * 
 * El brillo se ajusta multiplicando cada canal RGB por un factor.
 * Esto es una MULTIPLICACIÓN ESCALAR aplicada a cada canal.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {number} factor - Factor de brillo (0.5 = más oscuro, 2.0 = más claro)
 * @returns {Array<Array<Object>>} - Matriz con brillo ajustado
 * 
 * Concepto matemático:
 * Si factor = 1.5, entonces:
 * R_nuevo = R_original * 1.5
 * G_nuevo = G_original * 1.5
 * B_nuevo = B_original * 1.5
 * 
 * @example
 * const brillante = ajustarBrillo(matriz, 1.5); // 50% más claro
 * const oscuro = ajustarBrillo(matriz, 0.5);    // 50% más oscuro
 */
function ajustarBrillo(matriz, factor) {
  // Crear una copia profunda de la matriz original
  const resultado = copiarMatriz(matriz);

  // Recorrer cada pixel
  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const pixelOriginal = matriz[i][j];

      resultado[i][j] = {
        r: limitarValorColor(pixelOriginal.r * factor),
        g: limitarValorColor(pixelOriginal.g * factor),
        b: limitarValorColor(pixelOriginal.b * factor),
        a: pixelOriginal.a // Alpha NO se modifica
      };
    }
  }

  return resultado;
}


/**
 * Ejercicio 2.2: Invertir colores (8 puntos)
 * 
 * Invierte los colores usando la operación: nuevo = 255 - original
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz con colores invertidos
 * 
 * Concepto matemático:
 * R_nuevo = 255 - R_original
 * G_nuevo = 255 - G_original
 * B_nuevo = 255 - B_original
 * 
 * @example
 * const negativo = invertirColores(matriz);
 * // Blanco (255,255,255) → Negro (0,0,0)
 * // Rojo (255,0,0) → Cian (0,255,255)
 */
function invertirColores(matriz) {
  // Crear copia profunda para no modificar la matriz original
  const resultado = copiarMatriz(matriz);

  // Recorrer cada pixel
  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const p = matriz[i][j];

      resultado[i][j] = {
        r: 255 - p.r,
        g: 255 - p.g,
        b: 255 - p.b,
        a: p.a  // Alpha no cambia
      };
    }
  }

  return resultado;
}


/**
 * Ejercicio 2.3: Convertir a escala de grises (9 puntos)
 * 
 * Convierte la imagen a escala de grises usando el promedio ponderado:
 * Gris = 0.299*R + 0.587*G + 0.114*B
 * 
 * Estos pesos reflejan la sensibilidad del ojo humano a cada color.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz en escala de grises
 * 
 * @example
 * const grises = convertirEscalaGrises(matriz);
 */
function convertirEscalaGrises(matriz) {
  // Crear una copia profunda de la matriz original
  const resultado = copiarMatriz(matriz);

  // Recorrer cada pixel
  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const pixel = matriz[i][j];

      // Calcular gris usando promedio ponderado
      const gris = Math.round(
        0.299 * pixel.r +
        0.587 * pixel.g +
        0.114 * pixel.b
      );

      // Asignar gris a todos los canales excepto alpha
      resultado[i][j] = {
        r: limitarValorColor(gris),
        g: limitarValorColor(gris),
        b: limitarValorColor(gris),
        a: pixel.a
      };
    }
  }

  return resultado;
}


// ============================================
// SECCIÓN 3: TRANSFORMACIONES GEOMÉTRICAS (30 puntos)
// Aplicar operaciones matriciales para transformar
// ============================================

/**
 * Ejercicio 3.1: Voltear horizontal (espejo) (10 puntos)
 * 
 * Voltea la imagen horizontalmente (efecto espejo).
 * Cada fila se invierte: [1,2,3] → [3,2,1]
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz volteada horizontalmente
 * 
 * Concepto matemático:
 * pixel[i][j] → pixel[i][ancho - 1 - j]
 * 
 * @example
 * const espejo = voltearHorizontal(matriz);
 */
function voltearHorizontal(matriz) {
  // Crear copia profunda para no modificar la original
  const resultado = copiarMatriz(matriz);

  // Invertir cada fila (efecto espejo)
  for (let i = 0; i < resultado.length; i++) {
    resultado[i].reverse(); 
  }

  return resultado;
}


/**
 * Ejercicio 3.2: Voltear vertical (10 puntos)
 * 
 * Voltea la imagen verticalmente (de arriba hacia abajo).
 * El orden de las filas se invierte.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz volteada verticalmente
 * 
 * Concepto matemático:
 * pixel[i][j] → pixel[alto - 1 - i][j]
 * 
 * @example
 * const invertido = voltearVertical(matriz);
 */
function voltearVertical(matriz) {
  // Crear copia profunda
  const resultado = copiarMatriz(matriz);

  // Invertir el orden de las filas (arriba ↔ abajo)
  resultado.reverse();

  return resultado;
}


/**
 * Ejercicio 3.3: Rotar 90 grados en sentido horario (10 puntos)
 * 
 * Rota la imagen 90° en sentido horario.
 * Esto se logra con: TRANSPONER + VOLTEAR HORIZONTAL
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz rotada 90°
 * 
 * Concepto matemático:
 * 1. Transponer: pixel[i][j] → pixel[j][i]
 * 2. Voltear horizontal: invertir cada fila
 * 
 * Puedes usar transponerMatriz() de matriz.js (¡pero cuidado! trabaja con números, 
 * no con objetos pixel)
 * 
 * @example
 * const rotada = rotar90Grados(matriz);
 */
function rotar90Grados(matriz) {
  const alto = matriz.length;
  const ancho = matriz[0].length;

  // Nueva matriz rotada: dimensiones intercambiadas
  const rotada = [];

  for (let j = 0; j < ancho; j++) {
    const nuevaFila = [];
    for (let i = alto - 1; i >= 0; i--) {
      nuevaFila.push(matriz[i][j]);
    }
    rotada.push(nuevaFila);
  }

  return rotada;
}


// ============================================
// SECCIÓN 4: FILTROS AVANZADOS (25 puntos)
// Operaciones más complejas
// ============================================

/**
 * Ejercicio 4.1: Mezclar dos imágenes (8 puntos)
 * 
 * Mezcla dos imágenes usando un factor de mezcla.
 * resultado = imagen1 * (1 - factor) + imagen2 * factor
 * 
 * Esto es una COMBINACIÓN LINEAL de matrices.
 * 
 * @param {Array<Array<Object>>} matriz1 - Primera imagen
 * @param {Array<Array<Object>>} matriz2 - Segunda imagen
 * @param {number} factor - Factor de mezcla (0.0 a 1.0)
 *                          0.0 = solo imagen1
 *                          0.5 = 50% de cada una
 *                          1.0 = solo imagen2
 * @returns {Array<Array<Object>>} - Imagen mezclada
 * 
 * @example
 * const mezcla = mezclarImagenes(imagen1, imagen2, 0.5); // 50/50
 */
function mezclarImagenes(matriz1, matriz2, factor) {
  // Validar factor
  if (factor < 0 || factor > 1) {
    throw new Error("El factor debe estar entre 0.0 y 1.0");
  }

  // Verificar dimensiones iguales
  const dims1 = obtenerDimensiones(matriz1);
  const dims2 = obtenerDimensiones(matriz2);

  if (dims1.filas !== dims2.filas || dims1.columnas !== dims2.columnas) {
    throw new Error("Las imágenes deben tener el mismo tamaño");
  }

  // Crear matriz mezclada
  const resultado = crearMatrizVacia(dims1.filas, dims1.columnas);

  for (let i = 0; i < dims1.filas; i++) {
    for (let j = 0; j < dims1.columnas; j++) {
      const p1 = matriz1[i][j];
      const p2 = matriz2[i][j];

      resultado[i][j] = {
        r: limitarValorColor(p1.r * (1 - factor) + p2.r * factor),
        g: limitarValorColor(p1.g * (1 - factor) + p2.g * factor),
        b: limitarValorColor(p1.b * (1 - factor) + p2.b * factor),
        a: limitarValorColor(p1.a * (1 - factor) + p2.a * factor)
      };
    }
  }

  return resultado;
}


/**
 * Ejercicio 4.2: Filtro Sepia (9 puntos)
 * 
 * Aplica el efecto sepia (tono vintage/antiguo).
 * Usa la siguiente transformación matricial:
 * 
 * R_nuevo = 0.393*R + 0.769*G + 0.189*B
 * G_nuevo = 0.349*R + 0.686*G + 0.168*B
 * B_nuevo = 0.272*R + 0.534*G + 0.131*B
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Imagen con efecto sepia
 * 
 * @example
 * const vintage = aplicarSepia(matriz);
 */
function aplicarSepia(matriz) {
  const filas = matriz.length;
  const columnas = matriz[0].length;

  const resultado = crearMatrizVacia(filas, columnas);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const pixel = matriz[i][j];

      // Calcular valores sepia
      const r = pixel.r;
      const g = pixel.g;
      const b = pixel.b;

      const nuevoR = limitarValorColor(0.393 * r + 0.769 * g + 0.189 * b);
      const nuevoG = limitarValorColor(0.349 * r + 0.686 * g + 0.168 * b);
      const nuevoB = limitarValorColor(0.272 * r + 0.534 * g + 0.131 * b);

      resultado[i][j] = {
        r: nuevoR,
        g: nuevoG,
        b: nuevoB,
        a: pixel.a
      };
    }
  }

  return resultado;
}


/**
 * Ejercicio 4.3: Detectar bordes (simplificado) (8 puntos)
 * 
 * Detecta bordes comparando cada pixel con sus vecinos.
 * Si la diferencia es grande, hay un borde.
 * 
 * Este es un operador Sobel simplificado.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {number} umbral - Umbral de detección (0-255), default: 50
 * @returns {Array<Array<Object>>} - Imagen de bordes (blanco y negro)
 * 
 * Algoritmo simplificado:
 * 1. Convertir a escala de grises
 * 2. Para cada pixel, calcular diferencia con vecinos
 * 3. Si diferencia > umbral, es borde (blanco), sino negro
 * 
 * @example
 * const bordes = detectarBordes(matriz, 50);
 */
function detectarBordes(matriz, umbral = 50) {
  // 1. Convertir la imagen a escala de grises
  const grises = convertirEscalaGrises(matriz);

  const filas = grises.length;
  const columnas = grises[0].length;

  // 2. Crear matriz resultado
  const resultado = crearMatrizVacia(filas, columnas);

  // 3. Recorrer cada pixel excepto la última fila y última columna
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let borde = 0; // negro por defecto

      if (i < filas - 1 && j < columnas - 1) {
        const pixel = grises[i][j].r;
        const derecha = grises[i][j + 1].r;
        const abajo = grises[i + 1][j].r;

        const dif1 = Math.abs(pixel - derecha);
        const dif2 = Math.abs(pixel - abajo);

        if (dif1 > umbral || dif2 > umbral) {
          borde = 255; // blanco → borde detectado
        }
      }

      // 4. Guardar pixel resultante (blanco o negro)
      resultado[i][j] = {
        r: borde,
        g: borde,
        b: borde,
        a: matriz[i][j].a  // conservar alpha
      };
    }
  }

  return resultado;
}


// ============================================
// NO MODIFICAR - Exportación de funciones
// ============================================
module.exports = {
  // Sección 1: Fundamentos
  imagenAMatriz,
  matrizAImagen,
  obtenerCanal,
  obtenerDimensionesImagen,
  
  // Sección 2: Operaciones Básicas
  ajustarBrillo,
  invertirColores,
  convertirEscalaGrises,
  
  // Sección 3: Transformaciones
  voltearHorizontal,
  voltearVertical,
  rotar90Grados,
  
  // Sección 4: Filtros Avanzados
  mezclarImagenes,
  aplicarSepia,
  detectarBordes
};
