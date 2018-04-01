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
                            <a href="">RMS</a>
                        </BS.Navbar.Brand>
                        <BS.Navbar.Toggle />
                    </BS.Navbar.Header>
                    <BS.Navbar.Collapse>
                        <BS.Nav>
                            <LinkContainer to='/meals/all'>
                                <BS.NavItem >Meals</BS.NavItem>
                            </LinkContainer>

                            {
                                sessionStorage.getItem('token')
                                    ?
                                    <LinkContainer to='/orders/myorder'>
                                        <BS.NavItem >My Order</BS.NavItem>
                                    </LinkContainer>
                                    :
                                    console.log()
                            }



                            {
                                sessionStorage.getItem('token') && sessionStorage.getItem("userName") === "admin@admin.com"
                                    ?
                                    // <BS.NavDropdown title="Admin" id="nav-dropdown">
                                    //     <LinkContainer to='/adminmeals/all'>
                                    //         <BS.NavItem >Meals</BS.NavItem>
                                    //     </LinkContainer>

                                    //     <LinkContainer to='/admincustomers/all'>
                                    //         <BS.NavItem >Customers</BS.NavItem>
                                    //     </LinkContainer>

                                    //     <LinkContainer to='/adminorders/all'>
                                    //         <BS.NavItem >Orders</BS.NavItem>
                                    //     </LinkContainer>

                                    //     <LinkContainer to='/adminorderitems/all'>
                                    //         <BS.NavItem >Order Items</BS.NavItem>
                                    //     </LinkContainer>

                                    //     <LinkContainer to='/admincategory/all'>
                                    //         <BS.NavItem >Category</BS.NavItem>
                                    //     </LinkContainer>

                                    // </BS.NavDropdown>

                                    <LinkContainer to='/admindashbaord'>
                                        <BS.NavItem >Admin Dashboard</BS.NavItem>
                                    </LinkContainer>
                                    :
                                    console.log()
                            }
                        </BS.Nav>

                        {
                            sessionStorage.getItem('token') 
                                ?
                                <BS.Nav pullRight>

                                    <BS.NavDropdown title="My Account" id="nav-dropdown">

                                        <LinkContainer to='customerorders/all'>
                                            <BS.NavItem >My Order History</BS.NavItem>
                                        </LinkContainer>

                                        <LinkContainer to='customerreservations/all'>
                                            <BS.NavItem >My Reservations</BS.NavItem>
                                        </LinkContainer>

                                        <LinkContainer to='customeraddress/all'>
                                            <BS.NavItem >My address</BS.NavItem>
                                        </LinkContainer>


                                        <LinkContainer to='customerinfo/one'>
                                            <BS.NavItem >Info setting</BS.NavItem>
                                        </LinkContainer>

                                    </BS.NavDropdown>

                                    <BS.NavItem onClick={() => {
                                        sessionStorage.removeItem('token')
                                        alert("you have logged out successfully");
                                        RR.browserHistory.push("/login")
                                    }}
                                    >
                                        Logout
                                </BS.NavItem>

                                </BS.Nav>
                                :
                                <BS.Nav pullRight>

                                    <LinkContainer to='/login'>
                                        <BS.NavItem >Login</BS.NavItem>
                                    </LinkContainer>

                                    <LinkContainer to='/register'>
                                        <BS.NavItem >Register</BS.NavItem>
                                    </LinkContainer>
                                </BS.Nav>
                        }

                    </BS.Navbar.Collapse>
                </BS.Navbar>
                {this.props.children}
            </div>
        )
    }
}