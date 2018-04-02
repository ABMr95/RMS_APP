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
    dbUser = new DB('http://localhost:51064/api/User')

    componentDidMount() {
        this.findCurrentUser()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ reservations: data }),
            parameters
        )
    }



    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.findReservations(data.CustomerId),
            {
                query: "customer"
            }
        )
    }

    findReservations = async (val) => {
        await this.db.find(
            (data) => this.setState({ reservations: data }),
            {
                CustomerID: val
            }
        )
    }

    handleDelete = (ReservationId) => {
        this.db.destroy(ReservationId, this.findCurrentUser)
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
                    <h1>My Reservations</h1>
                    <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                        <thead> <tr>
                            <th>Reservation Id</th><th>Customer Name</th><th>Time</th><th>Table Number</th><th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.reservations.map(
                                (reservation) =>
                                    <tr key={reservation.ReservationId}>
                                        <td>{reservation.ReservationId}</td>
                                        <td>
                                            {
                                                reservation.Customer.CustomerName == null
                                                    ?
                                                    <td>unamed customer</td>
                                                    :
                                                    <td>{reservation.Customer.CustomerName}</td>
                                            }
                                        </td>
                                        <td>{reservation.Time}</td>
                                        <td>{reservation.Table.Name}</td>
                                        <BS.OverlayTrigger
                                                trigger={['hover']}
                                                rootClose
                                                placement="bottom"
                                                overlay={popoverClickRootClose}
                                            >
                                        <td><BS.Button bsStyle="danger" onClick={() => this.handleDelete(reservation.ReservationId)}>Delete</BS.Button></td>
                                        </BS.OverlayTrigger>
                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>

                    <LinkContainer to={{ pathname: '/customerreservations/create' }}>
                        <BS.Button bsStyle="success">Make a reservation</BS.Button>
                    </LinkContainer>
                </center>
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
    db3 = new DB('http://localhost:51064/api/Tables')
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

        this.db3.find(
            data => this.setState({ Tables: data })
        )
        this.findCurrentUser()
        this.state({ CustomerId: this.state.Customer.CustomerId })

        console.log(this.state.Customer)

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
                                disabled={true}

                            />
                        </td>

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
                <BS.Button onClick={this.handleCreate}>create</BS.Button>
            </div>
        )
    }
}
