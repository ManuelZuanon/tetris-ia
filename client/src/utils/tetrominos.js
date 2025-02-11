/**
 * Définition des tetrominos utilisés dans le jeu Tetris.
 * -------------------------------------------------------
 * L'objet TETROMINOS contient la définition de chaque pièce.
 * Chaque clé (ex. 'I', 'J', etc.) correspond à une pièce et possède :
 *   - shape : une matrice 2D définissant la forme de la pièce.
 *   - color : une chaîne de caractères représentant la couleur (au format "R, G, B").
 *
 * La clé "0" représente une cellule vide dans la grille.
 */
export const TETROMINOS = {
  0: { shape: [[0]], color: '0, 0, 0' }, // Cellule vide

  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '80, 227, 230',
  },

  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '36, 95, 223',
  },

  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '223, 173, 36',
  },

  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '223, 217, 36',
  },

  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '48, 211, 56',
  },

  T: {
    shape: [
      [0, 'T', 0],
      ['T', 'T', 'T'],
      [0, 0, 0],
    ],
    color: '132, 61, 198',
  },

  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '227, 78, 78',
  },
};

/**
 * Fonction randomTetromino
 * -------------------------
 * Sélectionne aléatoirement un tetromino parmi ceux définis dans TETROMINOS.
 *
 * Procédure :
 * 1. On définit une chaîne de caractères contenant toutes les clés (pièces) disponibles,
 *    ici 'IJLOSTZ' (la pièce '0' n'est pas considérée car elle représente une cellule vide).
 * 2. On choisit un caractère aléatoire dans cette chaîne.
 * 3. On retourne l'objet correspondant dans TETROMINOS.
 *
 * @returns {object} L'objet tetromino choisi aléatoirement (contient shape et color).
 */
export const randomTetromino = () => {
  const tetrominoKeys = 'IJLOSTZ'; // Liste des clés représentant les pièces disponibles
  // Sélectionne une clé aléatoire dans la chaîne
  const randomKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  return TETROMINOS[randomKey];
};
