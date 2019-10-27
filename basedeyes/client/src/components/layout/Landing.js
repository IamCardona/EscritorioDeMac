// Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Imports Media and Files
import Logo from '../media/LogoYes.png'
import '../../App.css'

// Imports Material-UI Components
import { Button } from 'evergreen-ui'

class Landing extends Component {
  render() {
    return (
      <div className="Container">
        <div>
          <div className="ContainerPictureHome">
            <img src={Logo} alt="Logo de Yes" className="Picture"/>
          </div>
          <div className="ContainerLinksHome Center">
            <Button className="ButtonHomeLeft">
              <Link to="/login" className="Link LoginButton">Login</Link>
            </Button>
          </div>
        </div> 
      </div>
    );
  }
}

export default Landing;
// Boton de Registro
/* 
<Button className="ButtonHomeRight" variant="contained" color="primary">
              <Link to="/register" className="Link">Register</Link>
            </Button>
*/