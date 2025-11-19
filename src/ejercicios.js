// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ============================================
// Nombre del estudiante: Gael Magaña Chan
// Fecha: 18/11/2025
// Grupo: 1A

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Importar funciones auxiliares
const {
  crearMatrizVacia,
  validarMatriz,
  obtenerDimensiones,
  limitarValorColor,
  crearPixel,
  copiarMatriz,
  asegurarDirectorio
} = require('./utilidades');

// Importar operaciones matriciales
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

function imagenAMatriz(rutaImagen) {
  if (typeof rutaImagen !== 'string' || rutaImagen.trim() === '') {
    throw new TypeError('imagenAMatriz: "rutaImagen" debe ser una cadena no vacía');
  }

  if (!fs.existsSync(rutaImagen)) {
    throw new Error(`imagenAMatriz: archivo no encontrado en ruta "${rutaImagen}"`);
  }

  let buffer;
  try {
    buffer = fs.readFileSync(rutaImagen);
  } catch (err) {
    throw new Error(`imagenAMatriz: error al leer el archivo "${rutaImagen}": ${err.message}`);
  }

  let png;
  try {
    png = PNG.sync.read(buffer);
  } catch (err) {
    throw new Error(`imagenAMatriz: error al parsear PNG: ${err.message}`);
  }

  if (!png || typeof png.width !== 'number' || typeof png.height !== 'number' || !png.data) {
    throw new Error('imagenAMatriz: formato PNG inválido o png.data ausente');
  }

  const { width, height, data } = png;

  if (data.length !== width * height * 4) {
    throw new Error(
      `imagenAMatriz: tamaño de buffer inesperado. Esperado ${width * height * 4}, recibido ${data.length}`
    );
  }

  const matriz = new Array(height);
  for (let y = 0; y < height; y++) {
    const fila = new Array(width);
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (
        typeof r !== 'number' ||
        typeof g !== 'number' ||
        typeof b !== 'number' ||
        typeof a !== 'number'
      ) {
        throw new Error(`imagenAMatriz: valor de pixel inválido en (x=${x}, y=${y})`);
      }

      fila[x] = { r, g, b, a };
    }
    matriz[y] = fila;
  }

  return matriz;
}

function matrizAImagen(matriz, rutaSalida) {
  validarMatriz(matriz);
  const dims = obtenerDimensiones(matriz);

  const png = new PNG({
    width: dims.columnas,
    height: dims.filas
  });

  for (let y = 0; y < dims.filas; y++) {
    for (let x = 0; x < dims.columnas; x++) {
      const idx = (dims.columnas * y + x) << 2;
      const pixel = matriz[y][x];

      png.data[idx] = limitarValorColor(pixel.r);
      png.data[idx + 1] = limitarValorColor(pixel.g);
      png.data[idx + 2] = limitarValorColor(pixel.b);
      png.data[idx + 3] = limitarValorColor(pixel.a);
    }
  }

  asegurarDirectorio(path.dirname(rutaSalida));
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(rutaSalida, buffer);
}

function obtenerCanal(matriz, canal) {
  if (!['r', 'g', 'b'].includes(canal)) {
    throw new Error("El canal debe ser 'r', 'g', o 'b'");
  }

  const resultado = copiarMatriz(matriz);

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
  if (typeof rutaImagen !== 'string' || rutaImagen.trim() === '') {
    throw new TypeError('obtenerDimensionesImagen: "rutaImagen" debe ser una cadena no vacía');
  }

  if (!fs.existsSync(rutaImagen)) {
    throw new Error(`obtenerDimensionesImagen: archivo no encontrado en ruta "${rutaImagen}"`);
  }

  let buffer;
  try {
    buffer = fs.readFileSync(rutaImagen);
  } catch (err) {
    throw new Error(`obtenerDimensionesImagen: error al leer el archivo "${rutaImagen}": ${err.message}`);
  }

  let png;
  try {
    png = PNG.sync.read(buffer);
  } catch (err) {
    throw new Error(`obtenerDimensionesImagen: error al parsear PNG: ${err.message}`);
  }

  if (!png || typeof png.width !== 'number' || typeof png.height !== 'number') {
    throw new Error('obtenerDimensionesImagen: formato PNG inválido');
  }

  const ancho = png.width;
  const alto = png.height;
  const totalPixeles = ancho * alto;

  return { ancho, alto, totalPixeles };
}

// ============================================
// SECCIÓN 2: OPERACIONES BÁSICAS
// ============================================

function ajustarBrillo(matriz, factor) {
  const resultado = copiarMatriz(matriz);

  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      resultado[i][j].r = limitarValorColor(matriz[i][j].r * factor);
      resultado[i][j].g = limitarValorColor(matriz[i][j].g * factor);
      resultado[i][j].b = limitarValorColor(matriz[i][j].b * factor);
    }
  }

  return resultado;
}

