import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import AddTask from './addTask';

class App extends Component {

  constructor(props){
    super(props);
    // we introduce state to keep track 
    this.state = {
      theTasks: [],
    };
  }

  getAllTheTasks(){
    
    axios.get('http://localhost:5000/api/tasks')
    .then( allTheTasks => {
      // console.log(allTheTasks);
      this.setState({ theTasks:allTheTasks.data });
    } )
    .catch( err => console.log(err) );
  }


  showTasks(){
    return (
      this.state.theTasks.reverse().map( (task, index) => {
          return(
            <div key={ index } >
              <h3>{ task.title }</h3>
              <p>{ task.description }</p>
            </div>
          )
      })
    )
  }

  render() {
    return (
      <div className="App">
      <h1>React.js - To Do App </h1>

      <div className="add">
        <AddTask></AddTask>
      </div>
        <div className="list">
            <button onClick={() => {this.getAllTheTasks()}}>Get the tasks</button>
            { this.showTasks() }
       </div>
      </div>
    );
  }
}

export default App;
