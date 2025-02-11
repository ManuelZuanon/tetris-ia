/**
 * Vérifie si la pièce (player.tetromino) en mouvement entre en collision avec
 * les bords du stage ou avec des blocs déjà fixés.
 *
 * @param {object} player - Objet représentant le joueur.
 *   player.pos contient les coordonnées actuelles {x, y} de la pièce.
 *   player.tetromino est une matrice 2D représentant la forme de la pièce.
 * @param {array} stage - Tableau 2D représentant le plateau de jeu.
 *   Chaque cellule du stage est un tableau où le deuxième élément indique
 *   l'état de la cellule ('clear' pour vide, autre valeur pour occupé).
 * @param {object} movement - Objet contenant les décalages de mouvement { x, y }.
 *   Ces valeurs indiquent de combien de cases déplacer la pièce.
 *
 * @returns {boolean} - Renvoie true s'il y a une collision, sinon false.
 */
export const checkCollision = (player, stage, { x, y }) => {
  // Parcours chaque ligne de la matrice du tetromino
  for (let yIndex = 0; yIndex < player.tetromino.length; yIndex++) {
    // Parcours chaque cellule de la ligne
    for (let xIndex = 0; xIndex < player.tetromino[yIndex].length; xIndex++) {
      // Vérifie uniquement les cellules occupées par la pièce (non nulles)
      if (player.tetromino[yIndex][xIndex] !== 0) {
        // Vérifie les conditions de collision :
        // 1. Si la nouvelle position dépasse le bas du stage
        // 2. Si la nouvelle position dépasse le côté gauche (index négatif)
        // 3. Si la nouvelle position dépasse le côté droit (index supérieur à la largeur)
        // 4. Si la cellule du stage à la nouvelle position n'est pas vide ('clear')
        if (
          player.pos.y + yIndex + y >= stage.length ||                     // Collision en bas
          player.pos.x + xIndex + x < 0 ||                                  // Collision à gauche
          player.pos.x + xIndex + x >= stage[0].length ||                   // Collision à droite
          stage[player.pos.y + yIndex + y][player.pos.x + xIndex + x][1] !== 'clear' // Collision avec un bloc fixé
        ) {
          return true; // Collision détectée
        }
      }
    }
  }
  return false; // Aucune collision détectée
};
