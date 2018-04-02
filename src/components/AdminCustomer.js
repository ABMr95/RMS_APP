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

    

    handleUpdate = (CustomerId) => {
        this.props.onSelect(<Update CustomerId={CustomerId} />)
    }

    

    handleShowAll = () => {
        this.find()
    }

    render() {
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
                <center><h1>Admin Customers</h1>
                    <BS.Button onClick={this.handleShowAll}>Refresh</BS.Button></center>
                <br />
                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }} >
                        <thead>
                            <tr><th>Id</th><th>Username</th><th>name</th><th>age</th><th>gender</th><th>Membership</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map(
                                (customer) =>
                                    <tr key={customer.CustomerId}>
                                        <td>{customer.CustomerId}</td>
                                        <td>{customer.Name}</td>
                                        <td>{customer.CustomerName}</td>
                                        <td>{customer.Age}</td>
                                        <td>{customer.Gender}</td>
                                        {
                                            customer.MembershipId
                                                ?
                                                <td>{customer.Membership.Type}</td>
                                                :
                                                <td>None</td>
                                        }
                                        <td>
                                            <center>
                                                <LinkContainer to={'/admincustomers/update/' + customer.CustomerId}>
                                                    <BS.Button bsStyle="success">Edit</BS.Button>
                                                </LinkContainer>
                                            </center>
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

export class Update extends Component {

    state = {
        CustomerId: '',
        Name: '',
        CustomerName: '',
        Age: '',
        Gender: '',
        MembershipId: '',
        membershipArray: [],
        Membership: []
    }

    db = new DB('http://localhost:51064/api/Customers')
    membershipDB = new DB('http://localhost:51064/api/Memberships')

    componentDidMount() {
        this.db.findOne(
            //this.props.Id,
            this.props.params.id,
            data => this.setState(data)
        )
        this.getMembership()

    }

    getMembership = (parameters) => {
        this.membershipDB.find(
            (data) => this.setState({ membershipArray: data }),
            parameters
        )
    }


    handleName = (event) => {
        this.setState({ Name: event.target.value })
    }

    handleCustomerName = (event) => {
        this.setState({ CustomerName: event.target.value })
    }

    handleAge = (event) => {
        this.setState({ Age: event.target.value })
    }

    handleGender = (event) => {
        this.setState({ Gender: event.target.value })
    }

    handleMembershipId = (event) => {
        this.setState({ MembershipId: event.target.value })
    }

    handleUpdate = () => {
        let TempCustomer ={
            CustomerId: this.state.CustomerId,
            Name: this.state.Name,
            MembershipId: this.state.MembershipId,
            CustomerName: this.state.CustomerName,
            Age: this.state.Age,
            Gender: this.state.Gender,
            Membership: this.state.Membership
        }
        let r1 = /^[0-9]*$/
        if (r1.test(this.state.Age)) {
            this.db.update(this.state.CustomerId, TempCustomer)
            alert("profile has been updated")
        } else {
            alert("please input only numbers")
        }

    }

    handleSelect = (event) => {
        this.state.Gender = event.target.value
    }


    handleSelectMembership = (event) => {
        this.state.MembershipId = event.target.value
        this.state.Membership.MembershipId= event.target.value
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Edit Customer Information</h1>
                <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
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
                                    disabled={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>UserName</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Name}
                                    placeholder="Enter Name"
                                    onChange={this.handleName}
                                    disabled={true}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td> Name</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerName}
                                    placeholder="Enter Name"
                                    onChange={this.handleCustomerName}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td> Age</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Age}
                                    placeholder="Enter Age"
                                    onChange={this.handleAge}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td> Gender</td>
                            <td>
                                <BS.FormControl
                                    onChange={this.handleSelect}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </BS.FormControl>
                            </td>
                        </tr>

                        <tr>
                            <td>MembershipId</td>
                            <td>
                                <BS.FormControl
                                    style={{ width: '20%' }}
                                    onChange={this.handleSelectMembership}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">All</option>
                                    {this.state.membershipArray.map((item) =><option value={item.MembershipId}>{item.Type}</option>)
                                    }
                                </BS.FormControl>
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