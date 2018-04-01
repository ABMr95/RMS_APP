import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'


export class All extends Component {

    state = {
        orders: [],

    }
    db = new DB('http://localhost:51064/api/Orders')
    dbUser = new DB('http://localhost:51064/api/User')

    componentDidMount() {
        this.findCurrentUser()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ orders: data }),
            parameters
        )
    }



    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.findOrder(data.CustomerId),
            {
                query: "customer"
            }
        )
    }

    findOrder = async (val) => {
        await this.db.find(
            (data) => this.setState({ orders: data }),
            {
                CustomerID: val
            }
        )
    }

    render() {
        console.log('render: ', this.props.location.query)
        return (
            <div>
                <center>
                    <h1>My History Orders</h1>
                    <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                        <thead> <tr>
                            <th>
                                Id
                        </th>

                            <th>
                                Status
                        </th>

                            <th>
                                Customer
                        </th>
                            <th>
                                Total
                        </th>
                        <th>
                                Action
                        </th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(
                                (order) =>
                                    <tr key={order.OrderId}>
                                        <td>{order.OrderId}</td>
                                        <td>{order.Status}</td>
                                        <td>{order.Customer.Name}</td>
                                        <td>{order.OrderReady}</td>
                                        <td><LinkContainer to='customerorders/one'>
                                            <BS.Button>View</BS.Button>
                                        </LinkContainer></td>
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
        order: null,
        OrderItems: [],
        total: 0
    }

    db = new DB('http://localhost:51064/api/Orders')
    dbUser = new DB('http://localhost:51064/api/User')
    dbOrderItems = new DB('http://localhost:51064/api/OrderItems')


    componentDidMount() {
        this.findCurrentUser()
        this.findOrderItem()
    }


    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.setState({ order: data }),
            {
                query: "order"
            }
        )
    }

    Quary = (parameters) => {
        this.dbUser.find(
            (data) => this.setState({}),
            parameters
        )
    }


    findOrderItem = async (parameters) => {
        await this.dbUser.find(
            (data) => this.setState({ OrderItems: data }),
            {
                query: "orderitems"
            }
        )
        this.getTotal()
    }

    handleCheckout = () => {
        console.log("im checking out ")
        this.Quary({
            query: "checkout"

        })
    }

    handleEmptyCart = () => {
        console.log("im emypying cart ")
        this.Quary({
            query: "emptycart"

        })
    }

    handleDelete = (ItemId) => {
        this.dbOrderItems.destroy(ItemId, this.find)
        this.findOrderItem()
        this.setState({})
        RR.browserHistory.push("/orders/MyOrder")

    }

    getTotal = () => {
        let tempTotal = 0;
        this.state.OrderItems.map((orderItem, index) =>
            tempTotal += orderItem.Meal.Price
        )
        if (this.state.order.Customer.Membership.Type == "Uranium") {
            tempTotal = tempTotal - tempTotal * 0.5;
        }
        else if (this.state.order.Customer.Membership.Type == "Gold") {
            tempTotal = tempTotal - tempTotal * 0.25;
        }
        else if (this.state.order.Customer.Membership.Type == "Silver") {
            tempTotal = tempTotal - tempTotal * 0.10;
        }
        else if (this.state.order.Customer.Membership.Type == "Bronze") {
            tempTotal = tempTotal - tempTotal * 0.05;
        }
        this.setState({ total: tempTotal })
    }

    render() {

        return (
            <div>
                <center><h1>My order</h1></center>
                {this.state.order
                    ?
                    <center>
                        <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                            <thead>
                                <tr><th>Field</th><th>Value</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Id</td><td>{this.state.order.OrderId}</td></tr>
                                <tr><td>Name</td><td>{this.state.order.Customer.Name}</td></tr>
                                <tr><td>Status</td><td>{this.state.order.Status}</td></tr>
                                <tr><td>Membership</td><td>{this.state.order.Customer.Membership.Type}</td></tr>
                            </tbody>
                        </BS.Table>
                    </center>
                    :
                    <p>Loading...</p>
                }

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                        <thead> <tr>
                            <th>
                                Meal Name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                option
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                            {this.state.OrderItems.map(
                                (orderItem) =>
                                    < tr key={orderItem.ItemId} >
                                        <td>{orderItem.Meal.Name}</td>
                                        <td>{orderItem.Meal.Price}</td>
                                        <td>{orderItem.Quantity}</td>
                                        <td><BS.Button onClick={() => this.handleDelete(orderItem.ItemId)}>Delete</BS.Button></td>

                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>
                    <BS.Button onClick={() => this.handleCheckout()} >Checkout</BS.Button>
                    <BS.Button onClick={() => this.handleEmptyCart()} >Empty cart</BS.Button>

                    <h2>Total Price:  {this.state.total}</h2>
                </center>
            </div >
        )
    }
}

