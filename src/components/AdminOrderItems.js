import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class All extends Component {
    state = {
        orderitems: [],
        ItemId: '',
        OrderId: '',
        MealID: '',
        Quantity: '',
    }

    db = new DB('http://localhost:51064/api/OrderItems')

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ orderitems: data }),
            parameters
        )
    }

    handleDelete = (ItemId) => {
        this.db.destroy(ItemId, this.find)

    }

    handleUpdate = (ItemId) => {
        this.props.onSelect(<Update ItemId={ItemId} />)
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
                <center><h1>Admin Order Items</h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead> <tr>
                            <th>ItemId</th><th>OrderId</th><th>Customer Name</th><th>Meal Name</th><th>Quantity</th><th>Actions</th>
                            <th><LinkContainer to={{ pathname: '/adminorderitems/create' }}>
                                <BS.Button>Create an Order Item</BS.Button>
                            </LinkContainer></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.orderitems.map(
                                (orderitem) =>
                                    <tr key={orderitem.ItemId}>
                                        <td>{orderitem.ItemId}</td>
                                        <td>{orderitem.OrderId}</td>
                                        <td>{orderitem.Order.Customer.Name}</td>
                                        <td>{orderitem.Meal.Name}</td>
                                        <td>{orderitem.Quantity}</td>
                                        <td>
                                            <BS.ButtonToolbar>
                                                <LinkContainer to={'/adminorderitems/update/' + orderitem.ItemId}>
                                                    <BS.Button>Edit</BS.Button>
                                                </LinkContainer>
                                                <BS.OverlayTrigger
                                                    trigger={['hover']}
                                                    rootClose
                                                    placement="bottom"
                                                    overlay={popoverClickRootClose}
                                                >
                                                    <BS.Button bsStyle="danger" onClick={() => this.handleDelete(orderitem.ItemId)}>Delete</BS.Button>
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

export class Create extends Component {

    state = {
        ItemId: '',
        OrderId: '',
        MealId: '',
        Quantity: '',
        orders: [],
        meals: [],
    }

    db = new DB('http://localhost:51064/api/OrderItems')
    orders = new DB('http://localhost:51064/api/Orders')
    meals  = new DB('http://localhost:51064/api/Meals')

    componentDidMount() {
        this.orders.find(
            (data) => this.setState({ orders: data }))
            this.meals.find(
                (data) => this.setState({ meals: data }))
            

    }



    handleCreate = () => {
        this.db.create(this.state)
        //RR.browserHistory.push("adminorderitems/all")
    }

    handleId = (event) => {
        this.setState({ ItemId: event.target.value })
    }

    handleOrderId = (event) => {
        this.setState({ OrderId: event.target.value })
    }

    handleMealId = (event) => {
        this.setState({ MealId: event.target.value })
    }

    handleQuantity = (event) => {
        this.setState({ Quantity: event.target.value })
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Create Order Item</h1>
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
                                    value={this.state.ItemId}
                                    placeholder="Enter ItemId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>OrderId</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderId}
                                    placeholder="Enter OrderId"
                                    onChange={this.handleOrderId}
                                />
                            </td>
                        </tr>

                         <tr>
                            <td>MealId</td>
                            <td>
                                <BS.DropdownButton title='Select Meal' id='meals' onSelect={this.handleMealID}>
                                    {
                                        this.state.meals.map(
                                            meal =>
                                                <BS.MenuItem
                                                    key={meal.MealId}
                                                    eventKey={meal.MealId}>
                                                    {meal.Name}
                                                </BS.MenuItem>
                                        )
                                    }
                                </BS.DropdownButton>
                            </td>
                        </tr>

                        <tr>
                            <td>Quantity</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Quantity}
                                    placeholder="Enter Quantity"
                                    onChange={this.handleQuantity}
                                />
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
        ItemId: '',
        OrderId: '',
        MealID: '',
        Quantity: '',
        orders: [],
        meals: [],
    }

    db = new DB('http://localhost:51064/api/OrderItems')
    orders = new DB('http://localhost:51064/api/Orders')
    meals  = new DB('http://localhost:51064/api/Meals')

    componentDidMount() {
        this.db.findOne(
            //this.props.ItemId,
            this.props.params.id,
            data => this.setState(data)
        )
        this.orders.find(
            data => this.setState({ orders: data })
        )
        this.meals.find(
            data => this.setState({ meals: data})
        )
    }


    handleUpdate = () => {
        this.db.update(this.state.ItemId, this.state)
        RR.browserHistory.push("adminorderitems/all")
    }

    handleId = (event) => {
        this.setState({ ItemId: event.target.value })
    }

    handleOrderId = (event) => {
        this.setState({ OrderId: event.target.value })
    }

    handleMealID = (event) => {
        this.setState({ MealID: event.target.value })
    }

    handleQuantity = (event) => {
        this.setState({ Quantity: event.target.value })
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Edit an Otder Item</h1>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ItemId</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.ItemId}
                                    placeholder="Enter ItemId"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>OrderId</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderId}
                                    placeholder="Enter OrderId"
                                    onChange={this.handleOrderId}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>MealID</td>
                            <td>
                                <BS.DropdownButton title='Select Meal' id='meals' onSelect={this.handleMealID}>
                                    {
                                        this.state.meals.map(
                                            meal =>
                                                <BS.MenuItem
                                                    key={meal.MealId}
                                                    eventKey={meal.MealId}>
                                                    {meal.Name}
                                                </BS.MenuItem>
                                        )
                                    }
                                </BS.DropdownButton>
                            </td>
                        </tr>

                        <tr>
                            <td>Quantity</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Quantity}
                                    placeholder="Enter Quantity"
                                    onChange={this.handleQuantity}
                                />
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