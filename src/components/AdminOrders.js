import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'


export class All extends Component {
    state = {
        orders: [],
        OrderId: '',
        CustomerID: '',
        Status: '',
        OrderDate: '',
        OrderReady: '',
        OrderDelivered: '',
        OrderType: '',
        CustomerName: '',
    }

    db = new DB('http://localhost:63719/api/Orders')

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ orders: data }),
            parameters
        )
    }

    handleDelete = (OrderId) => {
        this.db.destroy(OrderId, this.find)

    }

    handleUpdate = (OrderId) => {
        this.props.onSelect(<Update OrderId={OrderId} />)
    }

    handleCustomerText = (event) => {
        this.setState({ CustomerName: event.target.value })
    }

    render() {
        console.log('render: ', this.props.location.query)
        return (
            <div>
                <h1>Admin Orders</h1>

                <LinkContainer to={{ pathname: '/adminorders/create' }}>
                    <BS.Button>Create</BS.Button>
                </LinkContainer>

                
                <BS.Table striped bordered condensed hover>
                    <thead> <tr>
                        <th>Id</th><th>Status</th><th>OrderDate</th><th>OrderReady</th><th>OrderDelivered</th><th>OrderType</th><th>Customer</th>
                    </tr>
                    </thead>
                    <tbody>

                        {this.state.orders.map(

                            (order) =>

                                <tr key={order.OrderId}>
                                    <td>{order.OrderId}</td>
                                    <td>{order.Status}</td>
                                    <td>{order.OrderDate}</td>
                                    <td>{order.OrderReady}</td>
                                    <td>{order.OrderDelivered}</td>
                                    <td>{order.OrderType}</td>
                                    <td>{order.Customer.Name}</td>

                                    {/* <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(meal.CategoryId)}>{meal.Category.Name}</BS.Button></td> */}

                                    <td>

                                        <LinkContainer to={'/adminorders/update/' + order.OrderId}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer>

                                        <BS.Button onClick={() => this.handleDelete(order.OrderId)}>Delete</BS.Button>

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
        order: null
    }

    db = new DB('http://localhost:63719/api/Orders')

    componentDidMount() {
        this.db.findOne(
            this.props.OrderId,
            (data) => this.setState({ order: data })
        )
    }

    render() {
        console.log('Order: ', this.state.order)
        return (
            <div>
                {this.state.order
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.order.OrderId}</td></tr>
                            <tr><td>Status</td><td>{this.state.order.Status}</td></tr>
                            <tr><td>OrderDate</td><td>{this.state.order.OrderDate}</td></tr>
                            <tr><td>OrderReady</td><td>{this.state.order.OrderReady}</td></tr>
                            <tr><td>OrderDelivered</td><td>{this.state.order.OrderDelivered}</td></tr>
                            <tr><td>OrderType</td><td>{this.state.order.OrderType}</td></tr>
                            <tr><td>Customer</td><td>{this.state.order.Customer.Name}</td></tr>
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
        OrderId: '',
        CustomerID: '',
        Status: '',
        OrderDate: '',
        OrderReady: '',
        OrderDelivered: '',
        OrderType: '',
        customers: []
    }

    db = new DB('http://localhost:63719/api/Orders')
    customers = new DB('http://localhost:63719/api/Customers')

    componentDidMount() {
        this.customers.find(
            (data) => this.setState({ customers: data }))
    }

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("adminorders/all")

    }

    handleId = (event) => {
        this.setState({ OrderId: event.target.value })
    }

    handleStatus = (event) => {
        this.setState({ Status: event.target.value })
    }

    handleOrderDate = (event) => {
        this.setState({ OrderDate: event.target.value })
    }

    handleOrderReady = (event) => {
        this.setState({ OrderReady: event.target.value })
    }

    handleOrderType = (event) => {
        this.setState({ OrderType: event.target.value })
    }

    handleCustomerID = (eventKey) => {
        this.setState({ CustomerID: eventKey })
        console.log("eventkey" + eventKey)
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
                                    value={this.state.OrderId}
                                    placeholder="Enter OrderId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Status}
                                    placeholder="Enter Status"
                                    onChange={this.handleStatus}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Order Date</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    //type="date"
                                    value={this.state.OrderDate}
                                    placeholder="Enter Order Date"
                                    onChange={this.handleOrderDate}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Order Ready</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderReady}
                                    placeholder="Enter Order Ready"
                                    onChange={this.handleOrderReady}
                                />
                            </td>
                        </tr>

                        <tr>
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
        OrderId: '',
        CustomerID: '',
        Status: '',
        OrderDate: '',
        OrderReady: '',
        OrderDelivered: '',
        OrderType: '',
        customers: []
    }

    db = new DB('http://localhost:63719/api/Orders')
    customers = new DB('http://localhost:63719/api/Customers')

    componentDidMount() {
        this.db.findOne(
            //this.props.OrderId,
            this.props.params.id,
            data => this.setState(data)
        )
        this.customers.find(
            data => this.setState({ customers: data })
        )
    }


    handleUpdate = () => {
        this.db.update(this.state.OrderId, this.state)
        RR.browserHistory.push("adminorders/all")
    }

    handleId = (event) => {
        this.setState({ OrderId: event.target.value })
    }

    handleCustomerID = (event) => {
        this.setState({ CustomerID: event.target.value })
    }

    handleStatus = (event) => {
        this.setState({ Status: event.target.value })
    }

    handleOrderDate = (event) => {
        this.setState({ OrderDate: event.target.value })
    }


    handleOrderReady = (eventKey) => {
        this.setState({ OrderReady: eventKey })
    }

    
    handleOrderDelivered = (eventKey) => {
        this.setState({ OrderDelivered: eventKey })
    }

    handleOrderType = (eventKey) => {
        this.setState({ OrderType: eventKey })
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
                            <td>Order Id</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderId}
                                    placeholder="Enter OrderId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Status}
                                    placeholder="Enter Status"
                                    onChange={this.handleStatus}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Order Date</td>
                            <td>
                                <BS.FormControl
                                    //type="date"
                                    type="text"
                                    value={this.state.OrderDate}
                                    placeholder="Enter Order Date"
                                    onChange={this.handleOrderDate}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Order Ready</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderReady}
                                    placeholder="Enter Order Ready"
                                    onChange={this.handleOrderReady}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Order Delivered</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderDelivered}
                                    placeholder="Enter Order Delivered"
                                    onChange={this.handleOrderDelivered}
                                />
                            </td>
                        </tr>

                        <tr>
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
                        </tr>
                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
            </div>
        )
    }
}