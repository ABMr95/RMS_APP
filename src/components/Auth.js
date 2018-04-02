import React, { Component } from 'react';
import * as Meals from './Meals'
// import * as Owners from './Owners'
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as RR from 'react-router'

export class Register extends Component {
    state = {
        Email: '',
        Password: '',
        ConfirmPassword: ''
    }

    handleEmail = (event) => {
        this.setState({ Email: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ Password: event.target.value })
    }

    handleConfirmPassword = (event) => {
        this.setState({ ConfirmPassword: event.target.value })
    }

    register = async (json, action) => {
        try {
            var response = await fetch(
                'http://localhost:51064/api/Account/Register', {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            console.log("register", response)
            action()
        }
        catch (e) {
            console.log("Error", e)
        }
    }

    handleRegister = () => {

        if (this.state.Password != this.state.ConfirmPassword) {
            alert("the password doesnt match")
        }
        else {
            this.register(
                this.state,
                () => RR.browserHistory.push("/login")
            )

        }

    }

    render() {
        return (
            <div>
                <center>
                    <h2>Register</h2>
                    <br />
                    <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <BS.FormControl
                                        type="text"
                                        value={this.state.Email}
                                        placeholder="Enter Email"
                                        onChange={this.handleEmail}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <BS.FormControl
                                        type="password"
                                        value={this.state.Password}
                                        placeholder="Enter Password"
                                        onChange={this.handlePassword}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>ConfirmPassword</td>
                                <td>
                                    <BS.FormControl
                                        type="password"
                                        value={this.state.ConfirmPassword}
                                        placeholder="Enter ConfirmPassword"
                                        onChange={this.handleConfirmPassword}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </BS.Table>
                    <BS.Button onClick={this.handleRegister}>Register</BS.Button>
                </center>
            </div>
        )
    }
}


export class Login extends Component {
    state = {
        Username: '',
        Password: ''
    }

    handleUsername = (event) => {
        this.setState({ Username: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ Password: event.target.value })
    }

    login = async (json, action) => {
        try {
            var response = await fetch(
                'http://localhost:51064/Token',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    body: 'grant_type=password&username=' + json.Username + '&password=' + json.Password
                }
            )
            console.log("login", response)
            const data = await response.json();
            action(data);
        }
        catch (e) {
            console.log("Error", e)
        }
    }

    handleLogin = () => {
        this.login(
            this.state,
            (data) => {
                if (data.access_token) {
                    sessionStorage.setItem('token', data.access_token)
                    sessionStorage.setItem('userName', data.userName)
                    console.log(sessionStorage.getItem('token'))
                    console.log(sessionStorage.getItem('userName'))
                    alert("welcome " + sessionStorage.getItem('userName'))
                    RR.browserHistory.push("/meals/all")

                }
                else{
                    alert("wrong user/password input ")
                }

            }
        )
    }

    render() {
        return (
            <div>
                <center>
                    <h2>Login</h2>
                    <br />
                    <BS.Table striped bordered condensed hover style={{ width: '60%' }}>
                        <thead>
                            <tr><th>Field</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>
                                    <BS.FormControl
                                        type="text"
                                        value={this.state.Username}
                                        placeholder="Enter Username"
                                        onChange={this.handleUsername}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <BS.FormControl
                                        type="password"
                                        value={this.state.Password}
                                        placeholder="Enter Password"
                                        onChange={this.handlePassword}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </BS.Table>
                    <BS.Button onClick={this.handleLogin}>Login</BS.Button>
                </center>
            </div>
        )
    }
}