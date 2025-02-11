import React from 'react';

// Composant NextPiece
// --------------------
// Ce composant affiche un aperçu de la prochaine pièce du jeu Tetris.
// Il reçoit en prop "tetromino", qui est une matrice représentant la forme
// de la pièce (par exemple, une pièce en "T", en "L", etc.).
//
// Pour cet aperçu, on crée une grille virtuelle de 4 colonnes et 3 lignes.
// La grille est initialement remplie de 0 (valeur indiquant une cellule vide).
// Ensuite, on parcourt la matrice "tetromino" pour y insérer les parties non vides
// de la pièce dans la grille. L'inversion des indices (grid[x][y]) permet de 
// placer correctement la pièce dans la grille par colonne.
// Chaque cellule affichée aura une classe CSS correspondant à la pièce (ex. "J", "I", etc.) 
// si elle est occupée, ou la classe "clear" si elle est vide.
const NextPiece = ({ tetromino }) => {
  // Crée une grille 4x3 vide (4 colonnes, 3 lignes)
  // Utilisation de Array.from pour générer un tableau de 4 colonnes,
  // chacune contenant un tableau de 3 cellules initialisées à 0.
  const grid = Array.from({ length: 4 }, () => Array(3).fill(0));

  // Insère la prochaine pièce dans la grille.
  // On parcourt la matrice "tetromino" et pour chaque cellule non vide,
  // on place la valeur correspondante dans la grille.
  // Notez que l'on inverse les indices x et y pour correspondre à l'affichage par colonnes.
  tetromino.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        grid[x][y] = cell; // Remplace la valeur 0 par la valeur de la pièce
      }
    });
  });

  return (
    <div className="next-piece">
      <h3>Prochaine pièce</h3>
      <div className="next-piece-grid">
        {/*
          Parcours de la grille pour afficher chaque colonne et chaque cellule.
          Chaque colonne est rendue dans une <div> avec la classe "column".
          Pour chaque cellule, si elle est occupée (cell !== 0), on applique la classe correspondant à la pièce (ex: "J", "I", etc.);
          sinon, on applique la classe "clear".
        */}
        {grid.map((column, x) => (
          <div key={`column-${x}`} className="column">
            {column.map((cell, y) => (
              <div
                key={`cell-${x}-${y}`}
                className={`cell ${cell !== 0 ? cell : 'clear'}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;
