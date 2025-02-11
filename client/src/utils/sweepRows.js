/**
 * Fonction sweepRows
 * ------------------
 * Cette fonction parcourt le stage (la grille de jeu) et supprime les lignes qui sont complètes.
 * Une ligne est considérée comme complète si aucune de ses cellules ne contient la valeur 0 (indiquant qu'elle est vide).
 * Pour chaque ligne complète, la fonction ajoute une nouvelle ligne vide en haut du stage.
 *
 * @param {array} stage - La grille de jeu, représentée par un tableau 2D.
 * @returns {array} - Le stage mis à jour, après suppression des lignes complètes et ajout de lignes vides en haut.
 */
export const sweepRows = (stage) => {
    return stage.reduce((acc, row) => {
      // Vérifie si la ligne est complète (aucune cellule vide, c'est-à-dire, cell[0] === 0)
      if (row.findIndex(cell => cell[0] === 0) === -1) {
        // Si la ligne est complète, on ajoute une nouvelle ligne vide en haut du stage.
        // Array.from({ length: row.length }, () => [0, 'clear']) crée un tableau de la même longueur que row
        // avec toutes les cellules initialisées à [0, 'clear'] (cellules vides).
        acc.unshift(Array.from({ length: row.length }, () => [0, 'clear']));
        return acc;
      }
      // Sinon, on ajoute la ligne actuelle à l'accumulateur.
      acc.push(row);
      return acc;
    }, []); // L'accumulateur est initialisé avec un tableau vide.
  };
  