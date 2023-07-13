import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        email: '',
        password: '',
        message: '',
        isLoggedIn: false
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/login', this.state)
            .then((response) => {
                console.log(response);
                this.setState({ 
                    message: 'ログインしました', 
                    isLoggedIn: true 
                });
                // handle authentication, redirect, errors, etc...
            })
            .catch((error) => {
                console.log(error);
                this.setState({ 
                    message: 'ログインできませんでした' 
                });
            });
    };

    handleLogout = () => {
        this.setState({ 
            email: '',
            password: '',
            isLoggedIn: false 
        });
        // handle actual logout process here...
    }

    render() {
        return (
            <div>
                <form className="p-6 w-1/2 mx-auto mt-20 shadow-lg rounded-md" onSubmit={this.handleSubmit}>
                    <label className="block mb-2">
                        Email:
                        <input type="email" name="email" onChange={this.handleInputChange} className="mt-1 p-2 w-full rounded-md shadow-sm" />
                    </label>
                    <label className="block mb-2">
                        Password:
                        <input type="password" name="password" onChange={this.handleInputChange} className="mt-1 p-2 w-full rounded-md shadow-sm" />
                    </label>
                    <button type="submit" className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log In</button>
                    {this.state.message && <p className="mt-4">{this.state.message}</p>}
                </form>
                {this.state.isLoggedIn && 
                    <button onClick={this.handleLogout} className="mt-4 p-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
                }
            </div>
        );
    }
}

export default Login;
