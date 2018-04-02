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
                <center><h1>Admin Categories</h1></center>

                <center>
                <BS.Table striped bordered condensed hover style={{ width: '70%' }}>
                    <thead> <tr>
                        <th>Id</th><th>Name</th><th>Actions</th>
                        <th><LinkContainer to={{ pathname: '/admincategory/create' }}>
                            <BS.Button>Create a Category</BS.Button>
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
                                    <BS.ButtonToolbar>
                                        <LinkContainer to={'/admincategory/update/' + category.CategoryId}>
                                            <BS.Button>Edit</BS.Button>
                                        </LinkContainer>
                                        <BS.OverlayTrigger
                                            trigger={['hover']}
                                            rootClose
                                            placement="bottom"
                                            overlay={popoverClickRootClose}
                                        >
                                            <BS.Button bsStyle="danger" onClick={() => this.handleDelete(category.CategoryId)}>Delete</BS.Button>
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
                <center>
                    <h1>Create a Category</h1>
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
                <BS.Button bsStyle="success" onClick={this.handleCreate}>Create</BS.Button>
                </center>
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
                <center>
                    <h1>Edit a Category</h1>
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
                <BS.Button bsStyle="success" onClick={this.handleUpdate}>Save</BS.Button>
                </center>
            </div>
        )
    }
}