import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class All extends Component {

    state = {
        customers: [],
        SelectedNav: 1
    }

    db = new DB('http://localhost:63719/api/Customers')

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ customers: data }),
            parameters
        )
    }

    handleDelete = (CustomerId) => {
        this.db.destroy(CustomerId, this.find)
    }

    handleUpdate = (CustomerId) => {
        this.props.onSelect(<Update CustomerId={CustomerId} />)
    }

    handleFindBy = (CustomerId) => {
        this.find({ CustomerId: CustomerId })
    }

    handleShowAll = () => {
        this.find()
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Admin Dashboard</h3>
                    <br />
                    <BS.Nav bsStyle="tabs" onSelect={this.handleSelect}>
                        <LinkContainer to='/admincustomers/all'><BS.NavItem>Customers</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminmeals/all'><BS.NavItem>Meals</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminorders/all'><BS.NavItem>Orders</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminorderitems/all'><BS.NavItem>Order Items</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminaddress/all'><BS.NavItem>Addresses</BS.NavItem></LinkContainer>
                        <LinkContainer to='/admincategory/all'><BS.NavItem>Categories</BS.NavItem></LinkContainer>
                    </BS.Nav>
                </div>
                <center><h1>Admin Customers</h1>
                <BS.Button onClick={this.handleShowAll}>Show All</BS.Button></center>
                <br />
                <BS.Table striped bordered condensed hover>
                    <thead>
                        <tr><th>Id</th><th>Name</th></tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map(
                            (customer) =>
                                <tr key={customer.CustomerId}>
                                    <td>{customer.CustomerId}</td>
                                    <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(customer.CustomerId)}>{customer.Name}</BS.Button></td>
                                    <td>
                                        <LinkContainer to={'/admincustomers/update/' + customer.CustomerId}>
                                            <BS.Button >Update</BS.Button>
                                        </LinkContainer>
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
        customer: null
    }

    db = new DB('http://localhost:63719/api/Customers')

    componentDidMount() {
        this.db.findOne(
            this.props.Id,
            (data) => this.setState({ customer: data })
        )
    }

    render() {
        console.log('Customer: ', this.state.customer)
        return (
            <div>
                {this.state.customer
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>CustomerId</td><td>{this.state.customer.CustomerId}</td></tr>
                            <tr><td>Name</td><td>{this.state.customer.Name}</td></tr>
                            <tr><td>MembershipId</td><td>{this.state.customer.Membership.MembershipId}</td></tr>
                            <tr><td>AddressId</td><td>{this.state.customer.Address.AddressId}</td></tr>
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
        CustomerId: '',
        Name: '',

    }

    db = new DB('http://localhost:63719/api/Customers')

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("admincustomers/all")
    }
    handleCustomerId = (event) => {
        this.setState({ CustomerId: event.target.value })
    }
    handleName = (event) => {
        this.setState({ Name: event.target.value })
    }
    // handleMembershipId = (event) => {
    //     this.setState({ MembershipId: event.target.value })
    // }
    // handleAddressId = (event) => {
    //     this.setState({ AddressId: event.target.value })
    //}

    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CustomerId</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerId}
                                    placeholder="Enter Customer Id"
                                    onChange={this.handleCustomerId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Name}
                                    placeholder="Enter Name"
                                    onChange={this.handleName}
                                />
                            </td>
                        </tr>
                        {/* <tr>
                            <td>Membership Id</td>
                            <td> */}
                        {/* <BS.FormControl
                                    type="text"
                                    value={this.state.Name}
                                    placeholder="Enter Membership Id"
                                    onChange={this.handleName}
                                /> */}
                        {/* <BS.DropdownButton title='Select Membership Id' id='owners' onSelect={this.handleOwnerId}>
                                    {
                                        this.state.owners.map(
                                            owner =>
                                                <BS.MenuItem
                                                    key={owner.Id}
                                                    eventKey={owner.Id}>
                                                    {owner.Name}
                                                </BS.MenuItem>
                                        )
                                    }
                                </BS.DropdownButton>
                            </td>
                        </tr> */}



                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleCreate}>Create</BS.Button>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        CustomerId: '',
        Name: '',
    }

    db = new DB('http://localhost:63719/api/Customers')

    componentDidMount() {
        this.db.findOne(
            //this.props.Id,
            this.props.params.id,
            data => this.setState(data)
        )
        
    }


    handleUpdate = () => {
        this.db.update(this.state.CustomerId, this.state)
        RR.browserHistory.push("admincustomers/all")
    }

    handleId = (event) => {
        this.setState({ CustomerId: event.target.value })
    }

    handleName = (event) => {
        this.setState({ Name: event.target.value })
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
                            <td>CustomerId</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerId}
                                    placeholder="Enter CustomerId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Name}
                                    placeholder="Enter Name"
                                    onChange={this.handleName}
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