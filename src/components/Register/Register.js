import React, { Component } from 'react';
import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onSubmitSignIn = () => {
        fetch('https://fast-eyrie-35897.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(respsonse => respsonse.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
                }
            }).catch(err => {
                console.log(err);
            });

    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    render() {
        return (
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <div>
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" >Name</label>
                                    <input
                                        onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text"
                                        name="name"
                                        id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" >Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" >Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password" />
                                </div>
                                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Register" />
                            </div>
                        </div>
                    </main>
                </div>
            </article>
        );

    }
}

export default Register;