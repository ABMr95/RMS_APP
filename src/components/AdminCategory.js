import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class All extends Component {
    state = {
        categories: [],
        CategoryId: '',
        Name: '',
    }

    db = new DB('http://localhost:51064/api/Categories')

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ categories: data }),
            parameters
        )
    }

    handleDelete = (CategoryId) => {
        this.db.destroy(CategoryId, this.find)

    }

    handleUpdate = (CategoryId) => {
        this.props.onSelect(<Update CategoryId={CategoryId} />)
    }

    // handleCustomerText = (event) => {
    //     this.setState({ CustomerName: event.target.value })
    // }

    render() {
        console.log('render: ', this.props.location.query)
        return (
            <div>
                <div>
                    <h3>Admin Dashboard</h3>
                    <br />
                    <BS.Nav bsStyle="tabs" onSelect={this.handleSelect}>
                        <LinkContainer to='/admincustomers/all'><BS.NavItem>Customers</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminmeals/all'><BS.NavItem>Meals</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminorders/all'><BS.NavItem>Orders</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminorderitems/all'><BS.NavItem>Order Items</BS.NavItem></LinkContainer>
                        <LinkContainer to='/adminaddress/all'><BS.NavItem>Addresses</BS.NavItem></LinkContainer>
                        <LinkContainer to='/admincategory/all'><BS.NavItem>Categories</BS.NavItem></LinkContainer>
                    </BS.Nav>
                </div>
                <center><h1>Admin Categories</h1></center>

                

                <center>
                <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                    <thead> <tr>
                        <th>Id</th><th>Name</th><th>Actions</th>
                        <th><LinkContainer to={{ pathname: '/admincategory/create' }}>
                            <BS.Button>Create</BS.Button>
                        </LinkContainer></th>
                    </tr>
                    </thead>
                    <tbody>

                        {this.state.categories.map(

                            (category) =>

                                <tr key={category.CategoryId}>
                                    <td>{category.CategoryId}</td>
                                    <td>{category.Name}</td>
                                    <td>

                                        <LinkContainer to={'/admincategory/update/' + category.CategoryId}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer>

                                        <BS.Button onClick={() => this.handleDelete(category.CategoryId)}>Delete</BS.Button>

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
        category: null
    }

    db = new DB('http://localhost:51064/api/Categories')

    componentDidMount() {
        this.db.findOne(
            this.props.CategoryId,
            (data) => this.setState({ category: data })
        )
    }

    render() {
        console.log('Category: ', this.state.category)
        return (
            <div>
                {this.state.category
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.category.CategoryId}</td></tr>
                            <tr><td>Status</td><td>{this.state.category.Name}</td></tr>
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
        CategoryId: '',
        Name: '',
    }

    db = new DB('http://localhost:51064/api/Categories')
 

    componentDidMount() {
        this.categories.find(
            (data) => this.setState({ categories: data }))
    }

    handleCreate = () => {
        this.db.create(this.state)
        RR.browserHistory.push("admincategory/all")
    }

    handleId = (event) => {
        this.setState({ CategoryId: event.target.value })
    }

    handleName = (event) => {
        this.setState({ Name: event.target.value })
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
                                    value={this.state.CategoryId}
                                    placeholder="Enter CategoryId"
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

                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleCreate}>Create</BS.Button>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        CategoryId: '',
        Name: '',
    }

    db = new DB('http://localhost:51064/api/Categories')
    

    componentDidMount() {
        this.db.findOne(
            //this.props.CategoryId,
            this.props.params.id,
            data => this.setState(data)
        )
        this.customers.find(
            data => this.setState({ customers: data })
        )
    }


    handleUpdate = () => {
        this.db.update(this.state.CategoryId, this.state)
        RR.browserHistory.push("admincategory/all")
    }

    handleId = (event) => {
        this.setState({ CategoryId: event.target.value })
    }

    handleName = (event) => {
        this.setState({ Name: event.target.value })
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
                                    value={this.state.CategoryId}
                                    placeholder="Enter CategoryId"
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

                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
            </div>
        )
    }
}