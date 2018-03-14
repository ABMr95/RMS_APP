import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export class All extends Component {

    state = {
        meals: [],
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


    db = new DB('http://localhost:63719/api/Meals')
    buy = new DB('http://localhost:63719/api/User')

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ meals: data }),
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

    handleUpdate = (MealId) => {
        this.props.onSelect(<Update MealId={MealId} />)
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

    handleFindBy = (CategoryId) => {
        this.find({ CategoryId: CategoryId })
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

                <LinkContainer to={{ pathname: '/meals/create' }}>
                    <BS.Button>Create</BS.Button>
                </LinkContainer>


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
                            pathname: '/meals/all',
                            query: {
                                MinId: this.state.MinId,
                                MaxId: this.state.MaxId
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
                            pathname: '/meals/all',
                            query: { Name: this.state.Name }
                        }
                    } >
                        <BS.Button onClick={this.handleSearchByName}>Search By Meal  Name</BS.Button>
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
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Price</BS.Button>
                        </th>

                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Category</BS.Button>
                        </th>
                        <th>
                            <BS.Button bsStyle='link' onClick={this.handleOrderByOwnerName}>options</BS.Button>
                        </th>


                    </tr>
                    </thead>

                    <tbody>

                        {this.state.meals.map(

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

    db = new DB('http://localhost:63719/api/Meals')

    componentDidMount() {
        this.db.findOne(
            this.props.Id,
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
                            <tr><td>Id</td><td>{this.state.meal.Id}</td></tr>
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
        Id: '',
        Name: '',
        Price: '',
        Description: '',
        CategoryId: '',
        categories: []
    }

    db = new DB('http://localhost:63719/api/Meals')
    categories = new DB('http://localhost:63719/api/Categories')

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
        MealId: '',
        Name: '',
        Price: '',
        Description: '',
        CategoryId: '',
        categories: []
    }

    db = new DB('http://localhost:63719/api/Meals')
    categories = new DB('http://localhost:63719/api/Categories')

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
        this.db.update(this.state.MealId, this.state)
    }

    handleId = (event) => {
        this.setState({ MealId: event.target.value })
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
                            <td>MealId</td>
                            <td>
                                <BS.FormControl
                                    type="text"
                                    value={this.state.MealId}
                                    placeholder="Enter MealId"
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