import React, { useState } from 'react';

const NarrativeSequence = ({ steps, onNext }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1);
    } else {
      onNext();
    }
  };

  const { text, image } = steps[index];

  return (
    <div className="narrative-sequence">
      {image && <img src={image} alt="Narrative Illustration" className="narrative-image" />}
      <p>{text}</p>
      <button onClick={handleNext}>Suivant</button>
    </div>
  );
};

export default NarrativeSequence;
