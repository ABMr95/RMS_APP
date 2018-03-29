import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class All extends Component {
    state = {
        reservations: [],
        ReservationId: '',
        CustomerName: '',
        Time: '',
        TableNo: '',
    }

    db = new DB('http://localhost:51064/api/Reservations')
    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ reservations: data }),
            parameters
        )
    }

    handleDelete = (ReservationId) => {
        this.db.destroy(ReservationId, this.find)
    }

    handleUpdate = (ReservationId) => {
        this.props.onSelect(<Update ReservationId={ReservationId} />)
    }

    handleCustomerText = (event) => {
        this.setState({ CustomerName: event.target.value })
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
                <center><h1>Admin Reservations</h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead>
                            <tr>
                                <th>ReservationId</th><th>CustomerName</th><th>Time</th><th>TableNo</th><th>Actions</th>
                                <th><LinkContainer to={{ pathname: '/adminreservations/create' }}>
                                    <BS.Button>Create</BS.Button>
                                </LinkContainer></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.reservations.map(
                                (reservation) =>
                                    <tr key={reservation.ReservationId}>
                                        <td>{reservation.ReservationId}</td>
                                        {
                                            reservation.Customer.CustomerName == null
                                                ?
                                                <td>unamed customer</td>
                                                :
                                                <td>{reservation.Customer.CustomerName}</td>
                                        }
                                        {/* <td>{reservation.Customer.CustomerName}</td> */}
                                        <td>{reservation.Time}</td>
                                        <td>{reservation.TableNo}</td>
                                        <td>
                                            <LinkContainer to={'/adminreservations/update/' + reservation.ReservationId}>
                                                <BS.Button >Update</BS.Button>
                                            </LinkContainer>
                                            <BS.Button onClick={() => this.handleDelete(reservation.ReservationId)}>Delete</BS.Button>
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
        reservation: null
    }

    db = new DB('http://localhost:51064/api/Reservations')

    componentDidMount() {
        this.db.findOne(
            this.props.ReservationId,
            (data) => this.setState({ reservation: data })
        )
    }

    render() {
        console.log('Address: ', this.state.reservation)
        return (
            <div>
                {this.state.reservation
                    ?
                    <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>ReservationId</td><td>{this.state.reservation.ReservationId}</td></tr>
                            <tr><td>CustomerName</td><td>{this.state.reservation.CustomerName}</td></tr>
                            <tr><td>Time</td><td>{this.state.reservation.Time}</td></tr>
                            <tr><td>TableNo</td><td>{this.state.reservation.TableNo}</td></tr>
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
        ReservationId: '',
        CustomerId: '',
        Time: '',
        TableNo: '',
        Customers: []
    }

    db = new DB('http://localhost:51064/api/Reservations')
    db2 = new DB('http://localhost:51064/api/Customers')

    componentDidMount() {
        this.db.find(
            (data) => this.setState({ reservations: data }))

        this.db2.find(
            data => this.setState({ Customers: data })
        )
        console.log(this.state.Customers)
    }

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("adminreservations/all")
    }

    handleId = (event) => {
        this.setState({ ReservationId: event.target.value })
    }

    handleCustomerId = (event) => {
        this.setState({ CustomerId: event.target.value })
    }

    handleTime = (event) => {
        this.setState({ Time: event.target.value })
    }

    handleTableNo = (event) => {
        this.setState({ TableNo: event.target.value })
    }

    handleSelect = (event) => {
        this.state.CustomerId = event.target.value

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
                            <td>Reservation Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.ReservationId}
                                    placeholder="Enter ReservationId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                      

                        <td>Customer Id</td>
             

                        <BS.FormGroup controlId="formControlsSelect">
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
                        </BS.FormGroup>

                        <tr>
                            <td>Time</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Time}
                                    placeholder="Enter Time"
                                    onChange={this.handleTime}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>TableNo</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.TableNo}
                                    placeholder="Enter TableNo"
                                    onChange={this.handleTableNo}
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
        ReservationId: '',
        CustomerId: '',
        Time: '',
        TableNo: '',
        Customer: [],
        Customers: []
    }

    db = new DB('http://localhost:51064/api/Reservations')
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
        this.db.update(this.state.ReservationId, this.state)
        RR.browserHistory.push("adminreservations/all")
    }

    handleId = (event) => {
        this.setState({ ReservationId: event.target.value })
    }

    handleTime = (event) => {
        this.setState({ Time: event.target.value })
    }

    handleTableNo = (event) => {
        this.setState({ TableNo: event.target.value })
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
                <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Reservation Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.ReservationId}
                                    placeholder="Enter ReservationId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>


                        <td>Customer Id</td>
                        <BS.FormGroup controlId="formControlsSelect">
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
                        </BS.FormGroup>

                        <tr>
                            <td>Time</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Time}
                                    placeholder="Enter Time"
                                    onChange={this.handleTime}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>TableNo</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.TableNo}
                                    placeholder="Enter TableNo"
                                    onChange={this.handleTableNo}
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