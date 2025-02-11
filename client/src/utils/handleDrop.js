// src/utils/handleDrop.js
import { checkCollision } from './checkCollision';
import { sweepRows } from './sweepRows';
import { randomTetromino } from './tetrominos';

/**
 * Gère la chute de la pièce, la fusion dans le stage, le nettoyage des lignes complètes,
 * le calcul du score et la détection d'un game over.
 *
 * @param {object} params - Objet contenant :
 *    - player : l'état actuel du joueur, incluant sa position et le tetromino courant.
 *    - stage : la grille actuelle du jeu (tableau 2D).
 *    - nextTetromino : la prochaine pièce (tetromino) à jouer.
 *    - score : le score actuel.
 *
 * @returns {object} Un objet contenant :
 *    - newPlayer : l'état mis à jour du joueur (position et tetromino).
 *    - newStage : la grille mise à jour après la fusion et le nettoyage.
 *    - newScore : le score mis à jour après ajout des points pour les lignes complètes.
 *    - newNextTetromino : la prochaine pièce générée.
 *    - gameOver : booléen indiquant si le jeu est terminé.
 *    - dropTime : le temps de chute à appliquer pour la prochaine itération.
 *    - linesCleared : le nombre de lignes complètes réalisées lors de ce drop.
 */
export const handleDrop = ({ player, stage, nextTetromino, score }) => {
  // Si aucune collision n'est détectée pour un déplacement vers le bas (y + 1)
  if (!checkCollision(player, stage, { x: 0, y: 1 })) {
    // On retourne un objet contenant le joueur déplacé d'une ligne vers le bas,
    // et les autres valeurs inchangées.
    return {
      newPlayer: {
        ...player,
        pos: { x: player.pos.x, y: player.pos.y + 1 },
        collided: false,
      },
      newStage: stage,
      newScore: score,
      newNextTetromino: nextTetromino,
      gameOver: false,
      dropTime: 1000, // Conserve le délai actuel de 1000 ms
      linesCleared: 0, // Aucune ligne complétée lors de ce drop
    };
  } else {
    // ---------------------------
    // Fusion de la pièce dans le stage
    // ---------------------------
    // Crée une copie du stage pour éviter de modifier l'original.
    const newStage = stage.map(row => row.slice());
    
    // Parcourt la matrice du tetromino du joueur
    player.tetromino.forEach((row, y) => {
      row.forEach((cell, x) => {
        // Pour chaque cellule non vide (valeur non nulle),
        // on place la cellule dans le stage à la position correspondante,
        // en fonction de la position actuelle du joueur.
        if (cell !== 0) {
          newStage[y + player.pos.y][x + player.pos.x] = [cell, cell];
        }
      });
    });

    // ---------------------------
    // Calcul du nombre de lignes complètes
    // ---------------------------
    // Pour chaque ligne du stage, on vérifie si aucune cellule n'est vide (cell[0] !== 0).
    // Si c'est le cas, la ligne est complète et on incrémente le compteur.
    let rowsCleared = newStage.reduce((acc, row) => {
      return row.findIndex(cell => cell[0] === 0) === -1 ? acc + 1 : acc;
    }, 0);

    // ---------------------------
    // Nettoyage des lignes complètes
    // ---------------------------
    // La fonction sweepRows() supprime les lignes complètes et ajoute des lignes vides en haut,
    // afin de conserver la taille du stage.
    const sweptStage = sweepRows(newStage);

    // ---------------------------
    // Mise à jour du score
    // ---------------------------
    // On ajoute 10 points pour chaque ligne complétée.
    const newScore = score + (rowsCleared > 0 ? rowsCleared * 10 : 0);

    // ---------------------------
    // Détection du game over
    // ---------------------------
    // Si la pièce se fixe en haut du stage (position y < 1), c'est la fin du jeu.
    if (player.pos.y < 1) {
      return {
        newPlayer: player, // On conserve l'état actuel du joueur
        newStage: sweptStage,
        newScore,
        newNextTetromino: nextTetromino,
        gameOver: true,    // Déclenche le game over
        dropTime: null,    // Arrête la chute automatique
        linesCleared: rowsCleared,
      };
    }

    // ---------------------------
    // Retourner les nouvelles valeurs mises à jour
    // ---------------------------
    // Si le jeu continue, on réinitialise le joueur avec la prochaine pièce,
    // on met à jour le stage nettoyé, le score, et on génère une nouvelle prochaine pièce.
    return {
      newPlayer: {
        pos: { x: 5, y: 0 },         // Position de départ pour la nouvelle pièce
        tetromino: nextTetromino.shape, // On prend la forme de la prochaine pièce
        collided: false,
      },
      newStage: sweptStage,
      newScore,
      newNextTetromino: randomTetromino(), // Génère une nouvelle pièce aléatoire
      gameOver: false,
      dropTime: 1000,                      // Redéfinit le délai de chute à 1000 ms
      linesCleared: rowsCleared,           // Nombre de lignes complétées lors de ce drop
    };
  }
};
