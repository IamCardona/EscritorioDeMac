import React, { Component } from 'react'
import Dashboard from './Dashboard'
import '../../App.css'

import {Chart} from 'primereact/chart'
import axios from 'axios'
import TemporaryDrawer from './BackChange'

export default class Home extends Component {
    render() {
        return(
            <div>
                <Dashboard />
                <TemporaryDrawer />
                <PolarAreaChartDemo />
                
            </div>
        )
    }
}

// Polar Area
class PolarAreaChartDemo extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        cliente: [],
        PLG: '',
        CS: '',
        REF: ''
    }
    }
  
    componentDidMount() {
      this.data()
  }
  
  data() {
    axios.get('/api/clients')
    .then(response => {
        this.setState({ cliente: response.data });
  
        const plgFilter = this.state.cliente.filter(function(obj) {
            return obj.zona === 'PLG'
        })
  
        this.setState({ PLG: plgFilter.length });
        
        const refFilter = this.state.cliente.filter(function(obj) {
            return obj.zona === 'REF'
        }) 
  
        this.setState({ REF: refFilter.length });
  
        const csFilter = this.state.cliente.filter(function(obj) {
            return obj.zona === 'CS'
        }) 
  
        this.setState({ CS: csFilter.length });
  
    })
    .catch(function (error) {
        console.log(error)
    })
  }
  
    render() {
        const data = {
            datasets: [{
                data: [this.state.PLG, this.state.CS, this.state.REF],
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56"
                ],
                label: 'My dataset'
            }],
            labels: [
                "PLG",
                "CS",
                "REF"
            ]
        };
  
        return (
            <div>
                <div className="content-section implementation CienDash">
                    <Chart type="doughnut" data={data} className="CienDash"/>
                </div>
            </div>
        )
    }
  }
