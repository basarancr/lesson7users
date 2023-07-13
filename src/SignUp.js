import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        message: ''
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/users', this.state)
            .then((response) => {
                console.log(response);
                this.setState({ message: '会員登録ありがとうございます' });
                // redirect to login page, handle errors, etc...
            })
            .catch((error) => {
                console.log(error);
                this.setState({ message: '会員登録を正常に行うことができませんでした' });
            });
    };

    render() {
        return (
            <form className="p-6 w-1/2 mx-auto mt-20 shadow-lg rounded-md" onSubmit={this.handleSubmit}>
                <label className="block mb-2">
                    Name:
                    <input type="text" name="name" onChange={this.handleInputChange} className="mt-1 p-2 w-full rounded-md shadow-sm" />
                </label>
                <label className="block mb-2">
                    Email:
                    <input type="email" name="email" onChange={this.handleInputChange} className="mt-1 p-2 w-full rounded-md shadow-sm" />
                </label>
                <label className="block mb-2">
                    Password:
                    <input type="password" name="password" onChange={this.handleInputChange} className="mt-1 p-2 w-full rounded-md shadow-sm" />
                </label>
                <button type="submit" className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                {this.state.message && <p className="mt-4">{this.state.message}</p>}
            </form>
        );
    }
}

export default SignUp;
