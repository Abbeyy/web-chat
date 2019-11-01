import React from 'react';
import '../resources/sappo.css';

function TitleBar () {
    return (
        <div className="title-bar">
            <img className="rotate90" alt="Sappo Logo" height="75" width="90" src={ require('../resources/1b63d0be-ca75-422f-8bff-b980dc0559f0.jpg') } />
            <h1 className="app-title">Sappo</h1>
        </div>
    );
};

export default TitleBar;