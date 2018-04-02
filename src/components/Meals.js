import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
import * as RR from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

export class All extends Component {

    state = {
        meals: [],
        MinPrice: '',
        MaxPrice: '',
        Name: '',
        CategoryName: '',
        Column: '',
        Order: '',
        ToggleId: false,
        ToggleName: false,
        TogglePrice: false,
        ToggleCategory: false,
        select: '',
        category: []
    }
    // small bug in the order
    db = new DB('http://localhost:51064/api/Meals')
    categoryDB = new DB('http://localhost:51064/api/Categories')
    buy = new DB('http://localhost:51064/api/User')

    componentDidMount() {
        this.find()
        this.getCategory()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ meals: data }),
            parameters
        )
    }

    getCategory = (parameters) => {
        this.categoryDB.find(
            (data) => this.setState({ category: data }),
            parameters
        )
    }

     Quary = async(parameters) => {
        await this.buy.find(
            (data) => this.setState({}),
            parameters
        )
    }

    handleDelete = (Id) => {
        this.db.destroy(Id, this.find)

    }

    handleMinPrice = (event) => {
        this.setState({ MinPrice: event.target.value })
    }

    handleMaxPrice = (event) => {
        this.setState({ MaxPrice: event.target.value })
    }

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
            Category: this.state.select
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

    handleBuy = async(val) => {
        console.log("im buying: " + val)
        await this.Quary({
            query: "buy",
            id: val
        })

        sessionStorage.getItem('token')
            ?
            RR.browserHistory.push("/orders/MyOrder")
            :
            RR.browserHistory.push("/login")
    }

    handleSelect = (event) => {
        this.state.select = event.target.value

        this.state.select === ''
            ?
            this.find()
            :
            this.handleSearchByCategory()
    }

    render() {
        

        return (
            <div>
                <center>
                    <BS.Jumbotron style={{ width: '85%', borderRadius: 50, opacity: 0.95 }}>
                        <center>
                            <div>
                                <h1 style={{ justifyContent: 'center' }}>Our Menu</h1>
                            </div>
                        </center>
                        <br />

                        <BS.FormGroup controlId="formControlsSelect">
                            <BS.ControlLabel>Select</BS.ControlLabel>
                            <BS.FormControl
                                style={{ width:'20%'}}
                                onChange={this.handleSelect}
                                inputRef={el => this.inputEl = el}
                                componentClass="select" placeholder="select">
                                <option value="">All</option>
                                
                                {this.state.category.map(
                                    (item) =>
                                    <option value={item.Name}>{item.Name}</option>          
                                )
                                }
                            </BS.FormControl>
                        </BS.FormGroup>

                        <center>
                            <BS.Table responsive hover striped style={{ width: '80%' }}>
                                <thead>
                                    <tr>
                                        <th>
                                            <center><BS.Button bsStyle='link' onClick={this.handleOrderByName}><h3><BS.Label bsStyle="info">Name</BS.Label></h3></BS.Button></center>
                                        </th>
                                        <th>
                                            <center><BS.Button bsStyle='link'><h3><BS.Label bsStyle="info">Image</BS.Label></h3></BS.Button></center>
                                        </th>
                                        <th>
                                            <center><BS.Button bsStyle='link' onClick={this.handleOrderByCategory}><h3><BS.Label bsStyle="info">Category</BS.Label></h3></BS.Button></center>
                                        </th>
                                        <th>
                                            <center><BS.Button bsStyle='link'><h3><BS.Label bsStyle="info">Description</BS.Label></h3></BS.Button></center>
                                        </th>
                                        <th>
                                            <center><BS.Button bsStyle='link' onClick={this.handleOrderByPrice}><h3><BS.Label bsStyle="info">Price</BS.Label></h3></BS.Button></center>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.meals.map(
                                        (meal) =>
                                            <tr key={meal.MealId}>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Name}</p></center></td>
                                                <td><center>
                                                    {
                                                        meal.ImageName
                                                            ?
                                                            <img src={require('../images/' + meal.ImageName + '.jpg')} width="160" height="100" style={{ padding: 5, borderRadius: 10 }} />
                                                            :
                                                            <img src={require('../images/default-thumbnail.jpg')} width="160" height="100" style={{ padding: 5, borderRadius: 10 }} />
                                                    }
                                                </center></td>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Category.Name}</p></center></td>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Description}</p></center></td>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Price} QR.</p></center></td>
                                                <td><center>
                                                    <div style={{ paddingTop: 25 }}>
                                                        <BS.Button bsStyle="default" bsSize="large" onClick={() => this.handleBuy(meal.MealId)}>Buy</BS.Button>
                                                    </div>
                                                </center></td>
                                            </tr>
                                    )
                                    }
                                </tbody>
                            </BS.Table>
                        </center>
                    </BS.Jumbotron>
                </center>
            </div>
        )
    }
}