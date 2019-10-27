import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Logo from '../media/LogoYes.png'
import '../../App.css'
import Box from '@material-ui/core/Box'
import { Icon, Dialog, Paragraph } from 'evergreen-ui' 
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isShown: false,
      isShown2: false
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="NavBarDash">
        <Box boxShadow={1}>
        <Navbar color="blue" light>
          <NavbarBrand className="mr-auto"><img src={Logo} alt="Logo de Yes" className="Picture PictureNavBar"/></NavbarBrand>
          <div>
            <Icon icon="info-sign" style={{ marginRight: '1rem' }} onClick={() => this.setState({ isShown2: true })} className="iconBack"/>
          </div>
          <div>
            <Icon icon="notifications" style={{ marginRight: '1rem' }} onClick={() => this.setState({ isShown: true })} className="iconBack"/>
          </div>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            
              <NavItem>
                <Link className="ItemNavBar Link2" to="/add"><Icon icon="new-person" className="IconNavBar"/>Agregar Cliente</Link>
              </NavItem>
              <NavItem>
                <Link className="ItemNavBar Link2" to="table"><Icon icon="people" className="IconNavBar"/>Tabla de Clientes</Link>
              </NavItem>
              <NavItem>
                <Link className="ItemNavBar Link2" to="/dashboard"><Icon icon="dashboard" className="IconNavBar"/>Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link className="ItemNavBar Link2" to="/comentarios"><Icon icon="comment" className="IconNavBar"/>Comentarios</Link>
              </NavItem>
              <NavItem>
                <NavLink className="Separador"></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="ItemNavBar" onClick={this.onLogoutClick}><Icon icon="log-out" className="IconNavBar"/>Cerrar Seccion</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
        </Box>

        <Dialog
        isShown={this.state.isShown}
        title="Novedades"
        onCloseComplete={() => this.setState({ isShown: false })}
        confirmLabel="Entendido!"
      >
        <Paragraph>- Solucion de errores sobre actualizacion de clientes.</Paragraph>
        <Paragraph>- Actualizacion de la UI.</Paragraph>
        <Paragraph>- Actualizacion de la NavBar.</Paragraph>
        <Paragraph>- Para una mejor UX se recomienda acceder desde alguna computadora de escritorio o laptop.</Paragraph>
        <br></br>
        <Paragraph>- Nueva seccion de comentarios y observaciones.</Paragraph>
        <Paragraph>- Proximamente seccion de mensajeria.</Paragraph>
      </Dialog>

      <Dialog
        isShown={this.state.isShown2}
        title="Base de Datos de Yes es Internet!"
        onCloseComplete={() => this.setState({ isShown2: false })}
        confirmLabel="Entendido!"
      >
        <Paragraph><b>Desarrollada por:</b></Paragraph>
        <Paragraph>Iam Cardona</Paragraph>
        <br></br>
        <Paragraph><b>Derechos</b></Paragraph>
        <Paragraph>Yes es Internet!</Paragraph>
        <Paragraph>Asto Forte S.A.S de C.V. Todos los derechos reservados.</Paragraph>
        <Paragraph>Av.Del Cimatario #415 Santiago de Queretaro.</Paragraph>
      </Dialog>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
