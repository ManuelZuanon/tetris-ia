/**
 * Met à jour le cumul des lignes complétées, le niveau et la vitesse de chute (dropTime)
 * en fonction des lignes complétées lors du drop.
 *
 * @param {number} currentRowsCleared - Le cumul actuel des lignes complétées.
 * @param {number} currentLevel - Le niveau actuel.
 * @param {number} linesCleared - Le nombre de lignes complétées lors de ce drop.
 * @returns {object} Un objet contenant :
 *   - newTotalCleared : le nouveau cumul de lignes,
 *   - newLevel : le niveau mis à jour,
 *   - newDropTime : le nouveau temps de chute (en ms).
 */
export const updateLevelAndSpeed = (currentRowsCleared, currentLevel, linesCleared) => {
    // Définition du seuil pour passer au niveau suivant.
    // Ici, "nextLevel" correspond à 10, ce qui signifie que le seuil de lignes
    // pour passer au niveau suivant est calculé comme currentLevel * 10.
    const nextLevel = 10;
    
    // Calcul du nouveau total de lignes complétées en ajoutant les lignes obtenues lors de ce drop.
    const newTotalCleared = currentRowsCleared + linesCleared;
    
    // On initialise le nouveau niveau avec le niveau actuel.
    let newLevel = currentLevel;
    
    // Calcul du temps de chute (dropTime) par défaut pour le niveau courant.
    // On part de 1000ms et on réduit de 100ms pour chaque niveau déjà atteint,
    // tout en s'assurant que le temps ne descend pas en dessous de 100ms.
    let newDropTime = Math.max(100, 1000 - (currentLevel - 1) * 100);
  
    // Vérification pour la montée de niveau :
    // Si le nouveau total de lignes complétées est supérieur ou égal au seuil requis
    // (c'est-à-dire currentLevel * nextLevel), alors on augmente le niveau.
    if (newTotalCleared >= currentLevel * nextLevel) {
      newLevel = currentLevel + 1;
      // Recalcul du dropTime pour le nouveau niveau :
      // On diminue de 100ms par niveau supplémentaire, avec un minimum de 100ms.
      newDropTime = Math.max(100, 1000 - (newLevel - 1) * 100);
    }
    
    // Retourne un objet contenant :
    // - newTotalCleared : le nouveau cumul de lignes complétées,
    // - newLevel : le niveau mis à jour,
    // - newDropTime : le nouveau temps de chute.
    return { newTotalCleared, newLevel, newDropTime };
  };
  