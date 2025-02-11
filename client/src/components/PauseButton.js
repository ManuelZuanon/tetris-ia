import React from 'react';

// Composant PauseButton
// ----------------------
// Ce composant affiche un bouton qui permet de mettre le jeu en pause ou de le reprendre.
// Il reçoit deux props :
//   - onClick : une fonction appelée lors du clic sur le bouton.
//   - isPaused : un booléen qui indique si le jeu est actuellement en pause.
// Si isPaused est vrai, le bouton affiche "Reprendre" (pour reprendre le jeu),
// sinon il affiche "Pause" (pour mettre le jeu en pause).
// Le bouton utilise la classe "start-button" pour appliquer le même style que le bouton de démarrage.
const PauseButton = ({ onClick, isPaused }) => {
  return (
    <button className="start-button" onClick={onClick}>
      {isPaused ? 'Reprendre' : 'Pause'}
    </button>
  );
};

export default PauseButton;
