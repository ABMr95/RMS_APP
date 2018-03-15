import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export class All extends Component {

    state = {
        orders: [],
        OrderId: '',
        CustomerID: '',
        Status: '',
        OrderDate: '',
        OrderReady: '',
        OrderDelivered: '',
        OrderType: '',
        //CategoryName: '',
        Column: '',
        Order: '',
        //ToggleCustomerID: false,
        //ToggleName: false,
        //TogglePrice: false,
        //ToggleCategory: false
    }

    // small bug in the order
    db = new DB('http://localhost:63719/api/Meals')
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

    handleDelete = (OrderId) => {
        this.db.destroy(OrderId, this.find)

    }

    handleUpdate = (MealId) => {
        this.props.onSelect(<Update MealId={MealId} />)
    }


    // handleMinPrice = (event) => {
    //     this.setState({ MinPrice: event.target.value })
    // }

    // handleMaxPrice = (event) => {
    //     this.setState({ MaxPrice: event.target.value })
    // }

    handleMealName = (event) => {
        this.setState({ Name: event.target.value })
    }

    handleCategoryText = (event) => {
        this.setState({ CategoryName: event.target.value })
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
            MinPrice: this.state.MinPrice, MaxPrice: this.state.MaxPrice,
        })
    }

    handleFindBy = (CategoryId) => {
        this.find({ CategoryId: CategoryId })
    }

    handleSearchByName = () => {
        this.find({
            Name: this.state.Name
        })
    }

    handleSearchByCategory = () => {
        this.find({
            Category: this.state.CategoryName
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

    handleOrderByPrice = () => {
        if (this.state.TogglePrice) {
            this.find({
                Column: "Price", Order: "ASC",
            })
            this.setState({ TogglePrice: !this.state.TogglePrice, Order: "ASC" })
        }
        else {
            this.find({
                Column: "Price", Order: "DSC",
            })
            this.setState({ TogglePrice: !this.state.TogglePrice, Order: "DESC" })
        }
    }

    handleOrderByCategory = () => {
        if (this.state.ToggleCategory) {
            this.find({
                Column: "Category", Order: "ASC",
            })
            this.setState({ ToggleCategory: !this.state.ToggleCategory, Order: "ASC" })
        }
        else {
            this.find({
                Column: "Category", Order: "DSC",
            })
            this.setState({ ToggleCategory: !this.state.ToggleCategory, Order: "DESC" })
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
                <h1>Admin Meals</h1>

                <LinkContainer to={{ pathname: '/adminmeals/create' }}>
                    <BS.Button>Create</BS.Button>
                </LinkContainer>


                <BS.Button onClick={this.handleShowAll}>Show All</BS.Button>
                <br />
                <BS.Form inline>
                    <BS.FormControl
                        type="text"
                        value={this.state.MinPrice}
                        placeholder="Enter Min Id"
                        onChange={this.handleMinPrice}
                    />
                    <BS.FormControl
                        type="text"
                        value={this.state.MaxPrice}
                        placeholder="Enter Max Id"
                        onChange={this.handleMaxPrice}
                    />

                    <LinkContainer to={
                        {
                            pathname: '/adminmeals/all',
                            query: {
                                MinPrice: this.state.MinPrice,
                                MaxPrice: this.state.MaxPrice
                            }
                        }
                    }
                    >
                        <BS.Button onClick={this.handleBetween}>Show with Price between Min and Max</BS.Button>
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
                            pathname: '/adminmeals/all',
                            query: { Name: this.state.Name }
                        }
                    } >
                        <BS.Button onClick={this.handleSearchByName}>Search By Meal  Name</BS.Button>
                    </LinkContainer>

                </BS.Form> <br />

                <br />

                <BS.Form inline>
                    <BS.FormControl
                        type="text"
                        value={this.state.CategoryName}
                        placeholder="Enter CategoryName"
                        onChange={this.handleCategoryText}
                    />
                    <LinkContainer to={
                        {
                            pathname: '/adminmeals/all',
                            query: { CategoryName: this.state.CategoryName }
                        }
                    } >
                        <BS.Button onClick={this.handleSearchByCategory}>Search By Category Name</BS.Button>
                    </LinkContainer>

                </BS.Form> <br />




                <BS.Table striped bordered condensed hover>
                    <thead> <tr>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderById}>Id</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Name</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByPrice}>Price</BS.Button>
                        </th>

                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByCategory}>Category</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByPrice}>options</BS.Button>
                        </th>


                    </tr>
                    </thead>

                    <tbody>

                        {this.state.orders.map(

                            (meal) =>

                                <tr key={meal.MealId}>

                                    <td>{meal.MealId}</td>

                                    <td>{meal.Name}</td>

                                    <td>{meal.Price}</td>

                                    <td>{meal.Category.Name}</td>

                                    {/* <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(meal.CategoryId)}>{meal.Category.Name}</BS.Button></td> */}

                                    <td>

                                        <LinkContainer to={'/adminmeals/update/' + meal.MealId}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer>

                                        <BS.Button onClick={() => this.handleDelete(meal.MealId)}>Delete</BS.Button>

                                        <BS.Button onClick={() => this.handleBuy(meal.MealId)} >Buy</BS.Button>



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
        meal: null
    }

    db = new DB('http://localhost:63719/api/Orders')

    componentDidMount() {
        this.db.findOne(
            this.props.OrderId,
            (data) => this.setState({ meal: data })
        )
    }

    render() {
        console.log('Pet: ', this.state.meal)
        return (
            <div>
                {this.state.meal
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.meal.OrderId}</td></tr>
                            <tr><td>Name</td><td>{this.state.meal.Name}</td></tr>
                            <tr><td>Category</td><td>{this.state.meal.Category.Name}</td></tr>
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
        OrderId: '',
        Name: '',
        Price: '',
        Description: '',
        CategoryId: '',
        categories: []
    }

    db = new DB('http://localhost:63719/api/Orders')
    //categories = new DB('http://localhost:63719/api/Categories')

    componentDidMount() {
        this.categories.find(
            (data) => this.setState({ categories: data }))
    }

    handleCreate = () => {
        this.db.create(this.state)
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
                                    value={this.state.OrderId}
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
        CustomerID: '',
        Status: '',
        OrderDate: '',
        OrderReady: '',
        OrderDelivered: '',
        OrderType: '',
        customers: []
    }

    db = new DB('http://localhost:63719/api/Orders')
    customers = new DB('http://localhost:63719/api/Customers')

    componentDidMount() {
        this.db.findOne(
            //this.props.OrderId,
            this.props.params.id,
            data => this.setState(data)
        )
        this.customers.find(
            data => this.setState({ customers: data })
        )
    }


    handleUpdate = () => {
        this.db.update(this.state.OrderId, this.state)
    }

    handleId = (event) => {
        this.setState({ OrderId: event.target.value })
    }

    handleCustomerID = (event) => {
        this.setState({ CustomerID: event.target.value })
    }

    handleStatus = (event) => {
        this.setState({ Status: parseInt(event.target.value) })
    }

    handleOrderDate = (event) => {
        this.setState({ OrderDate: event.target.value })
    }


    handleOrderReady = (eventKey) => {
        this.setState({ OrderReady: eventKey })
    }

    
    handleOrderDelivered = (eventKey) => {
        this.setState({ OrderDelivered: eventKey })
    }

    handleOrderType = (eventKey) => {
        this.setState({ OrderType: eventKey })
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
                            <td>Status</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.Status}
                                    placeholder="Enter Status"
                                    onChange={this.handleStatus}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>OrderDate</td>
                            <td>
                                <BS.FormControl
                                    type="date"
                                    //type="text"
                                    value={this.state.OrderDate}
                                    placeholder="Enter Order Date"
                                    onChange={this.handleOrderDate}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>OrderReady</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderReady}
                                    placeholder="Enter Order Ready"
                                    onChange={this.handleOrderReady}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>OrderDelivered</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.OrderDelivered}
                                    placeholder="Enter Order Delivered"
                                    onChange={this.handleOrderDelivered}
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