import React from 'react';

// Composant Display pour afficher des informations (score, niveau, etc.)
// Props : text (texte à afficher), gameOver (booléen indiquant si le jeu est terminé)
const Display = ({ gameOver, text }) => (
  <div className={`display ${gameOver ? 'game-over' : ''}`}>
    {text}
  </div>
);

export default Display;
