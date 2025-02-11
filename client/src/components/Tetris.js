import React, { useState, useEffect } from 'react';
import { createStage } from '../utils/createStage';
import { randomTetromino, TETROMINOS } from '../utils/tetrominos';
import { checkCollision } from '../utils/checkCollision'; // Fonction utilitaire pour vérifier les collisions
import { handleDrop } from '../utils/handleDrop';  // Fonction utilitaire qui gère la chute, le score et le game over
import useInterval from '../hooks/useInterval';     // Hook personnalisé pour gérer un intervalle régulier
import Stage from './Stage';                         // Composant qui affiche la grille de jeu
import Display from './Display';                     // Composant qui affiche le score, le niveau ou le message de fin
import StartButton from './StartButton';             // Bouton pour démarrer ou redémarrer la partie
import PauseButton from './PauseButton';             // Bouton pour mettre en pause ou reprendre le jeu
import NextPiece from './NextPiece';                 // Composant qui affiche un aperçu de la prochaine pièce
import { updateLevelAndSpeed } from '../utils/level';  // Fonction utilitaire pour mettre à jour le niveau et la vitesse

const Tetris = () => {
  // === ÉTATS DU JEU ===

  // Stage : la grille de jeu, initialisée par la fonction createStage()
  const [stage, setStage] = useState(createStage());

  // Player : l'état du joueur, qui contient sa position, la pièce (tetromino) en cours et son statut de collision
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  // dropTime : temps (en ms) entre chaque chute automatique de la pièce
  const [dropTime, setDropTime] = useState(1000);

  // gameOver : booléen indiquant si le jeu est terminé
  const [gameOver, setGameOver] = useState(false);

  // level et rowsClearedTotal : gèrent respectivement le niveau actuel et le cumul des lignes complétées
  const [level, setLevel] = useState(1);
  const [rowsClearedTotal, setRowsCleared] = useState(0);

  // nextTetromino : la prochaine pièce qui apparaîtra, générée aléatoirement
  const [nextTetromino, setNextTetromino] = useState(randomTetromino());

  // score : le score actuel du joueur
  const [score, setScore] = useState(0);

  // isPaused : état qui indique si le jeu est actuellement en pause
  const [isPaused, setIsPaused] = useState(false);

  // === FONCTIONS DU JEU ===

  // Fonction pour mettre à jour la position du joueur
  // Les paramètres x et y indiquent le déplacement, et collided indique si une collision s'est produite
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  // Fonction qui crée la grille affichée en superposant la pièce en mouvement sur le stage
  // On part d'une copie du stage et on y "dessine" la pièce du joueur en fonction de sa position
  const createDisplayStage = () => {
    const displayStage = stage.map(row =>
      row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
    );
    player.tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          // La classe appliquée correspond à la lettre de la pièce (ex: "I", "J", etc.)
          displayStage[y + player.pos.y][x + player.pos.x] = [
            value,
            player.collided ? 'merged' : value,
          ];
        }
      });
    });
    return displayStage;
  };

  // Fonction qui bascule la pause du jeu
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Fonction drop() qui gère la chute automatique de la pièce.
  // Elle fait appel à la fonction utilitaire handleDrop pour obtenir la nouvelle grille, score, etc.
  // Ensuite, elle met à jour les états du jeu et gère la montée de niveau si des lignes ont été complétées.
  const drop = () => {
    // Appel de handleDrop pour exécuter la logique de chute, fixation, score et game over
    const result = handleDrop({ player, stage, nextTetromino, score });
    setStage(result.newStage);
    setScore(result.newScore);
    setPlayer(result.newPlayer);
    setNextTetromino(result.newNextTetromino);

    // Si des lignes ont été complétées lors de ce drop, on met à jour le cumul, le niveau et la vitesse
    if (result.linesCleared > 0) {
      const { newTotalCleared, newLevel, newDropTime } = updateLevelAndSpeed(
        rowsClearedTotal,
        level,
        result.linesCleared
      );
      setRowsCleared(newTotalCleared);
      setLevel(newLevel);
      setDropTime(newDropTime);
    }

    // Si handleDrop indique que le game over est déclenché, on met à jour l'état correspondant
    if (result.gameOver) {
      setGameOver(true);
      setDropTime(null);
    } else {
      // Sinon, on continue avec le dropTime renvoyé par handleDrop
      setDropTime(result.dropTime);
    }
  };

  // Fonction pour faire tourner la pièce du joueur
  // La rotation est effectuée en transposant puis en inversant l'ordre des lignes de la matrice
  // On vérifie ensuite qu'aucune collision n'est générée par la rotation avant de mettre à jour l'état du joueur
  const rotatePlayer = () => {
    const clonedTetromino = player.tetromino;
    const rotatedTetromino = clonedTetromino[0].map((_, index) =>
      clonedTetromino.map(row => row[index])
    ).reverse();

    const rotatedPlayer = { ...player, tetromino: rotatedTetromino };

    if (!checkCollision(rotatedPlayer, stage, { x: 0, y: 0 })) {
      setPlayer({ ...player, tetromino: rotatedTetromino });
    }
  };

  // Utilisation du hook personnalisé useInterval pour appeler drop() à intervalles réguliers
  // La fonction drop() est exécutée uniquement si le jeu n'est pas en pause (isPaused === false)
  useInterval(() => {
    if (!isPaused) {
      drop();
    }
  }, dropTime);

  // Gestion des événements clavier pour contrôler le jeu
  // On écoute les flèches : gauche (37), droite (39), bas (40) pour accélérer la chute et haut (38) pour la rotation
  const keyDownHandler = (event) => {
    if (!gameOver) {
      switch (event.keyCode) {
        case 37:
          // Flèche gauche : déplace la pièce vers la gauche si aucune collision
          if (!checkCollision(player, stage, { x: -1, y: 0 })) {
            updatePlayerPos({ x: -1, y: 0, collided: false });
          }
          break;
        case 39:
          // Flèche droite : déplace la pièce vers la droite si aucune collision
          if (!checkCollision(player, stage, { x: 1, y: 0 })) {
            updatePlayerPos({ x: 1, y: 0, collided: false });
          }
          break;
        case 40:
          // Flèche bas : accélère la chute de la pièce
          drop();
          break;
        case 38:
          // Flèche haut : fait tourner la pièce
          rotatePlayer();
          break;
        default:
          break;
      }
    }
  };

  // useEffect pour ajouter et nettoyer l'écouteur d'événements clavier
  // L'écouteur est réinitialisé lorsque player, stage ou gameOver changent
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [player, stage, gameOver]);

  // Fonction pour démarrer ou redémarrer la partie
  // Elle réinitialise le stage, le joueur, la prochaine pièce, le dropTime et le gameOver
  const startGame = () => {
    setStage(createStage());
    setPlayer({
      pos: { x: 5, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
    setNextTetromino(randomTetromino());
    setDropTime(1000);
    setGameOver(false);
  };

  // Rendu du composant Tetris
  return (
    <div className="tetris">
      {/* Affiche la grille de jeu avec la pièce en mouvement superposée */}
      <Stage stage={createDisplayStage()} />
      <aside>
        {/* Affichage conditionnel : si gameOver est true, on affiche "Game Over", sinon le score et le niveau */}
        {gameOver ? (
          <Display gameOver text="Game Over" />
        ) : (
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Level: ${level}`} />
          </div>
        )}
        {/* Boutons pour démarrer le jeu et pour mettre en pause/reprendre */}
        <StartButton onClick={startGame} />
        <PauseButton onClick={togglePause} isPaused={isPaused} />
        {/* Affichage de l'aperçu de la prochaine pièce */}
        <NextPiece tetromino={nextTetromino.shape} />
      </aside>
    </div>
  );
};

export default Tetris;
