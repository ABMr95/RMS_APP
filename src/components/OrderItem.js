import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'

export class All extends Component {

    state = {
        orderitems: []
    }

    db = new DB('http://localhost:51064/api/OrderItems')

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ orderitems: data }),
            parameters
        )
    }

    handleDelete = (Id) => {
        this.db.destroy(Id, this.find)
    }

    handleUpdate = (Id) => {
        this.props.onSelect(<Update Id={Id} />)
    }

    handleFindBy = (CustomerId) => {
        this.find({ CustomerId: CustomerId })
    }

    handleShowAll = () => {
        this.find()
    }

    render() {
        return (
            <div>
                <BS.Button onClick={this.handleShowAll}>Show All</BS.Button>
                <BS.Table striped bordered condensed hover>
                    <thead>
                        <tr><th>Id</th><th>Name</th></tr>
                    </thead>
                    <tbody>
                        {this.state.orderitems.map(
                            (orderitem) =>
                                <tr key={orderitem.Id}>
                                    <td>{orderitem.Id}</td>
                                    <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(orderitem.Id)}>{orderitem.Name}</BS.Button></td>
                                    
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

    db = new DB('http://localhost:51064/api/OrderItems')

    componentDidMount() {
        this.db.findOne(
            this.props.Id,
            (data) => this.setState({ orderitem: data })
        )
    }

    render() {
        console.log('Owner: ', this.state.orderitem)
        return (
            <div>
                {this.state.orderitem
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.orderitem.Id}</td></tr>
                            <tr><td>Name</td><td>{this.state.orderitem.Name}</td></tr>
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
        Name: ''
    }

    db = new DB('http://localhost:51064/api/OrderItems')

    handleCreate = () => {
        this.db.create(this.state)
    }

    handleId = (event) => {
        this.setState({ Id: event.target.value })
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
                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleCreate}>Create</BS.Button>
            </div>
        )
    }
}

export class Update extends Component {

    state = {
        Id: '',
        Name: ''
    }

    db = new DB('http://localhost:51064/api/OrderItems')

    componentDidMount() {
        this.db.findOne(
            this.props.Id,
            data => this.setState(data)
        )
    }

    handleUpdate = () => {
        this.db.update(this.state.Id, this.state)
    }

    handleId = (event) => {
        this.setState({ Id: event.target.value })
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
                    </tbody>
                </BS.Table>
                <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
            </div>
        )
    }
}