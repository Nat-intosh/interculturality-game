import React, { useRef, useEffect } from 'react';

const VideoSequence = ({ videoSrc, onEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Empêcher la mise en pause de la vidéo
    const preventPause = (e) => {
      if (video && video.paused) {
        video.play().catch((error) => {
          console.error("Erreur lors de la reprise de la vidéo : ", error);
        });
      }
    };

    video.addEventListener('pause', preventPause);  // Écouter l'événement pause

    // Nettoyer l'écouteur d'événements lorsqu'on quitte le composant
    return () => {
      video.removeEventListener('pause', preventPause);
    };
  }, []);

  return (
    <div className="video-sequence">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        controls={false}  // Masquer les contrôles de lecture
        disablePictureInPicture  // Désactiver Picture-in-Picture
        onEnded={onEnd}  // Appel lorsque la vidéo est terminée
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default VideoSequence;
