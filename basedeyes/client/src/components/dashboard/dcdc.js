import React from 'react'
import { filter } from 'fuzzaldrin-plus'
import {
  Table,
  Popover,
  Position,
  Menu,
  Avatar,
  Text,
  IconButton,
  TextDropdownButton
  // eslint-disable-next-line import/no-unresolved
} from 'evergreen-ui'
import profiles from './profiles.json' // eslint-disable-line import/extensions

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const Order = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC'
}

export default class AdvancedTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: '',
      orderedColumn: 1,
      ordering: Order.NONE,
      column2Show: 'email'
    }
  }

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

      // Parse money as a number.
      const isMoney = aValue.indexOf('$') === 0

      if (isMoney) {
        aValue = Number(aValue.substr(1))
        bValue = Number(bValue.substr(1))
      }

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
      // Use the filter from fuzzaldrin-plus to filter by name.
      const result = filter([profile.name], searchQuery)
      return result.length === 1
    })
  }

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

  handleFilterChange = value => {
    this.setState({ searchQuery: value })
  }

  renderValueTableHeaderCell = () => {
    return (
      <Table.HeaderCell>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.OptionsGroup
                title="Order"
                options={[
                  { label: 'Ascending', value: Order.ASC },
                  { label: 'Descending', value: Order.DESC }
                ]}
                selected={
                  this.state.orderedColumn === 2 ? this.state.ordering : null
                }
                onChange={value => {
                  this.setState({
                    orderedColumn: 2,
                    ordering: value
                  })
                  // Close the popover when you select a value.
                  close()
                }}
              />

              <Menu.Divider />

              <Menu.OptionsGroup
                title="Show"
                options={[
                  { label: 'Email', value: 'email' },
                  { label: 'Phone', value: 'phone' },
                  { label: 'Address', value: 'address' },
                  { label: 'Country', value: 'country' },
                  { label: 'Company', value: 'company' },
                  { label: 'Id', value: 'id' }
                ]}
                selected={this.state.column2Show}
                onChange={value => {
                  this.setState({
                    column2Show: value
                  })
                  // Close the popover when you select a value.
                  close()
                }}
              />
            </Menu>
          )}
        >
          <TextDropdownButton
            icon={
              this.state.orderedColumn === 2
                ? this.getIconForOrder(this.state.ordering)
                : 'caret-down'
            }
          >
            {capitalize(this.state.column2Show)}
          </TextDropdownButton>
        </Popover>
      </Table.HeaderCell>
    )
  }

  renderLTVTableHeaderCell = () => {
    return (
      <Table.TextHeaderCell>
        <Popover
          position={Position.BOTTOM_LEFT}
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
                  // Close the popover when you select a value.
                  close()
                }}
              />
            </Menu>
          )}
        >
          <TextDropdownButton
            icon={
              this.state.orderedColumn === 3
                ? this.getIconForOrder(this.state.ordering)
                : 'caret-down'
            }
          >
            LTV
          </TextDropdownButton>
        </Popover>
      </Table.TextHeaderCell>
    )
  }

  renderRowMenu = () => {
    return (
      <Menu>
        <Menu.Group>
          <Menu.Item>Share...</Menu.Item>
          <Menu.Item>Move...</Menu.Item>
          <Menu.Item secondaryText="⌘R">Rename...</Menu.Item>
        </Menu.Group>
        <Menu.Divider />
        <Menu.Group>
          <Menu.Item intent="danger">Delete...</Menu.Item>
        </Menu.Group>
      </Menu>
    )
  }

  renderRow = ({ profile }) => {
    return (
      <Table.Row key={profile.id}>
        <Table.Cell display="flex" alignItems="center">
          <Avatar name={profile.name} />
          <Text marginLeft={8} size={300} fontWeight={500}>
            {profile.name}
          </Text>
        </Table.Cell>
        <Table.TextCell>{profile[this.state.column2Show]}</Table.TextCell>
        <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
        <Table.Cell width={48} flex="none">
          <Popover
            content={this.renderRowMenu}
            position={Position.BOTTOM_RIGHT}
          >
            <IconButton icon="more" height={24} appearance="minimal" />
          </Popover>
        </Table.Cell>
      </Table.Row>
    )
  }

  render() {
    const items = this.filter(this.sort(profiles))
    return (
      <Table border>
        <Table.Head>
          <Table.SearchHeaderCell
            onChange={this.handleFilterChange}
            value={this.state.searchQuery}
          />
          {this.renderValueTableHeaderCell()}
          {this.renderLTVTableHeaderCell()}
          <Table.HeaderCell width={48} flex="none" />
        </Table.Head>
        <Table.VirtualBody height={640}>
          {items.map(item => this.renderRow({ profile: item }))}
        </Table.VirtualBody>
      </Table>
    )
  }
}

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
  import LogoYes from '../media/LogoYes.png';
  import './table-inf-clients.css';
  import { confirmAlert } from 'react-confirm-alert'; 
  import { TextInput, Button } from 'evergreen-ui';

  // Typography Regulation
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  // Order
  const Order = {
      NONE: 'NONE',
      ASC: 'ASC',
      DESC: 'DESC'
  }

export default class TableInfClients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            searchQuery: '',
            orderedColumn: 1,
            ordering: Order.NONE,
            column2Show: 'zona',
            delete: '',
            searchQuery2: ''
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

      sort2 = profiles => {
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
          const result = filter([profile.numero_cliente, profile.zona, profile.name], searchQuery)

          return result.length === 1
        })
      }

      filter2 = profiles => {
        const searchQuery2 = this.state.searchQuery2.trim()
    
        // If the searchQuery is empty, return the profiles as is.
        if (searchQuery2.length === 0) return profiles

        return profiles.filter(profile => {
          // Use the filter from fuzzaldrin-plus to filter by Id.
          const result = filter([profile.ip], searchQuery2)
          return result.length === 1
        })
      }
    

    // Clients Data //
    componentDidMount() {
        this.data()
    }

    data() {
        axios.get('/api/inf-clients/')
        .then(res => {
            this.setState({ clients: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Delete
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
                        axios.delete('/api/clients/'+id._id)
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
                            { label: 'zona', value: 'zona' },
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
                    <Menu.Item>Show...</Menu.Item>
                    <Menu.Item>Edit...</Menu.Item>

                    <Menu.Divider />
                    
                    <Menu.Item intent="danger"
                    onClick={this.delete.bind(this, client)} >
                    Delete...
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
             {`${client.ip}`}
             </Table.TextCell>
             <Table.Cell width={48} flex="none">
             <Popover
             content={this.renderRowMenu}
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
        const clients2 = this.filter(this.sort(this.state.clients))

        return(
            <div>

            <Table border className="TableClients" href="/db">
                <Table.Head>
                    <Table.SearchHeaderCell
                    onChange={this.handleFilterChange}
                    value={this.state.searchQuery}
                    />
                    {this.renderNombreCliente()}
                    {this.renderValueTableHeaderCell()}

                    <Table.SearchHeaderCell
                    onChange={this.handleFilterChange2}
                    value={this.state.searchQuery2}
                    />
                    <Table.HeaderCell width={42} flex="none" />
                </Table.Head>
                <Table.VirtualBody height={500}>
                {clients.map(item => this.renderRow({ client: item }))}
                
                </Table.VirtualBody>
            </Table>

            
            </div>
        )
    }
}