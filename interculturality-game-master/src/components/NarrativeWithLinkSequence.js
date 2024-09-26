import React, { useState } from 'react';

const NarrativeWithLinkSequence = ({ steps, externalLink, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();  // Passe à l'étape suivante du jeu
    }
  };

  return (
    <div className="narrative-with-link-sequence">
      <p>{steps[currentStep].text}</p>

      {/* Affiche le bouton pour passer à l'étape suivante */}
      <button onClick={handleNext}>
        {currentStep < steps.length - 1 ? 'Suivant' : 'Suivant'}
      </button>

      {/* Affiche le bouton avec un lien externe */}
      {externalLink && (
        <a href={externalLink.url} target="_blank" rel="noopener noreferrer">
          {externalLink.text}
        </a>
      )}
    </div>
  );
};

export default NarrativeWithLinkSequence;
