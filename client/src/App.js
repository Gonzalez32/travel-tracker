import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    // here should be the center of the USA map
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/bragchump/cktymqgm601ug18pmg8n0wwo8"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(entry => (
          <>
          <Marker
            key={entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            onClick={() => setShowPopup({
              ...showPopup,
              [entry._id]: true,
            })}
            offsetLeft={-12} 
            offsetTop={-24}
            >
            {/* <div>
              {entry.title}
            </div> */}
            <div>
              <img 
                className="Marker" 
                src="https://i.imgur.com/y0G5YTX.png" 
                alt="Marker"
              />
            </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude} 
                  longitude={entry.longitude} 
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({
                    ...showPopup,
                    [entry._id]: false,
                  })}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App;