import React, { Component } from 'react';
import axios from 'axios';
import './Update.css';

export default class Updatew extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeIp = this.onChangeIp.bind(this);
        this.onChangeModelCPE = this.onChangeModelCPE.bind(this);
        this.onChangeModelModem = this.onChangeModelModem.bind(this);
        this.onChangeUserModem = this.onChangeUserModem.bind(this);
        this.onChangePassModem = this.onChangePassModem.bind(this);
        this.onChangeWifiModem = this.onChangeWifiModem.bind(this);
        this.onChangeUserCPE = this.onChangeUserCPE.bind(this);
        this.onChangePassCPE = this.onChangePassCPE.bind(this);
        this.onChangeUserPPPOE = this.onChangeUserPPPOE.bind(this);
        this.onChangePassPPPOE = this.onChangePassPPPOE.bind(this);
        this.onChangeZona = this.onChangeZona.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            ip: '',
            modelCPE: '',
            modelModem: '',
            userModem:'',
            passModem: '',
            wifiModem: '',
            usuarioCPE: '',
            passCPE: '',
            userPPPOE: '',
            passPPPOE: '',
            zona: ''
        }
    }

    componentDidMount() {
        axios.get('/api/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                name: response.data.name,
                ip: response.data.ip,
                modelCPE: response.data.model_cpe,
                modelModem: response.data.model_modem,
                userModem: response.data.user_modem,
                passModem: response.data.pass_modem,
                wifiModem: response.data.wifi_modem,
                usuarioCPE: response.data.usuario_cpe,
                passCPE: response.data.pass_cpe,
                userPPPOE: response.data.usuario_pppoe,
                passPPPOE: response.data.pass_pppoe,
                zona: response.data.zona
            })   
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeIp(e) {
        this.setState({
            ip: e.target.value
        })
    }

    onChangeModelCPE(e) {
        this.setState({
            modelCPE: e.target.value
        })
    }

    onChangeModelModem(e) {
        this.setState({
            modelModem: e.target.value
        })
    }

    onChangeUserModem(e) {
        this.setState({
            userModem: e.target.value
        })
    }

    onChangePassModem(e) {
        this.setState({
            passModem: e.target.value
        })
    }

    onChangeWifiModem(e) {
        this.setState({
            wifiModem: e.target.value
        })
    }

    onChangeUserCPE(e) {
        this.setState({
            usuarioCPE: e.target.value
        })
    }

    onChangePassCPE(e) {
        this.setState({
            passCPE: e.target.value
        })
    }

    onChangeUserPPPOE(e) {
        this.setState({
            userPPPOE: e.target.value
        })
    }

    onChangePassPPPOE(e) {
        this.setState({
            passPPPOE: e.target.value
        })
    }

    onChangeZona(e) {
        this.setState({
            zona: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            ip: this.state.ip,
            model_modem: this.state.modelModem,
            model_cpe: this.state.modelCPE,
            user_modem: this.state.userModem,
            pass_modem: this.state.passModem,
            wifi_modem: this.state.wifiModem,
            usuario_cpe: this.state.usuarioCPE,
            pass_cpe: this.state.passCPE,
            usuario_pppoe: this.state.userPPPOE,
            pass_pppoe: this.state.passPPPOE,
            zona: this.state.zona
        };
        console.log(obj);
        axios.put('/api/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
            this.props.history.push('/updated');
    }

    render() {
        return(
            <div>
                <h1 className="editing"> {`Estas Editando a ${this.state.name}`}</h1>
                <div>
                <div class="row">
    <form class="col s12" className="Form" onSubmit={this.onSubmit}>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="" id="Nombre" type="text" class="validate" 
          value={this.state.name} onChange={this.onChangeName}/>
          <label for="Nombre"></label>
          <span class="helper-text left" data-error="wrong" data-success="Nombre">Nombre</span>
        </div>
        <div class="input-field col s6">
          <input placeholder="" id="Ip" type="text" class="validate" 
          value={this.state.ip} onChange={this.onChangeIp}/>
          <label for="Ip"></label>
          <span class="helper-text left" data-error="wrong" data-success="Ip">Ip</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="" id="Modelo del Modem" type="text" class="validate" 
          value={this.state.modelModem} onChange={this.onChangeModelModem}/>
          <label for="Modelo del Modem"></label>
          <span class="helper-text left" data-error="wrong" data-success="Modelo del Modem">Modelo del Modem</span>
        </div>
        <div class="input-field col s6">
          <input placeholder="" id="Modelo del CPE" type="text" class="validate" 
          value={this.state.modelCPE} onChange={this.onChangeModelCPE}/>
          <label for="Modelo del CPE"></label>
          <span class="helper-text left" data-error="wrong" data-success="Modelo del CPE">Modelo del CPE</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="" id="Usuario del Modem" type="text" class="validate" 
          value={this.state.userModem} onChange={this.onChangeUserModem}/>
          <label for="Usuario del Modem"></label>
          <span class="helper-text left" data-error="wrong" data-success="Usuario del Modem">Usuario del Modem</span>
        </div>
        <div class="input-field col s6">
          <input placeholder="" id="Contraseña del Modem" type="text" class="validate" 
          value={this.state.passModem} onChange={this.onChangePassModem}/>
          <label for="Contraseña del Modem"></label>
          <span class="helper-text left" data-error="wrong" data-success="Contraseña del Modem">Contraseña del Modem</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="" id="Wifi Modem" type="text" class="validate" 
          value={this.state.wifiModem} onChange={this.onChangeWifiModem}/>
          <label for="Wifi Modem"></label>
          <span class="helper-text left" data-error="wrong" data-success="Wifi Modem">Wifi Modem</span>
        </div>
        <div class="input-field col s6">
          <input placeholder="" id="Usuario de CPE" type="text" class="validate" 
          value={this.state.usuarioCPE} onChange={this.onChangeUserCPE}/>
          <label for="Usuario de CPE"></label>
          <span class="helper-text left" data-error="wrong" data-success="Usuario de CPE">Usuario de CPE</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="" id="Contraseña de CPE" type="text" class="validate" 
          value={this.state.passCPE} onChange={this.onChangePassCPE}/>
          <label for="Contraseña de CPE"></label>
          <span class="helper-text left" data-error="wrong" data-success="Contraseña de CPE">Contraseña de CPE</span>
        </div>
        <div class="input-field col s6">
          <input placeholder="" id="Usuario de PPPOE" type="text" class="validate" 
          value={this.state.userPPPOE} onChange={this.onChangeUserPPPOE}/>
          <label for="Usuario de PPPOE">Usuario de PPPOE</label>
          <span class="helper-text left" data-error="wrong" data-success="Usuario de PPPOE">Usuario de PPPOE</span>
        </div>
      </div>
      <div class="row">
      <div class="input-field col s6">
          <input placeholder="" id="Contraseña de PPPOE" type="text" class="validate" 
          value={this.state.passPPPOE} onChange={this.onChangePassPPPOE}/>
          <label for="Contraseña de PPPOE"></label>
          <span class="helper-text left" data-error="wrong" data-success="Contraseña de PPPOE">Contraseña de PPPOE</span>
        </div>
        <div class="input-field col s6">
        <label></label>
  <select class="browser-default" value={this.state.zona} onChange={this.onChangeZona}>
    <option value="" disabled selected>Selecciona una Zona</option>
    <option value="PLG">PLG</option>
    <option value="REF">REF</option>
    <option value="CS">CS</option>
  </select>
        </div>
      </div>
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Enviar
                </button>
              </div>
    </form>
  </div>
                </div>
            </div>
        )
    }
}
