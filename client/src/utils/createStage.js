/**
 * Fonction createStage
 * ---------------------
 * Cette fonction crée et retourne une grille (ou "stage") de jeu pour Tetris.
 * La grille est représentée par un tableau 2D de 20 lignes et 12 colonnes.
 *
 * Chaque cellule de la grille est initialisée avec un tableau contenant deux valeurs :
 * - Le premier élément (0) représente l'absence de bloc.
 * - Le deuxième élément ('clear') indique que la cellule est vide.
 *
 * Exemple de cellule vide : [0, 'clear']
 */
export const createStage = () =>
  // Création d'un tableau de 20 éléments (lignes)
  Array.from({ length: 20 }, () =>
    // Pour chaque ligne, on crée un tableau de 12 cellules, chacune initialisée à [0, 'clear']
    Array.from({ length: 12 }, () => [0, 'clear'])
  );
