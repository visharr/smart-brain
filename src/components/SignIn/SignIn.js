import React, { Component } from 'react';
import './SignIn.css'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onSubmitSignIn = () => {
        fetch('https://fast-eyrie-35897.herokuapp.com/' + 'signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(respsonse => respsonse.json())
            .then(data => {
                if (data.token && data.success === 'true') {
                    fetch('https://fast-eyrie-35897.herokuapp.com' + '/profile', {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': data.token
                        }
                    })
                        .then(response => response.json())
                        .then(user => {
                            this.props.loadUser(user);
                            this.props.onRouteChange('home');
                            this.saveAuthTokenInSession(data.token);
                        })
                }
            })
            .catch(err => console.log('error signing in'));

    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <div>
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6">Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email" name="email-address" id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" >Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password" name="password" id="password" />
                                </div>
                                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in" />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </div>
            </article>
        );
    }
}

export default SignIn;