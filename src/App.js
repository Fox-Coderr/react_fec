import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import ModalLogin from './modal/login'
import ModalItem from './modal/item'


class App extends Component {

  constructor(props) {
    super(props);
    let token = false
    if(sessionStorage.getItem('token')){
      token = true
    }

    this.state = {
      login: '',
      password: '',
      items: [],
      loggedIn: token,
      quantity: 1,
      loginAlert:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.addCart = this.addCart.bind(this);
    this.getItens()
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  login(){
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
      response => {
        sessionStorage.setItem('token', response.data['signIn'].token)
        this.setState({loggedIn : true})
      }
    ).catch(error => {
      console.log(error)
    });
  }
  
  addCart(item){
    console.log(item.id, parseInt(this.state.quantity,10))
    if(this.state.loggedIn){
      fetch('http://localhost:8100/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-token": sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          query: `mutation{
            addItem(itemId: ${item.id}, quantity: ${parseInt(this.state.quantity,10)})
          }`
        })
      }).then(
        response => response.json()
      ).then(
        response => {
          console.log(response)
          if(response.data['addItem']){
            alert('Item adicionado com sucesso')
          }
        }
      ).catch(error => {
        console.log(error)
      });
    }
  }

  getItens(){
    fetch('http://localhost:8100/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query{
          items{
            id
            name
            image
            price
            stock
          }
        }`
      })
    }).then(
      response => response.json()
    ).then(
      response => this.setState({items:response.data['items']})
    ).catch(error => {
      console.log(error)
    });
  }

  render() {
    let items = []
    if(this.state.items){
      for(let item of this.state.items){
        items.push(
          <Grid item lg={3} md={4} sm={6} >
          <ModalItem item={item} handleChange={this.handleChange} addCart={this.addCart} loggedIn={this.state.loggedIn}/>   
          </Grid>
        )
      }
    }
    let login
    if(this.state.loggedIn){
      login = (
        <div className="header">
          Welcome User
        </div> 
      )
    }else{
      login = (
        <div className="header">
          <ModalLogin login={this.state.login} password={this.state.password} handleChange={this.handleChange} loginFunction={this.login} />
        </div> 
      )      
    }
    return (
      <div className="App">
        {login}
        <div className='image'>
          <Grid container spacing={2}>
            {items}
          </Grid> 
        </div>               
      </div>
    );
  }
}

export default App;
