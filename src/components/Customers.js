import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


export class All extends Component {

    state = {
        customers: []
    }

    db = new DB('http://localhost:51064/api/Customers')

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
                <BS.Button onClick={this.handleShowAll}>Show All</BS.Button>
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

                                        <LinkContainer to={'/customers/update/' + customer.CustomerId}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer>
                                         <BS.Button onClick={() => this.handleDelete(customer.CustomerId)}>Delete</BS.Button> 
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

    db = new DB('http://localhost:51064/api/Customers')

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

    db = new DB('http://localhost:51064/api/Customers')

    handleCreate = () => {
        this.db.create(this.state)
    }
    handleCustomerId = (event) => {
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
        Name: ''
    }

    db = new DB('http://localhost:51064/api/Customers')

    componentDidMount() {
        this.db.findOne(
            this.props.CustomerId,
            data => this.setState(data)
        )
    }

    handleUpdate = () => {
        this.db.update(this.state.CustomerId, this.state)
    }

    handleCustomerId = (event) => {
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
                            <td>Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerId}
                                    placeholder="Enter Id"
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
                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
            </div>
        )
    }
}