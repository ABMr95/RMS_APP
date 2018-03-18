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

    db = new DB('http://localhost:63719/api/Addresses')

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
        return (
            <div>
                <h1>Admin Addresses</h1>

                <LinkContainer to={{ pathname: '/adminaddress/create' }}>
                    <BS.Button>Create</BS.Button>
                </LinkContainer>


                <BS.Table striped bordered condensed hover>
                    <thead> <tr>
                        <th>AddressId</th><th>CustomerName</th><th>Address1</th><th>Address2</th><th>City</th><th>Country</th><th>POBox</th>
                    </tr>
                    </thead>
                    <tbody>

                        {this.state.addresses.map(

                            (address) =>

                                <tr key={address.AddressId}>
                                    <td>{address.AddressId}</td>
                                    <td>{address.CustomerName}</td>
                                    <td>{address.Address1}</td>
                                    <td>{address.Address2}</td>
                                    <td>{address.City}</td>
                                    <td>{address.Country}</td>
                                    <td>{address.POBox}</td>

                                    <td>

                                        <LinkContainer to={'/adminaddress/update/' + address.AddressId}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer>

                                        <BS.Button onClick={() => this.handleDelete(address.AddressId)}>Delete</BS.Button>

                                    </td>
                                </tr>
                        )}

                    </tbody>

                </BS.Table>
            </div>
        )
    }
}

export class One extends Component {

    state = {
        address: null
    }

    db = new DB('http://localhost:63719/api/Addresses')

    componentDidMount() {
        this.db.findOne(
            this.props.AddressId,
            (data) => this.setState({ address: data })
        )
    }

    render() {
        console.log('Address: ', this.state.address)
        return (
            <div>
                {this.state.address
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>AddressId</td><td>{this.state.address.AddressId}</td></tr>
                            <tr><td>CustomerName</td><td>{this.state.address.CustomerName}</td></tr>
                            <tr><td>Address1</td><td>{this.state.address.Address1}</td></tr>
                            <tr><td>Address2</td><td>{this.state.address.Address2}</td></tr>
                            <tr><td>City</td><td>{this.state.address.City}</td></tr>
                            <tr><td>Country</td><td>{this.state.address.Country}</td></tr>
                            <tr><td>POBox</td><td>{this.state.address.POBox}</td></tr>
                        </tbody>
                    </BS.Table>
                    :
                    <p>Loading...</p>
                }
            </div>
        )
    }
}

export class Create extends Component {

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

    db = new DB('http://localhost:63719/api/Addresses')
    //addresses = new DB('http://localhost:63719/api/Addresses')

    componentDidMount() {
        this.addresses.find(
            (data) => this.setState({ addresses: data }))
    }

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("adminaddress/all")

    }

    handleId = (event) => {
        this.setState({ AddressId: event.target.value })
    }

    handleCustomerName = (event) => {
        this.setState({ CustomerName: event.target.value })
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

    // handleCustomerID = (eventKey) => {
    //     this.setState({ CustomerID: eventKey })
    //     console.log("eventkey" + eventKey)
    // }


    handleCountry = (event) => {
        this.setState({ Country: event.target.value })
    }

    handlePOBox = (event) => {
        this.setState({ POBox: event.target.value })
    }

    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Id</td>
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
                            <td>CustomerName</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerName}
                                    placeholder="Enter Customer Name"
                                    onChange={this.handleCustomerName}
                                />
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
                            <td>Address 2 </td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Address2}
                                    placeholder="Enter second Address"
                                    onChange={this.handleAddress2}
                                />
                            </td>
                        </tr>

                        {/* <tr>
                            <td>Customer ID</td>
                            <td>                                
                                <BS.DropdownButton title='Select Customer' id='customers' onSelect={this.handleCustomerID}>
                                    {
                                        this.state.customers.map(
                                            customer =>
                                                <BS.MenuItem
                                                    key={customer.CustomerID}
                                                    eventKey={customer.CustomerID}>
                                                    {customer.Name}
                                                </BS.MenuItem>
                                        )
                                    }
                                </BS.DropdownButton>
                            </td>
                        </tr> */}

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
                <BS.Button onClick={this.handleCreate}>Create</BS.Button>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        // addresses: [],
        AddressId: '',
        CustomerName: '',
        Address1: '',
        Address2: '',
        City: '',
        Country: '',
        POBox: ''
    }

    db = new DB('http://localhost:63719/api/Addresses')
    //addresses = new DB('http://localhost:63719/api/Addresses')

    componentDidMount() {
        this.db.findOne(
            //this.props.AddressId,
            this.props.params.id,
            data => this.setState(data)
        )
        // this.addresses.find(
        //     data => this.setState({ addresses: data })
        // )
    }


    handleUpdate = () => {
        this.db.update(this.state.AddressId, this.state)
        RR.browserHistory.push("adminaddress/all")
    }

    handleId = (event) => {
        this.setState({ AddressId: event.target.value })
    }

    handleCustomerName = (event) => {
        this.setState({ CustomerName: event.target.value })
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

    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover>
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
                            <td>Customer Name</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerName}
                                    placeholder="Enter Customer Name"
                                    onChange={this.handleCustomerName}
                                />
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
                <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
            </div>
        )
    }
}