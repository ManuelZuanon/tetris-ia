import React from 'react';

// Composant StartButton
// ----------------------
// Ce composant représente un bouton utilisé pour démarrer ou redémarrer la partie.
// Il reçoit une prop "onClick" qui est une fonction à exécuter lors du clic sur le bouton.
// Le bouton est stylisé via la classe CSS "start-button", qui définit son apparence.
// Lorsqu'on clique sur le bouton, la fonction "onClick" est appelée pour démarrer ou réinitialiser le jeu.
const StartButton = ({ onClick }) => (
  <button className="start-button" onClick={onClick}>
    Démarrer
  </button>
);

export default StartButton;
