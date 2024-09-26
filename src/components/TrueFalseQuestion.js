import React, { useState } from 'react';

const TrueFalseQuestion = ({ question, retryQuestion, onAnswer }) => {
  const [answered, setAnswered] = useState(false);  // État pour gérer si l'utilisateur a répondu à la première question
  const [retryMode, setRetryMode] = useState(false);  // Mode retry pour afficher la deuxième question
  const [showRetryExplanation, setShowRetryExplanation] = useState(false);  // Affiche le texte explicatif après une mauvaise réponse
  const [resultMessage, setResultMessage] = useState('');  // Message personnalisé à afficher après la première réponse
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);  // Pour afficher un message de réussite
  const [points, setPoints] = useState(0);  // Stocke les points gagnés

  // Gère la réponse à la première question
  const handleAnswer = (isTrue) => {
    setAnswered(true);
    if (isTrue === question.correct) {
      setResultMessage('Bravo ! Vous avez raison.');
      setPoints(2);  // L'utilisateur gagne 2 points pour une réponse correcte à la première question
      setShowSuccessMessage(true);  // Affiche le message de réussite
    } else {
      setResultMessage('Dommage ! Ce n’est pas la bonne réponse.');
      setShowRetryExplanation(true);  // Affiche le texte explicatif en cas de mauvaise réponse
    }
  };

  // Passe à la question de retry après le message explicatif
  const handleRetryExplanationEnd = () => {
    setShowRetryExplanation(false);  // Cache le texte explicatif
    setRetryMode(true);  // Active le mode retry pour afficher la deuxième question
  };

  // Gère la réponse à la question de retry
  const handleRetryAnswer = (isTrue) => {
    if (isTrue === retryQuestion.correct) {
      setResultMessage('Bravo ! Vous avez bien répondu à la deuxième question.');
      setPoints(1);  // L'utilisateur gagne 1 point pour une bonne réponse à la question de retry
      setShowSuccessMessage(true);  // Affiche le message de réussite
    } else {
      setResultMessage('Dommage ! Ce n’était toujours pas la bonne réponse.');
      setShowSuccessMessage(true);  // Même si la réponse est incorrecte, permet d'accéder à la suite du jeu
    }
    setRetryMode(false);  // Termine le mode retry après la deuxième question
  };

  // Fonction pour continuer après avoir affiché le message de réussite ou d'échec
  const handleContinue = () => {
    setShowSuccessMessage(false);  // Cache le message de réussite ou d'échec
    onAnswer(points);  // Informe l'App du nombre de points gagnés (0, 1 ou 2)
  };

  return (
    <div className="true-false-question">
      {/* Affiche la première question */}
      {!answered && !retryMode && (
        <div>
          <p>{question.text}</p>
          <button onClick={() => handleAnswer(true)}>Vrai</button>
          <button onClick={() => handleAnswer(false)}>Faux</button>
        </div>
      )}

      {/* Affiche le message personnalisé après la première réponse */}
      {answered && !retryMode && !showRetryExplanation && !showSuccessMessage && (
        <div>
          <p>{resultMessage}</p>
        </div>
      )}

      {/* Affiche le message explicatif après une mauvaise réponse */}
      {showRetryExplanation && (
        <div>
          <p>Dommage, vous n'avez pas bien répondu à la première question. Nous vous proposons une autre question.</p>
          <button onClick={handleRetryExplanationEnd}>Continuer</button>  {/* Bouton pour passer à la question de retry */}
        </div>
      )}

      {/* Affiche la question de retry */}
      {retryMode && (
        <div>
          <p>{retryQuestion.text}</p>
          <button onClick={() => handleRetryAnswer(true)}>Vrai</button>
          <button onClick={() => handleRetryAnswer(false)}>Faux</button>
        </div>
      )}

      {/* Affiche le message de réussite après une bonne ou mauvaise réponse */}
      {showSuccessMessage && (
        <div>
          <p>{resultMessage}</p>
          <button onClick={handleContinue}>Continuer</button>  {/* Bouton pour passer à l'étape suivante */}
        </div>
      )}
    </div>
  );
};

export default TrueFalseQuestion;
