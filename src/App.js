import React, { useState } from 'react';
import NarrativeSequence from './components/NarrativeSequence';
import NarrativeWithLinkSequence from './components/NarrativeWithLinkSequence';
import VideoSequence from './components/VideoSequence';
import TrueFalseQuestion from './components/TrueFalseQuestion';
import InteractiveMap from './components/InteractiveMap';
const App = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showRetryQuestion, setShowRetryQuestion] = useState(false);
  const [retryMode, setRetryMode] = useState(false); 
  const handleNarrativeEnd = () => setStep(step + 1);
  const handleVideoEnd = () => setStep(step + 1);

  const handleAnswer = (points) => {
    setScore(score + points);  // Ajoute les points obtenus à la première ou à la deuxième question
    setStep(step + 1);  // Passe à l'étape suivante après la question (ou retry question)
  };  
  
  const handleLocationReached = (location) => {
    console.log(`Arrived at ${location}`);
    setStep(step + 1);
  };

  const narrativeTexts = [
    { text: "Le petit alien vagabonde entre les galaxies."},
    { text: "Avant de continuer son voyage, le petit Alien souhaite faire une halte sur la planète la plus proche avant de repartir."},
    { text: "C'est là qu’il trouva la ✨Terre ✨."}
  ];

  const narrativeGrotte = [
    { text: "Il gare son véhicule à l’abri du vent près d’une grotte, mais un élément scintillant au fond de celle-ci attire son attention.", image: "/images/grottescintille.png"},
    { text: "Un livre est présent, posé au-dessus d’un autel éclairant les alentours. piqué par sa curiosité, il attrape le livre", image:"/images/grottelivre.png"}
  ]

  const narrativeDeluge = [
    { text: "Un orage gronde soudainement."},
    { text: "L’océan se met soudainement à se déchainer. Les abysses engloutissent la cité de l’Atlantide, et l’Alien se sauve en barque, ayant malheureusement perdu son vaisseau dans l’incident."},
    { text: "L'oracle resté sous son bras, se met à briller et à voler devant lui."},
    { text: "Celui-ci promet de lui donner des pièces de vaisseau en échange de réponses à ses énigmes."}
]

  const narrativeApophis = [
    { text: "L’air chaud ambiant réchauffe le corps de l’Alien encore sous le choc de sa mésaventure aquatique."},
    { text: "Oracle : “Bienvenue en Égypte antique. J’ai entendu une légende évoquant une certaine divinité nommée Apophis. Qu’en sais-tu ?”"}
]

const linkApophis = {
  url: "https://example.com/article",  // Remplace cette URL par celle que tu veux
  text: "Lire l'article"
};

  const trueFalseQuestion = {
    text: "Apophis est une divinité égyptienne représentée sous la forme d’une hyène.",
    correct: false
  };

  const retryQuestion = {
    text: "Apophis fut une représentation du bien-être et de la plénitude dans la mythologie égyptienne.",
    correct: false
  };

  const trueFalseMesopo = {
    text: "Le Ney (instrument) est d’origine amérindienne.",
    correct: false
  };

  const retryMesopo = {
    text: "Son nom provient d'un mot persan signifiant « roseau ».",
    correct: true
  };

  const linkMesopo = {
    url: "https://example.com/article",  // Remplace cette URL par celle que tu veux
    text: "Lire l'article"
  };

  const trueFalseHimalaya = {
    text: "Le royaume de Shambhala était connu pour être un “Royaume de la guerre et de la gloire”",
    correct: false
  };

  const retryHimalaya = {
    text: "Sur les cartes bouddhiste, Shambhala était placé au coeur des montagnes de l'himalaya.",
    correct: false
  };

  const linkHimalaya = {
    url: "https://example.com/article",  // Remplace cette URL par celle que tu veux
    text: "Lire l'article"
  };

  const locations = ['Paris', 'New York', 'Tokyo'];

  return (
    <div className="app-container">
      <div className="score-container">
        <h1>Pièces de vaisseau : {score} / 10</h1>
      </div>
      <div className="content-container">
        {step === 0 && <NarrativeSequence steps={narrativeTexts} onNext={handleNarrativeEnd} />}
        {step === 1 && <VideoSequence videoSrc="/videos/video1.mp4" onEnd={handleVideoEnd} />}
        {step === 2 && <NarrativeSequence steps={[{ text:"Il atterrit sur un îlot entouré par l’océan, il s’agit de la mythique cité d’Atlantide pendant son âge d’or."}]} onNext={handleNarrativeEnd} />}
        {step === 3 && <VideoSequence videoSrc="/videos/video2.mp4" onEnd={handleVideoEnd} />}
        {step === 4 && <NarrativeSequence steps={narrativeGrotte} onNext={handleNarrativeEnd} />}
        {step === 5 && <VideoSequence videoSrc="/videos/video3.mp4" onEnd={handleVideoEnd} />}
        {step === 6 && <NarrativeSequence steps={narrativeDeluge} onNext={handleNarrativeEnd} />}
        {step === 7 && <VideoSequence videoSrc="/videos/carte1.mp4" onEnd={handleVideoEnd} />}
        {step === 8 && <NarrativeSequence steps={narrativeApophis} onNext={handleNarrativeEnd} />}
        {step === 9 && <TrueFalseQuestion question={trueFalseQuestion} retryQuestion={retryQuestion} onAnswer={handleAnswer} />}
        {step === 10 && (
          <NarrativeWithLinkSequence
            steps={[{ text:"Pour en apprendre plus, vous pouvez lire un article sur le serpent des Ténèbres et du cahos"}]}
            externalLink={linkApophis}
            onNext={handleNarrativeEnd}
          />
        )}
        {step === 11 && <NarrativeSequence steps={[{ text:"L'oracle invite l'Alien à se déplacer dans une nouvelle Zone"}]} onNext={handleNarrativeEnd} />}
        {step === 12 && <NarrativeSequence steps={[{ text:"Oracle : “Pour la prochaine épreuve, je t’emmène en Mésopotamie. Que connais-tu sur cette ancienne région du monde ?", image:"/images/map3.png"}]} onNext={handleNarrativeEnd} />}
        {step === 13 && <TrueFalseQuestion question={trueFalseMesopo} retryQuestion={retryMesopo} onAnswer={handleAnswer} />}
        {step === 14 && (
          <NarrativeWithLinkSequence
            steps={[{ text:"Pour en apprendre plus sur le Ney, vous pouvez lire cet article"}]}
            externalLink={linkMesopo}
            onNext={handleNarrativeEnd}
          />
        )}
        {step === 15 && <NarrativeSequence steps={[{ text:"Ici, le vent souffle très fort et les températures glaciales de haute altitude gèlent l’Alien.", image:"/images/map4.png"}]} onNext={handleNarrativeEnd} />}
        {step === 16 && <NarrativeSequence steps={[{ text:"Oracle : Bienvenue dans les montagnes de l’Himalaya. C’est ici que t’attends ta nouvelle épreuve.” ", image:"/images/map4.png"}]} onNext={handleNarrativeEnd} />}
        {step === 17 && <TrueFalseQuestion question={trueFalseHimalaya} retryQuestion={retryHimalaya} onAnswer={handleAnswer} />}
        {step === 18 && (
          <NarrativeWithLinkSequence
            steps={[{ text:"Pour en apprendre plus, vous pouvez lire un article sur le serpent des Ténèbres et du cahos"}]}
            externalLink={linkApophis}
            onNext={handleNarrativeEnd}
          />
        )}
      </div>
    </div>
  );
};

export default App;