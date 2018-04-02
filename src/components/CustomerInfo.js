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

    db = new DB('http://localhost:51064/api/Customers')
    dbUser = new DB('http://localhost:51064/api/User')

    componentDidMount() {
        this.findCurrentUser()
    }


    findCurrentUser = async (parameters) => {
        await this.dbUser.find(
            (data) => this.setState({ customer: data }),
            {
                query: "customer"
            }
        )
    }

    
    render() {
        return (
            <div>
                <center>
                    <h1>My Info </h1>
                    {this.state.customer
                        ?
                        
                        <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                            <thead>
                                <tr><th>Field</th><th>Value</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Id</td><td>{this.state.customer.CustomerId}</td></tr>
                                <tr><td>UserName</td><td>{this.state.customer.Name}</td></tr>
                                <tr><td>Name</td><td>{this.state.customer.CustomerName}</td></tr>
                                <tr><td>Age</td><td>{this.state.customer.Age}</td></tr>
                                <tr><td>Gender</td><td>{this.state.customer.Gender}</td></tr>
                            </tbody>
                        </BS.Table>

                        :
                        <p>Loading...</p>
                    }

                    <LinkContainer to='customerinfo/update'>
                        <BS.Button bsStyle="info">Edit Your Information</BS.Button>
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
        CustomerName: '',
        Age: '',
        Gender: ''
    }

    db = new DB('http://localhost:51064/api/Customers')
    dbUser = new DB('http://localhost:51064/api/User')


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

    handleCustomerName = (event) => {
        this.setState({ CustomerName: event.target.value })
    }

    handleAge = (event) => {
        this.setState({ Age: event.target.value })
    }

    handleGender = (event) => {
        this.setState({ Gender: event.target.value })
    }



    handleUpdate = () => {
        let r1 = /^[0-9]*$/
        if(r1.test(this.state.Age)){
            this.db.update(this.state.CustomerId, this.state)
            alert("profile has been updated")
        }else{
            alert("please input only numbers")
        }
        
    }

    handleSelect = (event) => {
        this.state.Gender = event.target.value
    }


    render() {
        return (
            <div>
                <center>
                <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>


                        <tr>
                            <td> Name</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.CustomerName}
                                    placeholder="Enter Name"
                                    onChange={this.handleCustomerName}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td> Age</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Age}
                                    placeholder="Enter Age"
                                    onChange={this.handleAge}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td> Gender</td>
                            <td>


                                    <BS.FormControl
                                        onChange={this.handleSelect}
                                        inputRef={el => this.inputEl = el}
                                        componentClass="select" placeholder="select">
                                        <option value="">select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </BS.FormControl>
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