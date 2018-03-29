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
        categoryName: 'Select Category',
        Column: '',
        Order: '',
        ToggleId: false,
        ToggleName: false,
        TogglePrice: false,
        ToggleCategory: false,
    }
    // small bug in the order
    db = new DB('http://localhost:51064/api/Meals')
    buy = new DB('http://localhost:51064/api/User')

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

    // handleUpdate = (MealId) => {
    //     this.props.onSelect(<Update MealId={MealId} />)
    // }


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

        sessionStorage.getItem('token') 
        ?
        // My cart
        RR.browserHistory.push("/orders/MyOrder")
        :
        RR.browserHistory.push("/login")
    }

    // handleBuy = (val) => {

    //     sessionStorage.getItem('token') 
    //     ?
    //     this.db.findOne(
    //         val,
    //         RR.browserHistory.push("/orders/MyOrder")
    //     )
    //     :
    //     RR.browserHistory.push("/login")

    // }



    render() {
        console.log('render: ', this.props.location.query)
        try {
            var foo = require('../images/Adobo.jpg');
            console.log("yes")
        }
        catch (e) {
            if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
                console.log("Can't load foo!");
            else
                throw e;
        }
        
        return (
            <div>
                <center>
                    <BS.Jumbotron style={{ width: '85%', borderRadius: 50, opacity: 0.95 }}>
                        <center>
                            <div>
                            
                                <h1 style={{ justifyContent: 'center' }}>Our Menu</h1>

                                <BS.Button onClick={this.handleShowAll}>Show All</BS.Button>
                                <br />
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
                                            pathname: '/meals/all',
                                            query: { CategoryName: this.state.CategoryName }
                                        }
                                    } >
                                        <BS.Button onClick={this.handleSearchByCategory}>
                                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                            Search By Category Name
                                        </BS.Button>
                                    </LinkContainer>

                                </BS.Form>
                            </div>
                        </center>
                        <br />

                        <center>
                            <BS.Table responsive hover striped style={{ width: '80%' }}>
                                <thead>
                                    <tr>
                                        {/* <th>
                                            <BS.Button bsStyle='link' onClick={this.handleOrderById}><h4><BS.Label bsStyle="info">ID</BS.Label></h4></BS.Button>
                                        </th> */}
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
                                                {/* <td>{meal.MealId}</td> */}
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Name}</p></center></td>
                                                <td><center>
                                                 {
                                                     meal.ImageName
                                                     ?
                                                     <img   src={require('../images/' + meal.ImageName + '.jpg')} width="160" height="100" style={{ padding: 5, borderRadius: 10 }} />
                                                     :
                                                     <img   src={require('../images/default-thumbnail.jpg')} width="160" height="100" style={{ padding: 5, borderRadius: 10 }} />
                                                 }
                                                </center></td>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Category.Name}</p></center></td>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Description}</p></center></td>
                                                <td><center><p style={{ paddingTop: 35 }}>{meal.Price} QR.</p></center></td>
                                                {/* <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(meal.OwnerId)}>{meal.Owner.Name}</BS.Button></td> */}
                                                <td><center>
                                                    {/* <LinkContainer to={'/meals/update/' + meal.Id}><BS.Button>Update</BS.Button></LinkContainer> */}
                                                    {/* <BS.Button onClick={() => this.handleDelete(meal.Id)}>Delete</BS.Button> */}
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

// export class One extends Component {

//     state = {
//         meal: null
//     }

//     db = new DB('http://localhost:51064/api/Meals')

//     componentDidMount() {
//         this.db.findOne(
//             this.props.Id,
//             (data) => this.setState({ meal: data })
//         )
//     }

//     render() {
//         console.log('Pet: ', this.state.meal)
//         return (
//             <div>
//                 {this.state.meal
//                     ?
//                     <BS.Table striped bordered condensed hover>
//                         <thead>
//                             <tr><th>Field</th><th>Value</th></tr>
//                         </thead>
//                         <tbody>
//                             <tr><td>Id</td><td>{this.state.meal.Id}</td></tr>
//                             <tr><td>Name</td><td>{this.state.meal.Name}</td></tr>
//                             <tr><td>Owner</td><td>{this.state.meal.Owner.Name}</td></tr>
//                         </tbody>
//                     </BS.Table>
//                     :
//                     <p>Loading...</p>
//                 }
//             </div>
//         )
//     }
// }

