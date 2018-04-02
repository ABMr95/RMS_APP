import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import * as RR from 'react-router'

import { LinkContainer } from 'react-router-bootstrap'

export class All extends Component {

    state = {
        addresses: [],
        user: null,
        MinPrice: '',
        MaxPrice: '',
        Name: '',
        CategoryName: '',
        Column: '',
        Order: '',
        ToggleId: false,
        ToggleName: false,
        TogglePrice: false,
        ToggleCategory: false
    }

    db = new DB('http://localhost:51064/api/Addresses')
    dbUser = new DB('http://localhost:51064/api/User')

    componentDidMount() {
        this.findCurrentUser()
    }
    handleDelete = (AddressId) => {
        this.db.destroy(AddressId, this.find)
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ addresses: data }),
            parameters
        )
    }

    Quary = (parameters) => {
        this.userDB.find(
            (data) => this.setState({}),
            parameters
        )
    }

    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.findAddress(data.CustomerId),
            {
                query: "customer"
            }
        )

    }

    findAddress = async (val) => {
        await this.db.find(
            (data) => this.setState({ addresses: data }),
            {
                CustomerID: val

            }
        )

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
                <center>
                    <h1>My Address</h1>
                    <BS.Table striped bordered condensed hover style={{ width: "80%" }}>
                        <thead>
                            <tr><th>AddressId</th><th>CustomerName</th><th>Address1</th><th>Address2</th><th>City</th><th>Country</th><th>POBox</th><th>Actions</th></tr>
                        </thead>
                        
                        <tbody>
                            {this.state.addresses.map(
                                (address) =>
                                    <tr key={address.AddressId}>
                                        <td>{address.AddressId}</td>
                                        <td>{address.Customer.CustomerName}</td>
                                        <td>{address.Address1}</td>
                                        <td>{address.Address2}</td>
                                        <td>{address.City}</td>
                                        <td>{address.Country}</td>
                                        <td>{address.POBox}</td>
                                        <td>
                                        <BS.OverlayTrigger
                                            trigger={['hover']}
                                            rootClose
                                            placement="bottom"
                                            overlay={popoverClickRootClose}
                                        >
                                            <BS.Button bsStyle="danger" onClick={() => this.handleDelete(address.AddressId)}>Delete</BS.Button>
                                        </BS.OverlayTrigger>
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>
                        <LinkContainer to={{ pathname: '/customeraddress/create' }}>
                            <BS.Button bsStyle="success">Add a new address</BS.Button>
                        </LinkContainer>
                </center>
            </div>
        )
    }
}

export class Create extends Component {

    state = {
        AddressId: 999,
        CustomerId: 0,
        Address1: '',
        Address2: '',
        City: '',
        Country: '',
        POBox: '',
    }

    db = new DB('http://localhost:51064/api/Addresses')
    db2 = new DB('http://localhost:51064/api/Customers')
    dbUser = new DB('http://localhost:51064/api/User')


    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.setState({ CustomerId: data.CustomerId }),
            {
                query: "customer"
            }
        )
    }

    componentDidMount() {
        this.db.find(
            (data) => this.setState({ addresses: data }))

        this.db2.find(
            data => this.setState({ Customers: data })
        )
        this.findCurrentUser()
        this.state({CustomerId: this.state.Customer.CustomerId})
        
        console.log(this.state.Customer)

    }


    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("customeraddress/all")
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



    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
           


                        <td>Customer Id</td>

                        <td>
                            <BS.FormControl
                                type="text"
                                value={this.state.CustomerId}
                                placeholder="Enter AddressId"
                                onChange={this.handleId}
                                disabled = {true}

                            />
                        </td>




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
                <BS.Button onClick={this.handleCreate}>create</BS.Button>
            </div>
        )
    }
}
