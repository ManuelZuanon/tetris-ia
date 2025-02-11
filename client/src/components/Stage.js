import React from 'react';

// Composant Stage
// ---------------
// Ce composant est responsable d'afficher la grille de jeu (stage) du Tetris.
// La prop "stage" est un tableau 2D représentant la grille de jeu.
// Chaque cellule du tableau "stage" est elle-même un tableau de deux éléments : 
//   - Le premier élément (cell[0]) représente la valeur (0 pour vide ou une valeur non nulle pour un bloc).
//   - Le second élément (cell[1]) représente le statut de la cellule (par exemple, 'clear' pour vide ou 'merged' pour un bloc fixé).
// 
// La structure est la suivante :
// - On parcourt le tableau "stage" avec map() pour obtenir chaque ligne (row).
// - Pour chaque ligne, on crée une <div> avec la classe "row".
// - On parcourt ensuite chaque cellule de la ligne pour créer une <div> pour chaque cellule,
//   en appliquant la classe "cell" et la classe correspondant au statut de la cellule (cell[1]).
// Cela permet de styliser chaque cellule individuellement via le CSS.
const Stage = ({ stage }) => (
  <div className="stage">
    {stage.map((row, y) => (
      <div key={`row-${y}`} className="row">
        {row.map((cell, x) => (
          <div key={`cell-${x}-${y}`} className={`cell ${cell[1]}`}></div>
        ))}
      </div>
    ))}
  </div>
);

export default Stage;