function invertirColores(matriz) {
  const resultado = copiarMatriz(matriz);

  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      resultado[i][j].r = 255 - matriz[i][j].r;
      resultado[i][j].g = 255 - matriz[i][j].g;
      resultado[i][j].b = 255 - matriz[i][j].b;
    }
  }

  return resultado;
}

function convertirEscalaGrises(matriz) {
  const resultado = copiarMatriz(matriz);

  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const pixel = matriz[i][j];
      const gris = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
      const grisLimitado = limitarValorColor(gris);

      resultado[i][j] = {
        r: grisLimitado,
        g: grisLimitado,
        b: grisLimitado,
        a: pixel.a
      };
    }
  }

  return resultado;
}

// ============================================
// SECCIÓN 3: TRANSFORMACIONES
// ============================================

function voltearHorizontal(matriz) {
  return matriz.map(fila => [...fila].reverse());
}

function voltearVertical(matriz) {
  return [...matriz].reverse();
}

function rotar90Grados(matriz) {
  const filas = matriz.length;
  const columnas = matriz[0].length;
  const resultado = crearMatrizVacia(columnas, filas);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      resultado[j][filas - 1 - i] = matriz[i][j];
    }
  }

  return resultado;
}

// ============================================
// SECCIÓN 4: FILTROS AVANZADOS
// ============================================

function mezclarImagenes(matriz1, matriz2, factor) {
  const dims1 = obtenerDimensiones(matriz1);
  const dims2 = obtenerDimensiones(matriz2);
  if (dims1.filas !== dims2.filas || dims1.columnas !== dims2.columnas) {
    throw new Error('Las imágenes deben tener el mismo tamaño');
  }

  const resultado = crearMatrizVacia(dims1.filas, dims1.columnas);

  for (let i = 0; i < dims1.filas; i++) {
    for (let j = 0; j < dims1.columnas; j++) {
      const pixel1 = matriz1[i][j];
      const pixel2 = matriz2[i][j];

      resultado[i][j] = {
        r: limitarValorColor(pixel1.r * (1 - factor) + pixel2.r * factor),
        g: limitarValorColor(pixel1.g * (1 - factor) + pixel2.g * factor),
        b: limitarValorColor(pixel1.b * (1 - factor) + pixel2.b * factor),
        a: limitarValorColor(pixel1.a * (1 - factor) + pixel2.a * factor)
      };
    }
  }

  return resultado;
}

function aplicarSepia(matriz) {
  const resultado = copiarMatriz(matriz);

  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const pixel = matriz[i][j];
      const r = 0.393 * pixel.r + 0.769 * pixel.g + 0.189 * pixel.b;
      const g = 0.349 * pixel.r + 0.686 * pixel.g + 0.168 * pixel.b;
      const b = 0.272 * pixel.r + 0.534 * pixel.g + 0.131 * pixel.b;

      resultado[i][j] = {
        r: limitarValorColor(r),
        g: limitarValorColor(g),
        b: limitarValorColor(b),
        a: pixel.a
      };
    }
  }

  return resultado;
}

function detectarBordes(matriz, umbral = 50) {
  const grises = convertirEscalaGrises(matriz);
  const resultado = copiarMatriz(grises);
  const filas = grises.length;
  const columnas = grises[0].length;

  for (let i = 0; i < filas - 1; i++) {
    for (let j = 0; j < columnas - 1; j++) {
      const difDerecha = Math.abs(grises[i][j].r - grises[i][j + 1].r);
      const difAbajo = Math.abs(grises[i][j].r - grises[i + 1][j].r);
      const maxDiferencia = Math.max(difDerecha, difAbajo);
      const valor = maxDiferencia > umbral ? 255 : 0;

      resultado[i][j] = {
        r: valor,
        g: valor,
        b: valor,
        a: grises[i][j].a
      };
    }
  }

  for (let i = 0; i < filas; i++) {
    resultado[i][columnas - 1] = { r: 0, g: 0, b: 0, a: grises[i][columnas - 1].a };
  }
  for (let j = 0; j < columnas; j++) {
    resultado[filas - 1][j] = { r: 0, g: 0, b: 0, a: grises[filas - 1][j].a };
  }

  return resultado;
}

// ============================================
// EXPORTACIONES
// ============================================

module.exports = {
  imagenAMatriz,
  matrizAImagen,
  obtenerCanal,
  obtenerDimensionesImagen,
  ajustarBrillo,
  invertirColores,
  convertirEscalaGrises,
  voltearHorizontal,
  voltearVertical,
  rotar90Grados,
  mezclarImagenes,
  aplicarSepia,
  detectarBordes
};
