import React from 'react';
import '../resources/sappo.css';
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";

function TitleBar () {
    return (
    <Navbar>
        <img className="rotate90" alt="Sappo Logo" height="75" width="90" src={ require('../resources/1b63d0be-ca75-422f-8bff-b980dc0559f0.jpg') } />
        <NavbarBrand id="title-text">Sappo</NavbarBrand>
    </Navbar>
    );
};

export default TitleBar;