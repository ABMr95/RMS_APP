import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import * as RR from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'


export class One extends Component {

    state = {
        order: null,
        OrderItems: [],
        total: 0
    }

    db = new DB('http://localhost:51064/api/Orders')
    dbUser = new DB('http://localhost:51064/api/User')

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

    getTotal = () => {
        let tempTotal = 0;
        this.state.OrderItems.map((orderItem, index) =>
            tempTotal += orderItem.Meal.Price
        )
        if (this.state.order.Customer.Membership.Type == "Uranium")
            {
                tempTotal = tempTotal - tempTotal * 0.5;
            }
            else if (this.state.order.Customer.Membership.Type== "Gold")
            {
                tempTotal = tempTotal -  tempTotal * 0.25;
            }
            else if (this.state.order.Customer.Membership.Type == "Silver")
            {
                tempTotal =tempTotal -tempTotal * 0.10;
            }
            else if (this.state.order.Customer.Membership.Type == "Bronze")
            {
                tempTotal =tempTotal -tempTotal * 0.05;
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
                        <thead> <tr>{/* onClick={this.handleOrderById} */}
                            <th>
                                <BS.Button bsStyle='link' >Meal Name</BS.Button>
                            </th>
                            <th>
                                <BS.Button bsStyle='link'>Price</BS.Button>
                            </th>
                            <th>
                                <BS.Button bsStyle='link'>Quantity</BS.Button>
                            </th>
                            <th>
                                <BS.Button bsStyle='link'>option</BS.Button>
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

                                        
                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>
                    <BS.Button onClick={() => this.handleCheckout()} >Checkout</BS.Button>
                    <BS.Button onClick={() => this.handleEmptyCart()} >Empty cart</BS.Button>

                    <h2>Total = {this.state.total}</h2>
                </center>
            </div >
        )
    }
}