import React, { Component } from 'react';
import './App.css';
import ModalLogin from './modal/login'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  login(){
    console.log(this.state.login,this.state.password)
    fetch('http://localhost:8100/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation{
          signIn(login: "${this.state.login}", password: "${this.state.password}") {
            token
          }
        }`
      })
    }).then(
      response => response.json()
    ).then(
      data => console.log(data)
    ).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
            <ModalLogin login={this.state.login} password={this.state.password} handleChange={this.handleChange} loginFunction={this.login} />
        </div>
        
      </div>
    );
  }
}

export default App;