// export class Create extends Component {

//     state = {
//         Id: '',
//         Name: '',
//         OwnerId: '',
//         owners: []
//     }

//     db = new DB('http://localhost:51064/api/Meals')
//     owners = new DB('http://localhost:51064/api/Owners')

//     componentDidMount() {
//         this.owners.find(
//             (data) => this.setState({ owners: data }))
//     }

//     handleCreate = () => {
//         this.db.create(this.state)
//     }

//     handleId = (event) => {
//         this.setState({ Id: event.target.value })
//     }

//     handleName = (event) => {
//         this.setState({ Name: event.target.value })
//     }

//     handleOwnerId = (eventKey) => {
//         this.setState({ OwnerId: eventKey })
//     }

//     render() {
//         return (
//             <div>
//                 <BS.Table striped bordered condensed hover>
//                     <thead>
//                         <tr><th>Field</th><th>Value</th></tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>Id</td>
//                             <td>
//                                 <BS.FormControl
//                                     type="text"
//                                     value={this.state.Id}
//                                     placeholder="Enter Id"
//                                     onChange={this.handleId}
//                                 />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>Name</td>
//                             <td>
//                                 <BS.FormControl
//                                     type="text"
//                                     value={this.state.Name}
//                                     placeholder="Enter Name"
//                                     onChange={this.handleName}
//                                 />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>Owner</td>
//                             <td>
//                                 {
//                                     // <FormControl componentClass="select" placeholder="select">
//                                     //      <option value="select">select</option>
//                                     //      <option value="other">...</option>
//                                     // </FormControl>
//                                 }
//                                 <BS.DropdownButton title='Select Owner' id='owners' onSelect={this.handleOwnerId}>
//                                     {
//                                         this.state.owners.map(
//                                             owner =>
//                                                 <BS.MenuItem
//                                                     key={owner.Id}
//                                                     eventKey={owner.Id}>
//                                                     {owner.Name}
//                                                 </BS.MenuItem>
//                                         )
//                                     }
//                                 </BS.DropdownButton>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </BS.Table>
//                 <BS.Button onClick={this.handleCreate}>Create</BS.Button>
//             </div>
//         )
//     }
// }

// export class Update extends Component {

//     state = {
//         Id: '',
//         Name: '',
//         OwnerId: '',
//         owners: []
//     }

//     db = new DB('http://localhost:51064/api/Meals')
//     owners = new DB('http://localhost:51064/api/Owners')

//     componentDidMount() {
//         this.db.findOne(
//             //this.props.Id,
//             this.props.params.id,
//             data => this.setState(data)
//         )
//         this.owners.find(
//             data => this.setState({ owners: data })
//         )
//     }


//     handleUpdate = () => {
//         this.db.update(this.state.Id, this.state)
//     }

//     handleId = (event) => {
//         this.setState({ Id: event.target.value })
//     }

//     handleName = (event) => {
//         this.setState({ Name: event.target.value })
//     }

//     handleOwnerId = (eventKey) => {
//         this.setState({ OwnerId: eventKey })
//     }

//     render() {
//         return (
//             <div>
//                 <BS.Table striped bordered condensed hover>
//                     <thead>
//                         <tr><th>Field</th><th>Value</th></tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>Id</td>
//                             <td>
//                                 <BS.FormControl
//                                     type="text"
//                                     value={this.state.Id}
//                                     placeholder="Enter Id"
//                                     onChange={this.handleId}
//                                 />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>Name</td>
//                             <td>
//                                 <BS.FormControl
//                                     type="text"
//                                     value={this.state.Name}
//                                     placeholder="Enter Name"
//                                     onChange={this.handleName}
//                                 />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>Owner</td>
//                             <td>
//                                 <BS.DropdownButton defaultValue={this.state.OwnerId} title='Select Owner' id='owners' onSelect={this.handleOwnerId}>
//                                     {
//                                         this.state.owners.map(
//                                             owner =>
//                                                 <BS.MenuItem
//                                                     key={owner.Id}
//                                                     eventKey={owner.Id}>
//                                                     {owner.Name}
//                                                 </BS.MenuItem>
//                                         )
//                                     }
//                                 </BS.DropdownButton>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </BS.Table>
//                 <BS.Button onClick={this.handleUpdate}>Update</BS.Button>
//             </div>
//         )
//     }
// }