import React, { Component } from 'react';
import DB from './DB'
import * as BS from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'

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

    componentDidMount() {
        this.find()
    }

    find = (parameters) => {
        this.db.find(
            (data) => this.setState({ meals: data }),
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
            this.setState({ ToggleId: !this.state.ToggleId, Order: "ASC"  })
        }
        else {
            this.find({
                Column: "Id", Order: "DSC",
            })
            this.setState({ ToggleId: !this.state.ToggleId, Order: "DESC"   })
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
            this.setState({ ToggleOwnerName: !this.state.ToggleOwnerName, Order: "ASC"  })
        }
        else {
            this.find({
                Column: "OwnerName", Order: "DSC",
            })
            this.setState({ ToggleOwnerName: !this.state.ToggleOwnerName , Order: "DESC" })
        }
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

                    {/* <LinkContainer to={
                        {
                            pathname: '/meals/all',
                            query: {
                                MinId: this.state.MinId,
                                MaxId: this.state.MaxId
                            }
                        }
                    }

                    >
                        <BS.Button onClick={this.handleBetween}>Show with ID between Min and Max</BS.Button>
                    </LinkContainer> */}

                    <BS.Button onClick={this.handleBetween}>Show with ID between Min and Max</BS.Button>

                </BS.Form> <br />


                <BS.Form inline>
                    <BS.FormControl
                        type="text"
                        value={this.state.Name}
                        placeholder="Enter Name"
                        onChange={this.handleMealName}
                    />
                    {/* <LinkContainer to={
                        {
                            pathname: '/meals/all',
                            query: { Name: this.state.Name }
                        }
                    } >
                        <BS.Button onClick={this.handleSearchByName}>Search By Pet Name</BS.Button>
                    </LinkContainer> */}

                    <BS.Button onClick={this.handleSearchByName}>Search By Pet Name</BS.Button>

                </BS.Form> <br />





                <br />


                <BS.Table striped bordered condensed hover>
                    <thead> <tr> <th>
                        {/* <LinkContainer to={

                            {
                                pathname: '/meals/all',
                                query: {
                                    Column: 'Id',
                                    Order: this.state.Order
                                }
                            }}
                        >
                            <BS.Button bsStyle='link' onClick={this.handleOrderById}>Id</BS.Button>
                        </LinkContainer> */}
                        <BS.Button bsStyle='link' onClick={this.handleOrderById}>Id</BS.Button>

                    </th>
                        {/* <LinkContainer to={

                            {
                                pathname: '/meals/all',
                                query: {
                                    Column: 'Name',
                                    Order: this.state.Order
                                }
                            }}
                        >
                            <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Name</BS.Button>
                        </LinkContainer> */}
                        <BS.Button bsStyle='link' onClick={this.handleOrderByName}>Name</BS.Button>


                        <th>
                            {/* <LinkContainer to={

                                {
                                    pathname: '/meals/all',
                                    query: {
                                        Column: 'OwnerName',
                                        Order: this.state.Order
                                    }
                                }}
                            >
                                <BS.Button bsStyle='link' onClick={this.handleOrderByOwnerName}>Owner</BS.Button>
                            </LinkContainer> */}
                            <BS.Button bsStyle='link' onClick={this.handleOrderByOwnerName}>Owner</BS.Button>


                        </th>


                    </tr>
                    </thead>

                    <tbody>

                        {this.state.meals.map(

                            (pet) =>

                                <tr key={pet.Id}>

                                    <td>{pet.Id}</td>

                                    <td>{pet.Name}</td>

                                    <td><BS.Button bsStyle="link" onClick={() => this.handleFindBy(pet.OwnerId)}>{pet.Owner.Name}</BS.Button></td>

                                    <td>

                                        {/* <LinkContainer to={'/meals/update/' + pet.Id}>

                                            <BS.Button >Update</BS.Button>

                                        </LinkContainer> */}
                                        <BS.Button >Update</BS.Button>

                                        <BS.Button onClick={() => this.handleDelete(pet.Id)}>Delete</BS.Button>

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
        pet: null
    }

    db = new DB('http://localhost:63719/api/Meals')

    componentDidMount() {
        this.db.findOne(
            this.props.Id,
            (data) => this.setState({ pet: data })
        )
    }

    render() {
        console.log('Pet: ', this.state.pet)
        return (
            <div>
                {this.state.pet
                    ?
                    <BS.Table striped bordered condensed hover>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Id</td><td>{this.state.pet.Id}</td></tr>
                            <tr><td>Name</td><td>{this.state.pet.Name}</td></tr>
                            <tr><td>Owner</td><td>{this.state.pet.Owner.Name}</td></tr>
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
        OwnerId: '',
        owners: []
    }

    db = new DB('http://localhost:63719/api/Meals')
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

    db = new DB('http://localhost:63719/api/Meals')
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