import React, { Component } from 'react';
import * as Meals from './Products';
import * as Auths from './Auths'
import * as BS from 'react-bootstrap';
import * as AdminMeals from './AdminMeals'
import '../stylesheet/App.css';

export default class NB extends Component {
    render() {
        return (
            <BS.Navbar inverse collapseOnSelect onSelect={this.props.onSelect}>
                <BS.Navbar.Header>
                    <BS.Navbar.Brand>
                        <a href="">RMS</a>
                    </BS.Navbar.Brand>
                    <BS.Navbar.Toggle />
                </BS.Navbar.Header>
                <BS.Navbar.Collapse>
                    <BS.Nav>
                        <BS.NavItem eventKey={6} href="#">My Order</BS.NavItem>
                        <BS.NavItem eventKey={<Meals.All />} href="#">Meals</BS.NavItem>

                        <BS.NavDropdown eventKey={3} title="Search Tables" id="basic-nav-dropdown">
                            <BS.MenuItem eventKey={<Meals.One />} href="#">Search Meals</BS.MenuItem>
                        </BS.NavDropdown>

                        <BS.NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown">
                            <BS.MenuItem eventKey={1} href="#">Customer</BS.MenuItem>
                            <BS.MenuItem eventKey={<AdminMeals.All/>} href="#">Meals</BS.MenuItem>

                        </BS.NavDropdown>
                    </BS.Nav>
                    <BS.Nav pullRight>
                        <BS.NavItem eventKey={<Auths.Login />} href="#">Log in</BS.NavItem>
                        <BS.NavItem eventKey={<Auths.Register />} href="#">Register</BS.NavItem>
                        <BS.NavItem eventKey={<Auths.Login />} onClick={() => { sessionStorage.removeItem('token') }} >
                            Logout
                        </BS.NavItem>

                    </BS.Nav>
                </BS.Navbar.Collapse>
            </BS.Navbar>
        )
    }
}