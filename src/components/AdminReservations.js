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
                <center><h1>Admin Reservations</h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead>
                            <tr>
                                <th>ReservationId</th><th>CustomerName</th><th>Time</th><th>TableNo</th><th>Actions</th>
                                <th>
                                    <LinkContainer to={{ pathname: '/adminreservations/create' }}>
                                        <BS.Button>Create a Reservation</BS.Button>
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
                                        <td>{reservation.Time}</td>
                                        <td>{reservation.Table.Name}</td>
                                        <td>
                                        <BS.ButtonToolbar>
                                            <LinkContainer to={'/adminreservations/update/' + reservation.ReservationId}>
                                                <BS.Button >Edit</BS.Button>
                                            </LinkContainer>
                                            <BS.OverlayTrigger
                                                trigger={['hover']}
                                                rootClose
                                                placement="bottom"
                                                overlay={popoverClickRootClose}
                                            >
                                            <BS.Button bsStyle="danger" onClick={() => this.handleDelete(reservation.ReservationId)}>Delete</BS.Button>
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
        ReservationId: "1",
        CustomerId: '',
        Time: '',
        hour: 0,
        TableNo: '',
        Customers: [],
        Tables: [],
        v_date: ''
    }

    db = new DB('http://localhost:51064/api/Reservations')
    db2 = new DB('http://localhost:51064/api/Customers')
    db3 = new DB('http://localhost:51064/api/Tables')

    componentDidMount() {
        this.db.find(
            (data) => this.setState({ reservations: data }))

        this.db2.find(
            data => this.setState({ Customers: data })
        )
        this.db3.find(
            data => this.setState({ Tables: data })
        )
        console.log(this.state.Customers)
    }


    handleId = (event) => {
        this.setState({ ReservationId: event.target.value })
    }

    handleCustomerId = (event) => {
        this.setState({ CustomerId: event.target.value })
    }

    handleTime = (event) => {

        this.setState({ v_date: event.target.value })
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

    handleCreate = async () => {
        if (this.state.v_date == "") {
            alert("Please select  a date")
            return
        }

        if (this.state.hour == "") {
            alert("Please select  a time")
            return
        }

        this.state.Time = this.state.v_date + " " + this.state.hour
        await this.db.find(
            (data) => this.checkDate(data),
            {
                txtDate: this.state.Time,
                TableNumber: this.state.TableNo
            }
        )
    }

    checkDate = (val) => {
        console.log("the value is: " + val)

        if (val == "true") {
            alert("the table taken during that time, please select a diffrent time or a diffrent table")
            this.state.Time = ""
            this.state.hour = ""
        } else if ((val == "false")) {
            this.db.create(this.state)
            RR.browserHistory.push("customerreservations/all")
        }

    }

    render() {
        return (
            <div>
                <center>
                    <h1>Create a reservation</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>

                    <tbody>
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
                            <td>Date{<br />}&{<br />}Time</td>
                            <td>
                                <BS.FormControl
                                    type="date"
                                    value={this.state.v_date}
                                    placeholder="Enter Time"
                                    onChange={this.handleTime}
                                />
                                <BS.FormControl
                                    onChange={this.handleHour}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">

                                    <option value="">select time</option>
                                    <option value="08:00">8 AM</option>
                                    <option value="09:00">9 AM</option>
                                    <option value="10:00">10 AM</option>
                                    <option value="11:00">11 AM</option>
                                    <option value="12:00">12 PM</option>
                                    <option value="13:00">1 PM</option>
                                    <option value="14:00">2 PM</option>
                                    <option value="15:00">3 PM</option>
                                    <option value="16:00">4 PM</option>
                                    <option value="17:00">5 PM</option>
                                    <option value="18:00">6 PM</option>
                                    <option value="19:00">7 PM</option>
                                    <option value="20:00">8 PM</option>
                                    <option value="21:00">9 PM</option>
                                    <option value="22:00">10 PM</option>
                                    }
                                </BS.FormControl>
                            </td>
                        </tr>

                        <tr>
                            <td>Table Number</td>
                            <td>
                                <BS.FormControl
                                    onChange={this.handleTableNo}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">select a table</option>
                                    {this.state.Tables.map(
                                        (item) =>
                                            <option value={item.Id}>{item.Name}</option>
                                    )
                                    }
                                </BS.FormControl>
                            </td>
                        </tr>

                    </tbody>
                </BS.Table>
                <BS.Button bsStyle="success" onClick={this.checkDateApi}>create</BS.Button>
                </center>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        ReservationId: "1",
        CustomerId: '',
        Time: '',
        hour: 0,
        TableNo: '',
        Customers: [],
        Tables: [],
        v_date: ''
    }

    db = new DB('http://localhost:51064/api/Reservations')
    db2 = new DB('http://localhost:51064/api/Customers')
    db3 = new DB('http://localhost:51064/api/Tables')

    componentDidMount() {
        this.db.findOne(
            this.props.params.id,
            data => this.setState(data)
        )
        this.db2.find(
            data => this.setState({ Customers: data })
        )
        this.db3.find(
            data => this.setState({ Tables: data })
        )
    }

    

    handleId = (event) => {
        this.setState({ CustomerId: event.target.value })
    }

    handleTime = (event) => {
        this.setState({ v_date: event.target.value })
    }

    handleHour = (event) => {
        console.log(event.target.value)
        this.state.hour = event.target.value
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
    }

    handleUpdate = async () => {
        if (this.state.v_date == "") {
            alert("Please select  a date")
            return
        }

        if (this.state.hour == "") {
            alert("Please select  a time")
            return
        }

        this.state.Time = this.state.v_date + " " + this.state.hour
        await this.db.find(
            (data) => this.checkDate(data),
            {
                txtDate: this.state.Time,
                TableNumber: this.state.TableNo
            }
        )
    }

    checkDate = (val) => {
        console.log("the value is: " + val)

        if (val == "true") {
            alert("the table taken during that time, please select a diffrent time or a diffrent table")
            this.state.Time = ""
            this.state.hour = ""
        } else if ((val == "false")) {
            let tempTable = {
                Id : this.state.TableNo
            }
            let tempReservation = {
                Customer: this.state.Customer,
                Table: tempTable,
                ReservationId: this.state.ReservationId,
                Time: this.state.Time,
                TableNo: this.state.TableNo,
                CustomerId: this.state.CustomerId

            }
            this.db.update(this.state.ReservationId, tempReservation)
            RR.browserHistory.push("adminreservations/all")
        }

    }

    render() {
        return (
            <div>
                <center>
                    <h1>Edit a Reservation</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>

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
                            <td>Time</td>
                            <td>
                                <BS.FormControl
                                    type="date"
                                    value={this.state.v_date}
                                    placeholder="Enter Time"
                                    onChange={this.handleTime}
                                />



                                <BS.FormControl
                                    onChange={this.handleHour}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">

                                    <option value="">select time</option>
                                    <option value="08:00">8 AM</option>
                                    <option value="09:00">9 AM</option>
                                    <option value="10:00">10 AM</option>
                                    <option value="11:00">11 AM</option>
                                    <option value="12:00">12 PM</option>
                                    <option value="13:00">1 PM</option>
                                    <option value="14:00">2 PM</option>
                                    <option value="15:00">3 PM</option>
                                    <option value="16:00">4 PM</option>
                                    <option value="17:00">5 PM</option>
                                    <option value="18:00">6 PM</option>
                                    <option value="19:00">7 PM</option>
                                    <option value="20:00">8 PM</option>
                                    <option value="21:00">9 PM</option>
                                    <option value="22:00">10 PM</option>



                                    }
                                </BS.FormControl>


                            </td>
                        </tr>

                        <tr>
                            <td>TableNo</td>
                            <td>

                                <BS.FormControl
                                    onChange={this.handleTableNo}
                                    inputRef={el => this.inputEl = el}
                                    componentClass="select" placeholder="select">
                                    <option value="">select a table</option>
                                    {this.state.Tables.map(
                                        (item) =>
                                            <option value={item.Id}>{item.Name}</option>

                                    )
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