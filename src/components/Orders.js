import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export class All extends Component {

    state = {
        orders: [],
        MinId: '',
        MaxId: '',
        Name: '',
        Column: '',
        Order: '',
        ToggleId: false,
        ToggleName: false,
        ToggleOwnerName: false
    }
    // small bug in the order


    db = new DB('http://localhost:63719/api/Orders')
    buy = new DB('http://localhost:63719/api/User')

    componentDidMount() {
        this.find()

    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ orders: data }),
            parameters
        )
    }

    Quary = (parameters) => {
        this.buy.find(
            (data) => this.setState({}),
            parameters
        )
    }

    handleDelete = (Id) => {
        this.db.destroy(Id, this.find)
    }

    handleUpdate = (Id) => {
        this.props.onSelect(<Update Id={Id} />)
    }


    handleMinId = (event) => {
        this.setState({ MinId: event.target.value })
    }

    handleMaxId = (event) => {
        this.setState({ MaxId: event.target.value })
    }

    handleMealName = (event) => {
        this.setState({ Name: event.target.value })
    }

    handleColumn = (event) => {
        this.setState({ Column: event.target.value })
    }

    handleOrder = (event) => {
        this.setState({ Order: event.target.value })
    }

    handleShowAll = () => {
        this.find()
    }

    handleBetween = () => {
        this.find({
            MinId: this.state.MinId, MaxId: this.state.MaxId,
        })
    }

    handleFindBy = (OwnerId) => {
        this.find({ OwnerId: OwnerId })
    }

    handleSearchByName = () => {
        this.find({
            Name: this.state.Name
        })
    }

    handleOrderById = () => {
        if (this.state.ToggleId) {
            this.find({
                Column: "Id", Order: "ASC",
            })
            this.setState({ ToggleId: !this.state.ToggleId, Order: "ASC" })
        }
        else {
            this.find({
                Column: "Id", Order: "DSC",
            })
            this.setState({ ToggleId: !this.state.ToggleId, Order: "DESC" })
        }
    }

    handleOrderByName = () => {
        if (this.state.ToggleName) {
            this.find({
                Column: "Name", Order: "ASC",
            })
            this.setState({ ToggleName: !this.state.ToggleName, Order: "ASC" })
        }
        else {
            this.find({
                Column: "Name", Order: "DSC",
            })
            this.setState({ ToggleName: !this.state.ToggleName, Order: "DESC" })
        }
    }

    handleOrderByOwnerName = () => {
        if (this.state.ToggleOwnerName) {
            this.find({
                Column: "OwnerName", Order: "ASC",
            })
            this.setState({ ToggleOwnerName: !this.state.ToggleOwnerName, Order: "ASC" })
        }
        else {
            this.find({
                Column: "OwnerName", Order: "DSC",
            })
            this.setState({ ToggleOwnerName: !this.state.ToggleOwnerName, Order: "DESC" })
        }
    }

    handleBuy = (val) => {
        console.log("im buying: " + val)
        this.Quary({
            query: "buy",
            id: val
        })

    }



    render() {
        console.log('render: ', this.props.location.query)
        return (
            <div>
                <BS.Button onClick={this.handleShowAll}>Show All</BS.Button>
                <br />
                <BS.Form inline>
                    <BS.FormControl
                        type="text"
                        value={this.state.MinId}
                        placeholder="Enter Min Id"
                        onChange={this.handleMinId}
                    />
                    <BS.FormControl
                        type="text"
                        value={this.state.MaxId}
                        placeholder="Enter Max Id"
                        onChange={this.handleMaxId}
                    />

                    <LinkContainer to={
                        {
                            pathname: '/orders/all',
                            query: {
                                MinId: this.state.MinId,
                                MaxId: this.state.MaxId
                            }
                        }
                    }

                    >
                        <BS.Button onClick={this.handleBetween}>Show with ID between Min and Max</BS.Button>
                    </LinkContainer>


                </BS.Form> <br />


                <BS.Form inline>
                    <BS.FormControl
                        type="text"
                        value={this.state.Name}
                        placeholder="Enter Name"
                        onChange={this.handleMealName}
                    />
                    <LinkContainer to={
                        {
                            pathname: '/orders/all',
                            query: { Name: this.state.Name }
                        }
                    } >
                        <BS.Button onClick={this.handleSearchByName}>Search By Pet Name</BS.Button>
                    </LinkContainer>


                </BS.Form> <br />

                <br />


                <BS.Table striped bordered condensed hover>
                    <thead> <tr>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderById}>Id</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Name</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Status</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByOwnerName}>options</BS.Button>
                        </th>


                    </tr>
                    </thead>

                    <tbody>

                        {this.state.orders.map(

                            (order) =>

                                <tr key={order.OrderId}>

                                    <td>{order.OrderId}</td>

                                    <td>{order.Customer.Name}</td>

                                    <td>{order.Status}</td>

                                    {/* <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(order.OwnerId)}>{order.Owner.Name}</BS.Button></td> */}

                                    <td>

                                        {/* <LinkContainer to={'/orders/update/' + order.Id}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer> */}

                                        {/* <BS.Button onClick={() => this.handleDelete(order.Id)}>Delete</BS.Button> */}

                                        <BS.Button onClick={() => this.handleBuy(order.OrderId)} >Buy</BS.Button>



                                    </td>

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
        order: null,
        OrderItems: [],
        customerId: 1
    }

    db = new DB('http://localhost:63719/api/Orders')
    db2 = new DB('http://localhost:63719/api/OrderItems')

    componentDidMount() {
        this.find()
        this.findOrderItems()
    }

    find = async (parameters) => {
        await this.db.findOne(
            2,
            (data) => this.setState({ order: data })
        )
    }

    findOrderItems = async (parameters) => {
        await this.db2.find(
            (data) => this.setState({ OrderItems: data }),
            parameters
        )
    }



    render() {
        // console.log('irder: ', this.state.order)
        return (
            <div>
                <h1>My order</h1>
                {this.state.order
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.order.OrderId}</td></tr>
                            <tr><td>Name</td><td>{this.state.order.Customer.Name}</td></tr>
                            <tr><td>Status</td><td>{this.state.order.Status}</td></tr>
                        </tbody>
                    </BS.Table>
                    :
                    <p>Loading...</p>
                }

<BS.Table striped bordered condensed hover>
                    <thead> <tr>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderById}>Meal Name</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Price</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Quantity</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByOwnerName}>Amount</BS.Button>
                        </th>


                    </tr>
                    </thead>

                    <tbody>

                        {this.state.OrderItems.map(

                            (orderItem) =>

                                <tr key={orderItem.ItemId}>

                                    <td>{orderItem.Meal.Name}</td>

                                    <td>{orderItem.Meal.Price}</td>

                                    <td>{orderItem.Quantity}</td>

                                    {/* <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(order.OwnerId)}>{order.Owner.Name}</BS.Button></td> */}

                                    <td>

                                        {/* <LinkContainer to={'/orders/update/' + order.Id}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer> */}

                                        {/* <BS.Button onClick={() => this.handleDelete(order.Id)}>Delete</BS.Button> */}

                                        <BS.Button onClick={() => this.handleBuy(orderItem.OrderId)} >Buy</BS.Button>



                                    </td>

                                </tr>

                        )}

                    </tbody>

                </BS.Table>

                
            </div>
        )
    }
}

