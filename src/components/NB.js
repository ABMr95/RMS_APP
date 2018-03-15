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
                            </BS.NavDropdown>

                         
                                <LinkContainer to='/orders/myorder'>
                                    <BS.NavItem >My Order</BS.NavItem>
                                </LinkContainer>
                         

                            <BS.NavDropdown title="Admin" id="nav-dropdown">
                                <LinkContainer to='/adminmeals/all'>
                                    <BS.NavItem >Meals</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/customers/all'>
                                    <BS.NavItem >customers</BS.NavItem>
                                </LinkContainer>


                                <LinkContainer to='/adminorders/all'>
                                    <BS.NavItem >adminorders</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/adminorderitems/all'>
                                    <BS.NavItem >adminorderitems</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/admincategory/all'>
                                    <BS.NavItem >admincategory</BS.NavItem>
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

                        <BS.NavDropdown title="My Account" id="nav-dropdown">

                                <LinkContainer to='customerorders/all'>
                                    <BS.NavItem >My Orders List</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='/orders/myorder'>
                                    <BS.NavItem >My cart</BS.NavItem>
                                </LinkContainer>

                                <LinkContainer to='customerinfo/update/1'>
                                    <BS.NavItem >Info setting</BS.NavItem>
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