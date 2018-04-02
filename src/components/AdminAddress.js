import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class All extends Component {
    state = {
        addresses: [],
        AddressId: '',
        CustomerName: '',
        Address1: '',
        Address2: '',
        City: '',
        Country: '',
        POBox: ''
    }

    db = new DB('http://localhost:51064/api/Addresses')
    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ addresses: data }),
            parameters
        )
    }

    handleDelete = (AddressId) => {
        this.db.destroy(AddressId, this.find)
    }

    handleUpdate = (AddressId) => {
        this.props.onSelect(<Update AddressId={AddressId} />)
    }

    handleCustomerText = (event) => {
        this.setState({ CustomerName: event.target.value })
    }

    render() {
        console.log('render: ', this.props.location.query)
        const popoverClickRootClose = (
            <BS.Popover id="popover-trigger-click-root-close" title="You are about to delete your cart">
              <strong>Be careful!</strong> <center>This process can't be repeated.</center>
            </BS.Popover>
          );
        return (
            <div>
                <div>
                    <h3 style={{ paddingLeft: 20 }}>Admin Dashboard</h3>
                    <br />
                    <BS.Nav bsStyle="tabs" onSelect={this.handleSelect}>
                        <LinkContainer to='/admincustomers/all'><BS.NavItem>Customers</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminmeals/all'><BS.NavItem>Meals</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminorders/all'><BS.NavItem>Orders</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminorderitems/all'><BS.NavItem>Order Items</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminaddress/all'><BS.NavItem>Addresses</BS.NavItem></LinkContainer>
                        <LinkContainer to='/admincategory/all'><BS.NavItem>Categories</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminmemberships/all'><BS.NavItem>Memberships</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminreservations/all'><BS.NavItem>Reservations</BS.NavItem></LinkContainer>
                    </BS.Nav>
                </div>
                <center><h1>Admin Addresses</h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead>
                            <tr>
                                <th>AddressId</th><th>CustomerName</th><th>Address1</th><th>Address2</th><th>City</th><th>Country</th><th>POBox</th><th>Actions</th>
                                <th><LinkContainer to={{ pathname: '/adminaddress/create' }}>
                                    <BS.Button>Create a Customer Address</BS.Button>
                                </LinkContainer></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.addresses.map(
                                (address) =>
                                    <tr key={address.AddressId}>
                                        <td>{address.AddressId}</td>
                                        {
                                            address.Customer.CustomerName == null
                                                ?
                                                <td>unamed customer</td>
                                                :
                                                <td>{address.Customer.CustomerName}</td>
                                        }
                                        <td>{address.Address1}</td>
                                        <td>{address.Address2}</td>
                                        <td>{address.City}</td>
                                        <td>{address.Country}</td>
                                        <td>{address.POBox}</td>
                                        <td>
                                        <BS.ButtonToolbar>
                                            <LinkContainer to={'/adminaddress/update/' + address.AddressId}>
                                                <BS.Button >Edit</BS.Button>
                                            </LinkContainer>
                                            <BS.OverlayTrigger
                                                trigger={['hover']}
                                                rootClose
                                                placement="bottom"
                                                overlay={popoverClickRootClose}
                                            >
                                                <BS.Button bsStyle="danger" onClick={() => this.handleDelete(address.AddressId)}>Delete</BS.Button>
                                            </BS.OverlayTrigger>
                                        </BS.ButtonToolbar>
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>
                </center>
            </div>
        )
    }
}

export class Create extends Component {

    state = {
        AddressId: '',
        CustomerId: '',
        Address1: '',
        Address2: '',
        City: '',
        Country: '',
        POBox: '',
        Customers: []
    }

    db = new DB('http://localhost:51064/api/Addresses')
    db2 = new DB('http://localhost:51064/api/Customers')

