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

    db = new DB('http://localhost:51064/api/Orders')

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
                <center><h1>Admin Orders</h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead> <tr>
                            <th>Id</th><th>Status</th><th>OrderDate</th><th>Total</th><th>OrderDelivered</th><th>OrderType</th><th>Customer</th><th>Actions</th>
                            <th> <LinkContainer to={{ pathname: '/adminorders/create' }}>
                                <BS.Button>Create an Order</BS.Button>
                            </LinkContainer></th>
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
                                        <td>
                                        <BS.ButtonToolbar>
                                            <LinkContainer to={'/adminorders/update/' + order.OrderId}>
                                                <BS.Button>Edit</BS.Button>
                                            </LinkContainer>
                                            {
                                                order.Status == "paid"
                                                    ?
                                                    <BS.Button bsStyle="danger" disabled onClick={() => this.handleDelete(order.OrderId)}>Delete</BS.Button>
                                                    :
                                                        <BS.OverlayTrigger
                                                            trigger={['hover']}
                                                            rootClose
                                                            placement="bottom"
                                                            overlay={popoverClickRootClose}
                                                        >
                                                            <BS.Button bsStyle="danger" onClick={() => this.handleDelete(order.OrderId)}>Delete</BS.Button>
                                                        </BS.OverlayTrigger>
                                            }
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

    db = new DB('http://localhost:51064/api/Orders')
    customers = new DB('http://localhost:51064/api/Customers')

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
                <center>
                    <h1>Create an Order</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
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
                <BS.Button bsStyle="success" onClick={this.handleCreate}>Create</BS.Button>
                </center>
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

    db = new DB('http://localhost:51064/api/Orders')
    customers = new DB('http://localhost:51064/api/Customers')

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

    handleCustomerID = (eventKey) => {
        this.setState({ CustomerID: eventKey })
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


    handleOrderDelivered = (event) => {
        this.setState({ OrderDelivered: event.target.value })
    }

    handleOrderType = (event) => {
        this.setState({ OrderType: event.target.value })
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Edit Order</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
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
                <BS.Button bsStyle="success" onClick={this.handleUpdate}>Save</BS.Button>
                </center>
            </div>
        )
    }
}