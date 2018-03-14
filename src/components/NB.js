import React, { Component } from 'react';
import * as Meals from './Meals';
import * as Auth from './Auth'
import * as BS from 'react-bootstrap';
import * as AdminMeals from './AdminMeals'
import * as RR from 'react-router'
import '../stylesheet/App.css';
import { LinkContainer } from 'react-router-bootstrap'

// export default class NB extends Component {
//     render() {
//         return (
//             <BS.Navbar inverse collapseOnSelect onSelect={this.props.onSelect}>
//                 <BS.Navbar.Header>
//                     <BS.Navbar.Brand>
//                         <a href="">RMS</a>
//                     </BS.Navbar.Brand>
//                     <BS.Navbar.Toggle />
//                 </BS.Navbar.Header>
//                 <BS.Navbar.Collapse>
//                     <BS.Nav>
//                         <BS.NavItem eventKey={6} href="#">My Order</BS.NavItem>
//                         <BS.NavItem eventKey={<Meals.All />} href="#">Meals</BS.NavItem>

//                         <BS.NavDropdown eventKey={3} title="Search Tables" id="basic-nav-dropdown">
//                             <BS.MenuItem eventKey={<Meals.One />} href="#">Search Meals</BS.MenuItem>
//                         </BS.NavDropdown>

//                         <BS.NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown">
//                             <BS.MenuItem eventKey={1} href="#">Customer</BS.MenuItem>
//                             <BS.MenuItem eventKey={<AdminMeals.All/>} href="#">Meals</BS.MenuItem>

//                         </BS.NavDropdown>
//                     </BS.Nav>
//                     <BS.Nav pullRight>
//                         <BS.NavItem eventKey={<Auth.Login />} href="#">Log in</BS.NavItem>
//                         <BS.NavItem eventKey={<Auth.Register />} href="#">Register</BS.NavItem>
                        // <BS.NavItem eventKey={<Auth.Login />} onClick={() => { sessionStorage.removeItem('token') }} >
                        //     Logout
                        // </BS.NavItem>

//                     </BS.Nav>
//                 </BS.Navbar.Collapse>
//             </BS.Navbar>
//         )
//     }
// }


export default class NB extends Component {
    render() {
        return (
            <div>
                <BS.Navbar inverse collapseOnSelect onSelect={this.props.onSelect}>
                    <BS.Navbar.Header>
                        <BS.Navbar.Brand>
                            <a href="#">RMS</a>
                        </BS.Navbar.Brand>
                        <BS.Navbar.Toggle />
                    </BS.Navbar.Header>
                    <BS.Navbar.Collapse>
                        <BS.Nav>
                            <BS.NavDropdown title="Meals" id="nav-dropdown">
                                <LinkContainer to='/meals/all'>
                                    <BS.NavItem >Meals</BS.NavItem>
                                </LinkContainer>
                                <LinkContainer to='/meals/create'>
                                    <BS.NavItem >Create</BS.NavItem>
                                </LinkContainer>
                            </BS.NavDropdown>

<<<<<<< HEAD
                            <BS.NavDropdown title="Customers" id="nav-dropdown">
                                <LinkContainer to='/customers/all'>
                                    <BS.NavItem >Customers</BS.NavItem>
                                </LinkContainer>
                                <LinkContainer to='/customers/create'>
                                    <BS.NavItem >Create</BS.NavItem>
                                    
=======
                            <BS.NavDropdown title="Orders" id="nav-dropdown">
                                <LinkContainer to='/orders/all'>
                                    <BS.NavItem >Orders all</BS.NavItem>
                                </LinkContainer>
                                <LinkContainer to='/orders/myorder'>
                                    <BS.NavItem >myorder</BS.NavItem>
>>>>>>> c2bdab3631426926792a118288bd6c0a5fd6675b
                                </LinkContainer>
                            </BS.NavDropdown>

                            <BS.NavDropdown title="Admin" id="nav-dropdown">
                                <LinkContainer to='/adminmeals/all'>
                                    <BS.NavItem >Meals</BS.NavItem>
                                </LinkContainer>
                                <LinkContainer to='/adminmeals/create'>
                                    <BS.NavItem >Create</BS.NavItem>
                                </LinkContainer>
                            </BS.NavDropdown>

                            {/* <BS.NavDropdown title="Owners" id="nav-dropdown">
                                <LinkContainer to='/owners/all'>
                                    <BS.NavItem >Owners</BS.NavItem>
                                </LinkContainer>
                                <LinkContainer to='/owners/create'>
                                    <BS.NavItem >Create</BS.NavItem>
                                </LinkContainer>
                            </BS.NavDropdown> */}


                        </BS.Nav>

                        <BS.Nav pullRight>

                            <LinkContainer to='/login'>
                                <BS.NavItem >Login</BS.NavItem>
                            </LinkContainer>
                            <BS.NavItem onClick={() => {
                                sessionStorage.removeItem('token')
                                RR.browserHistory.push("/login")
                            }}
                            >
                                Logout
                            </BS.NavItem>
                            <LinkContainer to='/register'>
                                <BS.NavItem >Register</BS.NavItem>
                            </LinkContainer>
                        </BS.Nav>


                    </BS.Navbar.Collapse>
                </BS.Navbar>
                {this.props.children}
            </div>
        )
    }
}