    componentDidMount() {
        this.db.find(
            (data) => this.setState({ addresses: data }))

        this.db2.find(
            data => this.setState({ Customers: data })
        )
        console.log(this.state.Customers)
    }

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("adminaddress/all")

    }

    handleId = (event) => {
        this.setState({ AddressId: event.target.value })
    }

    handleCustomerId = (event) => {
        this.setState({ CustomerId: event.target.value })
    }

    handleAddress1 = (event) => {
        this.setState({ Address1: event.target.value })
    }

    handleAddress2 = (event) => {
        this.setState({ Address2: event.target.value })
    }


    handleCity = (event) => {
        this.setState({ City: event.target.value })
    }


    handleCountry = (event) => {
        this.setState({ Country: event.target.value })
    }

    handlePOBox = (event) => {
        this.setState({ POBox: event.target.value })
    }

    handleSelect = (event) => {
        this.state.CustomerId = event.target.value


    }

    render() {
        return (
            <div>
                <center>
                    <h1>Create a Customer Address</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Address Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.AddressId}
                                    placeholder="Enter AddressId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                      
                        <tr>
                            <td>Customer Id</td>
                            <td>
                                <BS.FormControl
                                    onChange={this.handleSelect}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">select</option>
                                    {this.state.Customers.map(
                                        (item) =>
                                            <option value={item.CustomerId}>{item.CustomerId}</option>
                                    )
                                    }
                                </BS.FormControl>
                            </td>
                        </tr>

                        <tr>
                            <td>Address 1</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Address1}
                                    placeholder="Enter First Address"
                                    onChange={this.handleAddress1}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Address 2</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Address2}
                                    placeholder="Enter Second Address"
                                    onChange={this.handleAddress2}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>City</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.City}
                                    placeholder="Enter City"
                                    onChange={this.handleCity}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Country</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Country}
                                    placeholder="Enter Country"
                                    onChange={this.handleCountry}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>POBox</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.POBox}
                                    placeholder="Enter POBox"
                                    onChange={this.handlePOBox}
                                />
                            </td>
                        </tr>

                    </tbody>
                </BS.Table>
                <BS.Button bsStyle="success" onClick={this.handleCreate}>create</BS.Button>
                </center>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        AddressId: '',
        CustomerId: '',
        Address1: '',
        Address2: '',
        City: '',
        Country: '',
        POBox: '',
        Customer: [],
        Customers: []
    }

    db = new DB('http://localhost:51064/api/Addresses')
    db2 = new DB('http://localhost:51064/api/Customers')

    componentDidMount() {
        this.db.findOne(
            this.props.params.id,
            data => this.setState(data)
        )
        this.db2.find(
            data => this.setState({ Customers: data })
        )
    }


    handleUpdate = () => {
        this.db.update(this.state.AddressId, this.state)
        RR.browserHistory.push("adminaddress/all")
    }

    handleId = (event) => {
        this.setState({ AddressId: event.target.value })
    }



    handleAddress1 = (event) => {
        this.setState({ Address1: event.target.value })
    }

    handleAddress2 = (event) => {
        this.setState({ Address2: event.target.value })
    }


    handleCity = (event) => {
        this.setState({ City: event.target.value })
    }


    handleCountry = (event) => {
        this.setState({ Country: event.target.value })
    }

    handlePOBox = (event) => {
        this.setState({ POBox: event.target.value })
    }

    handleCustomerId = (eventKey) => {
        this.setState({ CustomerId: eventKey })
        console.log("eventkey" + eventKey)
    }

    handleSelect = (event) => {
        this.state.CustomerId = event.target.value
        this.state.Customer.CustomerId = event.target.value
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Edit a Customer Address</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Address Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.AddressId}
                                    placeholder="Enter AddressId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Customer Id</td>
                            <td>
                                <BS.FormControl
                                    onChange={this.handleSelect}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">select</option>
                                    {this.state.Customers.map(
                                        (item) =>
                                            <option value={item.CustomerId}>{item.CustomerId}</option>
                                    )
                                    }
                                </BS.FormControl>
                            </td>
                        </tr>

                        <tr>
                            <td>Address 1</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Address1}
                                    placeholder="Enter First Address"
                                    onChange={this.handleAddress1}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Address 2</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Address2}
                                    placeholder="Enter Second Address"
                                    onChange={this.handleAddress2}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>City</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.City}
                                    placeholder="Enter City"
                                    onChange={this.handleCity}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Country</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Country}
                                    placeholder="Enter Country"
                                    onChange={this.handleCountry}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>POBox</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.POBox}
                                    placeholder="Enter POBox"
                                    onChange={this.handlePOBox}
                                />
                            </td>
                        </tr>

                    </tbody>
                </BS.Table>
                <BS.Button bsStyle="success" onClick={this.handleUpdate}>Save</BS.Button>
                </center>
            </div>
        )
    }
}