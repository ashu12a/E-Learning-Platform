import React from 'react';
import loading from '../assets/img/Loader.gif'

export default function Loader(){
    return (
        <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, // Ensure the loader appears above other elements
        }}
      >
        <div style={{ position: 'relative' }}>
          <img src={loading} width={50} alt="ELMS Loader"/>
          {/* Optional: Add text or additional content below the loader if needed */}
        </div>
      </div>
    );
};


  