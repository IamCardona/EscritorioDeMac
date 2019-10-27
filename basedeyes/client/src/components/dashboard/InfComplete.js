import React, { Component } from 'react'

import { Dialog, Paragraph, Pane } from 'evergreen-ui'
import axios from 'axios'

export default class InfComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShownInf: true,
            client: {}
        }
    }

    componentDidMount() {
        this.data()
    }
  
    data() {
        axios.get('/api/clients/' + this.props.match.params.id)
        .then(res => {
            this.setState({ client: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }
  

    render() {
        const client = this.state.client

        return(
            <div>
                <Dialog
        isShown={this.state.isShownInf}
        title={`Informacion tecnica de ${client.name}`}
        onCloseComplete={() => this.props.history.push("/table")}
      >
        {({ close }) => (
          <Pane>
            <Paragraph><b>Numero de Cliente: </b>{client.numero_cliente}</Paragraph>
            <Paragraph><b>Nombre: </b>{client.name}</Paragraph>
            <Paragraph><b>Ip: </b>{client.ip}</Paragraph>
            <Paragraph><b>Zona: </b>{client.zona}</Paragraph>
            <Paragraph><b>Modelo de CPE: </b>{client.model_cpe}</Paragraph>
            <Paragraph><b>Modelo de Modem: </b>{client.model_modem}</Paragraph>
            <Paragraph><b>Usuario de Modem: </b>{client.user_modem}</Paragraph>
            <Paragraph><b>Contraseña de Modem: </b>{client.pass_modem}</Paragraph>
            <Paragraph><b>Wifi de Modem: </b>{client.wifi_modem}</Paragraph>
            <Paragraph><b>Usuario de CPE: </b>{client.usuario_cpe}</Paragraph>
            <Paragraph><b>Contraseña de CPE: </b>{client.pass_cpe}</Paragraph>
            <Paragraph><b>Usuario de PPPOE: </b>{client.usuario_pppoe}</Paragraph>
            <Paragraph><b>Contraseña de PPPOE: </b>{client.pass_pppoe}</Paragraph>
          </Pane>
        )}
      </Dialog>
            </div>
        )
    }
}