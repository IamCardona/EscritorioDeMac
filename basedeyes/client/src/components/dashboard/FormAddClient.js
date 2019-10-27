import React, { Component } from 'react'
import axios from 'axios'

import { TextInputField } from 'evergreen-ui';
import { isNull } from 'util';

import {InputText} from "primereact/inputtext";
import {Button} from 'evergreen-ui';
import {Checkbox} from "primereact/checkbox";
import {RadioButton} from "primereact/radiobutton";
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../App.css'

import { Dialog, Pane, Paragraph } from 'evergreen-ui'
import Dashboard from './Dashboard'
import { Link } from 'react-router-dom'

export default class FormAddClient extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeNumeroCliente = this.onChangeNumeroCliente.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeZona = this.onChangeZona.bind(this);
        this.onChangeModelCPE = this.onChangeModelCPE.bind(this);
        this.onChangeModelModem = this.onChangeModelModem.bind(this);
        this.onChangeUserModem = this.onChangeUserModem.bind(this);
        this.onChangePassModem = this.onChangePassModem.bind(this);
        this.onChangeWifiModem = this.onChangeWifiModem.bind(this);
        this.onChangeUsuarioCPE = this.onChangeUsuarioCPE.bind(this);
        this.onChangePassCPE = this.onChangePassCPE.bind(this);
        this.onChangeUsuarioPPPOE = this.onChangeUsuarioPPPOE.bind(this);
        this.onChangePassPPPOE = this.onChangePassPPPOE.bind(this)
        this.onChangeIp = this.onChangeIp.bind(this);
        this.onChangeName = this.onChangeName.bind(this);


        this.state = {
            numero_cliente: '',
            ip: '',
            name: '',
            model_cpe: '',
            model_modem: '',
            user_modem: '',
            pass_modem: '',
            wifi_modem: '',
            usuario_cpe: '',
            pass_cpe: '',
            usuario_pppoe: '',
            pass_pppoe: '',
            zona: 'PLG',
            errors: '',
            isShown: false
        }
    }

    // Form Methods

    onChangeName = e => {
        this.setState({ name: e.target.value})
    }

    onChangeNumeroCliente = e => {
        this.setState({
            numero_cliente: e.target.value
        })
    }

    onChangeModelCPE = e => {
        this.setState({ model_cpe: e.target.value })
    }

    onChangeModelModem = e => {
        this.setState({ model_modem: e.target.value })
    }

    onChangeUserModem = e => {
        this.setState({ user_modem: e.target.value })
    }

    onChangePassModem = e => {
        this.setState({ pass_modem: e.target.value })
    }

    onChangeWifiModem = e => {
        this.setState({ wifi_modem: e.target.value })
    }

    onChangeUsuarioCPE = e => {
        this.setState({ usuario_cpe: e.target.value })
    }

    onChangePassCPE = e => {
        this.setState({ pass_cpe: e.target.value })
    }

    onChangeUsuarioPPPOE = e => {
        this.setState({ usuario_pppoe: e.target.value })
    }

    onChangePassPPPOE = e => {
        this.setState({ pass_pppoe: e.target.value })
    }

    onChangeZona = e => {
        this.setState({ zona: e.target.value})
    }

    onChangeIp = e => {
        this.setState({ ip: e.target.value})
    }

    onSubmit = e => {

        e.preventDefault();
        const newClient = {
            numero_cliente: this.state.numero_cliente,
            ip: this.state.ip,
            name: this.state.name,
            a: this.state.a,
            b: this.state.b,
            c: this.state.c,
            d: this.state.d,
            model_cpe: this.state.model_cpe,
            model_modem: this.state.model_modem,
            user_modem: this.state.user_modem,
            pass_modem: this.state.pass_modem,
            wifi_modem: this.state.wifi_modem,
            usuario_cpe: this.state.usuario_cpe,
            pass_cpe: this.state.pass_cpe,
            usuario_pppoe: this.state.usuario_pppoe,
            pass_pppoe: this.state.pass_pppoe,
            zona: this.state.zona
        }
        axios.post('/api/clients', newClient)
        .then(res => {
          console.log(res)
          this.setState({ isShown: true,
            numero_cliente: '',
            ip: '',
            name: '',
            model_cpe: '',
            model_modem: '',
            user_modem: '',
            pass_modem: '',
            wifi_modem: '',
            usuario_cpe: '',
            pass_cpe: '',
            usuario_pppoe: '',
            pass_pppoe: '',
            zona: '',
            errors: '' })
        })
        .catch(error => {
            let algo = error.response.data.message
            this.setState({ errors: algo })
        }
        )
    }

    render() {
        const { errors } = this.state;

        return(
            <div>
      <Dialog
        isShown={this.state.isShown}
        title={`El Cliente se agrego Correctamente`}
        onCloseComplete={() => this.setState({ isShown: false })}
        hasFooter={false}
      >
        <Pane>
            <Link to="/table" className="Link">
              <Button>Ver Tabla</Button>
            </Link>
          </Pane>
      </Dialog>
                <Dashboard />
                <div className="ContainerForm">
                <Form onSubmit={this.onSubmit}>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="exampleEmail">Nombre</Label>
              <Input type="text" name="email" id="exampleEmail" placeholder="Introduce un Nombre"
              value={this.state.name}
              onChange={this.onChangeName} />
            </FormGroup>
          </Col>

        </Row>
        <Row form>
        <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Modelo de CPE</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.model_cpe}
              onChange={this.onChangeModelCPE} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Modelo de Modem</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.model_modem}
              onChange={this.onChangeModelModem} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Usuario de Modem</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.user_modem}
              onChange={this.onChangeUserModem} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
        <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">contraseña de Modem</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.pass_modem}
              validationMessage={isNull}
              onChange={this.onChangePassModem} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Wifi Modem</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.wifi_modem}
              validationMessage={isNull}
              onChange={this.onChangeWifiModem} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Usuario de CPE</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.usuario_cpe}
              validationMessage={isNull}
              onChange={this.onChangeUsuarioCPE} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
        <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Contraseña de CPE</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.pass_cpe}
              validationMessage={isNull}
              onChange={this.onChangePassCPE} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Usuario de PPPOE</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.usuario_pppoe}
              validationMessage={isNull}
              onChange={this.onChangeUsuarioPPPOE} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">Contraseña de PPPOE</Label>
              <Input type="text" name="password" id="examplePassword"
              value={this.state.pass_pppoe}
              validationMessage={isNull}
              onChange={this.onChangePassPPPOE} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
          <FormGroup>
              <Label for="examplePassword">Ip</Label>
              <Input type="text" name="password" id="examplePassword" placeholder="Introduce una Ip"
              value={this.state.ip}
              onChange={this.onChangeIp} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleZip">Id</Label>
              <Input type="text" 
              placeholder="numero de cliente"
              name="zip" 
              id="exampleZip"
              value={this.state.numero_cliente}
              onChange={this.onChangeNumeroCliente} />
              
            </FormGroup>  
          </Col>
          <Col md={4}>
          <FormGroup>
          <Label for="exampleSelect">Zona</Label>
          <Input type="select"
           name="select"
            id="exampleSelect"
            value={this.state.zona}
            onChange={this.onChangeZona}>
            <option>PLG</option>
            <option>CS</option>
            <option>REF</option>
          </Input>
        </FormGroup>
          </Col>
        </Row>

        <div className="Center">
        <Button>Enviar
        </Button>
        </div>
      </Form>

      <div className="Center">
      <p className="errosForm">{errors}</p>
      </div>
      
            </div>
            </div>
        )
    }
}