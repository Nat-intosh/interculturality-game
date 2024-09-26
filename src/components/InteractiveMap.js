import React, { useEffect } from 'react';

const InteractiveMap = ({ locations, onReachLocation }) => {
  useEffect(() => {
    let currentLocation = 0;
    const interval = setInterval(() => {
      if (currentLocation < locations.length) {
        onReachLocation(locations[currentLocation]);
        currentLocation++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // Change location every 2 seconds

    return () => clearInterval(interval);
  }, [locations, onReachLocation]);

  return <div className="map-container">Carte Interactive</div>;
};

export default InteractiveMap;