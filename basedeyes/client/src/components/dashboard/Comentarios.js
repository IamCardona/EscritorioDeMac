import React, { Component } from 'react'

import Dashboard from './Dashboard'
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Textarea, TextInputField, Button, Label, toaster } from 'evergreen-ui';

export default class Comentarios extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            encabezado: '',
            cuerpo: '',
            errors: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEncabezado = this.onChangeEncabezado.bind(this);
        this.onChangeCuerpo = this.onChangeCuerpo.bind(this);
    }

    onChangeEncabezado = e => {
        this.setState({
            encabezado: e.target.value
        })
    }

    onChangeCuerpo = e => {
        this.setState({
            cuerpo: e.target.value
        })
    }

    onSubmit = e => {

        e.preventDefault();
        const comment = {
            encabezado: this.state.encabezado,
            comentario: this.state.cuerpo,
            status: 'Pendiente'
        }
        axios.post('/api/comment', comment)
        .then(res => {
          
          this.setState({
              encabezado: '',
              cuerpo: ''
          })

          this.data()
          toaster.success(
            'Tu Comentario se guardo Correctamente',
            {
                description: 'ahora todos lo podran leer!'
              }
          )
        })

        .catch(error => {
            let algo = error.response.data.message
            this.setState({ errors: algo })
        }
        )
    }

    componentDidMount() {
        this.data()
    }

    data() {
        axios.get('/api/comment')
        .then(res => {
            this.setState({ comments: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const comments = this.state.comments
        const { errors } = this.state;

        return(
            <div>
                <Dashboard />
                <div style={{ width: '85%', margin: '0 auto' }}>

                <form onSubmit={this.onSubmit}>

                <TextInputField
                value={this.state.encabezado}
                onChange={this.onChangeEncabezado}
                placeholder="Encabezado de tu comentario"
                label="Encabezado" />


                <Label
    htmlFor="textarea-2"
    marginBottom={4}
    display="block"
  >
    Cuerpo
  </Label>
                    <Textarea
                    value={this.state.cuerpo}
                    onChange={this.onChangeCuerpo}
                    placeholder="Describe brevemente tu problema o duda." />
                    <p style={{ color: 'red' }}>{this.state.errors}</p>
                    <Button >Agregar Comentario!</Button>
                </form>

                <Card style={{ margin: '2rem auto' }}>
                    <CardContent>
                    <Typography color="textSecondary" gutterBottom>
          Sean Totalmente bienvenidas todas las criticas constructivas!
        </Typography>
                    </CardContent>
                </Card>

                {comments.map(obj => {
                    return(
                        <Card style={{ margin: '2rem auto' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {obj.encabezado}
        </Typography>
        <Typography variant="body2" component="p">
          {obj.comentario}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography style={{ color: 'red' }}>status: {obj.status}</Typography>
      </CardActions>
    </Card>
                    )
                })}

                </div>
            </div>
        )
    }
}