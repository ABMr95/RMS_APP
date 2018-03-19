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

    db = new DB('http://localhost:63719/api/OrderItems')

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
        return (
            <div>
                <center><h1>Admin Order Items</h1></center>

                <LinkContainer to={{ pathname: '/adminorderitems/create' }}>
                    <BS.Button>Create</BS.Button>
                </LinkContainer>

                
                <BS.Table striped bordered condensed hover>
                    <thead> <tr>
                        <th>ItemId</th><th>OrderId</th><th>Customer Name</th><th>Meal Name</th><th>Quantity</th>
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

                                        <LinkContainer to={'/adminorderitems/update/' + orderitem.ItemId}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer>

                                        <BS.Button onClick={() => this.handleDelete(orderitem.ItemId)}>Delete</BS.Button>

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
        orderitem: null
    }

    db = new DB('http://localhost:63719/api/OrderItems')

    componentDidMount() {
        this.db.findOne(
            this.props.ItemId,
            (data) => this.setState({ orderitem: data })
        )
    }

    render() {
        console.log('Orderitem: ', this.state.orderitem)
        return (
            <div>
                {this.state.orderitem
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>ItemId</td><td>{this.state.orderitem.ItemId}</td></tr>
                            <tr><td>OrderId</td><td>{this.state.orderitem.Order.OrderId}</td></tr>
                            <tr><td>MealID</td><td>{this.state.orderitem.Meal.MealID}</td></tr>
                            <tr><td>Quantity</td><td>{this.state.orderitem.Quantity}</td></tr>
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
        ItemId: '',
        OrderId: '',
        MealId: '',
        Quantity: '',
        orders: [],
        meals: [],
    }

    db = new DB('http://localhost:63719/api/OrderItems')
    orders = new DB('http://localhost:63719/api/Orders')
    meals  = new DB('http://localhost:63719/api/Meals')

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
                <BS.Button onClick={this.handleCreate}>Create</BS.Button>
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

    db = new DB('http://localhost:63719/api/OrderItems')
    orders = new DB('http://localhost:63719/api/Orders')
    meals  = new DB('http://localhost:63719/api/Meals')

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
                <BS.Table striped bordered condensed hover>
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
                <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
            </div>
        )
    }
}