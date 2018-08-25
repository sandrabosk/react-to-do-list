import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import TodoList from './todoList';
import EditTask from './editTask';
import User from './user';

class App extends Component {

  constructor(props){
    super(props);
    // we introduce state to keep track 
    this.state = {
      loggedInUser: null
    };
    console.log('what state: ', this.state);
  }

// this is like checkIfLoggedIn
  fetchUser(){
    if( this.state.loggedInUser === null ){  
        axios.get(`http://localhost:5000/api/loggedin`, {withCredentials: true})
        .then((response)=>{
            this.setState({
                theTasks: this.state.theTasks,
                showing: this.state.showing,
                loggedInUser:  response.data,
           }) 
        })
        .catch((err)=>{
            this.setState({
                theTasks: this.state.theTasks,
                showing: this.state.showing,
                loggedInUser:  false,
           }); 
        });
    }
}




  getUserFromUserComponent = (userObj) => {
  
    this.setState({loggedInUser: userObj});
    // console.log('what state in cb: ', this.state);

  }

  showUser(){
    if(this.state.loggedInUser){
      return (
        <div>
          <span>  Welcome, { this.state.loggedInUser.username } </span>
           <button onClick={() => {this.logout()}}>Logout</button>
        </div>
      )
    }
  }



  logout(){
    // const username = this.state.usernameInput;
    // const password = this.state.passwordInput;
    axios.post(`http://localhost:5000/api/logout`, {}, { withCredentials:true })
    .then( () => {
        this.setState({
            loggedInUser: null // this is important because of the fetchUser, 
            //to set the user back to null because fetch if it fails set it to false
        });
        // this.props.sendIt(null);
    } )
    .catch( err => {
        console.log(err);
    } )
}


  render() {
    return (
      <div className="App">
        <div id="theBody">
          {/* {this.fetchUser()} */}
          <h1>React.js - To Do App </h1>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/todolist">To-do List</Link>
              { this.showUser() }
            </nav>  
            <div>
              <Route path="/todolist" render={ () => <TodoList sendTheUser={this.getUserFromUserComponent} theActualUser={this.state.loggedInUser} />} />
            </div>
          </div>
          <div className="footer">
            <ul> 
              <h4>Copyright AF</h4>
              <li> This Page is Beautiful </li>
              <li> This Page is a strong, self-loving individual </li>
            </ul>
            <ul>
              <h4> All Rights Reserved </h4>
              <li> Property Of React Bindings Corp </li>
            </ul>
            <ul>
              <h4> External Resources </h4>
              <li> Check out the Docs </li>
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
