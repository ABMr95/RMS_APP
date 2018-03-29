import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class All extends Component {
    state = {
        memberships: [],
        MembershipId: '',
        Type: '',
        ExpiryDate: '',
    }

    db = new DB('http://localhost:51064/api/Memberships')
    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ memberships: data }),
            parameters
        )
    }

    handleDelete = (MembershipId) => {
        this.db.destroy(MembershipId, this.find)
    }

    handleUpdate = (MembershipId) => {
        this.props.onSelect(<Update MembershipId={MembershipId} />)
    }


    render() {
        console.log('render: ', this.props.location.query)
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
                        <LinkContainer to='/adminmemberships/all'><BS.NavItem>Memberships</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminreservations/all'><BS.NavItem>Reservations</BS.NavItem></LinkContainer>
                    </BS.Nav>
                </div>
                <center><h1>Admin Memberships</h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead>
                            <tr>
                                <th>MembershipId</th><th>Type</th><th>ExpiryDate</th><th>Actions</th>
                                <th><LinkContainer to={{ pathname: '/adminmemberships/create' }}>
                                    <BS.Button>Create</BS.Button>
                                </LinkContainer></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.memberships.map(
                                (membership) =>
                                    <tr key={membership.MembershipId}>
                                        <td>{membership.MembershipId}</td>
                                        <td>{membership.Type}</td>
                                        <td>{membership.ExpiryDate}</td>
                                        <td>
                                            <LinkContainer to={'/adminmemberships/update/' + membership.MembershipId}>
                                                <BS.Button >Update</BS.Button>
                                            </LinkContainer>
                                            <BS.Button onClick={() => this.handleDelete(membership.MembershipId)}>Delete</BS.Button>
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

export class One extends Component {

    state = {
        membership: null
    }

    db = new DB('http://localhost:51064/api/Memberships')

    componentDidMount() {
        this.db.findOne(
            this.props.MembershipId,
            (data) => this.setState({ membership: data })
        )
    }

    render() {
        console.log('Membership: ', this.state.membership)
        return (
            <div>
                {this.state.membership
                    ?
                    <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>MembershipId</td><td>{this.state.membership.MembershipId}</td></tr>
                            <tr><td>Type</td><td>{this.state.membership.Type}</td></tr>
                            <tr><td>ExpiryDate</td><td>{this.state.membership.ExpiryDate}</td></tr>
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
        MembershipId: '',
        Type: '',
        ExpiryDate: '',
    }

    db = new DB('http://localhost:51064/api/Memberships')

    componentDidMount() {
        this.db.find(
            (data) => this.setState({ memberships: data }))
    }

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("adminmemberships/all")
    }

    handleId = (event) => {
        this.setState({ MembershipId: event.target.value })
    }

    handleType = (event) => {
        this.setState({ Type: event.target.value })
    }

    handleExpiryDate = (event) => {
        this.setState({ ExpiryDate: event.target.value })
    }

    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Membership Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.MembershipId}
                                    placeholder="Enter MembershipId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Type}
                                    placeholder="Enter Type"
                                    onChange={this.handleType}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ExpiryDate</td>
                            <td>
                                <BS.FormControl
                                //type="date" ? 
                                    type="text"
                                    value={this.state.ExpiryDate}
                                    placeholder="Enter ExpiryDate"
                                    onChange={this.handleExpiryDate}
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

export class Update extends Component {

    state = {
        MembershipId: '',
        Type: '',
        ExpiryDate: '',
    }

    db = new DB('http://localhost:51064/api/Memberships')

    componentDidMount() {
        this.db.find(
            (data) => this.setState({ memberships: data }))
    }


    handleUpdate = () => {
        this.db.update(this.state.MembershipId, this.state)
        RR.browserHistory.push("adminmemberships/all")
    }

    handleId = (event) => {
        this.setState({ MembershipId: event.target.value })
    }

    handleType = (event) => {
        this.setState({ Type: event.target.value })
    }

    handleExpiryDate = (event) => {
        this.setState({ ExpiryDate: event.target.value })
    }

    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Membership Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.MembershipId}
                                    placeholder="Enter MembershipId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Type}
                                    placeholder="Enter Type"
                                    onChange={this.handleType}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ExpiryDate</td>
                            <td>
                                <BS.FormControl
                                //type="date" ? 
                                    type="text"
                                    value={this.state.ExpiryDate}
                                    placeholder="Enter ExpiryDate"
                                    onChange={this.handleExpiryDate}
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