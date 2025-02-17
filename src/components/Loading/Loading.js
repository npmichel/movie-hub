import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Chargement...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-animation">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;