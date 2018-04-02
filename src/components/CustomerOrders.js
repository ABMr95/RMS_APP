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
                        <thead>
                        <tr>
                            <th>Id</th><th>Status</th><th>Customer</th><th>Total</th><th>Action</th>
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
                                        <td>
                                            <LinkContainer to={'/customerorders/one/' + order.OrderId}>
                                                <BS.Button bsStyle="info">View meals</BS.Button>
                                            </LinkContainer>
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
        order: null,
        OrderItems: [],
        total: 0,
        CustomerId: ''
    }

    db = new DB('http://localhost:51064/api/Orders')
    dbUser = new DB('http://localhost:51064/api/User')
    dbOrderItems = new DB('http://localhost:51064/api/OrderItems')


    componentDidMount() {
        this.findCurrentUser()
    }

    Quary = (parameters) => {
        this.dbUser.find(
            (data) => this.setState({}),
            parameters
        )
    }

    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.findOrderItem(data.CustomerId),
            {
                query: "customer"
            }
        )
    }

    findOrderItem = async (val) => {
        await this.dbOrderItems.find(
            (data) => this.setState({ OrderItems: data }),
            {
                CustomerID: val,
                OrderID: this.props.params.id
            }
        )
        this.getTotal()
    }

    getTotal = () => {
        let tempTotal = 0;
        this.state.OrderItems.map((orderItem, index) =>
            tempTotal += orderItem.Meal.Price
        )

        this.setState({ total: tempTotal })
    }

    render() {

        return (
            <div>
                <center><h1>My Orderitems </h1></center>

                <center>
                    <BS.Table striped bordered condensed hover style={{ width: '60%' }}>

                        <thead>
                        <tr>
                            <th>Meal Name</th><th>Price</th><th>Quantity</th><th>Order Id {this.props.params.id}</th>
                        </tr>
                        </thead>

                        <tbody>
                            {this.state.OrderItems.map(
                                (orderItem) =>
                                    < tr key={orderItem.ItemId} >
                                        <td>{orderItem.Meal.Name}</td>
                                        <td>{orderItem.Meal.Price}</td>
                                        <td>{orderItem.Quantity}</td>
                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>




                    {
                        this.state.total != 0
                            ?
                            <h2>Total Price:  {this.state.total}</h2>
                            :
                            <h2>loading</h2>
                    }
                    <LinkContainer to='customerorders/all'>
                        <BS.Button bsStyle="info">Back to My orders History</BS.Button>
                    </LinkContainer>
                </center>
            </div >
        )
    }
}

