// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ============================================
// Nombre del estudiante: Enrque Zavala Martinez
// Fecha: 17/11/2025
// Grupo: 1C

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Importar funciones de utilidadEs 
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
// COMPLETADO JEJEJEJE
function imagenAMatriz(rutaImagen) {
  // 1. Leer el archivo PNG
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);
  
  // 2. Crear la matriz vacía
  const matriz = [];
  
  // 3. Recorrer cada fila (y) y cada columna (x)
  for (let y = 0; y < png.height; y++) {
    const fila = [];
    for (let x = 0; x < png.width; x++) {
      // 4. Calcular el índice en el buffer
      const idx = (png.width * y + x) << 2; // equivalente a * 4
      
      // 5. Extraer los valores RGBA
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
  
  // 6. Retornar la matriz
  return matriz;
}

function matrizAImagen(matriz, rutaSalida) {
  // 1. Validar la matriz
  validarMatriz(matriz);
  
  // 2. Obtener dimensiones
  const dims = obtenerDimensiones(matriz);
  
  // 3. Crear el PNG
  const png = new PNG({
    width: dims.columnas,
    height: dims.filas
  });
  
  // 4. Llenar png.data
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
  
  // 5. Asegurar que existe el directorio de salida
  asegurarDirectorio(path.dirname(rutaSalida));
  
  // 6. Guardar el archivo
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(rutaSalida, buffer);
}

function obtenerCanal(matriz, canal) {
  // 1. Validar parámetros
  if (!['r', 'g', 'b'].includes(canal)) {
    throw new Error("El canal debe ser 'r', 'g', o 'b'");
  }
  
  // 2. Crear matriz resultado
  const resultado = copiarMatriz(matriz);
  
  // 3. Para cada pixel, usar solo el valor del canal seleccionado
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
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);
  
  return {
    ancho: png.width,
    alto: png.height,
    totalPixeles: png.width * png.height
  };
}

// ============================================
// SECCIÓN 2: OPERACIONES BÁSICAS (25 puntos)
// Aplicar álgebra matricial a píxeles
// ============================================
// COMPLETADO JEJE
function ajustarBrillo(matriz, factor) {
  // 1. Crear matriz resultado
  const resultado = copiarMatriz(matriz);
  
  // 2. Para cada pixel, multiplicar R, G, B por el factor
  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      resultado[i][j].r = limitarValorColor(matriz[i][j].r * factor);
      resultado[i][j].g = limitarValorColor(matriz[i][j].g * factor);
      resultado[i][j].b = limitarValorColor(matriz[i][j].b * factor);
      // El canal alpha NO se modifica
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
      const gris = Math.round(
        0.299 * matriz[i][j].r + 
        0.587 * matriz[i][j].g + 
        0.114 * matriz[i][j].b
      );
      resultado[i][j] = {
        r: gris,
        g: gris,
        b: gris,
        a: matriz[i][j].a
      };
    }
  }
  
  return resultado;
}

// ============================================
// SECCIÓN 3: TRANSFORMACIONES GEOMÉTRICAS (30 puntos)
// Aplicar operaciones matriciales para transformar
// ============================================
//COMPLETADO JEJJEJEJE

function voltearHorizontal(matriz) {
  const dims = obtenerDimensiones(matriz);
  const resultado = [];
  
  for (let i = 0; i < dims.filas; i++) {
    const fila = [];
    for (let j = dims.columnas - 1; j >= 0; j--) {
      fila.push(matriz[i][j]);
    }
    resultado.push(fila);
  }
  
  return resultado;
}

function voltearVertical(matriz) {
  const dims = obtenerDimensiones(matriz);
  const resultado = [];
  
  for (let i = dims.filas - 1; i >= 0; i--) {
    resultado.push([...matriz[i]]);
  }
  
  return resultado;
}

function rotar90Grados(matriz) {
  const dims = obtenerDimensiones(matriz);
  const resultado = crearMatrizVacia(dims.columnas, dims.filas);
  
  for (let i = 0; i < dims.filas; i++) {
    for (let j = 0; j < dims.columnas; j++) {
      resultado[j][dims.filas - 1 - i] = matriz[i][j];
    }
  }
  
  return resultado;
}

// ============================================
// SECCIÓN 4: FILTROS AVANZADOS (25 puntos)
// Operaciones más complejas
// ============================================
// COMPLETADO JEJEJEJEJEJE
function mezclarImagenes(matriz1, matriz2, factor) {
  // 1. Verificar que tengan las mismas dimensiones
  const dims1 = obtenerDimensiones(matriz1);
  const dims2 = obtenerDimensiones(matriz2);
  if (dims1.filas !== dims2.filas || dims1.columnas !== dims2.columnas) {
    throw new Error('Las imágenes deben tener el mismo tamaño');
  }
  
  const resultado = copiarMatriz(matriz1);
  
  // 2. Para cada pixel:
  for (let i = 0; i < dims1.filas; i++) {
    for (let j = 0; j < dims1.columnas; j++) {
      resultado[i][j] = {
        r: limitarValorColor(matriz1[i][j].r * (1 - factor) + matriz2[i][j].r * factor),
        g: limitarValorColor(matriz1[i][j].g * (1 - factor) + matriz2[i][j].g * factor),
        b: limitarValorColor(matriz1[i][j].b * (1 - factor) + matriz2[i][j].b * factor),
        a: matriz1[i][j].a
      };
    }
  }
  
  return resultado;
}

function aplicarSepia(matriz) {
  const resultado = copiarMatriz(matriz);
  
  for (let i = 0; i < resultado.length; i++) {
    for (let j = 0; j < resultado[i].length; j++) {
      const r = matriz[i][j].r;
      const g = matriz[i][j].g;
      const b = matriz[i][j].b;
      
      resultado[i][j] = {
        r: limitarValorColor(0.393 * r + 0.769 * g + 0.189 * b),
        g: limitarValorColor(0.349 * r + 0.686 * g + 0.168 * b),
        b: limitarValorColor(0.272 * r + 0.534 * g + 0.131 * b),
        a: matriz[i][j].a
      };
    }
  }
  
  return resultado;
}

function detectarBordes(matriz, umbral = 50) {
  // 1. Convertir a escala de grises primero
  const grises = convertirEscalaGrises(matriz);
  const dims = obtenerDimensiones(grises);
  
  const resultado = [];
  
  // 2. Para cada pixel (excepto bordes de la imagen):
  for (let i = 0; i < dims.filas; i++) {
    const fila = [];
    for (let j = 0; j < dims.columnas; j++) {
      // Si estamos en el borde derecho o inferior, marcamos como negro
      if (i === dims.filas - 1 || j === dims.columnas - 1) {
        fila.push({ r: 0, g: 0, b: 0, a: 255 });
      } else {
        const actual = grises[i][j].r;
        const derecha = grises[i][j + 1].r;
        const abajo = grises[i + 1][j].r;
        
        const difDerecha = Math.abs(actual - derecha);
        const difAbajo = Math.abs(actual - abajo);
        const diferencia = Math.max(difDerecha, difAbajo);
        
        if (diferencia > umbral) {
          fila.push({ r: 255, g: 255, b: 255, a: 255 });
        } else {
          fila.push({ r: 0, g: 0, b: 0, a: 255 });
        }
      }
    }
    resultado.push(fila);
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