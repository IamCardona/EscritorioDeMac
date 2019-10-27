import React, { Component } from 'react';
import axios from 'axios';
import { filter } from 'fuzzaldrin-plus';
import {
    Table,
    Popover,
    Position,
    Menu,
    Avatar,
    Text,
    IconButton,
    TextDropdownButton,
    Tab
  } from 'evergreen-ui'
  import { Dialog, Pane, Button, Paragraph } from 'evergreen-ui';
  import Dashboard from './Dashboard'

  import { Link } from 'react-router-dom';
  import '../../App.css'

  // Typography Regulation
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  function capitalize2(string) {
      return string.toUpperCase()
  }

  // Order
  const Order = {
      NONE: 'NONE',
      ASC: 'ASC',
      DESC: 'DESC'
  }

export default class TableClients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            searchQuery: '',
            orderedColumn: 1,
            ordering: Order.NONE,
            column2Show: 'ip',
            delete: '',
            searchQuery2: '',
            zonaFilter: 'Zona',
            isShown: false,
            isShownInf: false
        }

        
    }

    // Test //

    /*
    onChangeDelete = e => {
        this.setState({ delete: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();
        axios.delete('/api/inf-clients/'+this.state.delete)
        .then(res => {
            this.data()
        })
    }
    */

    sort = profiles => {
        const { ordering, orderedColumn } = this.state
        // Return if there's no ordering.
        if (ordering === Order.NONE) return profiles
    
        // Get the property to sort each profile on.
        // By default use the `name` property.
        let propKey = 'name'
        // The second column is dynamic.
        if (orderedColumn === 2) propKey = this.state.column2Show
        // The third column is fixed to the `ltv` property.
        if (orderedColumn === 3) propKey = 'ltv'
    
        return profiles.sort((a, b) => {
          let aValue = a[propKey]
          let bValue = b[propKey]
    
          
          // Support string comparison
          const sortTable = { true: 1, false: -1 }
    
          // Order ascending (Order.ASC)
          if (this.state.ordering === Order.ASC) {
            return aValue === bValue ? 0 : sortTable[aValue > bValue]
          }
    
          // Order descending (Order.DESC)
          return bValue === aValue ? 0 : sortTable[bValue > aValue]
        })
      }
    
      // Filter the profiles based on the name property.
      filter = profiles => {
        const searchQuery = this.state.searchQuery.trim()
    
        // If the searchQuery is empty, return the profiles as is.
        if (searchQuery.length === 0) return profiles

        return profiles.filter(profile => {
          // Use the filter from fuzzaldrin-plus to filter by Id.
          const result = filter([profile.numero_cliente, profile.zona, profile.name, profile.ip], searchQuery)

          return result.length === 1
        })
      }

    // Clients Data //
    componentDidMount() {
        this.data()
    }

    data() {
        axios.get('/api/clients')
        .then(res => {
            this.setState({ clients: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // SearchQuery
    handleFilterChange = value => {
        this.setState({ searchQuery: value })
    }

    handleFilterChange2 = value => {
        this.setState({ searchQuery2: value })
    }

    // Icon
    getIconForOrder = order => {
        switch (order) {
            case Order.ASC:
                return 'arrow-up'
            case Order.DESC:
                return 'arrow-down'
            default:
                return 'caret-down'
        }
    }

    // RenderValueTableHeaderCell
    renderValueTableHeaderCell = () => {
        return(
            <Table.HeaderCell>
                <Popover
                Position={Position.BOTTOM_RIGHT}
                content={({ close }) => (
                    <Menu>

                        <Menu.OptionsGroup
                        title="Show"
                        options={[
                            { label: 'Ip', value: 'ip' },
                            { label: 'Modelo de CPE',
                        value: 'model_cpe' },
                        { label: 'Modelo del Modem',
                        value: 'model_modem' },
                        { label: 'Usuario de Modem',
                        value: 'user_modem' },
                        { label: 'Contrasela de Modem',
                        value: 'pass_modem' },
                        { label: 'Wifi Modem',
                        value: 'wifi_modem' },
                        { label: 'Usuario de CPE',
                        value: 'usuario_cpe' },
                        { label: 'Contraseña de CPE',
                        value: 'pass_cpe' },
                        { label: 'Usuario de PPPOE',
                        value: 'usuario_pppoe' },
                        { label: 'Contraseña de PPPOE',
                        value: 'pass_pppoe' }
                        ]}
                        selected={this.state.column2Show}
                        onChange={value => {
                            this.setState({
                                column2Show: value
                            })
                            close()
                        }}
                        />
                    </Menu>
                    )}>
                    <TextDropdownButton
                    icon={
                        this.state.orderedColumn === 2 ? this.getIconForOrder(this.state.ordering) : 'caret-down'
                    }>
                    {capitalize(this.state.column2Show)}
                    </TextDropdownButton>
                </Popover>
            </Table.HeaderCell>
        )
    }

    // Render IP
    renderIpHeaderCell = () => {
        return (
            <Table.TextHeaderCell>
                <Popover
                Position={Position.BOTTOM_LEFT}
                content={({ close }) => (
                   <Menu> 
                        <Menu.OptionsGroup
                        title="Order"
                        options={[
                            { label: 'Ascending', value: Order.ASC },
                            { label: 'Descending', value: Order.DESC }
                        ]}
                        selected={
                            this.state.orderedColumn === 3 ? this.state.ordering : null
                        }
                        onChange={value => {
                            this.setState({
                                orderedColumn: 3,
                                ordering: value
                            })
                            close()
                        }} />
                    </Menu> 
                )}>
                <TextDropdownButton
                icon={
                    this.state.orderedColumn === 3
                    ? this.getIconForOrder(this.state.ordering) : 'caret-down'
                } >
                Ip
                </TextDropdownButton>
                </Popover>
            </Table.TextHeaderCell>
        )
    }

    // IP
    renderIp = () => {
        return (
            <Table.HeaderCell>
                <TextDropdownButton
                icon="none" >
                    Ip
                </TextDropdownButton>
            </Table.HeaderCell>
        )
    }

    // Render Numero de Cliente
    renderNombreCliente = () => {
        return (
            <Table.HeaderCell>
                <TextDropdownButton
                icon="person" >
                Nombre
                </TextDropdownButton>
            </Table.HeaderCell>
        )
    }

    // Render Row Menu
    renderRowMenu = (client) => {
        return (
            <Menu>
                <Menu.Group>
                    <Link to={"/show/" + client._id } className="Link LinkUpdate">
                    <Menu.Item
                    
                    >
                    Show...
                    </Menu.Item>
                    </Link>

                    <Link to={"/update/" + client._id } className="Link LinkUpdate"><Menu.Item>
                        Edit...
                        </Menu.Item></Link>

                    <Menu.Divider />
                    
                    <Menu.Item intent="danger"
                    onSelect={() => this.setState({ isShown: true })}
                     >
                    <Link to={'/delete/' + client._id }
                    className="Link"><Paragraph color="danger">Delete...</Paragraph></Link>
                    </Menu.Item>
                </Menu.Group>
            </Menu>
            
        )
    }

    // Render Row
    renderRow = ({ client }) => {

        return (
            <Table.Row key={client.id}>
            <Table.TextCell isNumber>
                {client.numero_cliente}
            </Table.TextCell>
             <Table.Cell display="flex" alignItems="center">
             <Avatar name={client.name} />
             <Text marginLeft={8} size={300} fontWeight={500}>
             {client.name}
             </Text>
             </Table.Cell>
             <Table.TextCell>
                 {client[this.state.column2Show]}
             </Table.TextCell>
             <Table.TextCell isNumber>
             {`${client.zona}`}
             </Table.TextCell>
             <Table.Cell width={48} flex="none">
             <Popover
             content={this.renderRowMenu(client)}
             Position={Position.BOTTOM_RIGHT}>
             <IconButton icon="more" height={24} appearance="minimal"/>
             </Popover>
             </Table.Cell>

            </Table.Row>
        )
    }

    /* 
    <form onSubmit={this.onSubmit}>
                    <TextInput placeholder="Eliminar Cliente por Id"
                    value={this.state.delete}
                    onChange={this.onChangeDelete} />
                    <Button>Eliminar</Button>
                </form>
    */

    render() {
        const clients = this.filter(this.sort(this.state.clients))

        const be = this.state.zonaFilter
        const filter = clients.filter(function(obj) {
            if (be === 'Zona') {
                return obj.zona === obj.zona
            } else {
                return obj.zona === be
            }

            
        })

        return(
            <div>
                    <Dashboard/>
            <Table border className="TablaCliens">
                <Table.Head>
                    <Table.SearchHeaderCell
                    onChange={this.handleFilterChange}
                    value={this.state.searchQuery}
                    />
                    {this.renderNombreCliente()}
                    {this.renderValueTableHeaderCell()}
                    
                    <Table.HeaderCell>
                <Popover
                Position={Position.BOTTOM_RIGHT}
                content={({ close }) => (
                    <Menu>

                        <Menu.OptionsGroup
                        title="Show Zona"
                        options={[
                            { label: 'ZONA', value: 'Zona' },
                            { label: 'CS',
                        value: 'CS' },
                        { label: 'PLG',
                        value: 'PLG' },
                        { label: 'REF',
                        value: 'REF' }
                        ]}
                        selected={this.state.zonaFilter}
                        onChange={value => {
                            this.setState({
                                zonaFilter: value
                            })
                            close()
                        }}
                        />
                    </Menu>
                    )}>
                    <TextDropdownButton
                    icon={
                        this.state.orderedColumn === 2 ? this.getIconForOrder(this.state.ordering) : 'caret-down'
                    }>
                    {capitalize2(this.state.zonaFilter)}
                    </TextDropdownButton>
                </Popover>
            </Table.HeaderCell>

                    <Table.HeaderCell width={42} flex="none" />
                </Table.Head>
                <Table.VirtualBody height={500}>
                {filter.map(item => this.renderRow({ client: item }))}
                
                </Table.VirtualBody>
            </Table>

            </div>
        )
    }
}