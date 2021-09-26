import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
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
          <Marker
            key={entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-12} 
            offsetTop={-24}
          >
            <div>
              {entry.title}
            </div>
            <div>
              <img className="Marker" src="https://i.imgur.com/y0G5YTX.png" alt="Marker"/>
            </div>
            {/* Uncommented the svg tag might use it later. */}
            {/* <svg 
              className="Marker"
              style={{
                // width: `calc(1vmin * ${viewport.zoom})`,
                // height: `calc(1vmin * ${viewport.zoom})`,
                width: '24px',
                height: '24px'
              }}
              viewBox="0 0 24 24" 
              width="44" 
              height="44" 
              stroke="currentColor" 
              stroke-width="1.5" 
              fill="none" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path 
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              >
              </path>
              <circle 
                cx="12" cy="10" r="3">
              </circle>
            </svg> */}
            <Popup
              latitude={37.78}
              longitude={-122.41}
              closeButton={true}
              closeOnClick={false}
              // onClose={() => togglePopup(false)}
              anchor="top" >
              <div>You are here</div>
            </Popup>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default App;