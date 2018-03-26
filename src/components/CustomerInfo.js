import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


export class One extends Component {

    state = {
        customer: null,
        OrderItems: [],
        customerId: 1
    }

    db = new DB('http://localhost:63719/api/Orders')
    dbUser = new DB('http://localhost:63719/api/User')

    componentDidMount() {
        // this.find()
        // this.findOrderItem()
        this.findCurrentUser()
    }

    find = async (parameters) => {
        await this.db.findOne(
            2,
            (data) => this.setState({ customer: data })
        )
    }

    Quary = (parameters) => {
        this.dbUser.find(
            (data) => this.setState({}),
            parameters
        )
    }

    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.setState({ customer: data }),
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


    findOrderItem = async (parameters) => {
        await this.dbUser.find(
            (data) => this.setState({ OrderItems: data }),
            {
                query: "orderitems"
            }
        )
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


    render() {
        return (
            <div>
                <center>
                <h1>My Info</h1>
                {this.state.customer
                    ?
                    <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.customer.CustomerId}</td></tr>
                            <tr><td>Name</td><td>{this.state.customer.Name}</td></tr>
                        </tbody>
                    </BS.Table>
                    
                    :
                    <p>Loading...</p>
                }

                <LinkContainer to='customerinfo/update'>
                    <BS.Button  >Update</BS.Button>
                </LinkContainer>
            </center>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        CustomerId: '',
        Name: '',
    }

    db = new DB('http://localhost:63719/api/Customers')
    dbUser = new DB('http://localhost:63719/api/User')


    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.db.findOne(
                data.CustomerId,
                data => this.setState(data)
            ),
            {
                query: "customer"
            }
        )
    }



    componentDidMount() {
        this.findCurrentUser()

    }


    handleName = (event) => {
        this.setState({ Name: event.target.value })
    }

    handleUpdate = () => {
        this.db.update(this.state.CustomerId, this.state)
    }



    render() {
        return (
            <div>
                <BS.Table striped bordered condensed hover style={{ width: '50%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
 
                        <tr>
                            <td>Name</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Name}
                                    placeholder="Enter Name"
                                    onChange={this.handleName}
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