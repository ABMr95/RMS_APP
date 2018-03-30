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
        hour: 0,
        min: 0,
        seconds: 0,
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
        // console.log(event.target.value)
        var tempDate = (this.state.Time).split("-")
        var tempDateUTC = new Date(tempDate[0], tempDate[1], tempDate[2], this.state.hour )
        this.state.Time = tempDateUTC

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
        // console.log(event.target.value)
        // var tempDate = (event.target.value).split("-")
        // var tempDateUTC = new Date()
        //new Date(year, month, day, hours, minutes, seconds, milliseconds)
        this.setState({ Time: event.target.value })
    }

    handleHour = (event) => {
        console.log(event.target.value)
        this.state.hour = event.target.value
    }

    handleMin = (event) => {
        this.setState({ handleMin: event.target.value })
    }

    handleSec = (event) => {
        this.setState({ handleSec: event.target.value })
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
                                    type="date"
                                    value={this.state.Time}
                                    placeholder="Enter Time"
                                    onChange={this.handleTime}
                                />

                                {/* <BS.FormControl
                                    type="number"
                                    value={this.state.hour}
                                    placeholder="Enter a hour"
                                    onChange={this.handleHour}
                                /> */}

                                <BS.FormControl
                                    onChange={this.handleHour}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">select time</option>

                                    <option value="5">8 AM</option>
                                    <option value="6">9 AM</option>
                                    <option value="7">10 AM</option>
                                    <option value="8">11 AM</option>
                                    <option value="9">12 PM</option>
                                    <option value="10">1 PM</option>
                                    <option value="11">2 PM</option>
                                    <option value="12">3 PM</option>
                                    <option value="13">4 PM</option>
                                    <option value="14">5 PM</option>
                                    <option value="15">6 PM</option>
                                    <option value="16">7 PM</option>
                                    <option value="17">8 PM</option>
                                    <option value="18">9 PM</option>
                                    <option value="19">10 PM</option>
                                

                                  
                                    }
                                </BS.FormControl>

                                {/* <BS.FormControl
                                    type="number"
                                    value={this.state.min}
                                    placeholder="Enter a min"
                                    onChange={this.handleMin}
                                />

                                <BS.FormControl
                                    type="number"
                                    value={this.state.seconds}
                                    placeholder="Enter a sec"
                                    onChange={this.handleSec}
                                /> */}

                            </td>
                        </tr>

                        <tr>
                            <td>TableNo</td>
                            <td>
                                <BS.FormControl
                                    type="number"
                                    value={this.state.TableNo}
                                    placeholder="Enter a number between 1-10"
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