export class Create extends Component {

    state = {
        Id: '',
        Name: '',
        OwnerId: '',
        owners: []
    }

    db = new DB('http://localhost:63719/api/Orders')
    owners = new DB('http://localhost:63719/api/Owners')

    componentDidMount() {
        this.owners.find(
            (data) => this.setState({ owners: data }))
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

    handleOwnerId = (eventKey) => {
        this.setState({ OwnerId: eventKey })
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
                            <td>Owner</td>
                            <td>
                                {
                                    // <FormControl componentClass="select" placeholder="select">
                                    //      <option value="select">select</option>
                                    //      <option value="other">...</option>
                                    // </FormControl>
                                }
                                <BS.DropdownButton title='Select Owner' id='owners' onSelect={this.handleOwnerId}>
                                    {
                                        this.state.owners.map(
                                            owner =>
                                                <BS.MenuItem
                                                    key={owner.Id}
                                                    eventKey={owner.Id}>
                                                    {owner.Name}
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
        Id: '',
        Name: '',
        OwnerId: '',
        owners: []
    }

    db = new DB('http://localhost:63719/api/Orders')
    owners = new DB('http://localhost:63719/api/Owners')

    componentDidMount() {
        this.db.findOne(
            //this.props.Id,
            this.props.params.id,
            data => this.setState(data)
        )
        this.owners.find(
            data => this.setState({ owners: data })
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

    handleOwnerId = (eventKey) => {
        this.setState({ OwnerId: eventKey })
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
                            <td>Owner</td>
                            <td>
                                <BS.DropdownButton defaultValue={this.state.OwnerId} title='Select Owner' id='owners' onSelect={this.handleOwnerId}>
                                    {
                                        this.state.owners.map(
                                            owner =>
                                                <BS.MenuItem
                                                    key={owner.Id}
                                                    eventKey={owner.Id}>
                                                    {owner.Name}
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