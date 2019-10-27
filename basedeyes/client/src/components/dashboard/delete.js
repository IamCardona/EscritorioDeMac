import React, { Component } from 'react'
import { Dialog } from 'evergreen-ui'
import axios from 'axios'

import Divider from '@material-ui/core/Divider';
import { Paragraph, Button, Menu } from 'evergreen-ui'


export default class Delete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: true,
            isShown2: false,
            client: {},
        }

        this.delete = this.delete.bind(this)
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

    delete(id){
        axios.delete('/api/clients/' + id)
                        .then((result) => {

                        this.setState({ isShown2: true })
                        });
      }

    render() {
        return(
            <div>

                <Dialog
        isShown={this.state.isShown}
        confirmLabel="Eliminar!"
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => this.props.history.push("/table")}
      >
 <Paragraph><b> <h5>Estas seguro que deseas eliminar a {this.state.client.name} de la base de datos?</h5> </b></Paragraph>
 <br></br>
      <Divider />
      <br></br>
      <Paragraph> No se borrara de forma permanente, solo se actualizara su estado a inactivo.</Paragraph>
      <br></br>
      <Divider />      
      <br></br>

        <Button
        style={{ float: 'right' }}
        onClick={() => this.delete(this.props.match.params.id)}
        color="danger">
        Eliminar...
        </Button>
        
      </Dialog>

      <Dialog
        isShown={this.state.isShown2}
        title={`${this.state.client.name} se ha eliminado correctamente!`}
        onCloseComplete={() => this.props.history.push("/table")}
        confirmLabel="Cerrar"
        hasFooter={false}
      >
        <Paragraph>Puedes recuperar este cliente en la tabla de eliminados.</Paragraph>
        <br></br>
        <Menu.Divider />

        <br></br>
        <Button
        style={{ float: 'right' }}
        onClick={() => this.props.history.push("/table")}
        appearance="primary">
        Cerrar
        </Button>
      </Dialog>
            </div>
        )
    }
} 

/*
<Dialog
        isShown={this.state.isShown}
        title={`Estas Seguro que deseas Eliminar a ${client.name} de la base de datos?`}
        intent="danger"
        onCloseComplete={() => this.setState({ isShown: false })}
        onConfirm={() => this.delete(client)}
        confirmLabel="Eliminar!"
      >
        No se borrara de forma permanente, solo se actualizara su estado a inactivo.
      </Dialog>
*/