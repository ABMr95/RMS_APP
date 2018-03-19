import React, { Component } from 'react';
import * as Meals from './Meals';
import * as Auth from './Auth'
import * as BS from 'react-bootstrap';
import * as AdminMeals from './AdminMeals'
import * as RR from 'react-router'
import '../stylesheet/App.css';
import { LinkContainer } from 'react-router-bootstrap'

export default class NB extends Component {
    render() {
        return (
            <div>
                <BS.Navbar default collapseOnSelect onSelect={this.props.onSelect}>
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
                            </BS.NavDropdown>

                         
                                <LinkContainer to='/orders/myorder'>
                                    <BS.NavItem >My Order</BS.NavItem>
                                </LinkContainer>
                         

                            <BS.NavDropdown title="Admin" id="nav-dropdown">
                                <LinkContainer to='/adminmeals/all'>
                                    <BS.NavItem >Meals</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/admincustomers/all'>
                                    <BS.NavItem >Customers</BS.NavItem>
                                </LinkContainer>


                                <LinkContainer to='/adminorders/all'>
<<<<<<< HEAD
                                    <BS.NavItem >Orders</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/adminorderitems/all'>
                                    <BS.NavItem >Order Items</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/admincategory/all'>
                                    <BS.NavItem >Category</BS.NavItem>
=======
                                    <BS.NavItem >Admin Orders</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/adminorderitems/all'>
                                    <BS.NavItem >Admin Orderitems</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/admincategory/all'>
                                    <BS.NavItem >Admin Category</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/adminaddress/all'>
                                    <BS.NavItem >Admin Address</BS.NavItem>
>>>>>>> 424de0330a784ae538e955edc443cdbaa1b0bc4a
                                </LinkContainer>
                           
                            </BS.NavDropdown>

                        </BS.Nav>

                        <BS.Nav pullRight>

                        <BS.NavDropdown title="My Account" id="nav-dropdown">

                                <LinkContainer to='customerorders/all'>
                                    <BS.NavItem >My Orders List</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/orders/myorder'>
                                    <BS.NavItem >My cart</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='customerinfo/one'>
                                    <BS.NavItem >Info settings</BS.NavItem>
                                </LinkContainer>

                           
                            </BS.NavDropdown>

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