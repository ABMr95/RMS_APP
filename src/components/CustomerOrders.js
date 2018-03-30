import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export class All extends Component {

    state = {
        orders: [],
        user: null,
        MinPrice: '',
        MaxPrice: '',
        Name: '',
        CategoryName: '',
        Column: '',
        Order: '',
        ToggleId: false,
        ToggleName: false,
        TogglePrice: false,
        ToggleCategory: false
    }
    // small bug in the order
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

    Quary = (parameters) => {
        this.userDB.find(
            (data) => this.setState({}),
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

export class One extends Component {

    state = {
        order: null
    }

    db = new DB('http://localhost:51064/api/Orders')

    componentDidMount() {
        this.db.findOne(
            this.props.Id,
            (data) => this.setState({ order: data })
        )
    }

    render() {
        console.log('Pet: ', this.state.order)
        return (
            <div>
                {this.state.order
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.order.Id}</td></tr>
                            <tr><td>Name</td><td>{this.state.order.Name}</td></tr>
                            <tr><td>Category</td><td>{this.state.order.Category.Name}</td></tr>
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
        Id: '',
        Name: '',
        Price: '',
        Description: '',
        CategoryId: '',
        categories: []
    }

    db = new DB('http://localhost:51064/api/Orders')
    categories = new DB('http://localhost:51064/api/Categories')

    componentDidMount() {
        this.categories.find(
            (data) => this.setState({ categories: data }))
    }

    handleCreate = () => {
        this.db.create(this.state)
    }

    handleId = (event) => {
        this.setState({ Id: event.target.value })
    }

    handleName = (event) => {
        this.setState({ Name: event.target.value })
    }

    handlePrice = (event) => {
        this.setState({ Price: parseInt(event.target.value) })
    }

    handleDescription = (event) => {
        this.setState({ Description: event.target.value })
    }

    handleCategoryId = (eventKey) => {
        this.setState({ CategoryId: eventKey })
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
                                    value={this.state.Id}
                                    placeholder="Enter Id"
                                    onChange={this.handleId}
                                />
                            </td>
                        </tr>
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

                        <tr>
                            <td>Price</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Price}
                                    placeholder="Enter Price"
                                    onChange={this.handlePrice}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Description}
                                    placeholder="Enter Description"
                                    onChange={this.handleDescription}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                {
                                    // <FormControl componentClass="select" placeholder="select">
                                    //      <option value="select">select</option>
                                    //      <option value="other">...</option>
                                    // </FormControl>
                                }
                                <BS.DropdownButton title='Select Category' id='categories' onSelect={this.handleCategoryId}>
                                    {
                                        this.state.categories.map(
                                            category =>
                                                <BS.MenuItem
                                                    key={category.CategoryId}
                                                    eventKey={category.CategoryId}>
                                                    {category.Name}
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
        Name: '',
        Price: '',
        Description: '',
        CategoryId: '',
        categories: []
    }

    db = new DB('http://localhost:51064/api/Orders')
    categories = new DB('http://localhost:51064/api/Categories')

    componentDidMount() {
        this.db.findOne(
            //this.props.Id,
            this.props.params.id,
            data => this.setState(data)
        )
        this.categories.find(
            data => this.setState({ categories: data })
        )
    }


    handleUpdate = () => {
        this.db.update(this.state.OrderId, this.state)
    }

    handleId = (event) => {
        this.setState({ OrderId: event.target.value })
    }

    handleName = (event) => {
        this.setState({ Name: event.target.value })
    }

    handlePrice = (event) => {
        this.setState({ Price: parseInt(event.target.value) })
    }

    handleDescription = (event) => {
        this.setState({ Description: event.target.value })
    }


    handleCategoryId = (eventKey) => {
        this.setState({ CategoryId: eventKey })
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
                            <td>OrderId</td>
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

                        <tr>
                            <td>Price</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Price}
                                    placeholder="Enter Price"
                                    onChange={this.handlePrice}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Description}
                                    placeholder="Enter Description"
                                    onChange={this.handleDescription}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                {
                                    // <FormControl componentClass="select" placeholder="select">
                                    //      <option value="select">select</option>
                                    //      <option value="other">...</option>
                                    // </FormControl>
                                }
                                <BS.DropdownButton title='Select Category' id='categories' onSelect={this.handleCategoryId}>
                                    {
                                        this.state.categories.map(
                                            category =>
                                                <BS.MenuItem
                                                    key={category.CategoryId}
                                                    eventKey={category.CategoryId}>
                                                    {category.Name}
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