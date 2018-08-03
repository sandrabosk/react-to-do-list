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

  addOneTask(taskToAdd){
    // console.log(' = = =  = = = = = = = = =')
    // // slice makes duplicate of the array if no args are passed
    // // duplicate the array
    // const currentArray = this.state.theTasks.slice();
    // // add new task to the duplicated array
    // currentArray.push(taskToAdd);
    // // update current array by reassigning it to the duplicate one
    // this.setState({ theTasks: currentArray });
    // console.log('new state: ', this.state)
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
      {/* <AddTask blah={ () => {this.addOneTask()} } ></AddTask> */}

        <AddTask blah={ () => {this.getAllTheTasks()} } ></AddTask>
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
