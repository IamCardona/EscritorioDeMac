import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Edit.css';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: [],
            first: 0,
            rows: 10
        }
    }

    componentDidMount() {
        this.data()
    }

    data() {
        axios.get('/api/')
        .then(response => {
            this.setState({ cliente: response.data });
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    delete(id){
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1> Eliminar </h1>
                  <p>{`Estas Seguro que deseas Eliminar a ${id.name} de la Base de Datos?`}</p>
                  <button onClick={onClose} className="btn btn-primary">No</button>
                  <button className="btn btn-danger red"
                    onClick={() => {
                        console.log(id);
                        axios.delete('/api/'+id._id)
                        .then((result) => {
                        this.data();
                        onClose();
                        });
                    }}
                  >
                    Yes!
                  </button>
                </div>
              );
            }
          });
      }

    render() {

        return(
            <div>
                <h1>Tabla Clientes</h1>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="table">Nombre</th>
                            <th className="table">Ip</th>
                            <th className="table">Modelo de CPE</th>
                            <th className="table">Modelo del Modem</th>
                            <th className="table">Usuario Modem</th>
                            <th className="table">Contraseña del Modem</th>
                            <th className="table">Wifi Modem</th>
                            <th className="table">Usuario de CPE</th>
                            <th className="table">Contraseña de CPE</th>
                            <th className="table">Usuario de PPPOE</th>
                            <th className="table">Contraseña de PPPOE</th>
                            <th className="table">Zona</th>
                            <th className="table">Edit</th>
                            <th className="table">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cliente.map(obj => {
                            return (
                            <tr key={obj.id}>
                            <td className="table"> {obj.name} </td>
                            <td className="table"> {obj.ip} </td>
                            <td className="table"> {obj.model_cpe} </td>
                            <td className="table"> {obj.model_modem} </td>
                            <td className="table"> {obj.user_modem} </td>
                            <td className="table"> {obj.pass_modem} </td>
                            <td className="table"> {obj.wifi_modem} </td>
                            <td className="table"> {obj.usuario_cpe} </td>
                            <td className="table"> {obj.pass_cpe} </td>
                            <td className="table"> {obj.usuario_pppoe} </td>
                            <td className="table"> {obj.pass_pppoe} </td>
                            <td className="table"> {obj.zona} </td>
                            <td className="table">
                                <Link to={"/update/"+obj._id} className="btn btn-primary blue">Edit</Link>
                            </td>
                            <td className="table">
                                <button className="btn btn-danger red" onClick={this.delete.bind(this, obj)}>Delete</button>
                            </td>
                        </tr>
                            );
                        })}
                    </tbody>
                </Table>

            </div>
        )
    }
}
