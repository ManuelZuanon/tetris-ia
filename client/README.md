# Tetris Client

## Description

Tetris Client est une application web fonctionnelle développée avec **React 18** et stylisée avec **SCSS**.  
L'objectif principal de ce projet est de fournir une base de jeu Tetris entièrement fonctionnelle qui servira ultérieurement à entraîner une intelligence artificielle pour apprendre à jouer.  
*Note : Le design n'est pas l'objectif principal, mais la fonctionnalité et la robustesse du jeu.*

## Fonctionnalités

- Jeu Tetris complet avec gestion des collisions, fusion des pièces, nettoyage des lignes complètes, score et montée de niveau.
- Prévisualisation de la prochaine pièce.
- Contrôles au clavier pour déplacer, faire tourner et accélérer la chute des pièces.
- Boutons pour démarrer, redémarrer et mettre en pause le jeu.
- Architecture modulaire facilitant l'intégration future d'une API, d'un serveur et d'un modèle d'IA.

## Dépendances

Ce projet utilise notamment :

- **React 18** pour la création de l'interface utilisateur.
- **SCSS** pour la gestion avancée des styles.
- Diverses dépendances npm pour le développement (par exemple, Babel, Webpack, etc.), qui seront installées automatiquement.

## Utilisation

- Déplacement & Rotation : Utilisez les flèches du clavier pour déplacer la pièce à gauche, à droite, pour accélérer sa chute (flèche bas) et la faire tourner (flèche haut).
- Pause / Reprise : Cliquez sur le bouton "Pause" pour interrompre le jeu et sur "Reprendre" pour continuer.
- Démarrage / Redémarrage : Cliquez sur le bouton "Démarrer" pour lancer ou relancer la partie.
- Montée de niveau : Le niveau augmente toutes les 10 lignes complétées, ce qui accélère la chute des pièces et augmente la difficulté.

## Structure du Projet
*Le projet est organisé de manière modulaire pour faciliter la maintenance et l'évolution, notamment en vue d'intégrer une API et un modèle d'IA ultérieurement.*

```
src/
├── components/
│ ├── Tetris.js : Composant principal gérant l'état du jeu. 
│ ├── Stage.js : Affichage de la grille de jeu. 
│ ├── Display.js : Affichage du score, du niveau et du message de fin de partie. 
│ ├── StartButton.js : Bouton pour démarrer ou redémarrer le jeu. 
│ ├── PauseButton.js : Bouton pour mettre en pause ou reprendre le jeu. 
│ └── NextPiece.js : Affichage de l'aperçu de la prochaine pièce. 
├── hooks/
│ └── useInterval.js : Hook personnalisé pour gérer la chute automatique des pièces. 
├── utils/ 
│ ├── createStage.js : Génération de la grille de jeu. 
│ ├── checkCollision.js : Détection des collisions. 
│ ├── sweepRows.js : Nettoyage des lignes complètes. 
│ ├── handleDrop.js : Logique de chute, fusion, calcul du score et détection de game over. 
│ ├── tetrominos.js : Définition des formes et couleurs des pièces. 
│ └── level.js : Mise à jour du cumul des lignes, du niveau et du temps de chute. 
└──  styles/ 
  └── [Fichiers SCSS pour le style global et les composants] 

```


## Perspectives d'Évolution
- Entraînement d'une IA : Intégrer un serveur et une API pour entraîner une intelligence artificielle à jouer au Tetris.
- Effets visuels et sonores : Ajouter des animations et des effets sonores pour améliorer l'expérience utilisateur.
- Highscore et leaderboard : Mettre en place un système de score et de classement.
- Modes de jeu supplémentaires : Proposer des variantes de jeu ou des défis pour diversifier le gameplay.

## Licence
Ce projet est sous licence **MIT**.
