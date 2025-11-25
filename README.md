# Documentación de Ejercicios - David Morales Guerrero

## Información General

- **Materia:** Fundamentos de Álgebra  
- **Tema:** Matrices y operaciones matriciales en Excel  
- **Fecha:** 24 de noviembre de 2025  
- **Estudiante:** David Morales Guerrero  
- **Grupo:** 1-A  

---

## Objetivo de la Documentación

El objetivo de esta documentación es explicar cómo se utilizaron matrices en Microsoft Excel para representar imágenes de 30x30, así como describir las operaciones matriciales aplicadas sobre ellas.  
Se detalla la estructura de las hojas de cálculo, las fórmulas empleadas y la relación entre las matrices originales, sus traspuestas y las operaciones de suma, resta, multiplicación escalar y combinación lineal.

---

## Ejercicios Realizados

### 1. Representación de imágenes como matrices 30x30

En el archivo `PUNISHER_MATRICES_COMPLETO.xlsx` se trabajó con 5 imágenes, cada una representada como una matriz de **30 filas x 30 columnas**.  
Cada celda contiene un número entero que representa un color.

#### 1.1 Hojas de imágenes originales

Las 5 hojas base son:

- **Punisher1**  
- **Deadpool2**  
- **Alien3**  
- **Navi4**  
- **Laptop5**

Cada hoja contiene una matriz 30x30 de valores numéricos.  
En el caso de la imagen de Punisher, por ejemplo, se utiliza la siguiente codificación de colores:

- `0` → blanco  
- `1` → negro  
- `2` → rojo  
- `3` → verde  
- `4` → gris  

---

### 2. Matrices traspuestas (AT)

Para cada imagen original se generó una hoja con su **matriz traspuesta**, donde se intercambian filas por columnas.

Las hojas de traspuestas son:

- **Punisher1_T**  
- **Deadpool2_T**  
- **Alien3_T**  
- **Navi4_T**  
- **Laptop5_T**

#### Fórmula usada:

La traspuesta de una matriz \( A \) se define como:

\[
A^T(i,j) = A(j,i)
\]

Ejemplo de fórmula usada en Excel:

```excel
=Punisher1!A2
