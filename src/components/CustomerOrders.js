import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
                                    </tr>
                            )}
                        </tbody>
                    </BS.Table>
                </center>
            </div>
        )
    }
}

