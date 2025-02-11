// src/hooks/useInterval.js
import { useEffect, useRef } from 'react';

/**
 * Hook personnalisé useInterval
 * ------------------------------
 * Ce hook permet d'exécuter une fonction callback à intervalles réguliers (définis par "delay" en millisecondes).
 * Il est générique et ne fait référence à aucune variable externe spécifique.
 *
 * Fonctionnement :
 * 1. useRef() est utilisé pour stocker la dernière version de la callback passée en argument.
 * 2. Le premier useEffect met à jour cette référence (savedCallback.current) à chaque changement de la callback.
 * 3. Le second useEffect met en place l'intervalle via setInterval, en utilisant la valeur "delay".
 *    - Si "delay" est null, l'intervalle n'est pas créé.
 *    - L'intervalle exécute toujours la version la plus récente de la callback, grâce à savedCallback.current.
 *    - Le return du useEffect assure le nettoyage de l'intervalle lorsque "delay" change ou lorsque le composant se démonte.
 */
const useInterval = (callback, delay) => {
  // Crée une référence mutable pour stocker la callback
  const savedCallback = useRef();

  // Met à jour savedCallback.current lorsque la callback change
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configure et nettoie l'intervalle selon la valeur de delay
  useEffect(() => {
    // Si delay n'est pas null, crée un intervalle qui exécute la callback stockée
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      // Nettoyage : supprime l'intervalle lorsque delay change ou lors du démontage du composant
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
